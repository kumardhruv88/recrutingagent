"use client";

import { InterviewSession } from "@/data/voice-interview";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, CheckCircle2, AlertTriangle, FileText, LayoutList } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface CandidateInfoSidebarProps {
  session: InterviewSession;
}

export function CandidateInfoSidebar({ session }: CandidateInfoSidebarProps) {
  return (
    <div className="w-80 border-l border-zinc-800 bg-[#0f0f11] flex flex-col h-full overflow-y-auto custom-scrollbar">
      <div className="p-5 border-b border-zinc-800/80">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
            {session.candidateName.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-zinc-100">{session.candidateName}</h3>
            <p className="text-xs text-zinc-400">{session.candidateRole}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-medium text-xs">
            Resume Score: 92
          </Badge>
          <Badge variant="outline" className="bg-zinc-800 text-zinc-300 border-zinc-700 font-medium text-xs">
            <FileText className="h-3 w-3 mr-1" />
            View CV
          </Badge>
        </div>
      </div>

      <div className="p-5 flex-1">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <BrainCircuit className="h-4 w-4" />
          Live AI Notes
        </h4>
        
        <div className="space-y-4">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-zinc-300 font-medium">Strong Next.js Experience</p>
                  <p className="text-xs text-zinc-500 mt-1">Candidate detailed a complex migration demonstrating deep knowledge of App Router.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-950/20 border-amber-900/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-amber-500/90 font-medium">Probe State Management</p>
                  <p className="text-xs text-amber-500/60 mt-1">Candidate mentioned Redux but didn&apos;t elaborate on specific server-state handling.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-8 mb-4 flex items-center gap-2">
          <LayoutList className="h-4 w-4" />
          Question Progress
        </h4>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-zinc-400">Technical Deep Dive</span>
              <span className="text-blue-400">In Progress</span>
            </div>
            <Progress value={45} className="h-1.5 bg-zinc-800 [&>div]:bg-blue-500" />
          </div>
          
          <ul className="space-y-2 mt-4">
            <li className="text-xs text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Introduction & Background
            </li>
            <li className="text-xs text-zinc-300 flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-blue-500 relative flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              </span>
              React & Next.js Architecture
            </li>
            <li className="text-xs text-zinc-600 flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-zinc-700"></span>
              System Design & Performance
            </li>
            <li className="text-xs text-zinc-600 flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-zinc-700"></span>
              Behavioral & Leadership
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
