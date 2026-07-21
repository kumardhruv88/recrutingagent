import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarEvent } from "@/data/calendar";
import { format } from "date-fns";
import { Clock, Video, FileText, ExternalLink, Calendar as CalendarIcon, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EventDetailsDialogProps {
  event: CalendarEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailsDialog({ event, open, onOpenChange }: EventDetailsDialogProps) {
  if (!event) return null;

  const start = new Date(event.startTime);
  const end = new Date(event.endTime);
  const duration = (end.getTime() - start.getTime()) / 60000;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
        <div className={`h-2 w-full ${event.colorClass.split(" ")[0]} opacity-80`} />
        
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-semibold leading-tight">{event.title}</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <CalendarIcon className="w-4 h-4" />
            <span>{format(start, "EEEE, MMMM d")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Clock className="w-4 h-4" />
            <span>{format(start, "h:mm a")} - {format(end, "h:mm a")} ({duration} min)</span>
          </div>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6">
          {event.meetingLink && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <Video className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <a href={event.meetingLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  Join Meeting <ExternalLink className="w-3 h-3" />
                </a>
                <p className="text-xs text-zinc-500 truncate">{event.meetingLink}</p>
              </div>
            </div>
          )}

          {event.candidate && (
            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-zinc-400" /> Candidate
              </h4>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800">{event.candidate.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{event.candidate.name}</div>
                  <div className="text-xs text-zinc-500">{event.candidate.role}</div>
                </div>
                <Button variant="outline" size="sm" className="ml-auto h-8">View Profile</Button>
              </div>
            </div>
          )}

          {event.interviewers && event.interviewers.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-3">Interviewers</h4>
              <div className="flex flex-col gap-2">
                {event.interviewers.map((inv, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={inv.avatar} />
                      <AvatarFallback>{inv.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{inv.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {event.description && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-400" /> Notes
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-md border border-zinc-100 dark:border-zinc-800">
                {event.description}
              </p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Edit Event</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
