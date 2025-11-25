import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Coffee, Activity, Smile, Moon, Trash2 } from 'lucide-react';
import { LogItem } from '../App';

interface TodayViewProps {
  logs: LogItem[];
  onDeleteLog: (id: string) => void;
}

const topicConfig = {
  breakfast: { icon: Coffee, color: 'bg-orange-100 text-orange-600', badgeVariant: 'default' as const },
  activity: { icon: Activity, color: 'bg-green-100 text-green-600', badgeVariant: 'default' as const },
  mood: { icon: Smile, color: 'bg-yellow-100 text-yellow-600', badgeVariant: 'default' as const },
  sleep: { icon: Moon, color: 'bg-purple-100 text-purple-600', badgeVariant: 'default' as const },
};

export function TodayView({ logs, onDeleteLog }: TodayViewProps) {
  const today = new Date().toISOString().split('T')[0];
  const todayLogs = logs.filter(log => log.date === today);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Entries</CardTitle>
        <CardDescription>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {todayLogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No entries for today yet.</p>
            <p className="text-sm mt-2">Start by adding a new entry!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {todayLogs.map((log) => {
              const config = topicConfig[log.topic];
              const Icon = config.icon;
              return (
                <div
                  key={log.id}
                  className="p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${config.color} flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
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
                      <p className="text-gray-700 whitespace-pre-wrap">{log.content}</p>
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
        )}
      </CardContent>
    </Card>
  );
}
