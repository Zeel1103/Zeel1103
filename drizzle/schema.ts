import { pgTable, serial, varchar, text, json, integer, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const doctors = pgTable("doctors", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	specialization: varchar({ length: 255 }).notNull(),
	profileImage: varchar("profile_image", { length: 500 }),
	bio: text(),
	email: varchar({ length: 255 }).notNull(),
	availableSlots: json("available_slots").default([]),
});

export const payments = pgTable("payments", {
	id: serial().primaryKey().notNull(),
	appointmentId: integer("appointment_id").notNull(),
	amount: integer().notNull(),
	status: varchar({ length: 50 }).default('pending'),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const videoCalls = pgTable("video_calls", {
	id: serial().primaryKey().notNull(),
	appointmentId: integer("appointment_id").notNull(),
	startTime: timestamp("start_time", { withTimezone: true, mode: 'string' }).defaultNow(),
	endTime: timestamp("end_time", { withTimezone: true, mode: 'string' }),
	recordingUrl: varchar("recording_url", { length: 500 }),
});

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	credits: integer(),
});

export const appointments = pgTable("appointments", {
	id: serial().primaryKey().notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	doctorId: integer("doctor_id").notNull(),
	sessionId: integer("session_id").notNull(),
	date: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	status: varchar({ length: 50 }).default('pending'),
	videoLink: varchar("video_link", { length: 500 }),
	patientName: varchar("patient_name", { length: 255 }),
	patientEmail: varchar("patient_email", { length: 255 }),
	slotTime: timestamp("slot_time", { withTimezone: true, mode: 'string' }),
});

export const sessions = pgTable("sessions", {
	id: serial().primaryKey().notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	notes: text().notNull(),
	doctorSpecialist: varchar("doctor_specialist", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const messages = pgTable("messages", {
	id: serial().primaryKey().notNull(),
	sessionId: integer("session_id").notNull(),
	sender: varchar({ length: 50 }).notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});
