import { useState } from 'react';
import { Category } from '../../App';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface TextCategoryInputProps {
  category: Category;
  onSubmit: (content: string) => void;
  selectedDate: Date;
}

export function TextCategoryInput({ category, onSubmit, selectedDate }: TextCategoryInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) {
      return;
    }

    onSubmit(content);
    setContent('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && category !== 'anything-else') {
      handleSubmit();
    }
  };

  const getCategoryDisplayName = () => {
    switch (category) {
      case 'liquid': return 'Liquid';
      case 'supplements': return 'Supplements';
      case 'anything-else': return 'Anything Else';
      default: return category;
    }
  };

  const getPlaceholder = () => {
    switch (category) {
      case 'liquid': return 'e.g., 2L water, 1 cup coffee';
      case 'supplements': return 'e.g., Vitamin D, Magnesium citrate';
      case 'anything-else': return 'Any notes or observations...';
      default: return 'Enter text';
    }
  };

  const getDescription = () => {
    switch (category) {
      case 'liquid': return 'Track your liquid intake';
      case 'supplements': return 'Log your supplements and vitamins';
      case 'anything-else': return 'Add any other notes or observations';
      default: return '';
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
          <Label htmlFor="content">Entry *</Label>
          {category === 'anything-else' ? (
            <Textarea
              id="content"
              placeholder={getPlaceholder()}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="rounded-xl min-h-[120px]"
            />
          ) : (
            <Input
              id="content"
              type="text"
              placeholder={getPlaceholder()}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyPress={handleKeyPress}
              className="rounded-xl"
            />
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
        >
          Add Entry
        </Button>
      </div>
    </div>
  );
}
