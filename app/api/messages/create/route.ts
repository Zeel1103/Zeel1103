import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { messagesTable } from "@/config/schema";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, sender, content } = await req.json();

    if (!sessionId || !sender || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const now = new Date().toISOString();

    const result = await db.insert(messagesTable).values({
      sessionId: parseInt(sessionId),
      sender,
      content,
      createdAt: new Date(now), // ✅ Ensure timestamp is always saved
    }).returning();

    return NextResponse.json({
      message: {
        id: result[0].id,
        sessionId: sessionId,
        sender,
        content,
        createdAt: now, // ✅ Return ISO string
      },
    });
  } catch (err) {
    console.error("🔥 CREATE MESSAGE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
