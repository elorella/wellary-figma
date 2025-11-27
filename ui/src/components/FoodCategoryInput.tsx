import { useState } from 'react';
import { Category } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface FoodCategoryInputProps {
  category: Category;
  onSubmit: (content: string) => void;
  selectedDate: Date;
}

export function FoodCategoryInput({ category, onSubmit, selectedDate }: FoodCategoryInputProps) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!startTime || !description.trim()) {
      return;
    }

    let finalContent = '';
    if (endTime && endTime !== startTime) {
      finalContent = `${startTime}–${endTime} ${description}`;
    } else {
      finalContent = `${startTime} ${description}`;
    }

    onSubmit(finalContent);
    
    // Reset form
    setStartTime('');
    setEndTime('');
    setDescription('');
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
          Log your {category} with time and description
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
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="What did you eat?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-xl min-h-[120px]"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!startTime || !description.trim()}
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          Add Entry
        </Button>
      </div>
    </div>
  );
}
