import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { sessionsTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("sessionId");
    if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

    const session = await db.select().from(sessionsTable).where(eq(sessionsTable.id, Number(sessionId))).limit(1);
    if (!session[0]) return NextResponse.json({ error: "Session not found" }, { status: 404 });

    return NextResponse.json({ doctorSpecialist: session[0].doctorSpecialist });
  } catch (err) {
    console.error("❌ Session info error:", err);
    return NextResponse.json({ error: "Failed to fetch session info" }, { status: 500 });
  }
}
