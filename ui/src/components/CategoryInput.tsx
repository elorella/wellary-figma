import { Category, LogItem } from '../App';
import { FoodCategoryInput } from './FoodCategoryInput';
import { WeightInput } from './WeightInput';
import { TimeInput } from './TimeInput';
import { ActivityInput } from './ActivityInput';
import { WorkingHoursInput } from './WorkingHoursInput';
import { TextCategoryInput } from './TextCategoryInput';
import { PoopyInput } from './PoopyInput';
import { StomachFeelingInput } from './StomachFeelingInput';

interface CategoryInputProps {
  category: Category;
  onAddLog: (category: Category, content: string, imageUrl?: string) => string | void;
  onBack: () => void;
  logs: LogItem[];
  selectedDate: Date;
}

export function CategoryInput({
  category,
  onAddLog,
  onBack,
  logs,
  selectedDate,
}: CategoryInputProps) {
  const handleSubmit = (content: string, imageUrl?: string) => {
    onAddLog(category, content, imageUrl);
  };

  const getCategoryDisplayName = () => {
    const names: Record<Category, string> = {
      'wake-up-time': 'Wake Up Time',
      weight: 'Weight',
      activity: 'Activity',
      shower: 'Shower',
      breakfast: 'Breakfast',
      snacks: 'Snacks',
      dinner: 'Dinner',
      liquid: 'Liquid',
      supplements: 'Supplements',
      poopy: 'Poopy',
      'working-hours': 'Working Hours',
      'stomach-feeling': 'Stomach Feeling',
      'anything-else': 'Anything Else',
      'wind-down': 'Wind Down',
      sleep: 'Sleep',
    };
    return names[category] || category;
  };

  const renderInput = () => {
    // Food categories
    if (category === 'breakfast' || category === 'snacks' || category === 'dinner') {
      return (
        <FoodCategoryInput
          category={category}
          onSubmit={handleSubmit}
          selectedDate={selectedDate}
        />
      );
    }

    // Weight
    if (category === 'weight') {
      return (
        <WeightInput
          onSubmit={handleSubmit}
          logs={logs}
          selectedDate={selectedDate}
        />
      );
    }

    // Time-only categories
    if (
      category === 'wake-up-time' ||
      category === 'shower' ||
      category === 'wind-down' ||
      category === 'sleep'
    ) {
      return (
        <TimeInput
          category={category}
          onSubmit={handleSubmit}
          selectedDate={selectedDate}
        />
      );
    }

    // Activity
    if (category === 'activity') {
      return (
        <ActivityInput
          onSubmit={handleSubmit}
          selectedDate={selectedDate}
        />
      );
    }

    // Working hours
    if (category === 'working-hours') {
      return (
        <WorkingHoursInput
          onSubmit={handleSubmit}
          selectedDate={selectedDate}
        />
      );
    }

    // Text categories
    if (category === 'liquid' || category === 'supplements' || category === 'anything-else') {
      return (
        <TextCategoryInput
          category={category}
          onSubmit={handleSubmit}
          selectedDate={selectedDate}
        />
      );
    }

    // Poopy
    if (category === 'poopy') {
      return (
        <PoopyInput
          onSubmit={handleSubmit}
          selectedDate={selectedDate}
        />
      );
    }

    // Stomach feeling
    if (category === 'stomach-feeling') {
      return (
        <StomachFeelingInput
          onSubmit={handleSubmit}
          selectedDate={selectedDate}
        />
      );
    }

    return null;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-card rounded-2xl border p-8 shadow-sm">
        {renderInput()}
      </div>
    </div>
  );
}