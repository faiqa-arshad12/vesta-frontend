import React, {useEffect, useState} from "react";
interface PdfViewerProps {
  fileName: string;
  pdfUrl?: string;
}

export function PdfViewrs({fileName, pdfUrl}: PdfViewerProps) {
  const [currentPage, _setCurrentPage] = useState(1);
  const defaultPdfUrl = pdfUrl || "https://icseindia.org/document/sample.pdf";
  useEffect(() => {
    const iframe = document.getElementById("pdf-viewer") as HTMLIFrameElement;
    if (iframe) {
      iframe.src = `${defaultPdfUrl}#page=${currentPage}&toolbar=1`;
    }
  }, [currentPage, defaultPdfUrl]);
  return (
    <iframe
      id="pdf-viewer"
      src={`${defaultPdfUrl}#page=${currentPage}&toolbar=1&navpanes=0&scrollbar=1`}
      className="w-full h-[80vh] border-0 bg-white"
      title={fileName}
    />
  );
}
