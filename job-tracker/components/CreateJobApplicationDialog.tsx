import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}
export default function CreateJobApplicationDialog({columnId, boardId}: CreateJobApplicationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  required
                  value={""}
                  onChange={(e) =>{}}
                />
              </div>
              <div className="space-y-2">
                <Label></Label>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
