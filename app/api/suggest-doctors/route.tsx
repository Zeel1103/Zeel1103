// app/api/suggest-doctors/route.ts
import { NextRequest, NextResponse } from "next/server";
import { AIDoctorAgents } from "@/shared/list";

interface SuggestDoctorRequest {
  notes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { notes = "" }: SuggestDoctorRequest = await req.json();

    const keywords = notes.toLowerCase();
    const matchingSpecialists = new Set<string>();

    if (keywords.includes("knee") || keywords.includes("bone") || keywords.includes("joint")) {
      matchingSpecialists.add("Orthopedic");
    }
    if (keywords.includes("pain") || keywords.includes("fever") || keywords.includes("cold")) {
      matchingSpecialists.add("General Physician");
    }
    if (keywords.includes("child") || keywords.includes("baby") || keywords.includes("kids")) {
      matchingSpecialists.add("Pediatrician");
    }
    if (keywords.includes("skin") || keywords.includes("acne") || keywords.includes("rash")) {
      matchingSpecialists.add("Dermatologist");
    }
    if (keywords.includes("ear") || keywords.includes("throat") || keywords.includes("nose")) {
      matchingSpecialists.add("ENT Specialist");
    }
    if (keywords.includes("diet") || keywords.includes("weight") || keywords.includes("food")) {
      matchingSpecialists.add("Nutritionist");
    }
    if (keywords.includes("heart") || keywords.includes("pressure")) {
      matchingSpecialists.add("Cardiologist");
    }
    if (keywords.includes("mental") || keywords.includes("stress") || keywords.includes("depress")) {
      matchingSpecialists.add("Psychologist");
    }
    if (keywords.includes("pregnancy") || keywords.includes("period") || keywords.includes("woman")) {
      matchingSpecialists.add("Gynecologist");
    }
    if (keywords.includes("teeth") || keywords.includes("tooth") || keywords.includes("dental")) {
      matchingSpecialists.add("Dentist");
    }

    // Fallback if no specialists matched
    if (matchingSpecialists.size === 0) {
      matchingSpecialists.add("General Physician");
    }

    const result = AIDoctorAgents.filter((doc) =>
      matchingSpecialists.has(doc.specialist)
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Error in suggest-doctors route:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
