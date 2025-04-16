"use server";

import { type User, getUser } from "@/server/auth";
import { db } from "@/server/db/db";
import type { Event } from "@/server/db/schema/event";
import { teams } from "@/server/db/schema/team";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const revalidateEvent = async (event: Event) => {
  revalidatePath(`/events/${event.id}`);
  revalidatePath("/");
};

export const isTeamLeaderRegisteredToEvent = async ({
  user,
  event,
}: { user: User | undefined; event: Event | undefined }): Promise<boolean> => {
  if (!user || !event) return false;

  const isTeamLeaderRegistered = await db.query.teams.findFirst({
    where: (teams, { and, eq }) =>
      and(eq(teams.leaderId, user.id), eq(teams.eventId, event.id)),
  });

  return !!isTeamLeaderRegistered;
};

export const registerOwnTeamToEvent = async ({
  event,
}: {
  event: Event;
}) => {
  const user = await getUser();
  if (!user) redirect("/signup");

  const isTeamLeaderRegistered = await db.query.teams.findFirst({
    where: (teams, { and, eq }) =>
      and(eq(teams.leaderId, user.id), eq(teams.eventId, event.id)),
  });

  if (!isTeamLeaderRegistered)
    await db.insert(teams).values({
      name: `${user.name}'s Team`,
      leaderId: user.id,
      eventId: event.id,
    });

  revalidateEvent(event);
};

export const deregisterOwnTeamFromEvent = async ({
  event,
}: {
  event: Event;
}) => {
  const user = await getUser();
  if (!user) redirect("/signup");

  await db.delete(teams).where(eq(teams.leaderId, user.id));

  revalidateEvent(event);
};
