"use client";

import { mockActivityTimeline } from "@/data/candidates";
import { Candidate } from "@/services/candidates";
import { CheckCircle2, Clock, FileText, Calendar, MessageSquare, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CandidateActivityTabProps {
  candidate: Candidate;
}

export function CandidateActivityTab({}: CandidateActivityTabProps) {
  const getActivityIcon = (type: string) => {
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
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Activity Timeline</CardTitle>
          <Button variant="outline" size="sm" className="gap-2 bg-background">
            <MessageSquare className="h-4 w-4" />
            Add Note
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6 border-l border-border mt-4 pb-4 space-y-8">
            {mockActivityTimeline.map((activity) => (
              <div key={activity.id} className="relative">
                <div className="absolute w-3 h-3 bg-border rounded-full -left-[30px] top-1.5 ring-4 ring-background"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1 gap-1 sm:gap-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    {getActivityIcon(activity.type)}
                    {activity.action}
                  </h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
                {activity.details && (
                  <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md border border-border shadow-sm">
                    {activity.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
