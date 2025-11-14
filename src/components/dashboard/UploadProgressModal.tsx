"use client";

import {useEffect, useState} from "react";
import {ArrowRight} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";

interface UploadFile {
  id: string;
  name: string;
  size: number;
  progress: number;
}

interface UploadProgressModalProps {
  open: boolean;
  files: File[];
  onClose: () => void;
  onCancel: () => void;
  onNext: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + sizes[i];
}

function CircularProgress({
  progress,
  size = 36,
}: {
  progress: number;
  size?: number;
}) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className="transform -rotate-90"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        className="text-gray-200"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-primary transition-all duration-300"
      />
    </svg>
  );
}

export function UploadProgressModal({
  open,
  files,
  onClose,
  onCancel,
  onNext,
}: UploadProgressModalProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(true);

  useEffect(() => {
    if (!open || files.length === 0) {
      setUploadFiles([]);
      setOverallProgress(0);
      setIsUploading(true);
      return;
    }

    const initialFiles: UploadFile[] = files.map((file, index) => ({
      id: `file-${index}-${Date.now()}`,
      name: file.name,
      size: file.size,
      progress: 0,
    }));

    setUploadFiles(initialFiles);
    setOverallProgress(0);
    setIsUploading(true);

    const intervalId = setInterval(() => {
      setUploadFiles((prev) => {
        const updated = prev.map((file) => {
          if (file.progress < 100) {
            const increment =
              file.progress >= 95
                ? 100 - file.progress
                : Math.random() * 17 + 8;
            return {
              ...file,
              progress: Math.min(
                100,
                Math.round((file.progress + increment) * 100) / 100
              ),
            };
          }
          return file;
        });

        const totalProgress =
          updated.reduce((sum, file) => sum + file.progress, 0) /
          updated.length;
        setOverallProgress(Math.round(totalProgress));

        const allComplete = updated.every((file) => file.progress >= 100);
        if (allComplete) {
          setIsUploading(false);
          setOverallProgress(100);
          clearInterval(intervalId);
        }

        return updated;
      });
    }, 300);

    return () => clearInterval(intervalId);
  }, [open, files]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-[95vw] max-w-lg sm:w-full rounded-xl mx-4 sm:mx-auto overflow-hidden"
        showCloseButton={false}
      >
        <DialogHeader className="px-0 sm:px-0">
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            {overallProgress > 0 ? "Uploading..." : "Preparing Upload..."}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-2 sm:py-4 overflow-hidden">
          {/* Overall Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Progress
                value={overallProgress}
                className="flex-1 h-2 bg-gray-200 min-w-0"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-500 min-w-[28px] sm:min-w-[32px] text-right flex-shrink-0">
                {overallProgress}%
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Only support .Doc, .csv and .pdf
            </p>
          </div>

          {/* File List */}
          <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto overflow-x-hidden">
            {uploadFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors min-w-0 w-full overflow-hidden"
              >
                {/* PDF Icon */}
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-[10px] sm:text-xs font-bold">
                    PDF
                  </span>
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 truncate">
                    {formatFileSize(file.size)} - {Math.round(file.progress)}%
                    {file.progress < 100 ? " uploaded" : " completed"}
                  </p>
                </div>

                {/* Loading Spinner */}
                {file.progress < 100 && (
                  <div className="flex-shrink-0 text-teal-600">
                    <CircularProgress progress={file.progress} size={36} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3 px-0 sm:px-0">
          <Button
            variant="outline"
            onClick={onCancel}
            size={"lg"}
            className="w-full sm:w-auto px-4 sm:px-6 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            variant={"default"}
            size={"lg"}
            onClick={onNext}
            disabled={isUploading || overallProgress !== 100}
            className="w-full sm:w-auto gap-2 px-4 sm:px-6"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
