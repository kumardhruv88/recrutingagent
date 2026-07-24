"use client";

import { Job } from "@/services/jobs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Video, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { interviewService } from "@/services/interviews";
import { applicationService } from "@/services/applications";
import { Badge } from "@/components/ui/badge";

interface JobInterviewsTabProps {
  job: Job;
}

export function JobInterviewsTab({ job }: JobInterviewsTabProps) {
  const { data: applicationsResponse } = useQuery({
    queryKey: ["applications", { job_id: job.id }],
    queryFn: () => applicationService.getApplications()
  });

  const { data: interviews = [], isLoading } = useQuery({
    queryKey: ["interviews"],
    queryFn: () => interviewService.getInterviews()
  });

  const jobApplications = applicationsResponse?.items?.filter(app => app.job_id === job.id) || [];
  const appIds = new Set(jobApplications.map(app => app.id));
  
  const jobInterviews = interviews.filter(inv => appIds.has(inv.application_id));
  
  const upcomingInterviews = jobInterviews.filter(inv => inv.status !== "Completed" && inv.status !== "Cancelled");
  const completedInterviews = jobInterviews.filter(inv => inv.status === "Completed");

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Upcoming Interviews</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full py-8 text-center text-muted-foreground">Loading interviews...</div>
          ) : upcomingInterviews.length > 0 ? upcomingInterviews.map((interview) => {
            const app = jobApplications.find(a => a.id === interview.application_id);
            const candidateName = app?.candidate ? `${app.candidate.first_name} ${app.candidate.last_name}` : "Unknown Candidate";
            return (
            <Card key={interview.id} className="overflow-hidden border-border shadow-sm">
              <div className="h-2 bg-primary"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={interview.status === "Confirmed" ? "default" : "secondary"} className={interview.status === "Confirmed" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400" : ""}>
                    {interview.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2 text-muted-foreground hover:text-foreground">
                    <MoreIcon />
                  </Button>
                </div>
                
                <h4 className="font-semibold text-foreground text-lg mb-1">{interview.interview_type}</h4>
                <p className="text-muted-foreground text-sm mb-4">with <span className="font-medium text-foreground">{candidateName}</span></p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {new Date(interview.scheduled_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    {new Date(interview.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({interview.duration_minutes}m)
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                    {interview.meeting_url ? "Video Call" : "In Person"}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">{"?".toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">Interviewer</span>
                  </div>
                  {interview.meeting_url && (
                    <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                      <a href={interview.meeting_url} target="_blank" rel="noopener noreferrer">Join Call</a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}) : (
            <div className="col-span-full py-8 text-center text-muted-foreground">No upcoming interviews.</div>
          )}
          
          <Card className="border-dashed border-2 border-border shadow-none hover:bg-muted/50 transition-colors flex items-center justify-center cursor-pointer min-h-[280px]">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-medium text-foreground">Schedule Interview</h4>
              <p className="text-sm text-muted-foreground mt-1">Set up a new screening or technical round.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {completedInterviews.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">Completed Interviews</h3>
          <Card className="border-border shadow-sm">
            {completedInterviews.map(interview => {
              const app = jobApplications.find(a => a.id === interview.application_id);
              const candidateName = app?.candidate ? `${app.candidate.first_name} ${app.candidate.last_name}` : "Unknown Candidate";
              return (
              <div key={interview.id} className="p-4 border-b border-border flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer last:border-b-0">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{candidateName}</h4>
                    <p className="text-sm text-muted-foreground">{interview.interview_type} • {new Date(interview.scheduled_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center px-2 py-1 rounded bg-muted text-xs font-medium text-foreground mb-1">
                    Score: {interview.score || "N/A"}/5
                  </div>
                  <p className="text-xs text-muted-foreground">Interviewer</p>
                </div>
              </div>
            )})}
          </Card>
        </div>
      )}
    </div>
  );
}

function MoreIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.625 7.5C3.625 8.12132 3.11764 8.625 2.5 8.625C1.88236 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.88236 6.375 2.5 6.375C3.11764 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.11764 8.625 7.5 8.625C6.88236 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.88236 6.375 7.5 6.375C8.11764 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1176 8.625 12.5 8.625C11.8824 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8824 6.375 12.5 6.375C13.1176 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
    </svg>
  );
}
