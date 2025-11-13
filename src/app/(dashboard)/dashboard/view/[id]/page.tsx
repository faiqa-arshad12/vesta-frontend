"use client";

import {useParams} from "next/navigation";
import {PdfViewer} from "@/components/dashboard/PdfViewer";

export default function PdfViewPage() {
  const params = useParams();
  const fileId = params.id as string;

  const fileName = "Demi Wilkinson.pdf";

  const handleRegenerate = () => {
    console.log("Regenerating estimate for:", fileId);
  };

  return (
    <div className="h-[calc(100vh-80px)] w-full">
      <PdfViewer
        fileName={fileName}
        fileId={fileId}
        pages={6}
        onRegenerate={handleRegenerate}
      />
    </div>
  );
}
