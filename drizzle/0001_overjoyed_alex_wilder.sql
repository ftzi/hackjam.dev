ALTER TABLE "event" ADD COLUMN "registration_deadline" timestamp;--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN "discord_url";--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN "background_color";--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN "logo_url";