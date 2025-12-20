import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface WorkingHoursInputProps {
  onSubmit: (content: string) => void;
  selectedDate: Date;
}

export function WorkingHoursInput({ onSubmit, selectedDate }: WorkingHoursInputProps) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = () => {
    if (!startTime || !endTime) {
      return;
    }

    const finalContent = `${startTime}–${endTime}`;
    onSubmit(finalContent);
    
    // Reset form
    setStartTime('');
    setEndTime('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Working Hours</h2>
        <p className="text-muted-foreground">
          Log your work hours
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
            <Label htmlFor="end-time">End Time *</Label>
            <Input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!startTime || !endTime}
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          Add Entry
        </Button>
      </div>
    </div>
  );
}
