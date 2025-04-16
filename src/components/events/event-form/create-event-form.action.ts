"use server";

import { mainPage } from "@/lib/consts";
import { getUser } from "@/server/auth";
import { db } from "@/server/db/db";
import { events } from "@/server/db/schema/event";
import { revalidatePath } from "next/cache";
import type { EventFormValues } from "./create-event-form.schema";

export async function createEventAction(values: EventFormValues) {
  const user = await getUser();

  if (!user) {
    throw new Error("You must be signed in to create an event");
  }

  await db
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

  revalidatePath(mainPage);
}
