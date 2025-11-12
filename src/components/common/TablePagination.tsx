"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: TablePaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Show first few pages
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages - 1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages
        pages.push(2);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around current
        pages.push(2);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages - 1);
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div
      className={cn("flex items-center justify-between gap-2 mt-4", className)}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 border border-gray-border"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-muted-foreground"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          return (
            <p
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={cn(
                "h-8 min-w-8 px-3 cursor-pointer",
                currentPage === pageNumber
                  ? " text-gray-foreground hover:bg-gray-100"
                  : "text-muted hover:bg-gray-100"
              )}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </p>
          );
        })}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 border border-gray-border"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
