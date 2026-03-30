import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { appointmentsTable, doctorsTable } from '@/config/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const appointments = await db
      .select({
        id: appointmentsTable.id,
        date: appointmentsTable.date,
        slotTime: appointmentsTable.slotTime,
        status: appointmentsTable.status,
        videoLink: appointmentsTable.videoLink,
        doctorName: doctorsTable.name,
        doctorSpecialization: doctorsTable.specialization,
      })
      .from(appointmentsTable)
      .leftJoin(doctorsTable, eq(appointmentsTable.doctorId, doctorsTable.id))
      .where(eq(appointmentsTable.userId, userId))
      .orderBy(desc(appointmentsTable.date))
      .limit(10);

    return NextResponse.json({ appointments });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    return NextResponse.json({ appointments: [] });
  }
}
