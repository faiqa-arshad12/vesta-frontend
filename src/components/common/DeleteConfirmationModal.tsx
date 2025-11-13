"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/react";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-auto space-y-6 py-8 rounded-xl !px-6"
        showCloseButton={false}
      >
        <div className="flex flex-row items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-destructive-muted flex items-center justify-center">
            <Icon
              icon="proicons:delete"
              width="36"
              height="36"
              className="text-destructive"
            />{" "}
          </div>
        </div>
        <DialogHeader className="items-center text-center px-4">
          <DialogTitle className="text-[32px] font-bold text-foreground">
            Are you sure?
          </DialogTitle>
          <DialogDescription className="text-[16px] text-muted pt-2 text-center max-w-sm">
            Are you sure you want to delete this file? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-start flex justify-between flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border border-primary bg-background hover:bg-accent font-bold rounded-[12px]"
            size="lg"
          >
            No, Cancel
          </Button>
          <Button
            variant={"default"}
            onClick={handleConfirm}
            className="bg-destructive text-white hover:bg-destructive/100 font-bold rounded-[12px]"
            size="lg"
          >
            Yes, Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
