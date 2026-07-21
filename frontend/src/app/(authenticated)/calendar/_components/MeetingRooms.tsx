import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { mockMeetingRooms } from "@/data/calendar";
import { Video, Copy, ExternalLink, Plus } from "lucide-react";

interface MeetingRoomsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MeetingRooms({ open, onOpenChange }: MeetingRoomsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle className="text-xl">Meeting Rooms</DialogTitle>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-8">
            <Plus className="w-4 h-4 mr-1" /> Add Room
          </Button>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            Configure permanent meeting rooms to be used as locations for interviews.
          </div>
          
          <div className="space-y-3">
            {mockMeetingRooms.map(room => (
              <div key={room.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      {room.name}
                      {room.isDefault && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          DEFAULT
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1">
                      {room.platform} • <span className="truncate max-w-[200px] inline-block align-bottom">{room.link}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
