import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, Clock } from "lucide-react";

interface AvailabilityGridProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AvailabilityGrid({ open, onOpenChange }: AvailabilityGridProps) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-zinc-500" />
            Manage Availability
          </DialogTitle>
        </DialogHeader>
        <div className="py-6 space-y-6">
          <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            Set your standard working hours. These slots will be open for candidates to book interviews.
          </div>
          
          <div className="space-y-4">
            {days.map(day => (
              <div key={day} className="flex items-start gap-4">
                <div className="w-24 shrink-0 flex items-center pt-2">
                  <input type="checkbox" defaultChecked className="mr-2 rounded border-zinc-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm font-medium">{day}</span>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 group">
                    <div className="flex items-center bg-zinc-50 dark:bg-zinc-900/50 rounded border border-zinc-200 dark:border-zinc-800 px-3 py-1">
                      <Clock className="w-4 h-4 text-zinc-400 mr-2" />
                      <input type="time" defaultValue="09:00" className="bg-transparent border-none text-sm p-0 focus:ring-0 w-20" />
                      <span className="text-zinc-400 mx-2">-</span>
                      <input type="time" defaultValue="17:00" className="bg-transparent border-none text-sm p-0 focus:ring-0 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h4 className="font-medium text-sm mb-2">Sync Settings</h4>
            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <div>
                <p className="text-sm font-medium">Google Calendar</p>
                <p className="text-xs text-zinc-500">Connected to recruiter@hiremind.ai</p>
              </div>
              <Button variant="outline" size="sm" className="h-8">Configure</Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)} className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
