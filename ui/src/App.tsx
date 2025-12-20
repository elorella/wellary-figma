import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { CategoryInput } from "./components/old/CategoryInput";
import { Login } from "./components/Login";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

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
  imageUrl?: string; // Optional image for food categories
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(),
  );

  // Load logs from localStorage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem("dietLogs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }

    // Check if user is already logged in
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setIsAuthenticated(true);
      setUserEmail(savedEmail);
    }
  }, []);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("dietLogs", JSON.stringify(logs));
  }, [logs]);

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    localStorage.removeItem("userEmail");
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const handleAddLog = (
    category: Category,
    content: string,
    imageUrl?: string,
  ) => {
    const selectedDateBase = new Date(selectedDate);
    selectedDateBase.setHours(0, 0, 0, 0);
    const selectedDateTimestamp = selectedDateBase.getTime();

    // Get existing logs for the selected date
    const selectedDateStr =
      selectedDate.toISOString().split("T")[0];
    const existingLogsForDate = logs.filter(
      (log) => log.date === selectedDateStr,
    );

    let timestamp: number;

    // Categories that should use time from content
    const timeBasedCategories = [
      "activity",
      "breakfast",
      "snacks",
      "dinner",
      "shower",
      "wind-down",
      "sleep",
      "wake-up-time",
      "working-hours",
    ];

    if (timeBasedCategories.includes(category)) {
      // Try to parse time from content
      const timeMatch = content.match(/^(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        const hours = parseInt(timeMatch[1], 10);
        const minutes = parseInt(timeMatch[2], 10);
        timestamp =
          selectedDateTimestamp +
          hours * 60 * 60 * 1000 +
          minutes * 60 * 1000;
      } else {
        // Fallback to early morning
        timestamp =
          selectedDateTimestamp +
          (existingLogsForDate.length + 1) * 1000;
      }
    } else {
      // For non-time categories, assign very early timestamps
      timestamp =
        selectedDateTimestamp +
        (existingLogsForDate.length + 1) * 1000;
    }

    const newLog: LogItem = {
      id: Date.now().toString(),
      category,
      content,
      date: selectedDateStr,
      timestamp,
      imageUrl,
    };

    setLogs([...logs, newLog]);

    // Weight loss celebration
    if (category === "weight") {
      const newWeight = parseFloat(content);
      const yesterday = new Date(selectedDate);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr =
        yesterday.toISOString().split("T")[0];

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
          const differenceGrams = Math.round(
            differenceKg * 1000,
          );
          toast(`🎉 You lost ${differenceGrams}g!`);
        }
      }
    }

    setSelectedCategory(null);
  };

  const handleDeleteLog = (id: string) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (selectedCategory) {
    return (
      <CategoryInput
        category={selectedCategory}
        onAddLog={handleAddLog}
        onBack={handleBack}
        logs={logs}
        selectedDate={selectedDate}
      />
    );
  }

  return (
    <>
      <LandingPage
        logs={logs}
        selectedDate={selectedDate}
        onCategoryClick={handleCategoryClick}
        onDeleteLog={handleDeleteLog}
        onDateChange={handleDateChange}
        userEmail={userEmail}
        onLogout={handleLogout}
        onAddLog={handleAddLog}
      />
      <Toaster />
    </>
  );
}