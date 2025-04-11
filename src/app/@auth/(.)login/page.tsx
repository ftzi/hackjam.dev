"use client";

import { LoginContent } from "@/components/Login";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="!max-w-fit"
      >
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Access your account by logging in below
          </DialogDescription>
        </DialogHeader>
        <LoginContent />
      </DialogContent>
    </Dialog>
  );
}
