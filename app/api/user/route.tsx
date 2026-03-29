import { db } from "@/config/db"; // ✅ Connect to DB
import { eq } from "drizzle-orm"; // ✅ Comparison helper
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await db.select().from(usersTable)
      .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress || ""));

    if (users.length === 0) {
      const result = await db.insert(usersTable).values({
        name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        credits: 10,
      }).returning();

      return NextResponse.json(result[0]);
    }

    return NextResponse.json(users[0]);
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
