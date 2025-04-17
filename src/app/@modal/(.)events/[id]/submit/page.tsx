"use client";

import { submitTeamProject } from "@/components/events/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const { id } = useParams();
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
        className="!max-w-140"
      >
        <DialogTitle>Submit your Project URL</DialogTitle>
        <DialogDescription>
          Congratulations on finishing your project! Please provide the URL to
          your public project repository. This can't be changed once submitted.
        </DialogDescription>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const url = formData.get("url") as string;
            await submitTeamProject({
              eventId: id as string,
              url,
            });
            toast.success("Project URL submitted successfully!");
            router.back();
          }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              Project URL
            </label>
            <Input
              id="url"
              name="url"
              type="url"
              required
              placeholder="https://github.com/username/repository"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
