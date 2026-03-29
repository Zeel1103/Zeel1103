DROP TABLE "booked_appointments" CASCADE;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "patient_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "patient_name" varchar(255);--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "patient_email" varchar(255);--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "slot_time" timestamp with time zone;