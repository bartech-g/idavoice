-- Fix auth tables: change id columns from integer to text
ALTER TABLE "user" ALTER COLUMN "id" TYPE text;
ALTER TABLE "session" ALTER COLUMN "id" TYPE text;
ALTER TABLE "account" ALTER COLUMN "id" TYPE text;
ALTER TABLE "verification" ALTER COLUMN "id" TYPE text;
