import { useState, useRef } from 'react';
import { Category } from '../../App';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { ImagePlus, X } from 'lucide-react';

interface FoodCategoryInputProps {
  category: Category;
  onSubmit: (content: string, imageUrl?: string) => void;
  selectedDate: Date;
}

export function FoodCategoryInput({ category, onSubmit, selectedDate }: FoodCategoryInputProps) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert to base64 for localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    // Require at least time OR image
    if (!startTime || (!description.trim() && !imageUrl)) {
      return;
    }

    let finalContent = '';
    if (endTime && endTime !== startTime) {
      finalContent = `${startTime}–${endTime}${description.trim() ? ' ' + description : ''}`;
    } else {
      finalContent = `${startTime}${description.trim() ? ' ' + description : ''}`;
    }

    onSubmit(finalContent, imageUrl || undefined);
    
    // Reset form
    setStartTime('');
    setEndTime('');
    setDescription('');
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCategoryDisplayName = () => {
    switch (category) {
      case 'breakfast': return 'Breakfast';
      case 'snacks': return 'Snacks';
      case 'dinner': return 'Dinner';
      default: return category;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">{getCategoryDisplayName()}</h2>
        <p className="text-muted-foreground">
          Log your {category} with time and optional description or photo
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-time">Start Time *</Label>
            <Input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-time">End Time (Optional)</Label>
            <Input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="What did you eat?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-xl min-h-[120px]"
          />
        </div>

        {/* Image Upload Section */}
        <div className="space-y-2">
          <Label>Photo (Optional)</Label>
          {!imageUrl ? (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <ImagePlus className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click to upload a photo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border-2 border-orange-400">
              <img
                src={imageUrl}
                alt="Uploaded food"
                className="w-full h-auto max-h-64 object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!startTime || (!description.trim() && !imageUrl)}
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          Add Entry
        </Button>
      </div>
    </div>
  );
}
