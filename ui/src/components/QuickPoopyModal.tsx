import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Circle, Minus } from "lucide-react";

interface QuickPoopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

export function QuickPoopyModal({
  isOpen,
  onClose,
  onSubmit,
}: QuickPoopyModalProps) {
  const [poopyType, setPoopyType] = useState("");

  const handleSubmit = () => {
    if (!poopyType) {
      return;
    }

    onSubmit(poopyType);
    handleClose();
  };

  const handleClose = () => {
    setPoopyType("");
    onClose();
  };

  const poopyTypes = [
    {
      value: "Type 1 - Separate hard lumps",
      icon: <Circle className="w-5 h-5" />,
      color: "bg-amber-500/20",
      iconColor: "text-amber-400",
      description: "Hard to pass (constipation)",
      health: "Concerning",
      healthColor: "bg-amber-500/20 text-amber-300",
    },
    {
      value: "Type 2 - Lumpy and sausage-like",
      icon: <Minus className="w-5 h-5" />,
      color: "bg-amber-500/20",
      iconColor: "text-amber-400",
      description: "Slightly hard (constipation)",
      health: "Concerning",
      healthColor: "bg-amber-500/20 text-amber-300",
    },
    {
      value: "Type 3 - Sausage-like with cracks",
      icon: <Minus className="w-5 h-5" />,
      color: "bg-green-500/20",
      iconColor: "text-green-400",
      description: "Normal and healthy",
      health: "Ideal",
      healthColor: "bg-green-500/20 text-green-300",
    },
    {
      value: "Type 4 - Smooth and soft",
      icon: <Minus className="w-5 h-5" />,
      color: "bg-green-500/20",
      iconColor: "text-green-400",
      description: "Normal and healthy",
      health: "Ideal",
      healthColor: "bg-green-500/20 text-green-300",
    },
    {
      value: "Type 5 - Soft blobs",
      icon: <Circle className="w-5 h-5" />,
      color: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
      description: "Lacks fiber",
      health: "Monitor",
      healthColor: "bg-yellow-500/20 text-yellow-300",
    },
    {
      value: "Type 6 - Mushy with ragged edges",
      icon: <Circle className="w-5 h-5" />,
      color: "bg-orange-500/20",
      iconColor: "text-orange-400",
      description: "Mild diarrhea",
      health: "Monitor",
      healthColor: "bg-orange-500/20 text-orange-300",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-[calc(100%-2rem)] bg-slate-800 border-slate-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Log Bowel Movement</DialogTitle>
          <DialogDescription className="text-slate-400">
            Select your stool type based on the Bristol Stool Chart
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-slate-300 mb-3 block">Select Type *</Label>
            <RadioGroup
              value={poopyType}
              onValueChange={setPoopyType}
              className="space-y-2"
            >
              {poopyTypes.map((type) => (
                <div
                  key={type.value}
                  className={`flex items-center space-x-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    poopyType === type.value
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                  }`}
                  onClick={() => setPoopyType(type.value)}
                >
                  <RadioGroupItem
                    value={type.value}
                    id={type.value}
                    className="border-slate-500 flex-shrink-0"
                  />
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div
                      className={`w-10 h-10 flex items-center justify-center ${type.color} rounded-lg flex-shrink-0`}
                    >
                      <span className={type.iconColor}>{type.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Label
                        htmlFor={type.value}
                        className="cursor-pointer text-white block"
                      >
                        {type.value.split(" - ")[0]}
                      </Label>
                      <p className="text-xs text-slate-400">
                        {type.description}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs flex-shrink-0 ${type.healthColor}`}
                    >
                      {type.health}
                    </div>
                  </div>
                </div>
              ))}
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
              disabled={!poopyType}
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
