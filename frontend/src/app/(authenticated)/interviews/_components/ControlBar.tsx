"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Pause, Play, PhoneOff, Settings, Volume2 } from "lucide-react";

interface ControlBarProps {
  onEndInterview: () => void;
}

export function ControlBar({ onEndInterview }: ControlBarProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="h-20 bg-[#0a0a0a] border-t border-zinc-800 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4 w-1/3">
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-zinc-500" />
          <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-blue-500 rounded-full"></div>
          </div>
        </div>
        <span className="text-xs font-mono text-zinc-500">01:05 / 45:00</span>
      </div>

      <div className="flex items-center justify-center gap-4 w-1/3">
        <Button 
          variant="outline" 
          size="icon" 
          className={`rounded-full h-12 w-12 border-zinc-700 ${isMuted ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 border-red-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-12 w-12 bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-white"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? <Play className="h-5 w-5 fill-current ml-1" /> : <Pause className="h-5 w-5 fill-current" />}
        </Button>
        
        <Button 
          variant="destructive" 
          size="icon" 
          className="rounded-full h-12 w-12 shadow-lg shadow-red-500/20"
          onClick={onEndInterview}
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center justify-end w-1/3">
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
