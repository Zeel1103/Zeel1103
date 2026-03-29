import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { sessionsTable } from "@/config/schema";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); // ✅ Await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { notes, selectedSpecialist } = await req.json();

    if (!notes || !selectedSpecialist) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const [session] = await db
      .insert(sessionsTable)
      .values({
        userId,
        notes,
        doctorSpecialist: selectedSpecialist,
      })
      .returning();

    return NextResponse.json({ success: true, session });
  } catch (err) {
    console.error("Create Session Error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
