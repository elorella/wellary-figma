import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface QuickNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

export function QuickNotesModal({
  isOpen,
  onClose,
  onSubmit,
}: QuickNotesModalProps) {
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!notes.trim()) {
      return;
    }

    onSubmit(notes.trim());
    handleClose();
  };

  const handleClose = () => {
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-[calc(100%-2rem)] bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Log Notes</DialogTitle>
          <DialogDescription className="text-slate-400">
            Add any observations, thoughts, or notes about your day
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Any notes or observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="rounded-xl text-base bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 min-h-[150px] resize-none"
            autoFocus
          />

          <div className="flex gap-2 justify-end pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="rounded-xl flex-1 sm:flex-none bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:text-slate-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!notes.trim()}
              className="rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
