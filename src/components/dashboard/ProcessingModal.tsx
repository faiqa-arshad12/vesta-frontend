"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import Image from "next/image";

interface ProcessingModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProcessingModal({open, onClose}: ProcessingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[500px]  space-y-4 py-8 rounded-xl"
        showCloseButton={false}
      >
        <div className="flex flex-row items-center justify-center">
          <Image
            src="/assets/images/process.png"
            alt="Processing file"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Processing Your File
          </DialogTitle>
          <DialogDescription className="text-base text-muted pt-2 text-center">
            We&apos;re analyzing your document to generate accurate estimates. You&apos;ll
            get a notification when it&apos;s complete.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            onClick={onClose}
            className="bg-primary text-white hover:bg-primary/90"
            size="lg"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
