"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { User } from "@/server/auth";
import type { Event } from "@/server/db/schema/event";
import type { Team } from "@/server/db/schema/team";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Edit,
  Share2,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  deleteEvent,
  deregisterOwnTeamFromEvent,
  registerOwnTeamToEvent,
} from "../utils";

// type Prize = {
//   place: string;
//   description: string;
// };

// type ScheduleItem = {
//   day: string;
//   description: string;
// };

// type Event = {
//   id: string;
//   title: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   status: string;
//   teamLimit: number;
//   participantsPerTeam: number;
//   registeredTeams: number;
//   location: string;
//   eventType: string;
//   maxParticipants: number;
//   registrationDeadline: string;
//   creatorId: string;
//   prizes: Prize[];
//   schedule: ScheduleItem[];
// };

export default function EventDetail({
  event,
  user,
  userIsLeaderAndRegistered,
  teams,
  teamsCount,
}: {
  event: Event;
  user?: User;
  userIsLeaderAndRegistered?: boolean;
  teams: Team[] | undefined;
  teamsCount: number;
}) {
  const router = useRouter();
  const isCreator = event.createdBy === user?.id;

  const formatDate = (date: Date) => {
    return format(date, "PPP");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{event.name}</h1>
            {/* {getStatusBadge(event.status)} */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{event.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Event Dates</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event.startDate)} -{" "}
                      {formatDate(event.endDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Registration Deadline</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(
                        event.registrationDeadline ?? event.startDate,
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Teams</p>
                    <p className="text-sm text-muted-foreground">
                      {teamsCount}/{event.maxTeams} teams registered
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="rules" className="w-full">
            <TabsList className={`grid w-full grid-cols-${isCreator ? 3 : 2}`}>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              {isCreator && <TabsTrigger value="teams">Teams</TabsTrigger>}
            </TabsList>

            <TabsContent value="rules" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Event Rules</CardTitle>
                  <CardDescription>
                    Important guidelines and requirements for participation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Team Composition</h3>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        <li>
                          Maximum {event.maxTeamMembers} participants per team
                        </li>
                        <li>Only the team leader registers</li>
                        <li>
                          The other members must be listed when submitting
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Event Capacity</h3>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        <li>Maximum {event.maxTeams} teams</li>

                        <li>
                          Registration closes on{" "}
                          {formatDate(
                            event.registrationDeadline ?? event.startDate,
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Event Schedule</CardTitle>
                  <CardDescription>
                    Detailed timeline of activities during the hackathon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* {event.schedule.map((item, index) => (
                      <div
                        key={JSON.stringify({ item, index })}
                        className="flex"
                      >
                        <div className="mr-4 flex flex-col items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          {index < event.schedule.length - 1 && (
                            <div className="h-full w-px bg-border" />
                          )}
                        </div>
                        <div className="space-y-1 pb-8">
                          <h3 className="text-lg font-medium">{item.day}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))} */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {teams && (
              <TabsContent value="teams" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Registered Teams</CardTitle>
                    <CardDescription>
                      List of teams registered for the event
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {teams.map((team, index) => (
                      <div
                        key={JSON.stringify({ team, index })}
                        className="flex items-center justify-between py-2 border-b border-border"
                      >
                        <span>{team.name}</span>
                        <Button variant="outline">View Team</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* <TabsContent value="prizes" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prizes & Awards</CardTitle>
                  <CardDescription>
                    Rewards for the winning teams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    {event.prizes.map((prize, index) => (
                      <Card
                        key={JSON.stringify({ prize, index })}
                        className="overflow-hidden border-0 bg-muted"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">
                              {prize.place} Place
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{prize.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              {isCreator ? (
                <div className="space-y-4">
                  <Button className="w-full" variant="default">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Event
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full" variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Event
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the event and remove all associated data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground"
                          onClick={async () => {
                            await deleteEvent({ event });
                            toast.success("Event deleted successfully!");
                            router.push("/");
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button
                    className="w-full"
                    variant={
                      userIsLeaderAndRegistered ? "destructive" : "default"
                    }
                    onClick={() => {
                      if (userIsLeaderAndRegistered)
                        deregisterOwnTeamFromEvent({ event });
                      else registerOwnTeamToEvent({ event });
                    }}
                  >
                    {userIsLeaderAndRegistered
                      ? "Deregister Team"
                      : "Register Team"}
                  </Button>

                  {/* {event.status === "upcoming" && (
                    <Button className="w-full" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Join a Team
                    </Button>
                  )} */}

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/events/${event.id}`,
                      );
                      toast.success("Event link copied to clipboard!");
                    }}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Copy Event Link
                  </Button>

                  {/* <Button className="w-full" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Add to Calendar
                  </Button> */}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Teams Registered
                  </span>
                  <span className="font-medium">
                    {teamsCount}/{event.maxTeams}
                  </span>
                </div>
                {/* <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${(registeredTeams / event.maxTeams) * 100}%`,
                    }}
                  />
                </div> */}

                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    Registration closes in:
                  </p>
                  <p className="font-medium">
                    {formatDate(event.registrationDeadline ?? event.startDate)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
