import { CalendarEvent } from "@/data/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: CalendarEvent;
  onClick: (event: CalendarEvent) => void;
  style?: React.CSSProperties;
  className?: string;
  isAgenda?: boolean;
}

export function EventCard({ event, onClick, style, className, isAgenda = false }: EventCardProps) {
  const isCanceled = event.status === "Canceled";

  if (isAgenda) {
    return (
      <div 
        onClick={() => onClick(event)}
        className={cn(
          "flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow",
          event.colorClass,
          isCanceled && "opacity-50 line-through grayscale",
          className
        )}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">{event.title}</span>
            {event.type !== "Blocked" && event.type !== "Out of Office" && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/50 dark:bg-black/20">
                {event.type}
              </span>
            )}
          </div>
          <div className="text-xs opacity-80 flex items-center gap-2">
            {format(new Date(event.startTime), "h:mm a")} - {format(new Date(event.endTime), "h:mm a")}
            {event.candidate && (
              <>
                <span>•</span>
                <span>{event.candidate.name}</span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid view (absolute positioning)
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(event);
      }}
      className={cn(
        "absolute rounded-md p-2 overflow-hidden cursor-pointer hover:shadow-md transition-all shadow-sm border",
        event.colorClass,
        isCanceled && "opacity-50 grayscale",
        className
      )}
      style={style}
    >
      <div className="font-semibold text-xs leading-tight mb-0.5 truncate">{event.title}</div>
      <div className="text-[10px] opacity-80 leading-tight truncate">
        {format(new Date(event.startTime), "h:mm a")} - {format(new Date(event.endTime), "h:mm a")}
      </div>
    </div>
  );
}
