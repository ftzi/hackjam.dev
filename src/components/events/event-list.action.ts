"use server";

import { db } from "@/server/db/db";
import { events } from "@/server/db/schema/event";

export async function getEventList() {
  return await db.select().from(events);
}
