"use server";

import { getUser } from "@/server/auth";
import { db } from "@/server/db/db";
import { events } from "@/server/db/schema/event";
import { eq } from "drizzle-orm";
import { revalidateEvent } from "../utils";
import type { EventFormValues } from "./create-event-form.schema";

export async function updateEventAction(
  eventId: string,
  values: EventFormValues,
) {
  const user = await getUser();

  if (!user) {
    throw new Error("You must be signed in to update an event");
  }

  const existingEvent = await db.query.events.findFirst({
    where: eq(events.id, eventId),
  });

  if (!existingEvent) throw new Error("Event not found");

  if (existingEvent.createdBy !== user.id)
    throw new Error("You are not authorized to update this event");

  await db
    .update(events)
    .set({
      name: values.name,
      description: values.description,
      maxTeams: values.maxTeams,
      maxTeamMembers: values.maxTeamMembers,
      startDate: values.startDate,
      endDate: values.endDate,
      registrationDeadline: values.registrationDeadline,
    })
    .where(eq(events.id, eventId));

  revalidateEvent(eventId);
}
