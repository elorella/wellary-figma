import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Pill, CheckCircle2 } from "lucide-react";

interface QuickSupplementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

const commonSupplements = [
  { name: "Vitamin D", icon: "☀️" },
  { name: "Vitamin C", icon: "🍊" },
  { name: "Omega-3", icon: "🐟" },
  { name: "Magnesium", icon: "💊" },
  { name: "Zinc", icon: "⚡" },
  { name: "B Complex", icon: "🔋" },
  { name: "Probiotics", icon: "🦠" },
  { name: "Iron", icon: "🔴" },
  { name: "Calcium", icon: "🦴" },
  { name: "Multivitamin", icon: "💊" },
];

export function QuickSupplementsModal({
  isOpen,
  onClose,
  onSubmit,
}: QuickSupplementsModalProps) {
  const [selectedSupplements, setSelectedSupplements] = useState<string[]>([]);
  const [customSupplement, setCustomSupplement] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleToggleSupplement = (supplement: string) => {
    if (selectedSupplements.includes(supplement)) {
      setSelectedSupplements(selectedSupplements.filter((s) => s !== supplement));
    } else {
      setSelectedSupplements([...selectedSupplements, supplement]);
    }
  };

  const handleAddCustom = () => {
    if (customSupplement.trim()) {
      setSelectedSupplements([...selectedSupplements, customSupplement.trim()]);
      setCustomSupplement("");
      setShowCustomInput(false);
    }
  };

  const handleSubmit = () => {
    if (selectedSupplements.length === 0) {
      return;
    }

    const content = selectedSupplements.join(", ");
    onSubmit(content);
    handleClose();
  };

  const handleClose = () => {
    setSelectedSupplements([]);
    setCustomSupplement("");
    setShowCustomInput(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-[calc(100%-2rem)] bg-slate-800 border-slate-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Log Supplements</DialogTitle>
          <DialogDescription className="text-slate-400">
            Select the supplements you're taking
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-slate-300 mb-3 block">
              Common Supplements
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {commonSupplements.map((supplement) => {
                const isSelected = selectedSupplements.includes(supplement.name);
                return (
                  <button
                    key={supplement.name}
                    onClick={() => handleToggleSupplement(supplement.name)}
                    className={`p-3 rounded-xl border-2 transition-all text-left relative ${
                      isSelected
                        ? "border-green-500 bg-green-500/20"
                        : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{supplement.icon}</span>
                      <span className="text-sm text-white font-medium">
                        {supplement.name}
                      </span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-green-400 absolute top-2 right-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Supplements */}
          <div>
            {selectedSupplements.filter(
              (s) => !commonSupplements.find((cs) => cs.name === s)
            ).length > 0 && (
              <div className="mb-3">
                <Label className="text-slate-300 mb-2 block text-xs">
                  Custom Supplements
                </Label>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplements
                    .filter((s) => !commonSupplements.find((cs) => cs.name === s))
                    .map((supplement) => (
                      <div
                        key={supplement}
                        className="flex items-center gap-1 bg-purple-500/20 border border-purple-500 text-purple-300 px-3 py-1 rounded-lg text-sm"
                      >
                        <span>{supplement}</span>
                        <button
                          onClick={() =>
                            setSelectedSupplements(
                              selectedSupplements.filter((s) => s !== supplement)
                            )
                          }
                          className="ml-1 hover:text-purple-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {!showCustomInput ? (
              <Button
                variant="outline"
                onClick={() => setShowCustomInput(true)}
                className="w-full rounded-xl bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:text-slate-200"
              >
                + Add Custom Supplement
              </Button>
            ) : (
              <div className="space-y-2">
                <Input
                  placeholder="Enter supplement name..."
                  value={customSupplement}
                  onChange={(e) => setCustomSupplement(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddCustom();
                    }
                  }}
                  className="rounded-xl text-base bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCustomInput(false);
                      setCustomSupplement("");
                    }}
                    className="flex-1 rounded-xl bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddCustom}
                    disabled={!customSupplement.trim()}
                    className="flex-1 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Selected Summary */}
          {selectedSupplements.length > 0 && (
            <div className="bg-slate-700/50 p-3 rounded-xl border border-slate-600">
              <p className="text-xs text-slate-400 mb-1">Selected:</p>
              <p className="text-sm text-white">{selectedSupplements.join(", ")}</p>
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
              disabled={selectedSupplements.length === 0}
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
