import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface ActivityInputProps {
  onSubmit: (content: string) => void;
  selectedDate: Date;
}

export function ActivityInput({ onSubmit, selectedDate }: ActivityInputProps) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [activity, setActivity] = useState('');

  const handleSubmit = () => {
    if (!startTime || !endTime || !activity.trim()) {
      return;
    }

    const finalContent = `${startTime}–${endTime} ${activity}`;
    onSubmit(finalContent);
    
    // Reset form
    setStartTime('');
    setEndTime('');
    setActivity('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Activity</h2>
        <p className="text-muted-foreground">
          Log your physical activity with time range
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

        <div className="space-y-2">
          <Label htmlFor="activity">Activity *</Label>
          <Input
            id="activity"
            type="text"
            placeholder="e.g., Walking, Running, Yoga"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="rounded-xl"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!startTime || !endTime || !activity.trim()}
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          Add Entry
        </Button>
      </div>
    </div>
  );
}
