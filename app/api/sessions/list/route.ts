import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { sessionsTable, messagesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all sessions for the current user
    const sessions = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.userId, userId))
      .orderBy((table) => table.createdAt);

    // For each session, get message count
    const sessionsWithDetails = await Promise.all(
      sessions.map(async (session) => {
        const messages = await db
          .select()
          .from(messagesTable)
          .where(eq(messagesTable.sessionId, session.id));

        return {
          ...session,
          messageCount: messages.length,
          lastMessage: messages.length > 0 ? messages[messages.length - 1].content : null,
        };
      })
    );

    // Sort by creation date (newest first)
    const sorted = sessionsWithDetails.sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );

    return NextResponse.json({ sessions: sorted });
  } catch (err: any) {
    console.error("❌ Error fetching sessions:", err);
    return NextResponse.json(
      { error: "Failed to fetch sessions", details: err.message },
      { status: 500 }
    );
  }
}
