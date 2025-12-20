import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface QuickSleepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (hours: string) => void;
}

export function QuickSleepModal({
  isOpen,
  onClose,
  onSubmit,
}: QuickSleepModalProps) {
  const [hours, setHours] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!hours) {
      setError("Please enter hours of sleep");
      return;
    }

    // Validate it's a number
    const hoursNum = parseFloat(hours);
    if (isNaN(hoursNum) || hoursNum < 0 || hoursNum > 24) {
      setError("Please enter a valid number between 0 and 24");
      return;
    }

    onSubmit(hours);
    setHours("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setHours("");
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
          <DialogTitle className="text-white">Log Sleep Time</DialogTitle>
          <DialogDescription className="text-slate-400">
            Enter the number of hours you slept
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Hours of Sleep
            </label>
            <Input
              type="text"
              placeholder="8"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              onKeyDown={handleKeyDown}
              className="rounded-xl text-base bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              autoFocus
              inputMode="decimal"
            />
            <p className="text-xs text-slate-500 mt-1">
              Enter hours (e.g., 8 or 7.5)
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
