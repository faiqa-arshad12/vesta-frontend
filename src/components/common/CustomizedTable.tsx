"use client";

import {useState, useMemo} from "react";
import {FileTable} from "./TableComponent";
import type {FileItem} from "./TableComponent";
import {TablePagination} from "./TablePagination";

export type {FileItem};

interface FileTableWithPaginationProps {
  files: FileItem[];
  itemsPerPage?: number;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onSelect?: (selectedIds: string[]) => void;
  className?: string;
}

export function FileTableWithPagination({
  files,
  itemsPerPage = 10,
  onDelete,
  onView,
  onSelect,
  className,
}: FileTableWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(files.length / itemsPerPage);

  const paginatedFiles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return files.slice(startIndex, endIndex);
  }, [files, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to page 1 if current page is out of bounds
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  return (
    <div className={className}>
      <FileTable
        files={paginatedFiles}
        onDelete={onDelete}
        onView={onView}
        onSelect={onSelect}
      />
      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
