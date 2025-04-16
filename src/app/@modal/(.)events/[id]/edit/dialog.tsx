"use client";

import { EventForm } from "@/components/events/event-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Event } from "@/server/db/schema/event";
import { useRouter } from "next/navigation";

export const EventEditDialog = ({ event }: { event: Event }) => {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="!max-w-fit"
      >
        <DialogTitle>Edit Hackathon Event</DialogTitle>
        <DialogDescription>
          Fill in the details below to edit the hackathon event. Click save when
          you're done.
        </DialogDescription>
        <EventForm
          onSuccess={() => router.push(`/events/${event.id}`)}
          editingId={event.id}
          data={event}
        />
      </DialogContent>
    </Dialog>
  );
};
