import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface QuickWorkingHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

export function QuickWorkingHoursModal({
  isOpen,
  onClose,
  onSubmit,
}: QuickWorkingHoursModalProps) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = () => {
    if (!startTime || !endTime) {
      return;
    }

    const finalContent = `${startTime}–${endTime}`;
    onSubmit(finalContent);
    handleClose();
  };

  const handleClose = () => {
    setStartTime("");
    setEndTime("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-[calc(100%-2rem)] bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Log Working Hours</DialogTitle>
          <DialogDescription className="text-slate-400">
            Record your work schedule for the day
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="start-time" className="text-slate-300">
                Start Time *
              </Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="rounded-xl bg-slate-700 border-slate-600 text-white [color-scheme:dark]"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time" className="text-slate-300">
                End Time *
              </Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="rounded-xl bg-slate-700 border-slate-600 text-white [color-scheme:dark]"
              />
            </div>
          </div>

          {startTime && endTime && (
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <p className="text-sm text-slate-300">
                Work duration:{" "}
                <span className="text-white font-medium">
                  {startTime} – {endTime}
                </span>
              </p>
            </div>
          )}

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
              disabled={!startTime || !endTime}
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
