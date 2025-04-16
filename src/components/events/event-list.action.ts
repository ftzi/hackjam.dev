"use server";

import { db } from "@/server/db/db";

export async function getEventList() {
  return await db.query.events.findMany({
    orderBy: (events, { asc }) => [
      asc(events.startDate),
      asc(events.createdAt),
    ],
  });
}
