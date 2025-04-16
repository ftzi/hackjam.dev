"use server";

import { db } from "@/server/db/db";
import { events } from "@/server/db/schema/event";
import { ilike, or, sql } from "drizzle-orm";

interface GetEventListParams {
  searchQuery?: string;
  page?: number;
  limit?: number;
}

export async function getEventList({
  searchQuery = "",
  page = 1,
  limit = 10,
}: GetEventListParams = {}) {
  // Calculate offset based on page and limit
  const offset = (page - 1) * limit;

  // Build search conditions if query is provided
  const searchCondition = searchQuery
    ? or(
        ilike(events.name, `%${searchQuery}%`),
        ilike(events.description, `%${searchQuery}%`),
      )
    : undefined;

  // Get total count for pagination
  const totalCountResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(events)
    .where(searchCondition || sql`1=1`);

  const totalEvents = Number(totalCountResult[0].count);

  // Execute query with pagination
  const eventsList = await db
    .select()
    .from(events)
    .where(searchCondition || sql`1=1`)
    .orderBy(events.startDate, events.createdAt)
    .limit(limit)
    .offset(offset);

  return {
    events: eventsList,
    totalEvents,
    currentPage: page,
    totalPages: Math.ceil(totalEvents / limit),
  };
}
