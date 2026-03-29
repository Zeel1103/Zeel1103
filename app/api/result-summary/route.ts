import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { messagesTable, sessionsTable } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { openai } from '@/config/OpenModelAi';

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('sessionId');
    if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });

    // Verify API key exists
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('❌ OPENROUTER_API_KEY is not set');
      return NextResponse.json({ 
        error: 'API key not configured',
        details: 'OPENROUTER_API_KEY environment variable is missing'
      }, { status: 500 });
    }

    const session = await db.select().from(sessionsTable).where(eq(sessionsTable.id, Number(sessionId))).limit(1);
    const messages = await db.select().from(messagesTable).where(eq(messagesTable.sessionId, Number(sessionId)));

    if (!session[0]) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    const chatHistory = messages.map(m => `${m.sender}: ${m.content}`).join('\n');

    const prompt = `
You are an AI medical assistant. Based on this chat history, create a summary with:
1. Patient's problem.
2. Home remedies or treatments mentioned.
3. Final advice from AI doctor.
4. A recommended doctor specialization from the following list: ['General Physician', 'Pediatrician', 'Dermatologist', 'Cardiologist', 'Psychologist', 'Nutritionist', 'ENT Specialist', 'Orthopedic', 'Gynecologist', 'Dentist'].

Chat:
${chatHistory}

Your entire response must be only the JSON object, with no other text before or after it. The JSON should have these fields:
{
  "problem": "...",
  "remedies": ["...", "..."],
  "advice": "...",
  "specialization": "..." 
}
`;

    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      max_tokens: 512,
      temperature: 0.7,
      messages: [{ role: 'system', content: prompt }],
    });

    const raw = completion.choices[0]?.message?.content;
    
    if (!raw) {
      console.error('Empty response from AI');
      return NextResponse.json({ 
        error: 'Empty response from AI',
        problem: 'Unable to generate summary',
        remedies: [],
        advice: 'Please try again',
        specialization: 'General Physician'
      }, { status: 500 });
    }

    let parsed;

    // ✅ UPDATED PARSING LOGIC: This is more robust against extra text from the AI.
    try {
      // Find the JSON block within the raw text response
      const jsonMatch = raw.match(/{[\s\S]*}/);
      
      if (jsonMatch && jsonMatch[0]) {
        // If a JSON block is found, parse it
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON block is found, throw an error to go to the catch block
        throw new Error("No valid JSON object found in AI response");
      }
    } catch (error) {
      console.error("Failed to parse AI response. Raw text:", raw);
      console.error("Parsing error:", error);
      parsed = { problem: 'Unable to parse summary', remedies: [], advice: 'No advice available', specialization: 'General Physician' };
    }
    // --- END OF UPDATED LOGIC ---

    // Fallback logic for Neurologist
    if (parsed.specialization === 'Neurologist') {
      console.log("AI suggested Neurologist, falling back to General Physician.");
      parsed.specialization = 'General Physician';
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('Result Summary Error:', JSON.stringify(err, null, 2));
    
    const errorObj = err as any;
    console.error('Status:', errorObj?.status || errorObj?.code);
    console.error('Error details:', errorObj?.error);
    
    return NextResponse.json({ 
      error: 'Internal server error',
      problem: 'Unable to generate summary',
      remedies: [],
      advice: 'Please try the consultation again',
      specialization: 'General Physician'
    }, { status: 500 });
  }
}