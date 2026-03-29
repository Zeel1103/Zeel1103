import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { messagesTable, sessionsTable } from "@/config/schema";
import { eq } from "drizzle-orm";

// 🔄 Simple retry wrapper to handle Neon cold start
async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries > 0) {
      console.warn("🔄 DB retrying...", retries);
      await new Promise(r => setTimeout(r, 1500));
      return withRetry(fn, retries - 1);
    }
    throw err;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    console.log("📥 Fetching messages for session:", sessionId);

    // ✅ Fetch messages with retry
    const messages = await withRetry(() =>
      db.select()
        .from(messagesTable)
        .where(eq(messagesTable.sessionId, sessionId))
    );

    // ✅ Fetch doctorSpecialist from sessionsTable
    const sessionData = await withRetry(() =>
      db.select({ doctorSpecialist: sessionsTable.doctorSpecialist })
        .from(sessionsTable)
        .where(eq(sessionsTable.id, sessionId))
        .limit(1)
    );

    const doctorSpecialist = sessionData[0]?.doctorSpecialist || null;

    return NextResponse.json({ messages, doctorSpecialist });
  } catch (err: any) {
    console.error("💥 Error fetching messages:", err);
    return NextResponse.json(
      { error: "Failed to load messages", details: err.message },
      { status: 500 }
    );
  }
}
