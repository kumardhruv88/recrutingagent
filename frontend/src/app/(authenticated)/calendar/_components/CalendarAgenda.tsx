import { CalendarEvent } from "@/data/calendar";
import { EventCard } from "./EventCard";
import { format, isSameDay } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "lucide-react";

interface CalendarAgendaProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function CalendarAgenda({ events, onEventClick }: CalendarAgendaProps) {
  // Sort events by time
  const sortedEvents = [...events].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  
  // Group by day
  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const dateKey = format(new Date(event.startTime), "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  const dates = Object.keys(groupedEvents).sort();

  if (dates.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-zinc-950">
        <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900/50 flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-zinc-400" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">No upcoming events</h3>
        <p className="text-sm text-zinc-500 max-w-sm">Your schedule is clear. You can enjoy your free time or schedule a new interview.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full bg-white dark:bg-zinc-950">
      <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-10 pb-20">
        {dates.map(dateKey => {
          const dateObj = new Date(dateKey + 'T00:00:00');
          const isTodayDate = isSameDay(dateObj, new Date());
          const dayEvents = groupedEvents[dateKey];

          return (
            <div key={dateKey}>
              <div className="flex items-baseline gap-3 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h3 className={`text-xl font-bold ${isTodayDate ? 'text-blue-600' : 'text-zinc-900 dark:text-zinc-100'}`}>
                  {isTodayDate ? "Today" : format(dateObj, "EEEE")}
                </h3>
                <span className="text-sm font-medium text-zinc-500">
                  {format(dateObj, "MMM d, yyyy")}
                </span>
              </div>
              <div className="space-y-3 pl-2 sm:pl-4">
                {dayEvents.map(event => (
                  <EventCard key={event.id} event={event} onClick={onEventClick} isAgenda />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
