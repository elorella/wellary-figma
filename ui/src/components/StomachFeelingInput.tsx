import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Smile, Wind, Zap, Frown, Utensils, Edit, Disc } from 'lucide-react';

interface StomachFeelingInputProps {
  onSubmit: (content: string) => void;
  selectedDate: Date;
}

export function StomachFeelingInput({ onSubmit, selectedDate }: StomachFeelingInputProps) {
  const [stomachFeeling, setStomachFeeling] = useState('');
  const [stomachFeelingOther, setStomachFeelingOther] = useState('');

  const handleSubmit = () => {
    if (!stomachFeeling) {
      return;
    }
    if (stomachFeeling === 'Other' && !stomachFeelingOther.trim()) {
      return;
    }

    const finalContent = stomachFeeling === 'Other' ? stomachFeelingOther : stomachFeeling;
    onSubmit(finalContent);
    
    // Reset form
    setStomachFeeling('');
    setStomachFeelingOther('');
  };

  const feelingOptions = [
    {
      value: 'Good',
      icon: Smile,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      description: 'Feeling normal and comfortable'
    },
    {
      value: 'Bloated',
      icon: Disc,
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      description: 'Feeling full or swollen'
    },
    {
      value: 'Gassy',
      icon: Wind,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      description: 'Excess gas or flatulence'
    },
    {
      value: 'Cramping',
      icon: Zap,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      description: 'Pain or discomfort'
    },
    {
      value: 'Nauseous',
      icon: Frown,
      color: 'bg-red-100',
      iconColor: 'text-red-600',
      description: 'Feeling queasy or sick'
    },
    {
      value: 'Hungry',
      icon: Utensils,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      description: 'Feeling empty or hungry'
    },
    {
      value: 'Other',
      icon: Edit,
      color: 'bg-gray-100',
      iconColor: 'text-gray-600',
      description: 'Describe your feeling'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Stomach Feeling</h2>
        <p className="text-muted-foreground">
          How does your stomach feel?
        </p>
      </div>

      <div className="space-y-4">
        <Label>Select Feeling *</Label>
        <RadioGroup value={stomachFeeling} onValueChange={setStomachFeeling} className="space-y-3">
          {feelingOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => setStomachFeeling(option.value)}
              >
                <RadioGroupItem value={option.value} id={`stomach-${option.value}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 flex items-center justify-center ${option.color} rounded-lg`}>
                      <IconComponent className={`w-6 h-6 ${option.iconColor}`} strokeWidth={2} />
                    </div>
                    <div>
                      <Label htmlFor={`stomach-${option.value}`} className="cursor-pointer">
                        {option.value}
                      </Label>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  {stomachFeeling === 'Other' && option.value === 'Other' && (
                    <div className="mt-3 ml-15">
                      <Input
                        placeholder="Describe how your stomach feels..."
                        value={stomachFeelingOther}
                        onChange={(e) => setStomachFeelingOther(e.target.value)}
                        className="rounded-xl"
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </RadioGroup>

        <Button
          onClick={handleSubmit}
          disabled={!stomachFeeling || (stomachFeeling === 'Other' && !stomachFeelingOther.trim())}
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          Add Entry
        </Button>
      </div>
    </div>
  );
}
