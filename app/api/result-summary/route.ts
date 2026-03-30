import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { messagesTable, sessionsTable } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { openai } from '@/config/OpenModelAi';

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('sessionId');
    if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });

    if (!process.env.OPENROUTER_API_KEY) {
      console.error('❌ OPENROUTER_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const session = await db.select().from(sessionsTable).where(eq(sessionsTable.id, Number(sessionId))).limit(1);
    const messages = await db.select().from(messagesTable).where(eq(messagesTable.sessionId, Number(sessionId)));

    if (!session[0]) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    const chatHistory = messages.map(m => `${m.sender === 'user' ? 'Patient' : 'Doctor'}: ${m.content}`).join('\n');

    const doctorSpecialist = session[0]?.doctorSpecialist || 'General Physician';

    const prompt = `You are summarizing a medical consultation between a patient and a ${doctorSpecialist}. Your job is to EXTRACT information DIRECTLY from the chat below — do NOT invent new information or add solutions that were not discussed.

CHAT HISTORY:
${chatHistory}

IMPORTANT RULES:
- The "problem" must describe what the PATIENT said their symptoms are, including severity and duration if mentioned.
- The "remedies" must ONLY include remedies/treatments that the DOCTOR actually mentioned in the chat. Do NOT add new ones. Write them as CLEAN actionable instructions (e.g., do NOT write "over-the-counter pain relief such as ibuprofen" — instead write "Take Ibuprofen 400mg every 6-8 hours as needed for pain").
- The "medicines" must ONLY include medicines the DOCTOR actually recommended in the chat. Do NOT add new ones. If no medicines were mentioned, return an empty array.
  - CRITICAL: Write each medicine as a CLEAN prescription entry: "Medicine Name — Dosage — Frequency — Duration". 
  - Example: "Amoxicillin 500mg — 1 tablet — 3 times daily — for 7 days"
  - Do NOT use phrases like "e.g.", "such as", "for example", "like". Remove all example language.
  - Do NOT include brackets like "[Dosage: ___ ]". Include the actual dosage in the medicine text.
  - Make sure the medicines are RELEVANT and SPECIFIC to the patient's diagnosed problem.
- The "advice" must summarize the DOCTOR's key advice from the chat as a clear, complete sentence. Do NOT generate new advice.
- The "specialization" should be picked from: ['General Physician', 'Pediatrician', 'Dermatologist', 'Cardiologist', 'Psychologist', 'Nutritionist', 'ENT Specialist', 'Orthopedic', 'Gynecologist', 'Dentist']
- The "doctorName" should be a professional-sounding AI doctor name based on the specialty. Use format: "Dr. AI [LastName], ${doctorSpecialist}". Pick a realistic last name.

Respond with ONLY this JSON — no extra text:
{
  "problem": "what the patient described",
  "remedies": ["clean remedy instruction 1", "clean remedy instruction 2"],
  "medicines": ["Medicine Name — Dosage — Frequency — Duration", "Medicine Name — Dosage — Frequency — Duration"],
  "advice": "doctor's advice from the chat",
  "specialization": "recommended specialist",
  "doctorName": "Dr. AI LastName, Specialty"
}`;

    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      max_tokens: 512,
      temperature: 0.3,
      messages: [{ role: 'system', content: prompt }],
    });

    const raw = completion.choices[0]?.message?.content;
    
    if (!raw) {
      return NextResponse.json({ 
        problem: 'Unable to generate summary',
        remedies: [],
        medicines: [],
        advice: 'Please try again',
        specialization: 'General Physician',
        doctorName: 'Dr. AI Generalist'
      }, { status: 500 });
    }

    let parsed;
    try {
      const jsonMatch = raw.match(/{[\s\S]*}/);
      if (jsonMatch && jsonMatch[0]) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found");
      }
    } catch (error) {
      console.error("Failed to parse AI response:", raw);
      parsed = { problem: 'Unable to parse summary', remedies: [], medicines: [], advice: 'No advice available', specialization: 'General Physician', doctorName: 'Dr. AI Generalist' };
    }

    // Ensure medicines array exists
    if (!parsed.medicines) parsed.medicines = [];

    // Fallback for unlisted specializations
    const validSpecs = ['General Physician', 'Pediatrician', 'Dermatologist', 'Cardiologist', 'Psychologist', 'Nutritionist', 'ENT Specialist', 'Orthopedic', 'Gynecologist', 'Dentist'];
    if (!validSpecs.includes(parsed.specialization)) {
      parsed.specialization = 'General Physician';
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('Result Summary Error:', JSON.stringify(err, null, 2));
    return NextResponse.json({ 
      problem: 'Unable to generate summary',
      remedies: [],
      medicines: [],
      advice: 'Please try the consultation again',
      specialization: 'General Physician',
      doctorName: 'Dr. AI Generalist'
    }, { status: 500 });
  }
}