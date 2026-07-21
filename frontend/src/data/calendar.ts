import { addDays, setHours, setMinutes, startOfDay } from "date-fns";

export type EventType = "Interview" | "Meeting" | "Blocked" | "Out of Office";

export interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  startTime: string; // ISO String
  endTime: string;   // ISO String
  description?: string;
  candidate?: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  interviewers?: {
    name: string;
    avatar?: string;
  }[];
  meetingLink?: string;
  status: "Scheduled" | "Completed" | "Canceled" | "Tentative";
  colorClass: string;
}

export interface MeetingRoom {
  id: string;
  name: string;
  platform: "Zoom" | "Google Meet" | "Teams" | "Phone" | "Custom";
  link: string;
  isDefault: boolean;
}

const today = startOfDay(new Date());

const mockInterviewers = [
  { name: "Sarah Connor", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop" },
  { name: "John Smith", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&auto=format&fit=crop" },
  { name: "Emily Chen", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&auto=format&fit=crop" },
];

export const mockMeetingRooms: MeetingRoom[] = [
  { id: "room-1", name: "Recruiting Room A", platform: "Google Meet", link: "https://meet.google.com/abc-defg-hij", isDefault: true },
  { id: "room-2", name: "Engineering Interview Zoom", platform: "Zoom", link: "https://zoom.us/j/123456789", isDefault: false },
  { id: "room-3", name: "HR Sync Room", platform: "Teams", link: "https://teams.microsoft.com/l/meetup-join/xyz", isDefault: false },
];

const createDate = (dayOffset: number, hours: number, minutes: number = 0) => {
  return setMinutes(setHours(addDays(today, dayOffset), hours), minutes).toISOString();
};

export const mockCalendarEvents: CalendarEvent[] = [
  // Today
  {
    id: "evt-1",
    title: "Frontend Technical Screen",
    type: "Interview",
    startTime: createDate(0, 10, 0),
    endTime: createDate(0, 11, 0),
    candidate: { id: "c-1", name: "Alex Rivera", role: "Senior Frontend Engineer" },
    interviewers: [mockInterviewers[0], mockInterviewers[1]],
    meetingLink: mockMeetingRooms[0].link,
    status: "Scheduled",
    colorClass: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  },
  {
    id: "evt-2",
    title: "Sync with Hiring Manager",
    type: "Meeting",
    startTime: createDate(0, 13, 0),
    endTime: createDate(0, 13, 30),
    description: "Discussing the pipeline for Product Designer role.",
    interviewers: [mockInterviewers[2]],
    meetingLink: mockMeetingRooms[1].link,
    status: "Completed",
    colorClass: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
  },
  {
    id: "evt-3",
    title: "Focus Time",
    type: "Blocked",
    startTime: createDate(0, 15, 0),
    endTime: createDate(0, 16, 30),
    status: "Scheduled",
    colorClass: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
  },
  // Tomorrow
  {
    id: "evt-4",
    title: "Behavioral Interview",
    type: "Interview",
    startTime: createDate(1, 9, 30),
    endTime: createDate(1, 10, 30),
    candidate: { id: "c-2", name: "Jordan Lee", role: "Product Manager" },
    interviewers: [mockInterviewers[1]],
    meetingLink: mockMeetingRooms[0].link,
    status: "Scheduled",
    colorClass: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  },
  {
    id: "evt-5",
    title: "Final Culture Fit",
    type: "Interview",
    startTime: createDate(1, 14, 0),
    endTime: createDate(1, 15, 0),
    candidate: { id: "c-3", name: "Taylor Smith", role: "DevOps Engineer" },
    interviewers: mockInterviewers,
    meetingLink: mockMeetingRooms[2].link,
    status: "Scheduled",
    colorClass: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  },
  // Yesterday
  {
    id: "evt-6",
    title: "Initial Phone Screen",
    type: "Interview",
    startTime: createDate(-1, 11, 0),
    endTime: createDate(-1, 11, 30),
    candidate: { id: "c-4", name: "Sam Wilson", role: "Backend Developer" },
    status: "Completed",
    colorClass: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  },
  // Day 3
  {
    id: "evt-7",
    title: "Out of Office",
    type: "Out of Office",
    startTime: createDate(3, 9, 0),
    endTime: createDate(3, 17, 0),
    status: "Scheduled",
    colorClass: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800",
  }
];
