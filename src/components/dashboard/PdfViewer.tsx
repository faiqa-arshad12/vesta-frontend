"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

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
  onRegenerate,
}: PdfViewerProps) {
  const [currentPage, _setCurrentPage] = useState(1);
  const defaultPdfUrl = pdfUrl || "https://icseindia.org/document/sample.pdf";
  useEffect(() => {
    const iframe = document.getElementById("pdf-viewer") as HTMLIFrameElement;
    if (iframe) {
      iframe.src = `${defaultPdfUrl}#page=${currentPage}&toolbar=1`;
    }
  }, [currentPage, defaultPdfUrl]);

  return (
    <div className="flex flex-col bg-white h-full w-full">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-white flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/dashboard"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Home
          </Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-foreground font-medium">{fileName}</span>
        </div>
        <Button
          onClick={onRegenerate}
          className="bg-primary text-white hover:bg-primary/90 px-4 py-2 text-sm font-medium rounded-md"
          type="button"
        >
          Regenerate Estimate
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        <div className="flex-1 overflow-hidden min-h-0">
          <iframe
            id="pdf-viewer"
            src={`${defaultPdfUrl}#page=${currentPage}&toolbar=1`}
            className="w-full h-full border-0 min-h-0"
            title={fileName}
          />
        </div>
      </div>
    </div>
  );
}
