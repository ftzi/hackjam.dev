import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserAction } from "@/server/auth.action";
import { CalendarDays, Users } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { getEventList } from "./event-list.action";
import { PaginationButton } from "./pagination-button";

interface EventsListProps {
  searchQuery: string;
  currentPage: number;
}

export default async function EventsList({
  searchQuery,
  currentPage,
}: EventsListProps) {
  const ITEMS_PER_PAGE = 6;

  const { events, totalEvents } = await getEventList({
    searchQuery,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const user = await getUserAction();
  const totalPages = Math.ceil(totalEvents / ITEMS_PER_PAGE);

  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push({ type: "page", page: i });
      }
    } else {
      items.push({ type: "page", page: 1 });

      if (currentPage > 3) {
        items.push({ type: "ellipsis" });
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push({ type: "page", page: i });
      }

      if (currentPage < totalPages - 2) {
        items.push({ type: "ellipsis" });
      }

      if (totalPages > 1) {
        items.push({ type: "page", page: totalPages });
      }
    }

    return items;
  };

  const paginationItems = generatePaginationItems();

  return (
    <section className="space-y-6">
      {events.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your search or create a new event
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className="block transition-all duration-200"
              >
                <Card className="overflow-hidden py-8 px-2 h-full cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-accent/5 hover:scale-[1.02] border-2 border-transparent hover:border-accent/20">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{event.name}</CardTitle>
                      <EventStatusBadge
                        startDate={event.startDate}
                        endDate={event.endDate}
                      />
                    </div>
                    <CardDescription className="line-clamp-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                        <span>
                          {new Date(event.startDate).toLocaleDateString()} -{" "}
                          {new Date(event.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 opacity-70" />
                        {/* <span>
                          Teams: {event.registeredTeams}/{event.teamLimit} (max {event.participantsPerTeam} per team)
                        </span> */}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-3">
                    {user?.id === event.createdBy ? (
                      <Button variant="default" size="sm">
                        Manage
                      </Button>
                    ) : (
                      <Button variant="default" size="sm">
                        Subscribe
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationButton
                    direction="previous"
                    disabled={currentPage === 1}
                    currentPage={currentPage}
                    searchQuery={searchQuery}
                  />
                </PaginationItem>

                {paginationItems.map((item) => (
                  <PaginationItem key={item.page + item.type}>
                    {item.type === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href={`?page=${item.page}${searchQuery ? `&query=${searchQuery}` : ''}`}
                        isActive={item.page === currentPage}
                      >
                        {item.page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationButton
                    direction="next"
                    disabled={currentPage >= totalPages}
                    currentPage={currentPage}
                    searchQuery={searchQuery}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </section>
  );
}

function EventStatusBadge({
  startDate,
  endDate,
}: { startDate: Date | string; endDate: Date | string }) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  let status: string;

  if (now < start) {
    status = "upcoming";
  } else if (now <= end) {
    status = "in progress";
  } else {
    status = "completed";
  }

  switch (status) {
    case "upcoming":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">Upcoming</Badge>
      );
    case "in progress":
      return (
        <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
      );
    case "completed":
      return <Badge variant="secondary">Completed</Badge>;
    default:
      return null;
  }
}
