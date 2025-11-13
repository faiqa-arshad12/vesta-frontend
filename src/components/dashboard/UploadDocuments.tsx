"use client";

import {useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Icon} from "@iconify/react";
import {toast} from "sonner";

interface UploadDocumentsProps {
  onFileSelect?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

export function UploadDocuments({
  onFileSelect,
  accept = ".pdf,application/pdf",
  multiple = true,
  className,
}: UploadDocumentsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const pdfFiles = fileArray.filter(
        (file) =>
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf")
      );

      const nonPdfFiles = fileArray.filter(
        (file) =>
          file.type !== "application/pdf" &&
          !file.name.toLowerCase().endsWith(".pdf")
      );

      if (nonPdfFiles.length > 0) {
        const fileNames = nonPdfFiles.map((file) => file.name).join(", ");
        toast.error(`Only PDF files are allowed. Please remove: ${fileNames}`, {
          duration: 5000,
        });
      }

      if (pdfFiles.length > 0) {
        setIsUploading(true);
        setIsUploaded(false);
        onFileSelect?.(pdfFiles);
        // Simulate upload completion after a brief delay
        setTimeout(() => {
          setIsUploading(false);
          setIsUploaded(true);
        }, 1000);
      } else if (nonPdfFiles.length > 0) {
        // Reset file input if only non-PDF files were selected
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleButtonClick = () => {
    // Reset upload state when selecting new files
    setIsUploaded(false);
    setIsUploading(false);
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 bg-primary text-primary",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-dashed-border bg-white",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
        <div className="flex-shrink-0 rounded-[12px] bg-[#F6F6F6] p-4">
          <Icon
            icon="hugeicons:files-01"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-black font-normal"
          />
        </div>

        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 sm:mb-2">
            {isUploading
              ? "Uploading..."
              : isUploaded
              ? "Files Uploaded"
              : "Upload Documents"}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            {isUploading
              ? "Please wait while we process your files."
              : isUploaded
              ? "Your files have been uploaded successfully."
              : "Drag your file(s) to start uploading."}
          </p>
        </div>

        {/* Choose File Button */}
        <div className="w-full sm:w-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            className="hidden"
          />
          <Button
            onClick={handleButtonClick}
            variant={"default"}
            className="w-full"
          >
            <Icon icon="hugeicons:upload-04" width="48" height="48" />
            <span>Choose File</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
