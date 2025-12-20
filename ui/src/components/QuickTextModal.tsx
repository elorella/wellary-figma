import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Category } from "../App";

interface QuickTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  category: Category;
  title: string;
  placeholder?: string;
  description?: string;
}

export function QuickTextModal({
  isOpen,
  onClose,
  onSubmit,
  category,
  title,
  placeholder = "Enter text",
  description = "Enter your entry",
}: QuickTextModalProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // Get category-specific placeholder and description
  const getCategoryPlaceholder = () => {
    if (category === "liquid") return "e.g., 2L water, 1 cup coffee";
    return placeholder;
  };

  const getCategoryDescription = () => {
    if (category === "liquid") return "Track your liquid intake";
    return description;
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      setError("Please enter some text");
      return;
    }

    onSubmit(content);
    setContent("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setContent("");
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
            {getCategoryDescription()}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">
              Entry
            </label>
            <Input
              type="text"
              placeholder={getCategoryPlaceholder()}
              value={content}
              onChange={(e) => setContent(e.target.value)}
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