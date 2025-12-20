import { useState } from 'react';
import { Category } from '../../App';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface TimeInputProps {
  category: Category;
  onSubmit: (content: string) => void;
  selectedDate: Date;
}

export function TimeInput({ category, onSubmit, selectedDate }: TimeInputProps) {
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    if (!time) {
      return;
    }

    onSubmit(time);
    setTime('');
  };

  const getCategoryDisplayName = () => {
    switch (category) {
      case 'wake-up-time': return 'Wake Up Time';
      case 'shower': return 'Shower';
      case 'wind-down': return 'Wind Down';
      case 'sleep': return 'Sleep';
      default: return category;
    }
  };

  const getDescription = () => {
    switch (category) {
      case 'wake-up-time': return 'When did you wake up?';
      case 'shower': return 'When did you shower?';
      case 'wind-down': return 'When did you start winding down?';
      case 'sleep': return 'When did you go to sleep?';
      default: return 'Enter the time';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">{getCategoryDisplayName()}</h2>
        <p className="text-muted-foreground">{getDescription()}</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="time">Time *</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-xl"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!time}
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          Add Entry
        </Button>
      </div>
    </div>
  );
}
