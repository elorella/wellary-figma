import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Coffee, Activity, Smile, Moon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LogEntryProps {
  onAddLog: (topic: 'breakfast' | 'activity' | 'mood' | 'sleep', content: string) => void;
}

const topics = [
  { value: 'breakfast' as const, label: 'Breakfast', icon: Coffee, color: 'bg-orange-100 text-orange-600' },
  { value: 'activity' as const, label: 'Activity', icon: Activity, color: 'bg-green-100 text-green-600' },
  { value: 'mood' as const, label: 'Mood', icon: Smile, color: 'bg-yellow-100 text-yellow-600' },
  { value: 'sleep' as const, label: 'Sleep', icon: Moon, color: 'bg-purple-100 text-purple-600' },
];

export function LogEntry({ onAddLog }: LogEntryProps) {
  const [selectedTopic, setSelectedTopic] = useState<typeof topics[number]['value'] | null>(null);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!selectedTopic) {
      toast.error('Please select a topic');
      return;
    }
    if (!content.trim()) {
      toast.error('Please enter some content');
      return;
    }

    onAddLog(selectedTopic, content);
    setContent('');
    setSelectedTopic(null);
    toast.success('Log entry added successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Log Entry</CardTitle>
        <CardDescription>Select a topic and add your entry for today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Select Topic</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <button
                  key={topic.value}
                  onClick={() => setSelectedTopic(topic.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedTopic === topic.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`p-2 rounded-full ${topic.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm">{topic.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Entry Details</Label>
          <Textarea
            id="content"
            placeholder={
              selectedTopic === 'breakfast'
                ? 'What did you have for breakfast?'
                : selectedTopic === 'activity'
                ? 'What activities did you do?'
                : selectedTopic === 'mood'
                ? 'How are you feeling today?'
                : selectedTopic === 'sleep'
                ? 'How did you sleep?'
                : 'Write your entry here...'
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Add Entry
        </Button>
      </CardContent>
    </Card>
  );
}
