import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Smile, Wind, Zap, Frown, Utensils, Edit, Disc } from "lucide-react";

interface QuickStomachFeelingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

export function QuickStomachFeelingModal({
  isOpen,
  onClose,
  onSubmit,
}: QuickStomachFeelingModalProps) {
  const [stomachFeeling, setStomachFeeling] = useState("");
  const [stomachFeelingOther, setStomachFeelingOther] = useState("");

  const handleSubmit = () => {
    if (!stomachFeeling) {
      return;
    }
    if (stomachFeeling === "Other" && !stomachFeelingOther.trim()) {
      return;
    }

    const finalContent = stomachFeeling === "Other" ? stomachFeelingOther : stomachFeeling;
    onSubmit(finalContent);
    handleClose();
  };

  const handleClose = () => {
    setStomachFeeling("");
    setStomachFeelingOther("");
    onClose();
  };

  const feelingOptions = [
    {
      value: "Good",
      icon: Smile,
      color: "bg-green-500/20",
      iconColor: "text-green-400",
      description: "Feeling normal and comfortable",
    },
    {
      value: "Bloated",
      icon: Disc,
      color: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
      description: "Feeling full or swollen",
    },
    {
      value: "Gassy",
      icon: Wind,
      color: "bg-blue-500/20",
      iconColor: "text-blue-400",
      description: "Excess gas or flatulence",
    },
    {
      value: "Cramping",
      icon: Zap,
      color: "bg-orange-500/20",
      iconColor: "text-orange-400",
      description: "Pain or discomfort",
    },
    {
      value: "Nauseous",
      icon: Frown,
      color: "bg-red-500/20",
      iconColor: "text-red-400",
      description: "Feeling queasy or sick",
    },
    {
      value: "Hungry",
      icon: Utensils,
      color: "bg-purple-500/20",
      iconColor: "text-purple-400",
      description: "Feeling empty or hungry",
    },
    {
      value: "Other",
      icon: Edit,
      color: "bg-gray-500/20",
      iconColor: "text-gray-400",
      description: "Describe your feeling",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-[calc(100%-2rem)] bg-slate-800 border-slate-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Log Stomach Feeling</DialogTitle>
          <DialogDescription className="text-slate-400">
            How does your stomach feel?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-slate-300 mb-3 block">Select Feeling *</Label>
            <RadioGroup
              value={stomachFeeling}
              onValueChange={setStomachFeeling}
              className="space-y-2"
            >
              {feelingOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      stomachFeeling === option.value
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                    }`}
                    onClick={() => setStomachFeeling(option.value)}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`stomach-${option.value}`}
                      className="border-slate-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <div
                          className={`w-10 h-10 flex items-center justify-center ${option.color} rounded-lg flex-shrink-0`}
                        >
                          <IconComponent
                            className={`w-5 h-5 ${option.iconColor}`}
                            strokeWidth={2}
                          />
                        </div>
                        <div className="min-w-0">
                          <Label
                            htmlFor={`stomach-${option.value}`}
                            className="cursor-pointer text-white"
                          >
                            {option.value}
                          </Label>
                          <p className="text-xs text-slate-400">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      {stomachFeeling === "Other" && option.value === "Other" && (
                        <div className="mt-3">
                          <Input
                            placeholder="Describe how your stomach feels..."
                            value={stomachFeelingOther}
                            onChange={(e) => setStomachFeelingOther(e.target.value)}
                            className="rounded-xl text-base bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                            autoFocus
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
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
              disabled={
                !stomachFeeling ||
                (stomachFeeling === "Other" && !stomachFeelingOther.trim())
              }
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
