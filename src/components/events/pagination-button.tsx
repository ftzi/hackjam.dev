"use client";

import { useRouter } from "next/navigation";
import { PaginationNext, PaginationPrevious } from "../ui/pagination";

interface PaginationButtonProps {
  direction: "previous" | "next";
  disabled: boolean;
  currentPage: number;
  searchQuery?: string;
}

export function PaginationButton({
  direction,
  disabled,
  currentPage,
  searchQuery,
}: PaginationButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (disabled) return;

    const nextPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    const params = new URLSearchParams();

    if (nextPage > 1) {
      params.set("page", nextPage.toString());
    }

    if (searchQuery) {
      params.set("query", searchQuery);
    }

    const queryString = params.toString();
    router.push(`?${queryString}`);
  };

  return direction === "next" ? (
    <PaginationNext onClick={handleClick} disabled={disabled} />
  ) : (
    <PaginationPrevious onClick={handleClick} disabled={disabled} />
  );
}