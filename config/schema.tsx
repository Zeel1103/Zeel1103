import { integer, serial, pgTable, varchar, text, timestamp, json } from "drizzle-orm/pg-core";

// ✅ User table to store account info
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer()
});

// ✅ AI Consultation Sessions
export const sessionsTable = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  notes: text("notes").notNull(),
  doctorSpecialist: varchar("doctor_specialist", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ✅ Messages linked to sessions
export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(), // FK to sessionsTable.id
  sender: varchar("sender", { length: 50 }).notNull(), // "user" | "ai"
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

/* 
  ✅ Doctors Table: Stores real doctor profiles
*/
export const doctorsTable = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  specialization: varchar("specialization", { length: 255 }).notNull(),
  profileImage: varchar("profile_image", { length: 500 }),
  bio: text("bio"),
   weeklyAvailability: json("weekly_availability").$type<{
    day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
    slots: string[]; // e.g., ["09:00", "09:30", "10:00"]
  }[]>().default([]), // store as array of ISO date strings
});

/* 
  ✅ Appointments Table: User bookings with real doctors
*/
export const appointmentsTable = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(), // Clerk user ID or similar
  patientName: varchar("patient_name", { length: 255 }), // Optional
  patientEmail: varchar("patient_email", { length: 255 }), // Optional
  doctorId: integer("doctor_id").notNull(), // FK to doctorsTable.id
  sessionId: integer("session_id").notNull(), // FK to sessionsTable.id
  date: timestamp("date", { withTimezone: true }).notNull(),
  status: varchar("status", { length: 50 }).default("pending"), // pending | confirmed | completed | cancelled
  videoLink: varchar("video_link", { length: 500 }), // URL to join call
  slotTime: timestamp("slot_time", { withTimezone: true }).notNull(),
});

/* 
  ✅ Video Calls Table: Logs of each call (future use)
*/
export const videoCallsTable = pgTable("video_calls", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointment_id").notNull(), // FK to appointmentsTable.id
  startTime: timestamp("start_time", { withTimezone: true }).defaultNow(),
  endTime: timestamp("end_time", { withTimezone: true }),
  recordingUrl: varchar("recording_url", { length: 500 }), // optional recording link
});

/* 
  ✅ Payments Table: Placeholder for future Stripe/Razorpay integration
*/
export const paymentsTable = pgTable("payments", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointment_id").notNull(),
  amount: integer("amount").notNull(),
  status: varchar("status", { length: 50 }).default("pending"), // pending | paid | failed
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}); 
// 👇 Add this to schema.ts



