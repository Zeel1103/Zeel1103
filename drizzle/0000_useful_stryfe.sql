CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"doctor_id" integer NOT NULL,
	"session_id" integer NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"status" varchar(50) DEFAULT 'pending',
	"video_link" varchar(500)
);
--> statement-breakpoint
CREATE TABLE "booked_appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"doctor_id" text NOT NULL,
	"slot" timestamp NOT NULL,
	"patient_name" text NOT NULL,
	"patient_email" text NOT NULL,
	"session_id" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "doctors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"specialization" varchar(255) NOT NULL,
	"profile_image" varchar(500),
	"bio" text,
	"available_slots" json DEFAULT '[]'::json
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"sender" varchar(50) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"appointment_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"status" varchar(50) DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"notes" text NOT NULL,
	"doctor_specialist" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"credits" integer,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "video_calls" (
	"id" serial PRIMARY KEY NOT NULL,
	"appointment_id" integer NOT NULL,
	"start_time" timestamp with time zone DEFAULT now(),
	"end_time" timestamp with time zone,
	"recording_url" varchar(500)
);
