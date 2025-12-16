import {
  Circle,
  Sunrise,
  Zap,
  Droplet,
  Coffee,
  Cookie,
  Utensils,
  Droplets,
  Pill,
  CircleDot,
  Clock,
  Heart,
  FileText,
  CloudMoon,
  Moon,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Category, LogItem } from "../App";
import { useState } from "react";

interface LandingPageProps {
  logs: LogItem[];
  selectedDate: Date;
  onCategoryClick: (category: Category) => void;
  onDeleteLog: (id: string) => void;
  onDateChange: (date: Date) => void;
  isSidebarCollapsed: boolean;
  onSidebarToggle: () => void;
  onPageChange: (page: string) => void;
  userEmail?: string;
  onLogout?: () => void;
}

interface CategoryConfig {
  category: Category;
  label: string;
  icon: any;
  color: string;
  activeColor: string;
}

const categories: CategoryConfig[] = [
  {
    category: "wake-up-time",
    label: "Wake up time",
    icon: Sunrise,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-lg shadow-amber-200",
  },
  {
    category: "weight",
    label: "Weight",
    icon: Circle,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-200",
  },
  {
    category: "activity",
    label: "Activity",
    icon: Zap,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-yellow-200",
  },
  {
    category: "shower",
    label: "Shower",
    icon: Droplet,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-200",
  },
  {
    category: "breakfast",
    label: "Breakfast",
    icon: Coffee,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-lg shadow-amber-200",
  },
  {
    category: "snacks",
    label: "Snacks",
    icon: Cookie,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-200",
  },
  {
    category: "dinner",
    label: "Dinner",
    icon: Utensils,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-lg shadow-rose-200",
  },
  {
    category: "liquid",
    label: "Liquid",
    icon: Droplets,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-blue-400 to-cyan-500 text-white shadow-lg shadow-blue-200",
  },
  {
    category: "supplements",
    label: "Supplements",
    icon: Pill,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-200",
  },
  {
    category: "poopy",
    label: "Poopy",
    icon: CircleDot,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-200",
  },
  {
    category: "working-hours",
    label: "Working hours",
    icon: Clock,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-slate-500 to-gray-600 text-white shadow-lg shadow-slate-200",
  },
  {
    category: "stomach-feeling",
    label: "Stomach feeling",
    icon: Heart,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-lg shadow-pink-200",
  },
  {
    category: "anything-else",
    label: "Anything else",
    icon: FileText,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-violet-400 to-purple-500 text-white shadow-lg shadow-violet-200",
  },
  {
    category: "wind-down",
    label: "Wind down",
    icon: CloudMoon,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-indigo-400 to-purple-500 text-white shadow-lg shadow-indigo-200",
  },
  {
    category: "sleep",
    label: "Sleep",
    icon: Moon,
    color: "bg-gray-100 text-gray-500",
    activeColor:
      "bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-200",
  },
];

export function LandingPage({
  logs,
  selectedDate,
  onCategoryClick,
  onDeleteLog,
  onDateChange,
  isSidebarCollapsed,
  onSidebarToggle,
  onPageChange,
  userEmail = "user@example.com",
  onLogout,
}: LandingPageProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const selectedDateStr = selectedDate
    .toISOString()
    .split("T")[0];
  const selectedDateLogs = logs.filter(
    (log) => log.date === selectedDateStr,
  );

  // Get categories that have entries for selected date
  const categoriesWithEntries = new Set(
    selectedDateLogs.map((log) => log.category),
  );

  // Sort logs chronologically
  const sortedLogs = [...selectedDateLogs].sort(
    (a, b) => a.timestamp - b.timestamp,
  );

  const formatDate = () => {
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateShort = () => {
    return selectedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
      setIsCalendarOpen(false);
    }
  };

  const isNextDayDisabled = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    return nextDay > today;
  };

  const disableFutureDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate > today;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getCategoryLabel = (category: Category) => {
    return (
      categories.find((c) => c.category === category)?.label ||
      category
    );
  };

  const getUserInitials = () => {
    if (!userEmail) return "U";
    const firstLetter = userEmail.charAt(0).toUpperCase();
    return firstLetter;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 pb-8">
      {/* Date Header with Picker */}
      <div className="mb-8 mt-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-foreground mb-1">
              Merhaba {getUserInitials()}.
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPreviousDay}
                className="h-9 w-9 rounded-xl hover:bg-gray-100"
              >
                <ChevronLeft
                  className="w-5 h-5"
                  strokeWidth={2}
                />
              </Button>

              <Popover
                open={isCalendarOpen}
                onOpenChange={setIsCalendarOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="px-4 rounded-xl hover:bg-gray-50 border-gray-200"
                  >
                    <CalendarIcon
                      className="w-4 h-4 mr-2"
                      strokeWidth={2}
                    />
                    {formatDateShort()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 rounded-2xl"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleCalendarSelect}
                    initialFocus
                    disabled={(date) =>
                      disableFutureDates(date)
                    }
                  />
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextDay}
                className="h-9 w-9 rounded-xl hover:bg-gray-100"
                disabled={isNextDayDisabled()}
              >
                <ChevronRight
                  className="w-5 h-5"
                  strokeWidth={2}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Thumbnails */}
      <div className="mb-6">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const hasEntry = categoriesWithEntries.has(
              cat.category,
            );
            const isActive = !hasEntry;

            return (
              <button
                key={cat.category}
                onClick={() => onCategoryClick(cat.category)}
                className={`p-4 rounded-2xl transition-all ${
                  isActive
                    ? `${cat.activeColor} hover:scale-105 transform`
                    : `${cat.color} hover:bg-gray-200`
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon
                    className="w-6 h-6 md:w-7 md:h-7"
                    strokeWidth={2}
                  />
                  <span className="text-xs text-center leading-tight">
                    {cat.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Log Summary */}
      <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
        <h2 className="mb-4 text-foreground">Log Entries</h2>

        {sortedLogs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No entries logged for this date</p>
            <p className="text-sm mt-2">
              Tap a category above to start logging
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {sortedLogs.map((log) => {
              const categoryConfig = categories.find(
                (c) => c.category === log.category,
              );
              const Icon = categoryConfig?.icon;

              return (
                <div
                  key={log.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  {Icon && (
                    <div
                      className={`p-2 rounded-xl ${categoryConfig?.color} flex-shrink-0`}
                    >
                      <Icon
                        className="w-4 h-4"
                        strokeWidth={2}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-muted-foreground text-sm flex-shrink-0">
                        {formatTime(log.timestamp)}
                      </span>
                      <span className="text-muted-foreground/40">
                        –
                      </span>
                      <span className="text-foreground text-sm flex-shrink-0 font-medium">
                        {getCategoryLabel(log.category)}
                      </span>
                      <span className="text-muted-foreground/40">
                        –
                      </span>
                      <span className="text-foreground text-sm truncate">
                        {log.content}
                      </span>
                    </div>
                    {log.imageUrl && (
                      <div className="mt-2">
                        <img
                          src={log.imageUrl}
                          alt={`${log.category} photo`}
                          className="rounded-lg max-h-32 object-cover border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteLog(log.id)}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive h-8 w-8 rounded-lg"
                  >
                    <Trash2
                      className="w-4 h-4"
                      strokeWidth={2}
                    />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}