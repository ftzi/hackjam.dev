ALTER TABLE "event" DROP CONSTRAINT "event_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "team_member" DROP CONSTRAINT "team_member_team_id_team_id_fk";
--> statement-breakpoint
ALTER TABLE "team_member" DROP CONSTRAINT "team_member_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "team" DROP CONSTRAINT "team_leader_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "team" DROP CONSTRAINT "team_event_id_event_id_fk";
--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "max_teams" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "max_team_members" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "registration_deadline" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_member" ADD CONSTRAINT "team_member_team_id_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_member" ADD CONSTRAINT "team_member_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_leader_id_users_id_fk" FOREIGN KEY ("leader_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE cascade ON UPDATE no action;