import { CreateEventButton } from "@/components/events/create-event-button";
import EventsList from "@/components/events/events-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <EventsTable /> */}
      <section className="flex-1 container mx-auto">
        <div className="py-6 md:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Hackathon Events
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your hackathon events and configurations
              </p>
            </div>
            <CreateEventButton />
          </div>
          <Suspense fallback={"...loading"}>
            <EventsList />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
