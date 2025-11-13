"use client";

import {Button} from "@/components/ui/button";

interface EmptyTableStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onUpload?: () => void;
  className?: string;
}

export function EmptyTableState({
  title = "No Estimates Yet",
  description = "Upload a document to generate your first estimate.",
  buttonText = "Upload Document",
  onUpload,
  className,
}: EmptyTableStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${
        className || ""
      }`}
    >
      <h3 className="text-[32px] font-bold text-foreground mb-2">{title}</h3>
      <p className="text-[18px] text-muted-foreground mb-6 max-w-md">
        {description}
      </p>
      {onUpload && (
        <Button
          onClick={onUpload}
          variant="default"
          className="bg-primary text-white hover:bg-primary/90"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
