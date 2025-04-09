import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const events = pgTable("event", {
  id: uuid().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  maxTeams: integer("max_teams"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  maxTeamMembers: integer("max_team_members"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  discordUrl: text("discord_url"),
  backgroundColor: text("background_color"),
  logoUrl: text("logo_url"),
});

export type Event = typeof events.$inferSelect;

export const eventRelations = relations(events, ({ one }) => ({
  createdByUser: one(users, {
    fields: [events.createdBy],
    references: [users.id],
  }),
}));
