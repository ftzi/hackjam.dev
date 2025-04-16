"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { User } from "@/server/auth"
import { getUserAction } from "@/server/auth.action"
import type { Event } from "@/server/db/schema/event"
import { CalendarDays, Users } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { getEventList } from "./event-list.action"

interface EventsListProps {
  searchQuery: string
  currentPage: number
  onPageChange: (page: number) => void
}


export default function EventsList({ searchQuery, currentPage, onPageChange }: EventsListProps) {
  const ITEMS_PER_PAGE = 6

  const [eventsList, setEventList] = useState<Event[]>()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    async function fetchEvents() {
      const events = await getEventList()
      setEventList(events)
    }

    fetchEvents()

    async function fetchUser() {
      const user = await getUserAction()
      setUser(user)
    }
    fetchUser()


  }, [])

  const filteredEvents = useMemo(() => {
    if (!searchQuery) return eventsList

    const query = searchQuery.toLowerCase()
    return eventsList?.filter(
      (event) => event.name.toLowerCase().includes(query) || event.description.toLowerCase().includes(query),
    )
  }, [searchQuery, eventsList])

  const totalPages = Math.ceil(((filteredEvents?.length || 0)) / ITEMS_PER_PAGE)
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredEvents?.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredEvents, currentPage])

  const pageNumbers = useMemo(() => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show a subset of pages with ellipsis
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push(-1) // Represents ellipsis
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1)
        pages.push(-1)
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Somewhere in the middle
        pages.push(1)
        pages.push(-1)
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push(-1)
        pages.push(totalPages)
      }
    }

    return pages
  }, [currentPage, totalPages])

  return (
    <section className="space-y-6">
      {((filteredEvents?.length || 0)) === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or create a new event</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedEvents?.map((event) => (<Card key={event.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{event.name}</CardTitle>
                  <EventStatusBadge startDate={event.startDate} endDate={event.endDate} />
                </div>
                <CardDescription className="line-clamp-2">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                    <span>
                      {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
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
                {user?.id === event.createdBy ?
                  (
                    <Button variant="default" size="sm">
                      Manage
                    </Button>
                  ) :
                  (
                    <Button variant="default" size="sm">
                      Subscribe
                    </Button>
                  )
                }
              </CardFooter>
            </Card>))}
          </div>
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) onPageChange(currentPage - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {pageNumbers.map((pageNumber, index) => (
                  <PaginationItem key={pageNumber}>
                    {pageNumber === -1 ? (
                      <span className="flex h-9 w-9 items-center justify-center text-sm">...</span>
                    ) : (
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          onPageChange(pageNumber)
                        }}
                        isActive={pageNumber === currentPage}
                      >
                        {pageNumber}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) onPageChange(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
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


function EventStatusBadge({ startDate, endDate }: { startDate: Date | string, endDate: Date | string }) {
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
      return <Badge className="bg-green-500 hover:bg-green-600">Upcoming</Badge>;
    case "in progress":
      return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>;
    case "completed":
      return <Badge variant="secondary">Completed</Badge>;
    default:
      return null;
  }
}
