# Wellary Application - Complete Build Guide

## Table of Contents

1. [Overview](#overview)
2. [Design System](#design-system)
3. [Data Architecture](#data-architecture)
4. [Application Structure](#application-structure)
5. [Component Specifications](#component-specifications)
6. [Feature Requirements](#feature-requirements)
7. [Validation Rules](#validation-rules)
8. [Special Features](#special-features)
9. [Navigation & Routing](#navigation--routing)
10. [Code Conventions](#code-conventions)

---

## Overview

**Wellary** is a diet and wellness log application that allows users to track 15 different daily categories across multiple dates. The app features a clean, warm interface inspired by the Headway app design language.

### Core Features

- Track 15 daily wellness categories
- Date-based log management with date picker navigation
- Chronological log entry display
- Collapsible sidebar navigation
- Celebratory weight loss notifications
- Fruit exchange reference guide

---

## Design System

### Color Scheme

The application uses warm, welcoming colors inspired by Headway:

**Primary Colors:**

- **Orange Accent**: `#FF6B35` (primary brand color)
- **Background**: `#FFFFFF` (white)
- **Text Primary**: Dark gray/black
- **Text Secondary**: Muted gray

**Category Status Indicators:**

- **No Entry**: Full color (vibrant)
- **Logged**: Grayed out/desaturated

**Fruit Exchange List Colors:**

- **Very Low Glycemic**: Purple (`purple-100`, `purple-600`, `purple-700`)
- **Low Glycemic**: Yellow (`yellow-100`, `yellow-600`, `yellow-700`)
- **Medium-High Glycemic**: Green (`green-100`, `green-600`, `green-700`)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Font Weights**:
  - Regular: 400
  - Medium: 500
  - Semi-bold: 600
  - Bold: 700

**DO NOT** override font sizes, weights, or line-heights unless specifically requested by the user. The app uses default typography from `/styles/globals.css`.

### UI Elements

- **Border Radius**: Rounded corners (use `rounded-2xl` for cards, `rounded-xl` for buttons)
- **Buttons**: Gradient buttons with orange accent
- **Cards**: White cards with subtle borders
- **Spacing**: Consistent padding (use Tailwind spacing scale)

### Component Library

- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: shadcn/ui components
- **Icons**: lucide-react
- **Toasts**: sonner

---

## Data Architecture

### Data Types

#### Category Type

```typescript
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
```

#### LogItem Interface

```typescript
export interface LogItem {
  id: string; // Unique identifier (timestamp-based)
  category: Category; // Category type
  content: string; // Log content/data
  date: string; // Date in YYYY-MM-DD format
  timestamp: number; // Unix timestamp for chronological ordering
}
```

### Data Storage

- **Method**: LocalStorage
- **Key**: `"dietLogs"`
- **Format**: JSON array of LogItem objects
- **Persistence**: Auto-save on every log change

### Timestamp Calculation Rules

**For time-based entries** (activity, breakfast, snacks, dinner, shower, wind-down, sleep, wake-up-time, working-hours):

- Parse time from content using regex: `/^(\d{1,2}):(\d{2})/`
- Calculate timestamp: `selectedDateBase + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000)`

**For non-time entries** (weight, liquid, supplements, poopy, stomach-feeling, anything-else):

- Assign very early timestamps (1 second, 2 seconds, etc.)
- Keep them at the top of the chronological list
- Formula: `selectedDateBase + (existingLogsCount + 1) * 1000`

---

## Application Structure

### File Organization

```
/
├── App.tsx                          # Main app component with routing
├── components/
│   ├── CategoryInput.tsx            # Category input screen
│   ├── FruidExchangeList.tsx       # Fruit exchange reference page
│   ├── LandingPage.tsx             # Main dashboard
│   ├── LogEntry.tsx                # Individual log entry component
│   ├── Sidebar.tsx                 # Collapsible navigation sidebar
│   ├── TodayView.tsx               # (if exists) Today's view component
│   ├── HistoryView.tsx             # (if exists) History view component
│   └── ui/                         # shadcn/ui components
├── styles/
│   └── globals.css                 # Global styles and tokens
└── WELLARY_BUILD_GUIDE.md          # This guide
```

### App State Management

**Main App State:**

```typescript
const [logs, setLogs] = useState<LogItem[]>([]);
const [selectedCategory, setSelectedCategory] =
  useState<Category | null>(null);
const [selectedDate, setSelectedDate] = useState<Date>(
  new Date(),
);
const [currentPage, setCurrentPage] = useState<string>("home");
const [isSidebarCollapsed, setIsSidebarCollapsed] =
  useState(false);
```

**State Persistence:**

- Load logs from localStorage on mount
- Save logs to localStorage on every change
- Use `useEffect` hooks for sync

---

## Component Specifications

### 1. Sidebar Component

**Location**: `/components/Sidebar.tsx`

**Props:**

```typescript
interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activePage: string;
  onPageChange: (page: string) => void;
}
```

**Features:**

- Gmail-style collapsible sidebar
- Wellary logo at the top
- Navigation menu items:
  1. Home
  2. Fruid Exchange list
  3. Appointments
  4. Reach out to Nazli
  5. Payment History
- Active page highlighting
- Smooth collapse/expand animation (300ms transition)

**Collapsed State:**

- Width: `w-16` (64px)
- Show only icons

**Expanded State:**

- Width: `w-64` (256px)
- Show icons + labels

**Main Content Margin:**

- Collapsed: `ml-16`
- Expanded: `ml-64`

### 2. LandingPage Component

**Location**: `/components/LandingPage.tsx`

**Props:**

```typescript
interface LandingPageProps {
  logs: LogItem[];
  selectedDate: Date;
  onCategoryClick: (category: Category) => void;
  onDeleteLog: (id: string) => void;
  onDateChange: (date: Date) => void;
  isSidebarCollapsed: boolean;
  onSidebarToggle: () => void;
  onPageChange: (page: string) => void;
}
```

**Layout:**

1. **Top Right**: Date picker with navigation arrows
2. **Header**: Selected date display
3. **Category Grid**: 15 category thumbnails (3-5 columns responsive)
4. **Log Summary**: Chronological list of entries for selected date

**Category Thumbnails:**

- Show category icon and name
- Visual status indicator:
  - **Full color**: No entry exists for selected date
  - **Grayed out**: Entry logged for selected date
- Clickable to open category input screen

### 3. CategoryInput Component

**Location**: `/components/CategoryInput.tsx`

**Props:**

```typescript
interface CategoryInputProps {
  category: Category;
  onAddLog: (category: Category, content: string) => void;
  onBack: () => void;
  logs: LogItem[];
  selectedDate: Date;
}
```

**Features:**

- Category-specific input forms
- Back button to return to landing page
- Historical data display (for weight)
- Form validation before submission
- Auto-format content based on category type

### 4. LogEntry Component

**Location**: `/components/LogEntry.tsx`

**Props:**

```typescript
interface LogEntryProps {
  log: LogItem;
  onDelete: (id: string) => void;
}
```

**Display Format:**

- Time (if available)
- Category name
- Log content
- Delete button

### 5. FruidExchangeList Component

**Location**: `/components/FruidExchangeList.tsx`

**Props:**

```typescript
interface FruidExchangeListProps {
  isSidebarCollapsed: boolean;
  onSidebarToggle: () => void;
  onPageChange: (page: string) => void;
}
```

**Content Structure:**

1. **Header**: "Meyve Değişim Listesi" / "Fruit Exchange List"
2. **Info Card**: Calorie and carbohydrate information (emerald background)
3. **Three Data Tables**:
   - Very Low Glycemic Load (Purple theme)
   - Low Glycemic Load (Yellow theme)
   - Medium-High Glycemic Load (Green theme)

**Table Columns:**

- Yiyecek Adı (Turkish name)
- İngilizce Adı (English name)
- 1 Porsiyon (Portion size)
- Ağırlık (gr) (Weight in grams)
- Lif (Fiber content)

---

## Feature Requirements

### 15 Category Definitions

#### 1. Weight

- **Input Type**: Decimal number only
- **Format**: "51.2" (kg)
- **Special Feature**: Display historical weights for past 7 days
- **Validation**: Must be a valid decimal number

#### 2. Wake up time

- **Input Type**: Time picker only
- **Format**: "8:00" or "08:00"
- **No additional fields**

#### 3. Activity

- **Input Fields**:
  1. Start time picker
  2. End time picker
  3. Activity dropdown/text
- **Format**: "09:00–09:40 Walking"

#### 4. Shower

- **Input Type**: Time picker only
- **Format**: "09:00"

#### 5. Breakfast

- **Input Fields**:
  1. Time picker
  2. Meal description textarea
- **Format**: "12:00–12:30 Eggs, cheese, bread" or "12:30 Oats, banana"

#### 6. Snacks

- **Input Fields**: Same as Breakfast
- **Format**: "15:00–15:15 apple"

#### 7. Dinner

- **Input Fields**: Same as Breakfast
- **Format**: "19:00–19:30 Salmon, vegetables"

#### 8. Liquid

- **Input Type**: General text input
- **Format**: "2L water"
- **No time required**

#### 9. Supplements

- **Input Type**: General text input
- **Format**: "Vitamin D" or "Mg citrate"
- **No time required**

#### 10. Poopy

- **Input Type**: General text input
- **Format**: "Style" or any descriptive text
- **No time required**

#### 11. Working hours

- **Input Fields**:
  1. Start time picker
  2. End time picker
- **Format**: "09:00–18:00"

#### 12. Stomach feeling

- **Input Type**: General text input
- **Format**: "Ok" or "Bloated" or any description
- **No time required**

#### 13. Anything else

- **Input Type**: General text input
- **Format**: Free-form text
- **No time required**

#### 14. Wind down

- **Input Type**: Time picker only
- **Format**: "21:00"

#### 15. Sleep

- **Input Type**: Time picker only
- **Format**: "22:00"

---

## Validation Rules

### Date Picker Validation

- **Rule**: Users cannot navigate to future dates
- **Implementation**: Disable future dates in calendar
- **Current Date**: Always allowed
- **Past Dates**: Always allowed

### Weight Input Validation

- **Rule**: Only accept decimal numbers
- **Pattern**: `/^\d+(\.\d+)?$/`
- **Example Valid**: "51.2", "50", "62.5"
- **Example Invalid**: "abc", "51.2kg", "51,2"

### Time Format Validation

- **Pattern**: `/^\d{1,2}:\d{2}$/`
- **Valid**: "8:00", "08:00", "23:45"
- **Invalid**: "8", "8:0", "800"

### Required Fields

- **Weight**: Number value required
- **Wake up time**: Time required
- **Activity**: Start time, end time, activity name required
- **Shower/Wind down/Sleep**: Time required
- **Breakfast/Snacks/Dinner**: Time and description required
- **Working hours**: Start and end time required
- **All text-based**: Content required (non-empty)

---

## Special Features

### 1. Weight Loss Celebration

**Trigger Condition:**

- New weight is logged for today
- Yesterday's weight exists in logs
- Today's weight < Yesterday's weight

**Behavior:**

```typescript
if (category === "weight") {
  const newWeight = parseFloat(content);
  const yesterday = new Date(selectedDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const yesterdayWeightLog = logs.find(
    (log) =>
      log.category === "weight" && log.date === yesterdayStr,
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
      // Show celebration toast with emoji and exact grams lost
      toast(`🎉 You lost ${differenceGrams}g!`);
    }
  }
}
```

**Toast Display:**

- Use sonner library
- Show emoji: 🎉
- Message: "You lost Xg!" (exact grams, not kg)

### 2. Chronological Log Ordering

**Sorting Logic:**

1. Sort all logs by timestamp (ascending)
2. Entries without time appear first (early morning timestamps)
3. Timed entries appear in chronological order
4. Multiple entries at same time: maintain insertion order

**Display Format:**

- Group by selected date
- Show time if available
- Show category and content
- Provide delete option

### 3. Historical Weight Display

**Requirements:**

- When viewing Weight category input
- Display last 7 days of weight logs
- Format: "YYYY-MM-DD: XX.X kg"
- Show in descending date order (most recent first)
- Only show if historical data exists

---

## Navigation & Routing

### Page Routing System

**Pages:**

1. **home**: LandingPage component
2. **fruid-exchange**: FruidExchangeList component
3. **appointments**: (Future implementation)
4. **reach-out**: (Future implementation)
5. **payment-history**: (Future implementation)

**Routing Logic:**

```typescript
const handlePageChange = (page: string) => {
  setCurrentPage(page);
  setSelectedCategory(null); // Clear category when navigating
};

const renderPage = () => {
  if (selectedCategory) {
    return <CategoryInput />;
  }

  switch (currentPage) {
    case 'home':
      return <LandingPage />;
    case 'fruid-exchange':
      return <FruidExchangeList />;
    default:
      return <LandingPage />;
  }
};
```

### Category Input Overlay

- When category is selected, show CategoryInput component
- Overlays current page
- Back button returns to previous page state
- Maintains selected date and current page context

---

## Code Conventions

### TypeScript Standards

- Use TypeScript for all components
- Define proper interfaces for all props
- Use proper type annotations
- No `any` types (use specific types)

### React Best Practices

- Use functional components with hooks
- Use `useState` for component state
- Use `useEffect` for side effects
- Destructure props at component level
- Use proper key props in lists (use unique IDs)

### Naming Conventions

**Components:**

- PascalCase: `LandingPage`, `CategoryInput`
- One component per file

**Functions:**

- camelCase: `handleCategoryClick`, `addLog`
- Handlers start with "handle"
- Event callbacks start with "on"

**Files:**

- PascalCase for components: `LandingPage.tsx`
- kebab-case for utilities: `date-utils.ts`

### Tailwind CSS Usage

**DO NOT override:**

- Font sizes (unless user requests)
- Font weights (unless user requests)
- Line heights (unless user requests)

**Reason:** Global typography is defined in `/styles/globals.css`

**Allowed Tailwind Classes:**

- Layout: `flex`, `grid`, `container`
- Spacing: `p-4`, `m-2`, `gap-6`
- Colors: `bg-orange-500`, `text-gray-700`
- Borders: `border`, `rounded-2xl`
- Effects: `shadow-lg`, `opacity-50`
- Responsive: `md:`, `lg:`, `sm:`

### Component Organization

```typescript
// 1. Imports
import { useState } from 'react';
import { ComponentName } from './components/ComponentName';

// 2. Type Definitions
interface ComponentProps {
  // props
}

// 3. Component Function
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // 4. State Declarations
  const [state, setState] = useState();

  // 5. Effect Hooks
  useEffect(() => {
    // side effects
  }, [dependencies]);

  // 6. Event Handlers
  const handleClick = () => {
    // logic
  };

  // 7. Render
  return (
    // JSX
  );
}
```

---

## Implementation Checklist

### Phase 1: Setup

- [ ] Initialize React + TypeScript project
- [ ] Install Tailwind CSS v4.0
- [ ] Install shadcn/ui components
- [ ] Install lucide-react for icons
- [ ] Install sonner for toasts
- [ ] Setup `/styles/globals.css` with tokens

### Phase 2: Core Components

- [ ] Create App.tsx with routing
- [ ] Create Sidebar component
- [ ] Create LandingPage component
- [ ] Create CategoryInput component
- [ ] Create LogEntry component

### Phase 3: Features

- [ ] Implement 15 category inputs
- [ ] Add date picker with validation
- [ ] Implement localStorage persistence
- [ ] Add chronological sorting
- [ ] Create weight loss celebration

### Phase 4: Additional Pages

- [ ] Build FruidExchangeList component
- [ ] Add fruit exchange data tables
- [ ] Implement color-coded tables

### Phase 5: Polish

- [ ] Test all category inputs
- [ ] Verify date restrictions
- [ ] Test weight celebration
- [ ] Check responsive design
- [ ] Verify localStorage sync

---

## Testing Guidelines

### Manual Testing Checklist

**Data Persistence:**

- [ ] Add log → Refresh page → Verify data persists
- [ ] Delete log → Refresh page → Verify deletion persists
- [ ] Add multiple logs → Verify chronological order

**Date Navigation:**

- [ ] Cannot select future dates
- [ ] Can select today
- [ ] Can select past dates
- [ ] Date changes update displayed logs

**Category Inputs:**

- [ ] Weight: Only accepts decimals
- [ ] Weight: Shows historical data
- [ ] Wake up time: Only accepts time
- [ ] Activity: Requires all fields
- [ ] Each category saves correctly

**Weight Celebration:**

- [ ] Log weight lower than yesterday → See celebration
- [ ] Log weight same as yesterday → No celebration
- [ ] Log weight higher than yesterday → No celebration
- [ ] Exact grams displayed in toast

**Sidebar Navigation:**

- [ ] Sidebar collapses/expands smoothly
- [ ] Active page highlighted correctly
- [ ] Main content shifts with sidebar
- [ ] Navigation changes page correctly

---

## Design Reference - Headway Style Guide

### Visual Principles

1. **Warm & Welcoming**: Use orange as primary accent
2. **Clean & Simple**: Minimal clutter, clear hierarchy
3. **Rounded & Soft**: Rounded corners on all UI elements
4. **Consistent Spacing**: Use 4px/8px base grid
5. **Subtle Shadows**: Light shadows for depth

### Color Psychology

- **Orange**: Energy, motivation, progress
- **Purple**: Calm, healthy choices (low glycemic)
- **Yellow**: Caution, moderate choices (medium glycemic)
- **Green**: Warning, careful choices (high glycemic)

### User Experience Goals

- **Quick Entry**: Minimal clicks to log data
- **Visual Feedback**: Clear indication of logged items
- **Motivation**: Celebrate small wins (weight loss)
- **Education**: Provide helpful reference (fruit exchange)

---

## Future Enhancement Ideas

### Potential Features

1. **Statistics Dashboard**: Weekly/monthly charts
2. **Export Data**: CSV or PDF export
3. **Reminders**: Daily logging reminders
4. **Goals**: Set and track wellness goals
5. **Notes**: Add daily notes/reflections
6. **Photos**: Attach meal photos
7. **Sync**: Cloud backup and multi-device sync
8. **AI Insights**: Pattern analysis and suggestions

### Additional Exchange Lists

- Vegetable exchange list
- Protein exchange list
- Carbohydrate exchange list
- Fat exchange list

---

## Troubleshooting

### Common Issues

**Issue: Logs not persisting**

- Check localStorage is enabled
- Verify JSON.parse/stringify is working
- Check for localStorage quota errors

**Issue: Date picker shows future dates**

- Verify `maxDate` prop on calendar
- Check date comparison logic

**Issue: Weight celebration not showing**

- Verify yesterday's weight exists
- Check parseFloat parsing
- Verify toast library is imported

**Issue: Chronological order wrong**

- Check timestamp calculation
- Verify time parsing regex
- Check sort function

**Issue: Sidebar not collapsing**

- Check CSS transitions
- Verify state management
- Check Tailwind classes applied

---

## Support & Maintenance

### Version Control

- Use Git for version control
- Commit frequently with clear messages
- Tag releases with semantic versioning

### Documentation

- Keep this guide updated
- Document new features
- Comment complex logic

### Code Quality

- Run linter before commits
- Keep components under 300 lines
- Extract reusable logic to utilities
- Write descriptive variable names

---

## Conclusion

This guide provides a complete blueprint for building the Wellary application. Follow the specifications, design system, and conventions outlined here to ensure consistency and maintainability.

**Key Success Factors:**

1. Strict adherence to design system
2. Proper TypeScript typing
3. LocalStorage reliability
4. User-friendly input flows
5. Consistent visual feedback

**Remember:** The goal is to create a warm, motivating wellness companion that makes daily logging simple and rewarding.

---

**Document Version**: 1.0  
**Last Updated**: November 25, 2025  
**Maintained By**: Development Team