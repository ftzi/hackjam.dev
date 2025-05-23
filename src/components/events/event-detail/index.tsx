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
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mainPage } from "@/lib/consts";
import { cn } from "@/lib/utils";
import type { User } from "@/server/auth";
import type { Event } from "@/server/db/schema/event";
import type { Team } from "@/server/db/schema/team";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  Edit,
  Share2,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import {
  deleteEvent,
  deregisterOwnTeamFromEvent,
  registerOwnTeamToEvent,
} from "../utils";

export default function EventDetail({
  event,
  user,
  userIsLeaderAndRegistered,
  teams,
  teamsCount,
  userTeam,
}: {
  event: Event;
  user?: User;
  userIsLeaderAndRegistered?: boolean;
  teams: Team[] | undefined;
  teamsCount: number;
  userTeam: Team | undefined;
}) {
  const router = useRouter();
  const isCreator = event.createdBy === user?.id;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(false);
    void event;
  }, [event]);

  const formatDate = (date: Date) => {
    return format(date, "PPP");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <Link
            href={mainPage}
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
              {event.description.split("\\n").map((paragraph, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <p key={paragraph + index} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}

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
            {isCreator ? (
              <TabsList className={"grid w-full grid-cols-2"}>
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>
            ) : (
              <h2 className="mx-auto font-semibold text-xl">Rules</h2>
            )}

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
                        {team.submissionUrl && (
                          <Link href={team.submissionUrl} className="underline">
                            {team.submissionUrl ? `${team.submissionUrl}` : ""}
                          </Link>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            )}
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
                  <Button className="w-full" variant="default" asChild>
                    <Link href={`/events/${event.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Event
                    </Link>
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
                            if (!user) {
                              router.push(
                                `/login?redirect=/events/${event.id}`,
                              );
                              return;
                            }
                            await deleteEvent({ event });
                            toast.success("Event deleted successfully!");
                            router.push(mainPage);
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
                    onClick={async () => {
                      if (!user) {
                        router.push(`/signup?redirect=/events/${event.id}`);
                        return;
                      }
                      setLoading(true);
                      try {
                        if (userIsLeaderAndRegistered)
                          await deregisterOwnTeamFromEvent({ event });
                        else await registerOwnTeamToEvent({ event });
                      } catch {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : userIsLeaderAndRegistered
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

                  {userIsLeaderAndRegistered && (
                    <Link
                      href={`/events/${event.id}/submit`}
                      className={cn(
                        "w-full",
                        buttonVariants({ variant: "default" }),
                        userTeam?.submissionUrl &&
                          "pointer-events-none opacity-50",
                      )}
                    >
                      {userTeam?.submissionUrl && <Check />}
                      Submit Project
                    </Link>
                  )}
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
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${(teamsCount / event.maxTeams) * 100}%`,
                    }}
                  />
                </div>

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
