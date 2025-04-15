import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Users } from "lucide-react"

// Mock data for demonstration
const events = [
  {
    id: "1",
    title: "Web3 Innovation Hackathon",
    description: "Build the future of decentralized applications",
    startDate: "2025-05-15",
    endDate: "2025-05-17",
    status: "upcoming",
    teamLimit: 5,
    participantsPerTeam: 4,
    registeredTeams: 12,
  },
  {
    id: "2",
    title: "AI & Machine Learning Challenge",
    description: "Solve real-world problems with artificial intelligence",
    startDate: "2025-06-10",
    endDate: "2025-06-12",
    status: "draft",
    teamLimit: 10,
    participantsPerTeam: 3,
    registeredTeams: 0,
  },
  {
    id: "3",
    title: "Mobile App Development Jam",
    description: "Create innovative mobile applications in 48 hours",
    startDate: "2025-04-01",
    endDate: "2025-04-03",
    status: "completed",
    teamLimit: 15,
    participantsPerTeam: 4,
    registeredTeams: 15,
  },
]

export default function EventsList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{event.title}</CardTitle>
              <StatusBadge status={event.status} />
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
                <span>
                  Teams: {event.registeredTeams}/{event.teamLimit} (max {event.participantsPerTeam} per team)
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-3">
            <Button variant="outline" size="sm">
              Edit
            </Button>
            <Button variant="default" size="sm">
              Manage
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "upcoming":
      return <Badge className="bg-green-500 hover:bg-green-600">Upcoming</Badge>
    case "draft":
      return <Badge variant="outline">Draft</Badge>
    case "completed":
      return <Badge variant="secondary">Completed</Badge>
    default:
      return null
  }
}
