import { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Circle, Minus } from 'lucide-react';

interface PoopyInputProps {
  onSubmit: (content: string) => void;
  selectedDate: Date;
}

export function PoopyInput({ onSubmit, selectedDate }: PoopyInputProps) {
  const [poopyType, setPoopyType] = useState('');

  const handleSubmit = () => {
    if (!poopyType) {
      return;
    }

    onSubmit(poopyType);
    setPoopyType('');
  };

  const poopyTypes = [
    {
      value: 'Type 1 - Separate hard lumps',
      icon: <Circle className="w-6 h-6" />,
      color: 'bg-amber-100',
      iconColor: 'text-amber-600',
      description: 'Hard to pass (constipation)',
      health: 'Concerning'
    },
    {
      value: 'Type 2 - Lumpy and sausage-like',
      icon: <Minus className="w-6 h-6" />,
      color: 'bg-amber-100',
      iconColor: 'text-amber-600',
      description: 'Slightly hard (constipation)',
      health: 'Concerning'
    },
    {
      value: 'Type 3 - Sausage-like with cracks',
      icon: <Minus className="w-6 h-6" />,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      description: 'Normal and healthy',
      health: 'Ideal'
    },
    {
      value: 'Type 4 - Smooth and soft',
      icon: <Minus className="w-6 h-6" />,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      description: 'Normal and healthy',
      health: 'Ideal'
    },
    {
      value: 'Type 5 - Soft blobs',
      icon: <Circle className="w-6 h-6" />,
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      description: 'Lacks fiber',
      health: 'Monitor'
    },
    {
      value: 'Type 6 - Mushy with ragged edges',
      icon: <Circle className="w-6 h-6" />,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      description: 'Mild diarrhea',
      health: 'Monitor'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Poopy</h2>
        <p className="text-muted-foreground">
          Select your stool type based on the Bristol Stool Chart
        </p>
      </div>

      <div className="space-y-4">
        <Label>Select Type *</Label>
        <RadioGroup value={poopyType} onValueChange={setPoopyType} className="space-y-3">
          {poopyTypes.map((type) => (
            <div
              key={type.value}
              className="flex items-center space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => setPoopyType(type.value)}
            >
              <RadioGroupItem value={type.value} id={type.value} />
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-12 h-12 flex items-center justify-center ${type.color} rounded-lg`}>
                  <span className={type.iconColor}>{type.icon}</span>
                </div>
                <div className="flex-1">
                  <Label htmlFor={type.value} className="cursor-pointer">
                    {type.value.split(' - ')[0]}
                  </Label>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs ${
                  type.health === 'Ideal' ? 'bg-green-100 text-green-700' :
                  type.health === 'Concerning' ? 'bg-amber-100 text-amber-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {type.health}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>

        <Button
          onClick={handleSubmit}
          disabled={!poopyType}
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          Add Entry
        </Button>
      </div>
    </div>
  );
}
