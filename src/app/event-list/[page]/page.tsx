import { CreateEventButton } from "@/components/events/create-event-button";
import EventList from "@/components/events/event-list";
import { getEventList } from "@/components/events/event-list.action";
import SearchInput from "@/components/search-input";
import { db } from "@/server/db/db";
import { events } from "@/server/db/schema/event";
import { redirect } from "next/navigation";

type Params = Promise<{ page: string }>;
type SearchParams = Promise<{ query?: string }>


interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

const ITEMS_PER_PAGE = 6;

export default async function PaginatedEventsPage({ params, searchParams }: PageProps) {
  const { page } = await params;

  const { query } = await searchParams;

  const pageNumber = Number(page);
  const searchQuery = query || "";
  const currentPage = pageNumber;

  const { events, totalPages } = await getEventList({
    searchQuery: searchQuery,
    limit: ITEMS_PER_PAGE,
    page: currentPage
  });

  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    redirect("/event-list/1");
  }

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
                <SearchInput defaultValue={searchQuery} />
              </div>
              <CreateEventButton />
            </div>
          </div>
          <EventList
            events={events}
            currentPage={currentPage}
            searchQuery={searchQuery}
            totalPages={totalPages}
          />
        </div>
      </section>
    </div>
  );
}

/**
 * Generate static parameters for all possible pagination pages at build time
 * This enables static rendering for these routes and improves performance
 */
export async function generateStaticParams() {
  const allEvents = await db.select().from(events);

  const totalPages = Math.ceil(allEvents.length / ITEMS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, index) => ({
    page: String(index + 1),
  })
  );

}

