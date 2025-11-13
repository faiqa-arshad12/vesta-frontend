"use client";

import {useState} from "react";
import {Trash2, Eye, ArrowDown} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {DeleteConfirmationModal} from "@/components/common/DeleteConfirmationModal";
import {EmptyTableState} from "@/components/common/EmptyTableState";
import {cn} from "@/lib/utils";
import {Icon} from "@iconify/react";

export type FileStatus = "Inprogress" | "Completed";

export interface FileItem {
  id: string;
  fileName: string;
  status: FileStatus;
}

interface FileTableProps {
  files: FileItem[];
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onSelect?: (selectedIds: string[]) => void;
  onUpload?: () => void;
  className?: string;
}

export function FileTable({
  files,
  onDelete,
  onView,
  onSelect,
  onUpload,
  className,
}: FileTableProps) {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<{
    id: string;
    fileName: string;
  } | null>(null);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      const allIds = new Set(files.map((file) => file.id));
      setSelectedFiles(allIds);
      onSelect?.(Array.from(allIds));
    } else {
      setSelectedFiles(new Set());
      onSelect?.([]);
    }
  };

  const handleSelectFile = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedFiles);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
      setSelectAll(false);
    }
    setSelectedFiles(newSelected);
    onSelect?.(Array.from(newSelected));
  };

  const handleDeleteClick = (file: FileItem) => {
    setFileToDelete({id: file.id, fileName: file.fileName});
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (fileToDelete) {
      onDelete?.(fileToDelete.id);
      setFileToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setDeleteModalOpen(false);
    setFileToDelete(null);
  };

  if (files.length === 0) {
    return (
      <>
        <EmptyTableState onUpload={onUpload} className={className} />
        <DeleteConfirmationModal
          open={deleteModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      </>
    );
  }

  return (
    <>
      <div className={cn("w-full", className)}>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-input-border">
              <TableHead className="p-0 w-0">
                <div className="p-4 pr-2">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </div>
              </TableHead>
              <TableHead className="font-medium text-foreground p-0">
                <div className="p-4 pl-2">File Name</div>
              </TableHead>
              <TableHead className="font-medium text-foreground p-0 text-center">
                <div className="p-4 flex items-center justify-center gap-1">
                  Status
                  <ArrowDown className="w-4 h-4 text-[#A4A7AE] flex-shrink-0" />
                </div>
              </TableHead>
              <TableHead className="p-0 text-right">
                <div className="p-4"></div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id} className="border-b border-input-border">
                <TableCell className="p-0 w-0">
                  <div className="p-4 pr-2">
                    <Checkbox
                      checked={selectedFiles.has(file.id)}
                      onCheckedChange={(checked) =>
                        handleSelectFile(file.id, checked as boolean)
                      }
                      aria-label={`Select ${file.fileName}`}
                    />
                  </div>
                </TableCell>
                <TableCell className="p-0">
                  <div className="p-4 pl-2">
                    <div className="flex items-center gap-3">
                      <Icon
                        icon="material-icon-theme:pdf"
                        className="w-10 h-10 flex-shrink-0"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {file.fileName}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-0 text-center">
                  <div className="p-4">
                    <div className="flex justify-center">
                      <StatusBadge status={file.status} />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-0">
                  <div className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(file)}
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                        aria-label={`Delete ${file.fileName}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          file.status === "Completed" && onView?.(file.id)
                        }
                        disabled={file.status === "Inprogress"}
                        className={cn(
                          "h-8 w-8 cursor-pointer",
                          file.status === "Inprogress"
                            ? "text-muted-foreground opacity-50 cursor-not-allowed"
                            : "text-primary hover:text-primary/80 hover:bg-primary/10"
                        )}
                        aria-label={`View ${file.fileName}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

function StatusBadge({status}: {status: FileStatus}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium",
        status === "Inprogress"
          ? "bg-progress-orange text-orange-muted"
          : "bg-success-green text-primary"
      )}
    >
      <div
        className={cn(
          " rounded-full p-1",
          status === "Inprogress" ? "bg-orange-muted" : "bg-primary"
        )}
      />
      <span>{status}</span>
    </div>
  );
}
