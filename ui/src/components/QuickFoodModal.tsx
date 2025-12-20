import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ImagePicker } from "./ImagePicker";
import { Category } from "../App";

interface QuickFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, imageUrl?: string) => void;
  category: Category;
  title: string;
}

export function QuickFoodModal({
  isOpen,
  onClose,
  onSubmit,
  category,
  title,
}: QuickFoodModalProps) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
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
    if (!startTime) {
      setError("Please enter a time");
      return;
    }

    if (!description.trim() && !imageData) {
      setError("Please add a description or photo");
      return;
    }

    // Validate time format (HH:MM)
    const timeRegex = /^\d{1,2}:\d{2}$/;
    if (!timeRegex.test(startTime)) {
      setError("Please use format HH:MM (e.g., 9:30)");
      return;
    }

    if (endTime && !timeRegex.test(endTime)) {
      setError("Please use format HH:MM for end time");
      return;
    }

    // Build content string
    let content = startTime;
    if (endTime && endTime !== startTime) {
      content += `–${endTime}`;
    }
    if (description.trim()) {
      content += ` ${description.trim()}`;
    }

    onSubmit(content, imageData || undefined);
    handleClose();
  };

  const handleClose = () => {
    setStartTime("");
    setEndTime("");
    setDescription("");
    setImageData(null);
    setError("");
    onClose();
  };

  const handleImageSelect = (imageUrl: string | null) => {
    setImageData(imageUrl);
    setError(""); // Clear error when image is selected
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg w-[calc(100%-2rem)] bg-slate-800 border-slate-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-slate-400">
            Log your meal with time, description, and optional photo
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
                End Time
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
              Description
            </label>
            <Textarea
              placeholder="What did you eat?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl text-base bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 min-h-[100px]"
            />
          </div>

          <ImagePicker 
            onImageSelect={handleImageSelect}
            currentImage={imageData}
            maxSizeMB={1}
          />

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
