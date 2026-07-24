"use client";

import { Job, mockJobActivityTimeline } from "@/data/jobs";
import { CheckCircle2, Clock, FileText, Calendar, MessageSquare, AlertCircle } from "lucide-react";

interface JobActivityTabProps {
  job: Job;
}

export function JobActivityTab({}: JobActivityTabProps) {
  const getIconForType = (type: string) => {
    switch (type) {
      case "application": return <FileText className="h-4 w-4 text-blue-500" />;
      case "system": return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "offer": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "status": return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "interview": return <Calendar className="h-4 w-4 text-purple-500" />;
      default: return <MessageSquare className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="relative border-l border-border ml-3 md:ml-4 space-y-8 pb-4 mt-6">
        {mockJobActivityTimeline.map((item) => (
          <div key={item.id} className="relative pl-8 md:pl-10">
            <div className="absolute -left-[17px] md:-left-[17px] top-1 h-8 w-8 rounded-full bg-background border border-border shadow-sm flex items-center justify-center">
              {getIconForType(item.type)}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4 mb-2">
              <h4 className="font-semibold text-foreground">{item.action}</h4>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
            </div>
            
            <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-xl border border-border inline-block">
              {item.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
