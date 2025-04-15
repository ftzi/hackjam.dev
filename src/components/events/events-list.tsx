import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/server/db/db";
import { CalendarDays, Users } from "lucide-react";
import Link from "next/link";

export default async function EventsList() {
  const events = await db.query.events.findMany({
    orderBy: (events, { asc }) => [asc(events.startDate)],
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => {
        const registeredTeams = "TODO";
        return (
          <Link
            href={`/events/${event.id}`}
            key={event.id}
            className="block transition-all duration-200"
          >
            <Card className="overflow-hidden py-8 px-2 h-full cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-accent/5 hover:scale-[1.02] border-2 border-transparent hover:border-accent/20">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{event.name}</CardTitle>
                  {/* <StatusBadge status={event.status} /> */}
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
                    <span>
                      Teams: {registeredTeams}/{event.maxTeams} (max{" "}
                      {event.maxTeamMembers} per team)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "upcoming":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">Upcoming</Badge>
      );
    case "draft":
      return <Badge variant="outline">Draft</Badge>;
    case "completed":
      return <Badge variant="secondary">Completed</Badge>;
    default:
      return null;
  }
}
