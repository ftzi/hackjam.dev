"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/use-debounce";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchInputProps {
  defaultValue: string;
}

export default function SearchInput({ defaultValue }: SearchInputProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedSearchQuery !== defaultValue) {
      const queryString = debouncedSearchQuery
        ? `?query=${encodeURIComponent(debouncedSearchQuery)}`
        : "";
      router.push(`/events-list/1${queryString}`);
    }
  }, [debouncedSearchQuery, router, defaultValue]);

  return (
    <>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search events..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </>
  );
}
