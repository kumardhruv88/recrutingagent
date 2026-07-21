import { CalendarEvent } from "@/data/calendar";
import { EventCard } from "./EventCard";
import { format, eachHourOfInterval, startOfDay, endOfDay, isSameDay, differenceInMinutes, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, addDays } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarViewType } from "./CalendarHeader";

interface CalendarGridProps {
  currentDate: Date;
  view: CalendarViewType;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onTimeClick: (date: Date) => void;
}

export function CalendarGrid({ currentDate, view, events, onEventClick, onTimeClick }: CalendarGridProps) {
  
  if (view === "Month") {
    return <MonthView currentDate={currentDate} events={events} onEventClick={onEventClick} />;
  }

  const days = view === "Week" 
    ? eachDayOfInterval({ start: startOfWeek(currentDate, { weekStartsOn: 0 }), end: endOfWeek(currentDate, { weekStartsOn: 0 }) })
    : [currentDate];
    
  const hours = eachHourOfInterval({ start: startOfDay(currentDate), end: endOfDay(currentDate) });

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Day Headers */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 pr-4">
        <div className="w-16 shrink-0" /> {/* Time column spacer */}
        {days.map(day => (
          <div key={day.toISOString()} className="flex-1 text-center py-3 border-l border-zinc-200 dark:border-zinc-800 first:border-l-0">
            <div className="text-xs text-zinc-500 font-medium uppercase tracking-widest mb-1">{format(day, "EEE")}</div>
            <div className={`text-xl font-light ${isSameDay(day, new Date()) ? "text-blue-600 font-medium" : "text-zinc-900 dark:text-zinc-100"}`}>
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="flex relative">
          {/* Time Axis */}
          <div className="w-16 shrink-0 flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 z-10 sticky left-0">
            {hours.map(hour => (
              <div key={hour.toISOString()} className="h-16 relative">
                <span className="absolute -top-2.5 right-2 text-[10px] text-zinc-400 font-medium bg-white dark:bg-zinc-950 px-1">
                  {format(hour, "h a")}
                </span>
              </div>
            ))}
          </div>

          {/* Grid Lines and Events */}
          <div className="flex-1 flex relative">
            {days.map((day) => {
              const dayEvents = events.filter(e => isSameDay(new Date(e.startTime), day));

              return (
                <div key={day.toISOString()} className="flex-1 border-l border-zinc-100 dark:border-zinc-800/50 first:border-l-0 relative min-w-[120px]">
                  {/* Hour lines */}
                  {hours.map(hour => (
                    <div 
                      key={`line-${hour.toISOString()}`} 
                      className="h-16 border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 cursor-pointer transition-colors"
                      onClick={() => onTimeClick(addDays(startOfDay(day), 0))} // Simplified time click
                    />
                  ))}

                  {/* Events */}
                  {dayEvents.map(event => {
                    const start = new Date(event.startTime);
                    const end = new Date(event.endTime);
                    const top = (start.getHours() * 64) + (start.getMinutes() * (64 / 60));
                    const height = Math.max(differenceInMinutes(end, start) * (64 / 60), 20);

                    return (
                      <EventCard 
                        key={event.id}
                        event={event}
                        onClick={onEventClick}
                        style={{ top: `${top}px`, height: `${height}px`, left: '4px', right: '4px' }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function MonthView({ currentDate, events, onEventClick }: { currentDate: Date; events: CalendarEvent[]; onEventClick: (e: CalendarEvent) => void }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOffset = monthStart.getDay();
  const paddedDays = Array(startDayOffset).fill(null).concat(days);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950">
      <div className="grid grid-cols-7 border-b border-zinc-200 dark:border-zinc-800">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="p-3 text-sm font-medium text-zinc-500 text-center border-r border-zinc-200 dark:border-zinc-800 last:border-r-0">
            {d}
          </div>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-7 auto-rows-fr">
        {paddedDays.map((day, idx) => {
          if (!day) return <div key={`pad-${idx}`} className="border-r border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/20" />;
          
          const isTodayDate = isSameDay(day, new Date());
          const dayEvents = events.filter(e => isSameDay(new Date(e.startTime), day));

          return (
            <div key={day.toISOString()} className="border-r border-b border-zinc-200 dark:border-zinc-800 last:border-r-0 p-1 md:p-2 overflow-hidden flex flex-col group min-h-[100px]">
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${isTodayDate ? "bg-blue-600 text-white" : "text-zinc-700 dark:text-zinc-300 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800"}`}>
                  {format(day, "d")}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                {dayEvents.map(event => (
                  <div 
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className={`text-[10px] sm:text-xs truncate px-1.5 py-0.5 rounded cursor-pointer border ${event.colorClass}`}
                  >
                    {format(new Date(event.startTime), "h:mm a")} {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
