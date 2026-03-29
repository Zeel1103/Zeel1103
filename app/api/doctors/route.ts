// app/api/doctors/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { doctorsTable, appointmentsTable } from '@/config/schema';
import { eq, and, inArray } from 'drizzle-orm';
import { getDay, format } from 'date-fns';

export async function GET(req: NextRequest) {
  try {
    const specialization = req.nextUrl.searchParams.get('specialization');
    const date = req.nextUrl.searchParams.get('date');

    if (!specialization || !date) {
      return NextResponse.json({ error: 'Missing specialization or date' }, { status: 400 });
    }

    const selectedDate = new Date(date);
    const dayOfWeek = getDay(selectedDate);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const selectedDayName = dayNames[dayOfWeek];

    const doctors = await db.select().from(doctorsTable).where(eq(doctorsTable.specialization, specialization));

    if (doctors.length === 0) {
      return NextResponse.json([]);
    }
    
    const doctorIds = doctors.map(d => d.id);
    
    const bookedAppointments = await db.select({
        doctorId: appointmentsTable.doctorId,
        slotTime: appointmentsTable.slotTime
    }).from(appointmentsTable).where(
      and(
        inArray(appointmentsTable.doctorId, doctorIds),
        eq(appointmentsTable.date, selectedDate)
      )
    );

    const doctorsWithAvailability = doctors.map(doctor => {
      const daySchedule = doctor.weeklyAvailability?.find(day => day.day === selectedDayName);
      
      const bookedSlotsForDoctor = bookedAppointments
        .filter(appt => appt.doctorId === doctor.id)
        .map(appt => format(new Date(appt.slotTime), "HH:mm"));

      let availableSlots: string[] = [];
      if (daySchedule) {
        availableSlots = daySchedule.slots.filter(slot => !bookedSlotsForDoctor.includes(slot));
      }
      
      return { 
        ...doctor, 
        availableSlots,
        weeklyAvailability: doctor.weeklyAvailability 
      };
    });
    
    // ✅ CHANGE: We no longer filter out doctors with no slots. We return all of them.
    return NextResponse.json(doctorsWithAvailability);

  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}