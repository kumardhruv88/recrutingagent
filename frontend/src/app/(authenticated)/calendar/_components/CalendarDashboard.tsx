"use client";

import { useState } from "react";
import { addDays, subDays, addWeeks, subWeeks, addMonths, subMonths } from "date-fns";
import { CalendarHeader, CalendarViewType } from "./CalendarHeader";
import { CalendarSidebar } from "./CalendarSidebar";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarAgenda } from "./CalendarAgenda";
import { ScheduleDialog } from "./ScheduleDialog";
import { EventDetailsDialog } from "./EventDetailsDialog";
import { AvailabilityGrid } from "./AvailabilityGrid";
import { MeetingRooms } from "./MeetingRooms";
import { mockCalendarEvents, CalendarEvent } from "@/data/calendar";

export function CalendarDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarViewType>("Week");
  
  // Data State
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  
  // Modals State
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Navigation handlers
  const handlePrev = () => {
    if (view === "Day") setCurrentDate(subDays(currentDate, 1));
    else if (view === "Week") setCurrentDate(subWeeks(currentDate, 1));
    else if (view === "Month") setCurrentDate(subMonths(currentDate, 1));
    else if (view === "Agenda") setCurrentDate(subMonths(currentDate, 1)); // Arbitrary for agenda
  };

  const handleNext = () => {
    if (view === "Day") setCurrentDate(addDays(currentDate, 1));
    else if (view === "Week") setCurrentDate(addWeeks(currentDate, 1));
    else if (view === "Month") setCurrentDate(addMonths(currentDate, 1));
    else if (view === "Agenda") setCurrentDate(addMonths(currentDate, 1)); // Arbitrary for agenda
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleSchedule = (partialEvent: Partial<CalendarEvent>) => {
    const newEvent: CalendarEvent = {
      id: `evt-${Date.now()}`,
      title: partialEvent.title || "New Interview",
      type: "Interview",
      startTime: new Date().toISOString(),
      endTime: addDays(new Date(), 0.04).toISOString(), // Roughly 1 hr
      candidate: partialEvent.candidate,
      status: "Scheduled",
      colorClass: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
      ...partialEvent
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.14)-theme(spacing.8))] flex flex-col -mx-4 sm:-mx-8 -mb-8 overflow-hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      
      <CalendarHeader 
        currentDate={currentDate}
        view={view}
        onViewChange={setView}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
        onScheduleClick={() => setIsScheduleOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        <CalendarSidebar 
          currentDate={currentDate}
          onDateSelect={setCurrentDate}
          onManageAvailability={() => setIsAvailabilityOpen(true)}
          onManageRooms={() => setIsRoomsOpen(true)}
        />
        
        <div className="flex-1 overflow-hidden relative bg-white dark:bg-zinc-950">
          {view === "Agenda" ? (
            <CalendarAgenda 
              currentDate={currentDate}
              events={events}
              onEventClick={setSelectedEvent}
            />
          ) : (
            <CalendarGrid 
              currentDate={currentDate}
              view={view}
              events={events}
              onEventClick={setSelectedEvent}
              onTimeClick={() => {
                // In a real app, we'd pre-fill the schedule dialog with this time
                setIsScheduleOpen(true);
              }}
            />
          )}
        </div>
      </div>

      <ScheduleDialog 
        open={isScheduleOpen}
        onOpenChange={setIsScheduleOpen}
        onSchedule={handleSchedule}
      />
      
      <EventDetailsDialog 
        open={selectedEvent !== null}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
        event={selectedEvent}
      />

      <AvailabilityGrid 
        open={isAvailabilityOpen}
        onOpenChange={setIsAvailabilityOpen}
      />

      <MeetingRooms 
        open={isRoomsOpen}
        onOpenChange={setIsRoomsOpen}
      />
      
    </div>
  );
}
