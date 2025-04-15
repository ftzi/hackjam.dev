import EventDetail from "@/components/events/event-detail"
import EventDetailSkeleton from "@/components/events/event-detail-skeleton"
import { HackathonHeader } from "@/components/hackathon-header"
import { notFound } from "next/navigation"
import { Suspense } from "react"

// This would normally come from a database
const getEventById = (id: string) => {
  const events = [
    {
      id: "1",
      title: "Web3 Innovation Hackathon",
      description:
        "Build the future of decentralized applications with our Web3 Innovation Hackathon. Join developers, designers, and entrepreneurs from around the world to create groundbreaking blockchain-based solutions. This three-day event features workshops, mentorship sessions, and exciting prizes for the most innovative projects.",
      startDate: "2025-05-15",
      endDate: "2025-05-17",
      status: "upcoming",
      teamLimit: 5,
      participantsPerTeam: 4,
      registeredTeams: 12,
      location: "San Francisco Tech Hub",
      eventType: "in-person",
      maxParticipants: 100,
      registrationDeadline: "2025-05-01",
      creatorId: "user-123", // This would be used to check if current user is creator
      prizes: [
        { place: "1st", description: "$10,000 and mentorship opportunities" },
        { place: "2nd", description: "$5,000 and AWS credits" },
        { place: "3rd", description: "$2,500 and GitHub sponsorship" },
      ],
      schedule: [
        { day: "Day 1", description: "Opening ceremony, team formation, and initial workshops" },
        { day: "Day 2", description: "Full day of hacking with mentor sessions" },
        { day: "Day 3", description: "Final submissions, presentations, and awards ceremony" },
      ],
    },
    {
      id: "2",
      title: "AI & Machine Learning Challenge",
      description:
        "Solve real-world problems with artificial intelligence and machine learning in this exciting hackathon. Participants will work on challenges provided by industry partners, with access to cutting-edge AI tools and datasets.",
      startDate: "2025-06-10",
      endDate: "2025-06-12",
      status: "draft",
      teamLimit: 10,
      participantsPerTeam: 3,
      registeredTeams: 0,
      location: "Online",
      eventType: "virtual",
      maxParticipants: 150,
      registrationDeadline: "2025-06-01",
      creatorId: "user-456",
      prizes: [
        { place: "1st", description: "$8,000 and Google Cloud credits" },
        { place: "2nd", description: "$4,000 and NVIDIA GPUs" },
        { place: "3rd", description: "$2,000 and Hugging Face Pro subscriptions" },
      ],
      schedule: [
        { day: "Day 1", description: "Kickoff, challenge presentations, and team formation" },
        { day: "Day 2", description: "Development and mentorship sessions" },
        { day: "Day 3", description: "Final submissions and judging" },
      ],
    },
    {
      id: "3",
      title: "Mobile App Development Jam",
      description:
        "Create innovative mobile applications in 48 hours during our Mobile App Development Jam. This hackathon focuses on creating user-friendly, impactful mobile solutions for everyday problems.",
      startDate: "2025-04-01",
      endDate: "2025-04-03",
      status: "completed",
      teamLimit: 15,
      participantsPerTeam: 4,
      registeredTeams: 15,
      location: "New York Tech Campus",
      eventType: "hybrid",
      maxParticipants: 200,
      registrationDeadline: "2025-03-15",
      creatorId: "user-789",
      prizes: [
        { place: "1st", description: "$7,500 and App Store/Play Store feature" },
        { place: "2nd", description: "$3,500 and marketing package" },
        { place: "3rd", description: "$1,500 and developer licenses" },
      ],
      schedule: [
        { day: "Day 1", description: "Registration, keynote speakers, and ideation" },
        { day: "Day 2", description: "Development sprint with technical workshops" },
        { day: "Day 3", description: "Final touches, demos, and awards" },
      ],
    },
  ]

  return events.find((event) => event.id === id)
}

export default function EventPage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <HackathonHeader />
      <main className="flex-1">
        <div className="container py-6 md:py-12">
          <Suspense fallback={<EventDetailSkeleton />}>
            <EventDetail event={event} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
