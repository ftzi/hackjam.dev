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
import { getUser } from "@/server/auth";
import { db } from "@/server/db/db";
import { events } from "@/server/db/schema/event";
import { CalendarDays, Users } from "lucide-react";

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

export default async function EventsList() {
  const user = await getUser();
  const eventsList = await db.select().from(events);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {eventsList.map((event) => (
        <Card key={event.id} className="overflow-hidden">
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
      ))}
    </div>
  );
}
