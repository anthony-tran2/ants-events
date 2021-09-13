set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userid" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userid")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."events" (
	"eventId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"timestamp" timestamp with time zone NOT NULL,
	"origin" TEXT,
	"destination" TEXT NOT NULL,
	"notification" BOOLEAN NOT NULL,
  "sent" BOOLEAN NOT NULL,
	"email" TEXT,
	"userId" integer,
  "coords" json NOT NULL,
	CONSTRAINT "events_pk" PRIMARY KEY ("eventId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."notes" (
	"noteId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"content" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "notes_pk" PRIMARY KEY ("noteId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "events" ADD CONSTRAINT "events_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userid");

ALTER TABLE "notes" ADD CONSTRAINT "notes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userid");
