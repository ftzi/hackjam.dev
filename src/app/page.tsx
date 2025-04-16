import { CreateEventButton } from "@/components/events/create-event-button";
import EventsList from "@/components/events/events-list";
import EventsListSkeleton from "@/components/events/events-list-skeleton";
import SearchInput from "@/components/search-input";
import { Suspense } from "react";

interface HomePageProps {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default function Home({ searchParams }: HomePageProps) {
  const query = searchParams.query || "";
  const currentPage = Number(searchParams.page) || 1;

  return (
    <div className="flex min-h-screen flex-col">
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
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4 mt-4 md:mt-0">
              <div className="relative w-full sm:w-64">
                <SearchInput defaultValue={query} />
              </div>
              <CreateEventButton />
            </div>
          </div>
          <Suspense fallback={<EventsListSkeleton />}>
            <EventsList
              searchQuery={query}
              currentPage={currentPage}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
