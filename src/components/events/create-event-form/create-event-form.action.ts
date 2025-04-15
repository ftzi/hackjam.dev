"use server";

import { getUser } from "@/server/auth";
import { db } from "@/server/db/db";
import { events } from "@/server/db/schema/event";
import { revalidatePath } from "next/cache";
import type { FormValues } from "./create-event-form.schema";

export async function createEventAction(values: FormValues) {
  const user = await getUser();

  // TODO: Validate if the user is an admin or has permission to create events
  if (!user) {
    throw new Error("You must be signed in to create an event");
  }

  const newEvent = await db
    .insert(events)
    .values({
      name: values.name,
      description: values.description,
      maxTeams: values.maxTeams,
      maxTeamMembers: values.maxTeamMembers,
      startDate: values.startDate,
      endDate: values.endDate,
      registrationDeadline: values.registrationDeadline,
      createdBy: user.id,
    })
    .returning();

  revalidatePath("/events");

  return { success: true, event: newEvent[0] };
}
