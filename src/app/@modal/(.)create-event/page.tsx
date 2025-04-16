"use client";

import { EventForm } from "@/components/events/event-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { mainPage } from "@/lib/consts";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.push(mainPage);
      }}
    >
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="!max-w-fit"
      >
        <DialogTitle>Create New Hackathon Event</DialogTitle>
        <DialogDescription>
          Fill in the details below to create a new hackathon event. Click save
          when you're done.
        </DialogDescription>
        <EventForm onSuccess={() => router.push(mainPage)} />
      </DialogContent>
    </Dialog>
  );
}
