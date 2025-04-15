import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./auth";

const statusEnum = pgEnum("status", ["draft", "upcoming", "completed"]);

export const events = pgTable("event", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  status: statusEnum("status").notNull().default("draft"),
  maxTeams: integer("max_teams"),
  maxTeamMembers: integer("max_team_members"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  // TODO is a new feature to add
  // discordUrl: text("discord_url"),
  // backgroundColor: text("background_color"),
  // logoUrl: text("logo_url"),
  registrationDeadline: timestamp("registration_deadline"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
});

export type Event = typeof events.$inferSelect;

export const eventRelations = relations(events, ({ one }) => ({
  createdByUser: one(users, {
    fields: [events.createdBy],
    references: [users.id],
  }),
}));
