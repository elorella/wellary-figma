import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Coffee, Activity, Smile, Moon, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { LogItem } from '../App';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface HistoryViewProps {
  logs: LogItem[];
  onDeleteLog: (id: string) => void;
}

const topicConfig = {
  breakfast: { icon: Coffee, color: 'bg-orange-100 text-orange-600', badgeVariant: 'default' as const },
  activity: { icon: Activity, color: 'bg-green-100 text-green-600', badgeVariant: 'default' as const },
  mood: { icon: Smile, color: 'bg-yellow-100 text-yellow-600', badgeVariant: 'default' as const },
  sleep: { icon: Moon, color: 'bg-purple-100 text-purple-600', badgeVariant: 'default' as const },
};

export function HistoryView({ logs, onDeleteLog }: HistoryViewProps) {
  const [openDates, setOpenDates] = useState<Set<string>>(new Set());

  // Group logs by date
  const logsByDate = logs.reduce((acc, log) => {
    if (!acc[log.date]) {
      acc[log.date] = [];
    }
    acc[log.date].push(log);
    return acc;
  }, {} as Record<string, LogItem[]>);

  // Sort dates in descending order
  const sortedDates = Object.keys(logsByDate).sort((a, b) => b.localeCompare(a));

  const toggleDate = (date: string) => {
    const newOpenDates = new Set(openDates);
    if (newOpenDates.has(date)) {
      newOpenDates.delete(date);
    } else {
      newOpenDates.add(date);
    }
    setOpenDates(newOpenDates);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (dateString === today) {
      return 'Today';
    } else if (dateString === yesterday) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>History</CardTitle>
        <CardDescription>View all your past entries</CardDescription>
      </CardHeader>
      <CardContent>
        {sortedDates.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No entries yet.</p>
            <p className="text-sm mt-2">Start logging to see your history!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedDates.map((date) => {
              const dateLogs = logsByDate[date];
              const isOpen = openDates.has(date);

              return (
                <Collapsible key={date} open={isOpen} onOpenChange={() => toggleDate(date)}>
                  <div className="border rounded-lg bg-white">
                    <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-left">{formatDate(date)}</p>
                          <p className="text-sm text-gray-500">
                            {dateLogs.length} {dateLogs.length === 1 ? 'entry' : 'entries'}
                          </p>
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-3">
                        {dateLogs.map((log) => {
                          const config = topicConfig[log.topic];
                          const Icon = config.icon;
                          return (
                            <div
                              key={log.id}
                              className="p-3 rounded-lg border bg-gray-50"
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-full ${config.color} flex-shrink-0`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant={config.badgeVariant} className="capitalize">
                                      {log.topic}
                                    </Badge>
                                    <span className="text-sm text-gray-500">
                                      {new Date(log.timestamp).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {log.content}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => onDeleteLog(log.id)}
                                  className="flex-shrink-0 text-gray-400 hover:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
