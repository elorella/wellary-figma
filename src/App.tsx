import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { CategoryInput } from "./components/CategoryInput";
import { FruidExchangeList } from "./components/FruidExchangeList";
import { Toaster } from "./components/ui/sonner";

export type Category =
  | "weight"
  | "wake-up-time"
  | "activity"
  | "shower"
  | "breakfast"
  | "snacks"
  | "dinner"
  | "liquid"
  | "supplements"
  | "poopy"
  | "working-hours"
  | "stomach-feeling"
  | "anything-else"
  | "wind-down"
  | "sleep";

export interface LogItem {
  id: string;
  category: Category;
  content: string;
  date: string;
  timestamp: number;
}

export default function App() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(),
  );
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Load logs from localStorage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem("dietLogs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    } else {
      // Add sample data for today
      const today = new Date().toISOString().split("T")[0];
      const baseTime = new Date(today).getTime();

      const sampleLogs: LogItem[] = [
        // No time entries (set to early morning)
        {
          id: "1",
          category: "weight",
          content: "51.2",
          date: today,
          timestamp: baseTime + 1000,
        },
        {
          id: "2",
          category: "shower",
          content: "No",
          date: today,
          timestamp: baseTime + 2000,
        },
        {
          id: "3",
          category: "anything-else",
          content: "No not really",
          date: today,
          timestamp: baseTime + 3000,
        },
        {
          id: "4",
          category: "stomach-feeling",
          content: "Ok",
          date: today,
          timestamp: baseTime + 4000,
        },
        {
          id: "5",
          category: "liquid",
          content: "2L water",
          date: today,
          timestamp: baseTime + 5000,
        },

        // 08:00
        {
          id: "6",
          category: "wake-up-time",
          content: "8:00",
          date: today,
          timestamp: baseTime + 8 * 60 * 60 * 1000,
        },

        // 09:00
        {
          id: "7",
          category: "activity",
          content: "09:00–09:40 Walking",
          date: today,
          timestamp: baseTime + 9 * 60 * 60 * 1000,
        },
        {
          id: "8",
          category: "supplements",
          content: "Mg citrate",
          date: today,
          timestamp: baseTime + 9 * 60 * 60 * 1000 + 1000,
        },
        {
          id: "9",
          category: "working-hours",
          content: "09:00–18:00",
          date: today,
          timestamp: baseTime + 9 * 60 * 60 * 1000 + 2000,
        },

        // 12:00
        {
          id: "10",
          category: "breakfast",
          content: "12:00–12:30 Eggs, cheese, bread",
          date: today,
          timestamp: baseTime + 12 * 60 * 60 * 1000,
        },
        {
          id: "11",
          category: "supplements",
          content: "Vitamin D",
          date: today,
          timestamp: baseTime + 12 * 60 * 60 * 1000 + 1000,
        },

        // 14:00
        {
          id: "12",
          category: "poopy",
          content: "Style",
          date: today,
          timestamp: baseTime + 14 * 60 * 60 * 1000,
        },

        // 15:00
        {
          id: "13",
          category: "snacks",
          content: "15:00–15:15 apple",
          date: today,
          timestamp: baseTime + 15 * 60 * 60 * 1000,
        },

        // 21:00
        {
          id: "14",
          category: "wind-down",
          content: "21:00",
          date: today,
          timestamp: baseTime + 21 * 60 * 60 * 1000,
        },

        // 22:00
        {
          id: "15",
          category: "sleep",
          content: "22:00",
          date: today,
          timestamp: baseTime + 22 * 60 * 60 * 1000,
        },
      ];

      setLogs(sampleLogs);
    }
  }, []);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("dietLogs", JSON.stringify(logs));
  }, [logs]);

  const addLog = (category: Category, content: string) => {
    const dateStr = selectedDate.toISOString().split("T")[0];
    const selectedDateBase = new Date(dateStr).getTime();

    // Extract time from content to determine timestamp for ordering
    let timestamp = Date.now(); // default to current time

    // Parse time from content based on category
    let timeMatch: RegExpMatchArray | null = null;

    if (
      category === "activity" ||
      category === "working-hours"
    ) {
      // Format: "09:00–09:40 Walking" or "09:00–17:00"
      timeMatch = content.match(/^(\d{1,2}):(\d{2})/);
    } else if (
      category === "breakfast" ||
      category === "snacks" ||
      category === "dinner"
    ) {
      // Format: "12:30 Oats, banana"
      timeMatch = content.match(/^(\d{1,2}):(\d{2})/);
    } else if (
      category === "shower" ||
      category === "wind-down" ||
      category === "sleep" ||
      category === "wake-up-time"
    ) {
      // Format: "09:00" or "8:00"
      timeMatch = content.match(/^(\d{1,2}):(\d{2})/);
    }

    if (timeMatch) {
      const hours = parseInt(timeMatch[1], 10);
      const minutes = parseInt(timeMatch[2], 10);
      timestamp =
        selectedDateBase +
        hours * 60 * 60 * 1000 +
        minutes * 60 * 1000;
    } else {
      // For entries without time (weight, liquid, supplements, poopy, stomach-feeling, anything-else)
      // Use a very early time (1 second, 2 seconds, etc.) to keep them at the top
      const existingLogsCount = logs.filter(
        (log) =>
          log.date === dateStr &&
          !log.content.match(/^\d{1,2}:\d{2}/),
      ).length;
      timestamp =
        selectedDateBase + (existingLogsCount + 1) * 1000;
    }

    const newLog: LogItem = {
      id: Date.now().toString(),
      category,
      content,
      date: dateStr,
      timestamp: timestamp,
    };
    setLogs([newLog, ...logs]);

    // Check for weight celebration
    if (category === "weight") {
      const newWeight = parseFloat(content);
      if (!isNaN(newWeight)) {
        // Get yesterday's date
        const yesterday = new Date(selectedDate);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday
          .toISOString()
          .split("T")[0];

        // Find yesterday's weight
        const yesterdayWeightLog = logs.find(
          (log) =>
            log.category === "weight" &&
            log.date === yesterdayStr,
        );

        if (yesterdayWeightLog) {
          const yesterdayWeight = parseFloat(
            yesterdayWeightLog.content,
          );
          if (
            !isNaN(yesterdayWeight) &&
            newWeight < yesterdayWeight
          ) {
            const differenceKg = yesterdayWeight - newWeight;
            const differenceGrams = Math.round(differenceKg * 1000);
            return `celebration:${differenceGrams}`; // Return difference in grams
          }
        }
      }
    }
  };

  const deleteLog = (id: string) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSelectedCategory(null); // Clear category when navigating
  };

  const renderPage = () => {
    if (selectedCategory) {
      return (
        <CategoryInput
          category={selectedCategory}
          onAddLog={addLog}
          onBack={handleBack}
          logs={logs}
          selectedDate={selectedDate}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <LandingPage
            logs={logs}
            selectedDate={selectedDate}
            onCategoryClick={handleCategoryClick}
            onDeleteLog={deleteLog}
            onDateChange={handleDateChange}
            isSidebarCollapsed={isSidebarCollapsed}
            onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            onPageChange={handlePageChange}
          />
        );
      case 'fruid-exchange':
        return (
          <FruidExchangeList
            isSidebarCollapsed={isSidebarCollapsed}
            onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            onPageChange={handlePageChange}
          />
        );
      default:
        return (
          <LandingPage
            logs={logs}
            selectedDate={selectedDate}
            onCategoryClick={handleCategoryClick}
            onDeleteLog={deleteLog}
            onDateChange={handleDateChange}
            isSidebarCollapsed={isSidebarCollapsed}
            onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            onPageChange={handlePageChange}
          />
        );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {renderPage()}
      </div>
      <Toaster />
    </>
  );
}