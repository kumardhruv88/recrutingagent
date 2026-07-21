import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarSidebarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onManageAvailability: () => void;
  onManageRooms: () => void;
}

export function CalendarSidebar({ currentDate, onDateSelect, onManageAvailability, onManageRooms }: CalendarSidebarProps) {
  const [miniCalDate, setMiniCalDate] = useState(currentDate);

  const monthStart = startOfMonth(miniCalDate);
  const monthEnd = endOfMonth(miniCalDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add padding for first day offset
  const startDayOffset = monthStart.getDay();
  const paddedDays = Array(startDayOffset).fill(null).concat(days);

  return (
    <div className="w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-950/30 hidden lg:flex flex-col">
      {/* Mini Calendar */}
      <div className="p-5 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {format(miniCalDate, "MMMM yyyy")}
          </h4>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setMiniCalDate(subMonths(miniCalDate, 1))} className="h-6 w-6 text-zinc-500 hover:text-zinc-900">
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMiniCalDate(addMonths(miniCalDate, 1))} className="h-6 w-6 text-zinc-500 hover:text-zinc-900">
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-zinc-500 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {paddedDays.map((day, idx) => {
            if (!day) return <div key={`pad-${idx}`} />;
            const isSelected = isSameDay(day, currentDate);
            const isCurrentMonth = isSameMonth(day, miniCalDate);
            const isTodayDate = isToday(day);

            return (
              <button
                key={day.toISOString()}
                onClick={() => onDateSelect(day)}
                className={`
                  w-6 h-6 flex items-center justify-center rounded-full transition-colors
                  ${!isCurrentMonth ? "text-zinc-300 dark:text-zinc-700" : ""}
                  ${isSelected ? "bg-blue-600 text-white font-semibold" : ""}
                  ${!isSelected && isTodayDate ? "text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/30" : ""}
                  ${!isSelected && !isTodayDate && isCurrentMonth ? "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800" : ""}
                `}
              >
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools */}
      <div className="p-5 flex-1">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
          My Calendars
        </h4>
        <div className="space-y-1">
          <label className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500" />
            Interviews
          </label>
          <label className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500" />
            Internal Meetings
          </label>
        </div>

        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-8 mb-3">
          Manage
        </h4>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 h-8 px-2" onClick={onManageAvailability}>
            <Users className="w-4 h-4 mr-2" />
            Availability
          </Button>
          <Button variant="ghost" className="w-full justify-start text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 h-8 px-2" onClick={onManageRooms}>
            <Settings className="w-4 h-4 mr-2" />
            Meeting Rooms
          </Button>
        </div>
      </div>
    </div>
  );
}
