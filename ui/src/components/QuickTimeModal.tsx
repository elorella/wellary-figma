import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Category } from "../App";

interface QuickTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (time: string) => void;
  category: Category;
  title: string;
}

export function QuickTimeModal({
  isOpen,
  onClose,
  onSubmit,
  category,
  title,
}: QuickTimeModalProps) {
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!time) {
      setError("Please enter a time");
      return;
    }

    // Validate time format (HH:MM)
    const timeRegex = /^\d{1,2}:\d{2}$/;
    if (!timeRegex.test(time)) {
      setError("Please use format HH:MM (e.g., 9:30)");
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      setError("Invalid time");
      return;
    }

    onSubmit(time);
    setTime("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setTime("");
    setError("");
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-[calc(100%-2rem)] bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-slate-400">
            Enter the time in HH:MM format
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Time
            </label>
            <Input
              type="text"
              placeholder="9:30"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onKeyDown={handleKeyDown}
              className="rounded-xl text-base bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              autoFocus
              inputMode="numeric"
            />
            <p className="text-xs text-slate-500 mt-1">
              Format: HH:MM (e.g., 9:30 or 14:45)
            </p>
            {error && (
              <p className="text-xs text-red-400 mt-1">{error}</p>
            )}
          </div>

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
              className="rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 flex-1 sm:flex-none"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}