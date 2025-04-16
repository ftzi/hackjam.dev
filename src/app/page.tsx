"use client";
import { CreateEventButton } from "@/components/events/create-event-button";
import EventsList from "@/components/events/events-list";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex min-h-screen flex-col">
      <section className="flex-1 container mx-auto">
        <div className="py-6 md:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Hackathon Events
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your hackathon events and configurations
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4 mt-4 md:mt-0">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                />
              </div>
              <CreateEventButton />
            </div>
          </div>
          <EventsList
            searchQuery={searchQuery}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
}
