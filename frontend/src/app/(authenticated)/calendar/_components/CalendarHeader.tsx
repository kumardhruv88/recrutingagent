import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { format } from "date-fns";

export type CalendarViewType = "Day" | "Week" | "Month" | "Agenda";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  view: CalendarViewType;
  onViewChange: (view: CalendarViewType) => void;
  onScheduleClick: () => void;
}

export function CalendarHeader({
  currentDate,
  onPrev,
  onNext,
  onToday,
  view,
  onViewChange,
  onScheduleClick
}: CalendarHeaderProps) {
  const views: CalendarViewType[] = ["Day", "Week", "Month", "Agenda"];

  return (
    <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 sm:px-6 shrink-0 bg-white dark:bg-zinc-950">
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 mr-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <CalendarDays className="w-4 h-4" />
          </div>
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Calendar</h2>
        </div>

        <Button variant="outline" size="sm" onClick={onToday} className="h-8 hidden sm:flex border-zinc-200 dark:border-zinc-800">
          Today
        </Button>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onPrev} className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext} className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 min-w-[140px]">
          {format(currentDate, view === "Day" ? "MMMM d, yyyy" : "MMMM yyyy")}
        </h3>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center p-1 bg-zinc-100 dark:bg-zinc-900/50 rounded-lg">
          {views.map(v => (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === v 
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hidden sm:flex">
          <Search className="w-4 h-4" />
        </Button>

        <Button onClick={onScheduleClick} className="h-9 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Schedule
        </Button>
      </div>
    </div>
  );
}
