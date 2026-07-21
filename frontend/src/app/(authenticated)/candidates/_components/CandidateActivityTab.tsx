"use client";

import { Candidate, mockActivityTimeline } from "@/data/candidates";
import { CheckCircle2, Clock, FileText, Calendar, MessageSquare, AlertCircle } from "lucide-react";

interface CandidateActivityTabProps {
  candidate: Candidate;
}

export function CandidateActivityTab({}: CandidateActivityTabProps) {
  const getIconForType = (type: string) => {
    switch (type) {
      case "application": return <FileText className="h-4 w-4 text-blue-500" />;
      case "system": return <Clock className="h-4 w-4 text-zinc-500" />;
      case "ai": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "status": return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "interview": return <Calendar className="h-4 w-4 text-purple-500" />;
      default: return <MessageSquare className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 md:ml-4 space-y-8 pb-4">
        {mockActivityTimeline.map((item) => (
          <div key={item.id} className="relative pl-8 md:pl-10">
            <div className="absolute -left-[17px] md:-left-[17px] top-1 h-8 w-8 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center">
              {getIconForType(item.type)}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4 mb-2">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{item.action}</h4>
              <span className="text-xs text-zinc-500 whitespace-nowrap">{item.time}</span>
            </div>
            
            <p className="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50 inline-block">
              {item.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
