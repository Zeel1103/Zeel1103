// scripts/seedDoctors.ts
import "dotenv/config";
import { db } from "@/config/db";
import { doctorsTable } from "@/config/schema";
import { eq } from "drizzle-orm";

async function seedDoctors() {
  try {
    const doctors = [
      {
        name: "Dr. Sarah Johnson",
        email: "jaguwalazeel@gmail.com",
        specialization: "General Physician",
        profileImage: "/doctor1.png",
        bio: "Experienced GP with 10+ years in family medicine.",
      },
      {
        name: "Dr. Rajesh Mehta",
        email: "jaguwalatina@gmail.com",
        specialization: "Pediatrician",
        profileImage: "/doctor2.png",
        bio: "Specialist in child healthcare and vaccinations.",
      },
      {
        name: "Dr. Emily Carter",
        email: "emily@gmail.com",
        specialization: "Dermatologist",
        profileImage: "/doctor3.png",
        bio: "Expert in skin, hair, and nail treatments.",
      },
      {
        name: "Dr. Anil Sharma",
        email: "anil@gmail.com",
        specialization: "Cardiologist",
        profileImage: "/doctor4.png",
        bio: "Heart specialist with 15+ years of experience.",
      },
      {
        name: "Dr. Priya Verma",
        email: "priya@gmail.com",
        specialization: "Psychologist",
        profileImage: "/doctor5.png",
        bio: "Mental health expert focused on therapy and counseling.",
      },
      {
        name: "Dr. Amit Singh",
        email: "amit@gmail.com",
        specialization: "Nutritionist",
        profileImage: "/doctor6.png",
        bio: "Diet and nutrition expert for healthy living.",
      },
      {
        name: "Dr. Neha Rao",
        email: "neha@gmail.com",
        specialization: "ENT Specialist",
        profileImage: "/doctor7.png",
        bio: "Specialist in ear, nose, and throat disorders.",
      },
      {
        name: "Dr. Vikram Desai",
        email: "vikram@gmail.com",
        specialization: "Orthopedic",
        profileImage: "/doctor8.png",
        bio: "Bone and joint specialist with surgical experience.",
      },
      {
        name: "Dr. Meenal Joshi",
        email: "meenal@gmail.com",
        specialization: "Gynecologist",
        profileImage: "/doctor9.png",
        bio: "Women's health expert with focus on prenatal care.",
      },
      {
        name: "Dr. Alex Thomas",
        email: "alex@gmail.com",
        specialization: "Dentist",
        profileImage: "/doctor10.png",
        bio: "General dentist for oral hygiene and procedures.",
      },
    ];

    for (const doc of doctors) {
      const existing = await db
        .select()
        .from(doctorsTable)
        .where(eq(doctorsTable.name, doc.name));

      if (existing.length === 0) {
        await db.insert(doctorsTable).values(doc);
        console.log(`✅ Inserted: ${doc.name}`);
      } else {
        console.log(`ℹ️ Skipped (already exists): ${doc.name}`);
      }
    }

    console.log("🎉 Doctors seed completed!");
  } catch (err) {
    console.error("❌ Error seeding doctors:", err);
  }
}

seedDoctors()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
