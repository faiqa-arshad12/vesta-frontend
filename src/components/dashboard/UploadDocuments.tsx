"use client";

import {useRef, useState} from "react";
import {Upload} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Icon} from "@iconify/react";

interface UploadDocumentsProps {
  onFileSelect?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

export function UploadDocuments({
  onFileSelect,
  accept,
  multiple = true,
  className,
}: UploadDocumentsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setIsUploading(true);
      onFileSelect?.(fileArray);
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
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 transition-colors",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-input-border bg-white",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
        {/* Upload Icon - Two overlapping documents */}
        <div className="flex-shrink-0">
          <Icon
            icon="hugeicons:files-01"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
          />
        </div>

        {/* Title and Description */}
        <div className="flex-1 min-w-0 w-full sm:w-auto">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 sm:mb-2">
            {isUploading ? "Uploading..." : "Upload Documents"}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            {isUploading
              ? "Please wait while we process your files."
              : "Drag your file(s) to start uploading."}
          </p>
        </div>

        {/* Choose File Button */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            className="hidden"
          />
          <Button
            type="button"
            onClick={handleButtonClick}
            className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2 text-sm sm:text-base h-9 sm:h-10 md:h-11"
          >
            <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Choose File</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
