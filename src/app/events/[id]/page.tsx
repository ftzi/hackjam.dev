import EventDetail from "@/components/events/event-detail";
import EventDetailSkeleton from "@/components/events/event-detail/skeleton";
import { getUser } from "@/server/auth";
import { db } from "@/server/db/db";
import { events } from "@/server/db/schema/event";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function EventPage({
  params,
}: { params: { id: string } }) {
  const event = await db.query.events.findFirst({
    where: eq(events.id, params.id),
  });

  if (!event) notFound();

  const user = await getUser()

  return (
    <div className="flex min-h-screen flex-col items-center">
      <main className="flex-1">
        <div className="container py-6 md:py-12">
          <Suspense fallback={<EventDetailSkeleton />}>
            <EventDetail event={event} user={user}/>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
