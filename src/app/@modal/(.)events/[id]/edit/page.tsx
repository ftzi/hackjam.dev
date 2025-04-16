import { db } from "@/server/db/db";
import { events } from "@/server/db/schema/event";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { EventEditDialog } from "./dialog";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const event = await db.query.events.findFirst({
    where: eq(events.id, (await params).id),
  });

  if (!event) redirect(mainPage);

  return <EventEditDialog event={event} />;
}
