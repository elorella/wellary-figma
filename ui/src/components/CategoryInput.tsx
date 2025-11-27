import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft } from 'lucide-react';
import { Category, LogItem } from '../App';
import { toast } from 'sonner@2.0.3';
import { ProfileDropdown } from './ProfileDropdown';

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

const categoryLabels: Record<Category, string> = {
  'weight': 'Weight',
  'wake-up-time': 'Wake up time',
  'activity': 'Activity',
  'shower': 'Shower',
  'breakfast': 'Breakfast',
  'snacks': 'Snacks',
  'dinner': 'Dinner',
  'liquid': 'Liquid',
  'supplements': 'Supplements',
  'poopy': 'Poopy',
  'working-hours': 'Working hours',
  'stomach-feeling': 'Stomach feeling',
  'anything-else': 'Anything else',
  'wind-down': 'Wind down',
  'sleep': 'Sleep',
};

const categoryPlaceholders: Record<Category, string> = {
  'weight': 'e.g., 75.5 kg',
  'wake-up-time': 'e.g., 07:00',
  'activity': 'e.g., 30 min jog, gym workout',
  'shower': 'e.g., Morning shower',
  'breakfast': 'e.g., Oats, banana, green tea',
  'snacks': 'e.g., Apple, nuts',
  'dinner': 'e.g., Grilled chicken, vegetables, rice',
  'liquid': 'e.g., 2L water, coffee',
  'supplements': 'e.g., Vitamin D, Omega-3',
  'poopy': 'e.g., Normal',
  'working-hours': 'e.g., 9:00 - 17:00',
  'stomach-feeling': 'e.g., Good, no discomfort',
  'anything-else': 'e.g., Felt energetic today',
  'wind-down': 'e.g., Read for 30 minutes',
  'sleep': 'e.g., 23:00 - 07:00, 8 hours',
};

const activityOptions = [
  'Walking',
  'Running',
  'Cycling',
  'Swimming',
  'Gym workout',
  'Yoga',
  'Stretching',
  'Sports',
  'Others',
];

export function CategoryInput({ category, onAddLog, onBack, logs, selectedDate, userEmail, onPageChange, onLogout }: CategoryInputProps) {
  // Find previous weight value if it exists
  const getPreviousWeight = () => {
    if (category !== 'weight') return '';
    
    // Get all weight logs before the selected date, sorted by date descending
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    const weightLogs = logs
      .filter(log => log.category === 'weight' && log.date < selectedDateStr)
      .sort((a, b) => b.timestamp - a.timestamp);
    
    // Return the most recent weight
    return weightLogs.length > 0 ? weightLogs[0].content : '';
  };
  
  const [content, setContent] = useState(() => {
    // Initialize with previous weight if available
    return category === 'weight' ? getPreviousWeight() : '';
  });
  
  // Activity-specific states
  const [activityType, setActivityType] = useState('');
  const [activityOther, setActivityOther] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  
  // Shower-specific state
  const [showerTime, setShowerTime] = useState('');
  
  // Meal-specific states (breakfast, snacks, dinner)
  const [mealTime, setMealTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // Format: HH:MM
  });
  const [mealDescription, setMealDescription] = useState('');
  
  // Working hours specific states
  const [workStartTime, setWorkStartTime] = useState('');
  const [workEndTime, setWorkEndTime] = useState('');
  
  // Wind down and sleep specific states
  const [windDownTime, setWindDownTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // Format: HH:MM
  });
  const [sleepTime, setSleepTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // Format: HH:MM
  });
  
  // Wake up time specific state
  const [wakeUpTime, setWakeUpTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // Format: HH:MM
  });

  const handleSubmit = () => {
    let finalContent = content;
    
    // Special handling for activity
    if (category === 'activity') {
      if (!activityType) {
        toast.error('Please select an activity');
        return;
      }
      if (!startHour || !endHour) {
        toast.error('Please enter start and end time');
        return;
      }
      if (activityType === 'Others' && !activityOther.trim()) {
        toast.error('Please specify the activity');
        return;
      }
      
      const activity = activityType === 'Others' ? activityOther : activityType;
      finalContent = `${startHour}–${endHour} ${activity}`;
    } else if (category === 'shower') {
      // Special handling for shower
      if (!showerTime) {
        toast.error('Please select a time');
        return;
      }
      finalContent = showerTime;
    } else if (category === 'breakfast' || category === 'snacks' || category === 'dinner') {
      // Special handling for meals
      if (!mealTime) {
        toast.error('Please select a time');
        return;
      }
      if (!mealDescription.trim()) {
        toast.error('Please describe what you ate');
        return;
      }
      finalContent = `${mealTime} ${mealDescription}`;
    } else if (category === 'working-hours') {
      // Special handling for working hours
      if (!workStartTime || !workEndTime) {
        toast.error('Please enter start and end time');
        return;
      }
      finalContent = `${workStartTime}–${workEndTime}`;
    } else if (category === 'wind-down') {
      // Special handling for wind down
      if (!windDownTime) {
        toast.error('Please select a time');
        return;
      }
      finalContent = windDownTime;
    } else if (category === 'sleep') {
      // Special handling for sleep
      if (!sleepTime) {
        toast.error('Please select a time');
        return;
      }
      finalContent = sleepTime;
    } else if (category === 'wake-up-time') {
      // Special handling for wake up time
      if (!wakeUpTime) {
        toast.error('Please select a time');
        return;
      }
      finalContent = wakeUpTime;
    } else if (category === 'weight') {
      // Special handling for weight - validate numeric input
      if (!content.trim()) {
        toast.error('Please enter your weight');
        return;
      }
      // Replace comma with period for parsing (support both decimal separators)
      const normalizedContent = content.replace(',', '.');
      const weightValue = parseFloat(normalizedContent);
      if (isNaN(weightValue) || weightValue <= 0) {
        toast.error('Please enter a valid numeric weight');
        return;
      }
      finalContent = content;
    } else {
      if (!content.trim()) {
        toast.error('Please enter some content');
        return;
      }
    }

    const result = onAddLog(category, finalContent);
    
    // Check if weight loss celebration
    if (result && result.startsWith('celebration:')) {
      const gramsLost = result.split(':')[1];
      toast.success(`🎉 Entry added! You have lost ${gramsLost} grams! 🎊`, {
        duration: 5000,
      });
    } else {
      toast.success('Entry added successfully!');
    }
    
    setContent('');
    setActivityType('');
    setActivityOther('');
    setStartHour('');
    setEndHour('');
    setShowerTime('');
    const now = new Date();
    setMealTime(now.toTimeString().slice(0, 5));
    setMealDescription('');
    setWorkStartTime('');
    setWorkEndTime('');
    setWindDownTime(now.toTimeString().slice(0, 5));
    setSleepTime(now.toTimeString().slice(0, 5));
    setWakeUpTime(now.toTimeString().slice(0, 5));
    onBack();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="-ml-2 hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={2} />
          Back
        </Button>
        <ProfileDropdown 
          userEmail={userEmail}
          onPageChange={onPageChange}
          onLogout={onLogout}
        />
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
        <div className="mb-6">
          <h2 className="text-foreground mb-1">{categoryLabels[category]}</h2>
          <p className="text-muted-foreground text-sm">Add your entry for today</p>
        </div>
        <div className="space-y-5">
          {category === 'activity' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="activity-type">Activity Type</Label>
                <Select value={activityType} onValueChange={setActivityType}>
                  <SelectTrigger id="activity-type" className="rounded-xl">
                    <SelectValue placeholder="Select an activity" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {activityType === 'Others' && (
                <div className="space-y-2">
                  <Label htmlFor="activity-other">Specify Activity</Label>
                  <Input
                    id="activity-other"
                    placeholder="e.g., Dancing, Hiking"
                    value={activityOther}
                    onChange={(e) => setActivityOther(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-hour">Start Time</Label>
                  <Input
                    id="start-hour"
                    type="time"
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-hour">End Time</Label>
                  <Input
                    id="end-hour"
                    type="time"
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </>
          ) : category === 'shower' ? (
            <div className="space-y-2">
              <Label htmlFor="shower-time">Time</Label>
              <Input
                id="shower-time"
                type="time"
                value={showerTime}
                onChange={(e) => setShowerTime(e.target.value)}
                className="rounded-xl"
                autoFocus
              />
            </div>
          ) : category === 'breakfast' || category === 'snacks' || category === 'dinner' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="meal-time">Time</Label>
                <Input
                  id="meal-time"
                  type="time"
                  value={mealTime}
                  onChange={(e) => setMealTime(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meal-description">What did you eat?</Label>
                <Textarea
                  id="meal-description"
                  placeholder={categoryPlaceholders[category]}
                  value={mealDescription}
                  onChange={(e) => setMealDescription(e.target.value)}
                  rows={4}
                  autoFocus
                  className="rounded-xl"
                />
              </div>
            </>
          ) : category === 'working-hours' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="work-start-time">Start Time</Label>
                <Input
                  id="work-start-time"
                  type="time"
                  value={workStartTime}
                  onChange={(e) => setWorkStartTime(e.target.value)}
                  className="rounded-xl"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="work-end-time">End Time</Label>
                <Input
                  id="work-end-time"
                  type="time"
                  value={workEndTime}
                  onChange={(e) => setWorkEndTime(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>
          ) : category === 'wind-down' ? (
            <div className="space-y-2">
              <Label htmlFor="wind-down-time">Time</Label>
              <Input
                id="wind-down-time"
                type="time"
                value={windDownTime}
                onChange={(e) => setWindDownTime(e.target.value)}
                className="rounded-xl"
                autoFocus
              />
            </div>
          ) : category === 'sleep' ? (
            <div className="space-y-2">
              <Label htmlFor="sleep-time">Time</Label>
              <Input
                id="sleep-time"
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                className="rounded-xl"
                autoFocus
              />
            </div>
          ) : category === 'wake-up-time' ? (
            <div className="space-y-2">
              <Label htmlFor="wake-up-time">Time</Label>
              <Input
                id="wake-up-time"
                type="time"
                value={wakeUpTime}
                onChange={(e) => setWakeUpTime(e.target.value)}
                className="rounded-xl"
                autoFocus
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="content">Entry</Label>
              {category === 'weight' ? (
                <Input
                  id="content"
                  type="text"
                  inputMode="decimal"
                  placeholder={categoryPlaceholders[category]}
                  value={content}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow numbers and both decimal separators (. and ,)
                    if (value === '' || /^[\d,\.]*$/.test(value)) {
                      setContent(value);
                    }
                  }}
                  autoFocus
                  className="rounded-xl"
                />
              ) : category === 'wake-up-time' ? (
                <Input
                  id="content"
                  placeholder={categoryPlaceholders[category]}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  autoFocus
                  className="rounded-xl"
                />
              ) : (
                <Textarea
                  id="content"
                  placeholder={categoryPlaceholders[category]}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  autoFocus
                  className="rounded-xl"
                />
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button onClick={handleSubmit} className="flex-1 rounded-xl bg-primary hover:bg-primary/90">
              Add Entry
            </Button>
            <Button variant="outline" onClick={onBack} className="flex-1 rounded-xl">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}