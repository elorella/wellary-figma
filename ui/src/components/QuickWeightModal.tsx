import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface QuickWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (weight: string) => void;
}

export function QuickWeightModal({
  isOpen,
  onClose,
  onSubmit,
}: QuickWeightModalProps) {
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!weight.trim()) {
      setError("Please enter your weight");
      return;
    }

    // Validate that it's a valid decimal number
    const weightPattern = /^\d+(\.\d+)?$/;
    if (!weightPattern.test(weight.trim())) {
      setError("Please enter a valid number (e.g., 51.2)");
      return;
    }

    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0) {
      setError("Please enter a valid weight");
      return;
    }

    onSubmit(weight.trim());
    setWeight("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setWeight("");
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
          <DialogTitle className="text-white">Log Weight</DialogTitle>
          <DialogDescription className="text-slate-400">
            Enter your current weight in kilograms
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Weight (kg)
            </label>
            <Input
              type="number"
              step="0.1"
              placeholder="e.g., 51.2"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onKeyDown={handleKeyDown}
              className="rounded-xl text-base bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              autoFocus
            />
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
