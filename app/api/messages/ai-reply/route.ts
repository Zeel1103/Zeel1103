import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/config/OpenModelAi'
import { db } from '@/config/db'
import { messagesTable } from '@/config/schema'

export async function POST(req: NextRequest) {
  try {
    const { sessionId, message } = await req.json()

    if (!sessionId || !message) {
      return NextResponse.json({ error: 'Missing sessionId or message' }, { status: 400 })
    }

    // ✅ Save user message
    await db.insert(messagesTable).values({
      sessionId: Number(sessionId),
      sender: 'user',
      content: message,
      createdAt: new Date(),
    })

    // Verify API key exists
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('❌ OPENROUTER_API_KEY is not set')
      return NextResponse.json({ 
        error: 'API key not configured',
        details: 'OPENROUTER_API_KEY environment variable is missing'
      }, { status: 500 })
    }

    // ✅ Call OpenRouter with GPT-3.5-turbo (more reliable)
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      stream: false,
      max_tokens: 512,
      temperature: 0.7,
      messages: [
        { 
          role: 'system', 
          content: 'You are a professional AI medical assistant. Provide helpful, accurate medical guidance. Always recommend consulting a licensed healthcare provider for serious conditions. Keep responses concise and clear.' 
        },
        { role: 'user', content: message },
      ],
    })

    const reply = completion.choices[0]?.message?.content || 'I apologize, I could not generate a response. Please try again.'

    // ✅ Save AI reply
    await db.insert(messagesTable).values({
      sessionId: Number(sessionId),
      sender: 'ai',
      content: reply,
      createdAt: new Date(),
    })

    return NextResponse.json({ reply })
  } catch (err) {
    // Log full error object for debugging
    console.error('🔥 AI reply error:', JSON.stringify(err, null, 2))
    
    const errorObj = err as any
    const errorMessage = err instanceof Error ? err.message : JSON.stringify(err)
    const errorStatus = errorObj?.status || errorObj?.code || 500
    
    console.error('Status:', errorStatus)
    console.error('Error response:', errorObj?.error)
    
    return NextResponse.json({ 
      error: 'AI reply failed', 
      details: errorMessage,
      status: errorStatus 
    }, { status: 500 })
  }
}
