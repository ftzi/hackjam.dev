"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useState } from "react"
import { CreateEventForm } from "./create-event-form"

export default function CreateEventButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Hackathon Event</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new hackathon event. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <CreateEventForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
