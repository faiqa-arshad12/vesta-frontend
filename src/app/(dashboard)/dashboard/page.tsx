"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {PageHeader} from "@/components/dashboard/EstimatedFileHeader";
import {UploadDocuments} from "@/components/dashboard/UploadDocuments";
import {UploadProgressModal} from "@/components/dashboard/UploadProgressModal";
import {ProcessingModal} from "@/components/dashboard/ProcessingModal";
import {
  FileTableWithPagination,
  type FileItem,
} from "@/components/common/CustomizedTable";

export default function DashboardPage() {
  const router = useRouter();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [files, setFiles] = useState<FileItem[]>([
    {id: "1", fileName: "Olivia Rhye", status: "Inprogress"},
    {id: "2", fileName: "Phoenix Baker", status: "Inprogress"},
    {id: "3", fileName: "Lana Steiner", status: "Inprogress"},
    {id: "4", fileName: "Demi Wilkinson", status: "Completed"},
    {id: "5", fileName: "Candice Wu", status: "Completed"},
    {id: "6", fileName: "Natali Craig", status: "Completed"},
    {id: "7", fileName: "Drew Cano", status: "Completed"},
    {id: "8", fileName: "Andi Lane", status: "Completed"},
  ]);

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
    setUploadModalOpen(false);
    setProcessingModalOpen(true);
    setSelectedFiles([]);
  };

  const handleProcessingClose = () => {
    setProcessingModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleView = (id: string) => {
    router.push(`/dashboard/view/${id}`);
  };

  const handleSelect = (selectedIds: string[]) => {
    console.log("Selected files:", selectedIds);
  };

  return (
    <div>
      <PageHeader
        title="Estimated Files"
        description="Access your analyzed files, review results"
        searchPlaceholder="Search By filename..."
      />
      <div className="px-4 sm:px-6 pb-8 space-y-6">
        <UploadDocuments onFileSelect={handleFileSelect} />
        <div className="bg-white rounded-lg border border-input-border p-4 sm:p-6">
          <FileTableWithPagination
            files={files}
            itemsPerPage={5}
            onDelete={handleDelete}
            onView={handleView}
            onSelect={handleSelect}
          />
        </div>
      </div>
      <UploadProgressModal
        open={uploadModalOpen}
        files={selectedFiles}
        onClose={handleCancel}
        onCancel={handleCancel}
        onNext={handleNext}
      />
      <ProcessingModal
        open={processingModalOpen}
        onClose={handleProcessingClose}
      />
    </div>
  );
}
