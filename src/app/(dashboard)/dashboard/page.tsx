"use client";
import {useState} from "react";
import {PageHeader} from "@/components/dashboard/EstimatedFileHeader";
import {UploadDocuments} from "@/components/dashboard/UploadDocuments";
import {UploadProgressModal} from "@/components/dashboard/UploadProgressModal";
import {ProcessingModal} from "@/components/dashboard/ProcessingModal";

export default function DashboardPage() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFiles(files);
      setUploadModalOpen(true);
    }
  };

  const handleCancel = () => {
    setUploadModalOpen(false);
    setSelectedFiles([]);
  };

  const handleNext = () => {
    // Close upload modal and show processing modal
    setUploadModalOpen(false);
    setProcessingModalOpen(true);
    setSelectedFiles([]);
  };

  const handleProcessingClose = () => {
    setProcessingModalOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Estimated Files"
        description="Access your analyzed files, review results"
        searchPlaceholder="Search By filename..."
      />
      <div className="px-4 sm:px-6 pb-8">
        <UploadDocuments onFileSelect={handleFileSelect} />
      </div>
      <UploadProgressModal
        open={uploadModalOpen}
        files={selectedFiles}
        onClose={handleCancel}
        onCancel={handleCancel}
        onNext={handleNext}
      />
      <ProcessingModal open={processingModalOpen} onClose={handleProcessingClose} />
    </div>
  );
}
