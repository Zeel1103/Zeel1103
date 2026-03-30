import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/config/OpenModelAi'
import { db } from '@/config/db'
import { messagesTable, sessionsTable } from '@/config/schema'
import { eq, asc } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  try {
    const { sessionId, message } = await req.json()

    if (!sessionId || !message) {
      return NextResponse.json({ error: 'Missing sessionId or message' }, { status: 400 })
    }

    // Save user message
    await db.insert(messagesTable).values({
      sessionId: Number(sessionId),
      sender: 'user',
      content: message,
      createdAt: new Date(),
    })

    if (!process.env.OPENROUTER_API_KEY) {
      console.error('❌ OPENROUTER_API_KEY is not set')
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Fetch session info
    const session = await db.select().from(sessionsTable).where(eq(sessionsTable.id, Number(sessionId))).limit(1)
    const doctorSpecialist = session[0]?.doctorSpecialist || 'General Physician'
    const sessionNotes = session[0]?.notes || ''

    // Fetch conversation history
    const previousMessages = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.sessionId, Number(sessionId)))
      .orderBy(asc(messagesTable.createdAt))

    const conversationHistory = previousMessages.slice(-20).map(m => ({
      role: m.sender === 'user' ? 'user' as const : 'assistant' as const,
      content: m.content,
    }))

    // Count how many user messages so far (to decide when to give solutions)
    const userMsgCount = previousMessages.filter(m => m.sender === 'user').length

    const systemPrompt = `You are Dr. AI, a highly experienced ${doctorSpecialist} providing a virtual medical consultation.

CRITICAL RULES:

1. **MEDICAL TOPICS ONLY**: You ONLY discuss health and medical topics. If the user asks about ANY non-medical topic (politics, coding, recipes, sports, entertainment, math, etc.), respond with: "I'm a medical specialist and can only help with health-related questions. Please tell me about any health concerns you have." Do NOT answer non-medical questions.

2. **BALANCE QUESTIONS & SOLUTIONS**: 
   - On the FIRST message: Greet briefly and ask 1-2 key questions about their symptom (location, duration, severity).
   - On the SECOND message: Based on their answers, provide a PRELIMINARY diagnosis and treatment plan. You may ask 1 more clarifying question if truly needed.
   - On the THIRD message onward: FOCUS ON GIVING SOLUTIONS. Provide specific medicines with dosages, home remedies, and actionable advice. Stop asking questions unless absolutely critical.
   - IMPORTANT: ALWAYS include at least some advice/solution in EVERY response after the first. Never send a response that ONLY asks questions.

3. **Be specific**: Name exact medications with dosages (e.g., "Paracetamol 500mg every 6 hours" or "Cetirizine 10mg once daily"). Include specific home remedies with clear instructions.

4. **Include warning signs**: Tell the patient specific red flags that need immediate emergency care.

5. **Keep responses concise**: 3-4 short paragraphs max. Don't write essays.

6. **Never give generic advice**: Avoid "stay hydrated and rest" unless directly relevant. Be specific to the actual condition.

${userMsgCount <= 1 ? 'This is the START of the conversation. Ask 1-2 quick questions about the symptom and provide initial guidance.' : ''}
${userMsgCount >= 3 ? 'IMPORTANT: The patient has been chatting for a while. PROVIDE CLEAR SOLUTIONS NOW — medicines, dosages, remedies. Minimize further questions.' : ''}
${sessionNotes ? `Patient's initial complaint: "${sessionNotes}"` : ''}

You are a ${doctorSpecialist}. Stay in character as this specific specialist and provide advice from that specialty's perspective.`

    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      stream: false,
      max_tokens: 600,
      temperature: 0.5,
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
      ],
    })

    const reply = completion.choices[0]?.message?.content || 'I apologize, I could not generate a response. Please try again.'

    // Save AI reply
    await db.insert(messagesTable).values({
      sessionId: Number(sessionId),
      sender: 'ai',
      content: reply,
      createdAt: new Date(),
    })

    return NextResponse.json({ reply })
  } catch (err) {
    console.error('🔥 AI reply error:', JSON.stringify(err, null, 2))
    const errorMessage = err instanceof Error ? err.message : JSON.stringify(err)
    return NextResponse.json({ error: 'AI reply failed', details: errorMessage }, { status: 500 })
  }
}
