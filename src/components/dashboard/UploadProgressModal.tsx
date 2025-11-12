"use client";

import {useEffect, useState} from "react";
import {ArrowRight, Loader2} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Progress} from "@/components/ui/progress";
import {cn} from "@/lib/utils";
import {Icon} from "@iconify/react";

interface UploadFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  type: string;
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
    if (open && files.length > 0) {
      // Initialize files with 0% progress
      const initialFiles: UploadFile[] = files.map((file, index) => ({
        id: `file-${index}-${Date.now()}`,
        name: file.name,
        size: file.size,
        progress: 0,
        type: file.type || file.name.split(".").pop() || "",
      }));

      setUploadFiles(initialFiles);
      setOverallProgress(0);
      setIsUploading(true);

      let intervalId: NodeJS.Timeout;

      // Simulate upload progress
      const startUpload = () => {
        intervalId = setInterval(() => {
          setUploadFiles((prev) => {
            const updated = prev.map((file) => {
              if (file.progress < 100) {
                // Ensure progress reaches 100% - use larger increments near the end
                let increment: number;
                if (file.progress >= 95) {
                  // When close to 100%, complete it
                  increment = 100 - file.progress;
                } else {
                  // Random increment between 8-25% for faster progress
                  increment = Math.random() * 17 + 8;
                }
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

            // Calculate overall progress
            const totalProgress =
              updated.reduce((sum, file) => sum + file.progress, 0) /
              updated.length;
            const roundedProgress = Math.round(totalProgress);
            setOverallProgress(roundedProgress);

            // Check if all files are uploaded
            const allFilesComplete = updated.every(
              (file) => file.progress >= 100
            );
            if (allFilesComplete) {
              setIsUploading(false);
              setOverallProgress(100);
              if (intervalId) {
                clearInterval(intervalId);
              }
            }

            return updated;
          });
        }, 300); // Update every 300ms for smoother progress
      };

      startUpload();

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    } else {
      // Reset when modal closes
      setUploadFiles([]);
      setOverallProgress(0);
      setIsUploading(true);
    }
  }, [open, files]);

  const handleCancel = () => {
    setIsUploading(false);
    onCancel();
  };

  const handleNext = () => {
    if (!isUploading && overallProgress === 100) {
      onNext();
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] rounded-xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Uploading...
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Overall Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Progress value={overallProgress} className="flex-1 h-2" />
                <span className="ml-4 text-sm text-muted-foreground min-w-[3rem] text-right">
                  {overallProgress}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-normal">
                Only support .Doc, .csv and .pdf
              </p>
            </div>

            {/* File List */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {uploadFiles.map((file) => (
                <div
                  key={file.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border border-input-border transition-colors duration-300",
                    file.progress < 100 ? "bg-[#F9FAFB]" : "bg-white"
                  )}
                >
                  {/* File Icon */}
                  <Icon icon="material-icon-theme:pdf" width="48" height="48" />

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold  text-black truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-text font-[400]">
                        {formatFileSize(file.size)} -{" "}
                        {Math.round(file.progress)}% uploaded
                      </p>
                    </div>
                    {/* Individual file progress bar */}
                    <Progress value={file.progress} className="h-1 mt-2" />
                  </div>

                  {/* Spinner */}
                  {file.progress < 100 && (
                    <div className="flex-shrink-0">
                      <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              size="lg"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={handleNext}
              size="lg"
              disabled={
                isUploading ||
                overallProgress !== 100 ||
                uploadFiles.some((file) => file.progress < 100)
              }
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
