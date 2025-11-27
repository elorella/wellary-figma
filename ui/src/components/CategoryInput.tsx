import { ArrowLeft } from 'lucide-react';
import { Category, LogItem } from '../App';
import { Button } from './ui/button';
import { ProfileDropdown } from './ProfileDropdown';
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
  onAddLog: (category: Category, content: string) => string | void;
  onBack: () => void;
  logs: LogItem[];
  selectedDate: Date;
  userEmail?: string;
  onPageChange?: (page: string) => void;
  onLogout?: () => void;
}

export function CategoryInput({
  category,
  onAddLog,
  onBack,
  logs,
  selectedDate,
  userEmail,
  onPageChange,
  onLogout,
}: CategoryInputProps) {
  const handleSubmit = (content: string) => {
    onAddLog(category, content);
  };

  const getCategoryDisplayName = () => {
    const names: Record<Category, string> = {
      weight: 'Weight',
      'wake-up-time': 'Wake Up Time',
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          {userEmail && (
            <ProfileDropdown
              userEmail={userEmail}
              onPageChange={onPageChange}
              onLogout={onLogout}
            />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl py-8">
        <div className="bg-card rounded-2xl border p-8 shadow-sm">
          {renderInput()}
        </div>
      </main>
    </div>
  );
}
