import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarEvent } from "@/data/calendar";
import { useState } from "react";
import { Calendar, Clock, Link2, Users, FileText } from "lucide-react";

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: (event: Partial<CalendarEvent>) => void;
}

export function ScheduleDialog({ open, onOpenChange, onSchedule }: ScheduleDialogProps) {
  const [title, setTitle] = useState("");
  const [candidate, setCandidate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule({ title, candidate: { id: "new", name: candidate, role: "Unknown" } });
    setTitle("");
    setCandidate("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl">Schedule Interview</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div>
              <Input 
                placeholder="Interview Title (e.g. Technical Screen)" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="text-lg font-semibold h-12 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
                autoFocus
                required
              />
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-zinc-400 shrink-0" />
              <Input 
                placeholder="Candidate Name" 
                value={candidate}
                onChange={e => setCandidate(e.target.value)}
                className="border-none shadow-none bg-transparent h-10 px-0 focus-visible:ring-0"
                required
              />
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-zinc-400 shrink-0" />
              <div className="flex gap-2 flex-1">
                <Input type="date" className="border-none shadow-none bg-transparent h-10 px-0 focus-visible:ring-0 w-32" required />
                <Input type="time" className="border-none shadow-none bg-transparent h-10 px-0 focus-visible:ring-0 w-24" required />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-zinc-400 shrink-0" />
              <select className="flex-1 bg-transparent border-none text-sm focus:ring-0 text-zinc-900 dark:text-zinc-100">
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
                <option>90 minutes</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <Link2 className="w-5 h-5 text-zinc-400 shrink-0" />
              <select className="flex-1 bg-transparent border-none text-sm focus:ring-0 text-zinc-900 dark:text-zinc-100">
                <option>Generate Google Meet link</option>
                <option>Engineering Zoom Room</option>
                <option>Phone Call</option>
              </select>
            </div>
            <div className="flex items-start gap-3 pt-2">
              <FileText className="w-5 h-5 text-zinc-400 shrink-0 mt-2" />
              <textarea 
                placeholder="Notes for interviewers..." 
                className="flex-1 min-h-[80px] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save & Send Invites</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
