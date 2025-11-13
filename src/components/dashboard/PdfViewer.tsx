"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PdfViewrs} from "./PdfOpen";
import {ProcessingModal} from "@/components/dashboard/ProcessingModal";
import {useState} from "react";

interface PdfViewerProps {
  fileName: string;
  fileId: string;
  pages?: number;
  pdfUrl?: string;
  onRegenerate?: () => void;
}

export function PdfViewer({
  fileName,
  fileId: _fileId,
  pages: _pages = 10,
  pdfUrl,
  onRegenerate:_onRegenerate,
}: PdfViewerProps) {
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const handleProcessingClose = () => {
    setProcessingModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center flex-col md:flex-row md:justify-between p-6 gap-5 flex-shrink-0">
        <div className="flex items-center gap-2 text-[18px] md:text-[24px]">
          <Link
            href="/dashboard"
            className="text-muted hover:text-primary/80 transition-colors font-medium"
          >
            Home
          </Link>
          <span className="text-foreground font-medium">/</span>
          <span className="text-foreground font-medium">{fileName}</span>
        </div>
        <Button
          onClick={() => {
            setProcessingModalOpen(true);
          }}
          variant={"default"}
          className="text-[18px] w-full md:w-auto "
        >
          Regenerate Estimate
        </Button>
      </div>

      <PdfViewrs pdfUrl={pdfUrl} fileName={fileName} />
      <ProcessingModal
        open={processingModalOpen}
        title="Re- Processing Your File"
        onClose={handleProcessingClose}
      />
    </div>
  );
}
