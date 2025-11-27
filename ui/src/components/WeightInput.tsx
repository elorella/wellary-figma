import { useState } from 'react';
import { LogItem } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface WeightInputProps {
  onSubmit: (content: string) => void;
  logs: LogItem[];
  selectedDate: Date;
}

export function WeightInput({ onSubmit, logs, selectedDate }: WeightInputProps) {
  const [weight, setWeight] = useState('');

  const handleSubmit = () => {
    // Accept both comma and period as decimal separator
    const normalizedWeight = weight.replace(',', '.');
    
    if (!/^\d+(\.\d+)?$/.test(normalizedWeight)) {
      return;
    }

    onSubmit(normalizedWeight);
    setWeight('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Get last 7 days of weight logs
  const getHistoricalWeights = () => {
    const historicalWeights: { date: string; weight: string }[] = [];
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const weightLog = logs.find(
        log => log.category === 'weight' && log.date === dateStr
      );
      
      if (weightLog) {
        historicalWeights.push({
          date: dateStr,
          weight: weightLog.content
        });
      }
    }
    
    return historicalWeights;
  };

  const historicalWeights = getHistoricalWeights();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Weight</h2>
        <p className="text-muted-foreground">
          Enter your weight in kilograms
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg) *</Label>
          <Input
            id="weight"
            type="text"
            placeholder="e.g., 51.2 or 51,2"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onKeyPress={handleKeyPress}
            className="rounded-xl"
          />
          <p className="text-xs text-muted-foreground">
            You can use either period (.) or comma (,) as decimal separator
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!weight.trim()}
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          Add Entry
        </Button>

        {historicalWeights.length > 0 && (
          <div className="mt-6 p-4 bg-muted rounded-xl">
            <h3 className="mb-3">Recent Weights</h3>
            <div className="space-y-2">
              {historicalWeights.map(({ date, weight }) => (
                <div key={date} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{date}</span>
                  <span>{weight} kg</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
