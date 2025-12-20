import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Category } from "../App";

interface QuickActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

const activityOptions = [
  "Walking",
  "Running",
  "Jogging",
  "Cycling",
  "Swimming",
  "Yoga",
  "Pilates",
  "Gym Workout",
  "Weight Training",
  "Cardio",
  "HIIT",
  "Stretching",
  "Dancing",
  "Sports",
  "Hiking",
  "Other",
];

export function QuickActivityModal({
  isOpen,
  onClose,
  onSubmit,
}: QuickActivityModalProps) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [activity, setActivity] = useState("");
  const [error, setError] = useState("");

  // Set start time to current time when modal opens
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setStartTime(`${hours}:${minutes}`);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!startTime || !endTime || !activity) {
      setError("Please fill all fields");
      return;
    }

    // Validate time format (HH:MM)
    const timeRegex = /^\d{1,2}:\d{2}$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      setError("Please use format HH:MM (e.g., 9:30)");
      return;
    }

    // Validate time values
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    
    if (
      startHours < 0 || startHours > 23 || startMinutes < 0 || startMinutes > 59 ||
      endHours < 0 || endHours > 23 || endMinutes < 0 || endMinutes > 59
    ) {
      setError("Invalid time");
      return;
    }

    const content = `${startTime}–${endTime} ${activity}`;
    onSubmit(content);
    handleClose();
  };

  const handleClose = () => {
    setStartTime("");
    setEndTime("");
    setActivity("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-[calc(100%-2rem)] bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Log Activity</DialogTitle>
          <DialogDescription className="text-slate-400">
            Record your physical activity with time range
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Start Time *
              </label>
              <Input
                type="text"
                placeholder="9:30"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="rounded-xl text-base bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                inputMode="numeric"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                End Time *
              </label>
              <Input
                type="text"
                placeholder="10:00"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="rounded-xl text-base bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                inputMode="numeric"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Activity Type *
            </label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger className="rounded-xl text-base bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select activity" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600 text-white">
                {activityOptions.map((option) => (
                  <SelectItem 
                    key={option} 
                    value={option}
                    className="text-white hover:bg-slate-600 focus:bg-slate-600 focus:text-white"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && (
            <p className="text-xs text-red-400">{error}</p>
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
