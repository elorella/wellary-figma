import { useState } from "react";
import { QuickTimeModal } from "./QuickTimeModal";
import { QuickTextModal } from "./QuickTextModal";
import { QuickActivityModal } from "./QuickActivityModal";
import { QuickFoodModal } from "./QuickFoodModal";
import { QuickWeightModal } from "./QuickWeightModal";
import { QuickStomachFeelingModal } from "./QuickStomachFeelingModal";
import { QuickSupplementsModal } from "./QuickSupplementsModal";
import { QuickNotesModal } from "./QuickNotesModal";
import { QuickPoopyModal } from "./QuickPoopyModal";
import { QuickWorkingHoursModal } from "./QuickWorkingHoursModal";
import { QuickSleepModal } from "./QuickSleepModal";
import { ProfileDropdown } from "./ProfileDropdown";
import { Logo } from "./Logo";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  Circle, 
  Heart, 
  Trash2, 
  FileText,
  Coffee,
  Cookie,
  Utensils,
  Zap,
  Droplets,
  Pill,
  Sunrise,
  Droplet,
  CloudMoon,
  Clock,
  CircleDot
} from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Category, LogItem } from "../App";

interface LandingPageProps {
  logs: LogItem[];
  selectedDate: Date;
  onCategoryClick: (category: Category) => void;
  onDeleteLog: (id: string) => void;
  onDateChange: (date: Date) => void;
  userEmail?: string;
  onLogout?: () => void;
  onAddLog?: (category: Category, content: string, imageUrl?: string) => void;
}

interface CategoryConfig {
  category: Category;
  label: string;
  icon: any;
  color: string;
  bgColor: string;
  description?: string;
}

const categoryGroups = {
  meals: [
    {
      category: "breakfast" as Category,
      label: "Breakfast",
      icon: Coffee,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Morning meal",
    },
    {
      category: "snacks" as Category,
      label: "Snacks",
      icon: Cookie,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      description: "Between meals",
    },
    {
      category: "dinner" as Category,
      label: "Dinner",
      icon: Utensils,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Evening meal",
    },
  ],
  wellness: [
    {
      category: "activity" as Category,
      label: "Activity",
      icon: Zap,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Physical activity",
    },
  ],
  hydration: [
    {
      category: "liquid" as Category,
      label: "Hydration",
      icon: Droplets,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      description: "Water intake",
    },
    {
      category: "supplements" as Category,
      label: "Supplements",
      icon: Pill,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Vitamins & supplements",
    },
  ],
  routine: [
    {
      category: "wake-up-time" as Category,
      label: "Wake Up",
      icon: Sunrise,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Morning routine",
    },
    {
      category: "shower" as Category,
      label: "Shower",
      icon: Droplet,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      description: "Personal hygiene",
    },
    {
      category: "wind-down" as Category,
      label: "Wind Down",
      icon: CloudMoon,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      description: "Evening routine",
    },
  ],
  other: [
    {
      category: "working-hours" as Category,
      label: "Work",
      icon: Clock,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      description: "Working hours",
    },
    {
      category: "stomach-feeling" as Category,
      label: "Digestion",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      description: "How you feel",
    },
    {
      category: "poopy" as Category,
      label: "Bowel",
      icon: CircleDot,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Digestive health",
    },
    {
      category: "anything-else" as Category,
      label: "Notes",
      icon: FileText,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      description: "Additional notes",
    },
  ],
};

export function LandingPage({
  logs,
  selectedDate,
  onCategoryClick,
  onDeleteLog,
  onDateChange,
  userEmail = "user@example.com",
  onLogout,
  onAddLog,
}: LandingPageProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isShowerModalOpen, setIsShowerModalOpen] = useState(false);
  const [isWakeUpModalOpen, setIsWakeUpModalOpen] = useState(false);
  const [isSleepModalOpen, setIsSleepModalOpen] = useState(false);
  const [isWindDownModalOpen, setIsWindDownModalOpen] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [isStomachFeelingModalOpen, setIsStomachFeelingModalOpen] = useState(false);
  const [isSupplementsModalOpen, setIsSupplementsModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isPoopyModalOpen, setIsPoopyModalOpen] = useState(false);
  const [isWorkingHoursModalOpen, setIsWorkingHoursModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const selectedDateStr = selectedDate.toISOString().split("T")[0];
  const selectedDateLogs = logs.filter((log) => log.date === selectedDateStr);

  // Get categories that have entries for selected date
  const categoriesWithEntries = new Set(
    selectedDateLogs.map((log) => log.category)
  );

  // Sort logs chronologically
  const sortedLogs = [...selectedDateLogs].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  const formatDateLong = () => {
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
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

  const isToday = () => {
    const today = new Date();
    return selectedDate.toDateString() === today.toDateString();
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

  const isNextDayDisabled = () => {
    const tomorrow = new Date(selectedDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const today = new Date();
    return tomorrow > today;
  };

  const disableFutureDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
      setIsCalendarOpen(false);
    }
  };

  const getUserInitials = () => {
    if (!userEmail) return "U";
    const firstLetter = userEmail.charAt(0).toUpperCase();
    return firstLetter;
  };

  const handleCategoryClickWithModal = (category: Category) => {
    if (category === "shower") {
      setIsShowerModalOpen(true);
    } else if (category === "wake-up-time") {
      setIsWakeUpModalOpen(true);
    } else if (category === "sleep") {
      setIsSleepModalOpen(true);
    } else if (category === "wind-down") {
      setIsWindDownModalOpen(true);
    } else if (category === "liquid") {
      setSelectedCategory(category);
      setIsTextModalOpen(true);
    } else if (category === "activity") {
      setIsActivityModalOpen(true);
    } else if (category === "breakfast" || category === "snacks" || category === "dinner") {
      setSelectedCategory(category);
      setIsFoodModalOpen(true);
    } else if (category === "weight") {
      setIsWeightModalOpen(true);
    } else if (category === "stomach-feeling") {
      setIsStomachFeelingModalOpen(true);
    } else if (category === "supplements") {
      setIsSupplementsModalOpen(true);
    } else if (category === "anything-else") {
      setIsNotesModalOpen(true);
    } else if (category === "poopy") {
      setIsPoopyModalOpen(true);
    } else if (category === "working-hours") {
      setIsWorkingHoursModalOpen(true);
    } else {
      onCategoryClick(category);
    }
  };

  const handleMealsClick = () => {
    // Determine which meal to log based on what's missing
    const hasMeal = (mealType: Category) => categoriesWithEntries.has(mealType);
    
    // Check current time to suggest appropriate meal
    const currentHour = new Date().getHours();
    
    // If breakfast not logged and it's before 2pm, suggest breakfast
    if (!hasMeal("breakfast") && currentHour < 14) {
      setSelectedCategory("breakfast");
      setIsFoodModalOpen(true);
    }
    // If snacks not logged and it's between 2pm-6pm, suggest snacks
    else if (!hasMeal("snacks") && currentHour >= 14 && currentHour < 18) {
      setSelectedCategory("snacks");
      setIsFoodModalOpen(true);
    }
    // If dinner not logged and it's after 6pm, suggest dinner
    else if (!hasMeal("dinner") && currentHour >= 18) {
      setSelectedCategory("dinner");
      setIsFoodModalOpen(true);
    }
    // Otherwise, default to the first missing meal
    else if (!hasMeal("breakfast")) {
      setSelectedCategory("breakfast");
      setIsFoodModalOpen(true);
    } else if (!hasMeal("snacks")) {
      setSelectedCategory("snacks");
      setIsFoodModalOpen(true);
    } else if (!hasMeal("dinner")) {
      setSelectedCategory("dinner");
      setIsFoodModalOpen(true);
    }
    // If all meals logged, default to breakfast to allow adding another
    else {
      setSelectedCategory("breakfast");
      setIsFoodModalOpen(true);
    }
  };

  const handleShowerSubmit = (time: string) => {
    if (onAddLog) {
      onAddLog("shower", time);
    }
  };

  const handleWakeUpSubmit = (time: string) => {
    if (onAddLog) {
      onAddLog("wake-up-time", time);
    }
  };

  const handleSleepSubmit = (time: string) => {
    if (onAddLog) {
      onAddLog("sleep", time);
    }
  };

  const handleWindDownSubmit = (time: string) => {
    if (onAddLog) {
      onAddLog("wind-down", time);
    }
  };

  const handleTextSubmit = (content: string) => {
    if (onAddLog && selectedCategory) {
      onAddLog(selectedCategory, content);
    }
    setIsTextModalOpen(false);
  };

  const handleActivitySubmit = (content: string) => {
    if (onAddLog) {
      onAddLog("activity", content);
    }
    setIsActivityModalOpen(false);
  };

  const handleFoodSubmit = (content: string, imageUrl?: string) => {
    if (onAddLog && selectedCategory) {
      onAddLog(selectedCategory, content, imageUrl);
    }
    setIsFoodModalOpen(false);
  };

  const handleWeightSubmit = (weight: string) => {
    if (onAddLog) {
      onAddLog("weight", weight);
    }
    setIsWeightModalOpen(false);
  };

  const handleStomachFeelingSubmit = (feeling: string) => {
    if (onAddLog) {
      onAddLog("stomach-feeling", feeling);
    }
    setIsStomachFeelingModalOpen(false);
  };

  const handleSupplementsSubmit = (supplements: string) => {
    if (onAddLog) {
      onAddLog("supplements", supplements);
    }
    setIsSupplementsModalOpen(false);
  };

  const handleNotesSubmit = (notes: string) => {
    if (onAddLog) {
      onAddLog("anything-else", notes);
    }
    setIsNotesModalOpen(false);
  };

  const handlePoopySubmit = (poopy: string) => {
    if (onAddLog) {
      onAddLog("poopy", poopy);
    }
    setIsPoopyModalOpen(false);
  };

  const handleWorkingHoursSubmit = (hours: string) => {
    if (onAddLog) {
      onAddLog("working-hours", hours);
    }
    setIsWorkingHoursModalOpen(false);
  };

  const getCategoryIcon = (category: Category) => {
    const allCategories = [
      ...categoryGroups.meals,
      ...categoryGroups.wellness,
      ...categoryGroups.hydration,
      ...categoryGroups.routine,
      ...categoryGroups.other,
    ];
    return allCategories.find((c) => c.category === category);
  };

  const formatLogTime = (log: LogItem) => {
    const timeMatch = log.content.match(/^(\d{1,2}:\d{2})/);
    return timeMatch ? timeMatch[1] : null;
  };

  const formatLogContent = (log: LogItem) => {
    // Remove time from content if it exists
    return log.content.replace(/^\d{1,2}:\d{2}(?:–\d{1,2}:\d{2})?\s*/, "");
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden">
      <QuickTimeModal
        isOpen={isShowerModalOpen}
        onClose={() => setIsShowerModalOpen(false)}
        onSubmit={handleShowerSubmit}
        category="shower"
        title="Log Shower Time"
      />
      <QuickTimeModal
        isOpen={isWakeUpModalOpen}
        onClose={() => setIsWakeUpModalOpen(false)}
        onSubmit={handleWakeUpSubmit}
        category="wake-up-time"
        title="Log Wake Up Time"
      />
      <QuickSleepModal
        isOpen={isSleepModalOpen}
        onClose={() => setIsSleepModalOpen(false)}
        onSubmit={handleSleepSubmit}
      />
      <QuickTimeModal
        isOpen={isWindDownModalOpen}
        onClose={() => setIsWindDownModalOpen(false)}
        onSubmit={handleWindDownSubmit}
        category="wind-down"
        title="Log Wind Down Time"
      />
      <QuickTextModal
        isOpen={isTextModalOpen}
        onClose={() => setIsTextModalOpen(false)}
        onSubmit={handleTextSubmit}
        category={selectedCategory}
        title={selectedCategory === "liquid" ? "Log Hydration" : `Log ${selectedCategory?.toUpperCase()}`}
      />
      <QuickActivityModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        onSubmit={handleActivitySubmit}
      />
      <QuickFoodModal
        isOpen={isFoodModalOpen}
        onClose={() => setIsFoodModalOpen(false)}
        onSubmit={handleFoodSubmit}
        category={selectedCategory || "breakfast"}
        title={selectedCategory === "breakfast" ? "Log Breakfast" : selectedCategory === "snacks" ? "Log Snacks" : "Log Dinner"}
      />
      <QuickWeightModal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
        onSubmit={handleWeightSubmit}
      />
      <QuickStomachFeelingModal
        isOpen={isStomachFeelingModalOpen}
        onClose={() => setIsStomachFeelingModalOpen(false)}
        onSubmit={handleStomachFeelingSubmit}
      />
      <QuickSupplementsModal
        isOpen={isSupplementsModalOpen}
        onClose={() => setIsSupplementsModalOpen(false)}
        onSubmit={handleSupplementsSubmit}
      />
      <QuickNotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        onSubmit={handleNotesSubmit}
      />
      <QuickPoopyModal
        isOpen={isPoopyModalOpen}
        onClose={() => setIsPoopyModalOpen(false)}
        onSubmit={handlePoopySubmit}
      />
      <QuickWorkingHoursModal
        isOpen={isWorkingHoursModalOpen}
        onClose={() => setIsWorkingHoursModalOpen(false)}
        onSubmit={handleWorkingHoursSubmit}
      />

      {/* Top Header */}
      <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            {/* Left side - Logo and Title */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <div className="flex-shrink-0">
                <Logo size="sm" variant="main" />
              </div>
            </div>

            {/* Right side - Date Navigation and Profile */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Date Navigation */}
              <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-700 rounded-lg sm:rounded-xl p-0.5 sm:p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPreviousDay}
                  className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-slate-600 rounded-lg text-white p-0"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>

                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-7 sm:h-8 px-2 sm:px-3 hover:bg-slate-600 rounded-lg text-xs sm:text-sm text-white whitespace-nowrap"
                    >
                      <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      {isToday() ? (
                        <span>today</span>
                      ) : (
                        <>
                          <span className="hidden xs:inline">{formatDateShort()}</span>
                          <span className="xs:hidden">{selectedDate.getDate()}</span>
                        </>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl bg-slate-800 border-slate-700" align="end">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleCalendarSelect}
                      initialFocus
                      disabled={(date) => disableFutureDates(date)}
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNextDay}
                  className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-slate-600 rounded-lg text-white p-0"
                  disabled={isNextDayDisabled()}
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
              </div>

              <div className="flex-shrink-0">
                <ProfileDropdown
                  userEmail={userEmail}
                  onLogout={onLogout}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-8">
        {/* Wellness Metrics - Circular Progress */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {/* Sleep Metric */}
          <button
            onClick={() => handleCategoryClickWithModal("sleep")}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-slate-700 hover:border-blue-500 transition-all group"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 sm:w-32 sm:h-32 mb-2 sm:mb-4">
                {/* Mobile circles */}
                <svg className="w-20 h-20 sm:hidden transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-slate-700"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 35}`}
                    strokeDashoffset={`${2 * Math.PI * 35 * 0.25}`}
                    className="text-blue-400"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Desktop circles */}
                <svg className="hidden sm:block w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-700"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * 0.25}`}
                    className="text-blue-400"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg sm:text-3xl font-bold text-white">8h</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Sleep <ChevronRight className="inline w-3 h-3 sm:w-4 sm:h-4 group-hover:text-blue-400 transition-colors" />
              </p>
            </div>
          </button>

          {/* Meals Metric */}
          <button
            onClick={handleMealsClick}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-slate-700 hover:border-green-500 transition-all group"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 sm:w-32 sm:h-32 mb-2 sm:mb-4">
                {/* Mobile circles */}
                <svg className="w-20 h-20 sm:hidden transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-slate-700"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 35}`}
                    strokeDashoffset={`${2 * Math.PI * 35 * 0.35}`}
                    className="text-green-400"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Desktop circles */}
                <svg className="hidden sm:block w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-700"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * 0.35}`}
                    className="text-green-400"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg sm:text-3xl font-bold text-white">
                    {selectedDateLogs.filter(l => ['breakfast', 'snacks', 'dinner'].includes(l.category)).length}/3
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Meals <ChevronRight className="inline w-3 h-3 sm:w-4 sm:h-4 group-hover:text-green-400 transition-colors" />
              </p>
            </div>
          </button>

          {/* Hydration Metric */}
          <button
            onClick={() => handleCategoryClickWithModal("liquid")}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-slate-700 hover:border-cyan-500 transition-all group"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 sm:w-32 sm:h-32 mb-2 sm:mb-4">
                {/* Mobile circles */}
                <svg className="w-20 h-20 sm:hidden transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-slate-700"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 35}`}
                    strokeDashoffset={`${2 * Math.PI * 35 * 0.4}`}
                    className="text-cyan-400"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Desktop circles */}
                <svg className="hidden sm:block w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-700"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * 0.4}`}
                    className="text-cyan-400"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg sm:text-3xl font-bold text-white">2L</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Hydration <ChevronRight className="inline w-3 h-3 sm:w-4 sm:h-4 group-hover:text-cyan-400 transition-colors" />
              </p>
            </div>
          </button>
        </div>

        {/* Health Monitors Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Weight Monitor */}
          <button
            onClick={() => handleCategoryClickWithModal("weight")}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-700 hover:border-orange-500 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-white font-semibold text-sm sm:text-base">WEIGHT TRACKER</h3>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-orange-500 flex-shrink-0" />
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-2.5 sm:p-3 rounded-xl flex-shrink-0">
                <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              </div>
              <div className="min-w-0">
                <p className="text-green-400 font-semibold text-sm sm:text-base">WITHIN RANGE</p>
                <p className="text-slate-400 text-xs sm:text-sm">Track daily weight</p>
              </div>
            </div>
          </button>

          {/* Wellness Monitor */}
          <button
            onClick={() => handleCategoryClickWithModal("stomach-feeling")}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-700 hover:border-orange-500 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-white font-semibold text-sm sm:text-base">WELLNESS MONITOR</h3>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-orange-500 flex-shrink-0" />
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-2.5 sm:p-3 rounded-xl flex-shrink-0">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <div className="min-w-0">
                <p className="text-blue-400 font-semibold text-sm sm:text-base">FEELING GOOD</p>
                <p className="text-slate-400 text-xs sm:text-sm">Log how you feel</p>
              </div>
            </div>
          </button>
        </div>

        {/* My Day Section */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-white text-lg sm:text-xl font-semibold">My Day</h2>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white hover:bg-slate-200 rounded-full h-9 w-9 sm:h-10 sm:w-10"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900" />
            </Button>
          </div>

          {/* Quick Add Categories */}
          <div className="space-y-3">
            {/* Meals Quick Add */}
            <div className="bg-gradient-to-r from-orange-900/40 to-amber-900/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-orange-800/50">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">MEALS</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {categoryGroups.meals.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => handleCategoryClickWithModal(cat.category)}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all hover:scale-[1.02] text-center ${
                      categoriesWithEntries.has(cat.category)
                        ? "border-green-400 bg-green-500/20"
                        : "border-slate-600 bg-slate-800/50 hover:border-orange-400"
                    }`}
                  >
                    <div className={`p-1.5 sm:p-2 rounded-lg ${cat.bgColor} inline-block mb-1.5 sm:mb-2`}>
                      <cat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${cat.color}`} />
                    </div>
                    <p className="text-xs text-white">{cat.label}</p>
                    {categoriesWithEntries.has(cat.category) && (
                      <div className="mt-1 text-green-400 text-xs">✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Routine */}
            <div className="bg-gradient-to-r from-violet-900/40 to-purple-900/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-violet-800/50">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">DAILY ROUTINE</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {categoryGroups.routine.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => handleCategoryClickWithModal(cat.category)}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all hover:scale-[1.02] text-center ${
                      categoriesWithEntries.has(cat.category)
                        ? "border-green-400 bg-green-500/20"
                        : "border-slate-600 bg-slate-800/50 hover:border-violet-400"
                    }`}
                  >
                    <div className={`p-1.5 sm:p-2 rounded-lg ${cat.bgColor} inline-block mb-1.5 sm:mb-2`}>
                      <cat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${cat.color}`} />
                    </div>
                    <p className="text-xs text-white">{cat.label}</p>
                    {categoriesWithEntries.has(cat.category) && (
                      <div className="mt-1 text-green-400 text-xs">✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Wellness Tracking */}
            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-blue-800/50">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">WELLNESS</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {categoryGroups.wellness.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => handleCategoryClickWithModal(cat.category)}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all hover:scale-[1.02] text-center ${
                      categoriesWithEntries.has(cat.category)
                        ? "border-green-400 bg-green-500/20"
                        : "border-slate-600 bg-slate-800/50 hover:border-blue-400"
                    }`}
                  >
                    <div className={`p-1.5 sm:p-2 rounded-lg ${cat.bgColor} inline-block mb-1.5 sm:mb-2`}>
                      <cat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${cat.color}`} />
                    </div>
                    <p className="text-xs text-white">{cat.label}</p>
                    {categoriesWithEntries.has(cat.category) && (
                      <div className="mt-1 text-green-400 text-xs">✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Hydration & Supplements */}
            <div className="bg-gradient-to-r from-cyan-900/40 to-teal-900/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-cyan-800/50">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">HYDRATION & SUPPLEMENTS</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {categoryGroups.hydration.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => handleCategoryClickWithModal(cat.category)}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all hover:scale-[1.02] text-center ${
                      categoriesWithEntries.has(cat.category)
                        ? "border-green-400 bg-green-500/20"
                        : "border-slate-600 bg-slate-800/50 hover:border-cyan-400"
                    }`}
                  >
                    <div className={`p-1.5 sm:p-2 rounded-lg ${cat.bgColor} inline-block mb-1.5 sm:mb-2`}>
                      <cat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${cat.color}`} />
                    </div>
                    <p className="text-xs text-white">{cat.label}</p>
                    {categoriesWithEntries.has(cat.category) && (
                      <div className="mt-1 text-green-400 text-xs">✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Other Tracking */}
            <div className="bg-gradient-to-r from-pink-900/40 to-rose-900/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-pink-800/50">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">OTHER TRACKING</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {categoryGroups.other.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => handleCategoryClickWithModal(cat.category)}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all hover:scale-[1.02] text-center ${
                      categoriesWithEntries.has(cat.category)
                        ? "border-green-400 bg-green-500/20"
                        : "border-slate-600 bg-slate-800/50 hover:border-pink-400"
                    }`}
                  >
                    <div className={`p-1.5 sm:p-2 rounded-lg ${cat.bgColor} inline-block mb-1.5 sm:mb-2`}>
                      <cat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${cat.color}`} />
                    </div>
                    <p className="text-xs text-white">{cat.label}</p>
                    {categoriesWithEntries.has(cat.category) && (
                      <div className="mt-1 text-green-400 text-xs">✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Timeline */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-700">
          <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">TODAY'S ACTIVITIES</h3>

          {sortedLogs.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                No entries yet for this day
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Start tracking by adding an entry
              </p>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {sortedLogs.map((log, index) => {
                const categoryInfo = getCategoryIcon(log.category);
                const time = formatLogTime(log);
                const content = formatLogContent(log);

                return (
                  <div
                    key={log.id}
                    className="flex gap-2 sm:gap-3 group hover:bg-slate-700/50 p-2 sm:p-3 rounded-lg transition-colors"
                  >
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${categoryInfo?.bgColor} flex items-center justify-center`}
                      >
                        {categoryInfo && (
                          <categoryInfo.icon
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${categoryInfo.color}`}
                          />
                        )}
                      </div>
                      {index < sortedLogs.length - 1 && (
                        <div className="w-0.5 h-full bg-slate-700 mt-2"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm sm:text-base">
                            {categoryInfo?.label || log.category}
                          </p>
                          {time && (
                            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                              {time}
                            </p>
                          )}
                          {content && (
                            <p className="text-xs sm:text-sm text-slate-300 mt-1 break-words">
                              {content}
                            </p>
                          )}
                          {log.imageUrl && (
                            <img
                              src={log.imageUrl}
                              alt="Entry"
                              className="mt-2 rounded-lg w-full max-w-[150px] sm:max-w-[200px] h-auto"
                            />
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeleteLog(log.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}