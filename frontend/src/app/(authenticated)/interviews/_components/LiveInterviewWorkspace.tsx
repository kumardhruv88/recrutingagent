"use client";

import { InterviewSession, mockActiveTranscript } from "@/data/voice-interview";
import { VoiceOrb } from "./VoiceOrb";
import { Waveform } from "./Waveform";
import { TranscriptPanel } from "./TranscriptPanel";
import { CandidateInfoSidebar } from "./CandidateInfoSidebar";
import { ControlBar } from "./ControlBar";

interface LiveInterviewWorkspaceProps {
  session: InterviewSession;
  onEndSession: () => void;
}

export function LiveInterviewWorkspace({ session, onEndSession }: LiveInterviewWorkspaceProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-zinc-300 font-medium text-sm">Recording Active</span>
        </div>
        <div className="text-zinc-400 text-sm font-medium">
          HireMind AI Interviewer
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left/Center Area - AI Interface */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#111115]">
          
          <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[40vh]">
            <VoiceOrb />
            <Waveform />
          </div>

          <div className="h-1/2 border-t border-zinc-800/50 bg-[#0a0a0a]/80 backdrop-blur-sm flex flex-col">
            <TranscriptPanel messages={mockActiveTranscript} />
          </div>
        </div>

        {/* Right Sidebar - Context */}
        <CandidateInfoSidebar session={session} />
      </div>

      {/* Bottom Controls */}
      <ControlBar onEndInterview={onEndSession} />
    </div>
  );
}
