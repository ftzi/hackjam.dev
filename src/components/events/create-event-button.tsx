"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const CreateEventButton = () => {
  return (
    <Button className="mt-4 md:mt-0" asChild>
      <Link href="/create-event">
        <Plus className="mr-2 h-4 w-4" />
        Create Event
      </Link>
    </Button>
  );
};
