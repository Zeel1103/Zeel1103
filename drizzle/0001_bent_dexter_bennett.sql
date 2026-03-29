ALTER TABLE "booked_appointments" RENAME COLUMN "slot" TO "slot_time";--> statement-breakpoint
ALTER TABLE "booked_appointments" RENAME COLUMN "created_at" TO "patient_id";--> statement-breakpoint
ALTER TABLE "booked_appointments" ALTER COLUMN "doctor_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "booked_appointments" ALTER COLUMN "patient_name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "booked_appointments" ALTER COLUMN "patient_email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "booked_appointments" ALTER COLUMN "session_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "booked_appointments" ADD CONSTRAINT "booked_appointments_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctors" DROP COLUMN "available_slots";