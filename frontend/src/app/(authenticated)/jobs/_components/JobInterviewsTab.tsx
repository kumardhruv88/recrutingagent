"use client";

import { Job } from "@/data/jobs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Video, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JobInterviewsTabProps {
  job: Job;
}

export function JobInterviewsTab({}: JobInterviewsTabProps) {
  const upcomingInterviews = [
    {
      id: "int-1",
      candidate: "Alex Turner",
      role: "Senior Frontend Engineer",
      type: "Technical Screening",
      date: "Tomorrow, Oct 26",
      time: "10:00 AM - 11:00 AM PST",
      interviewer: "Jane Doe",
      location: "Google Meet",
      status: "Confirmed"
    },
    {
      id: "int-2",
      candidate: "Maria Garcia",
      role: "Senior Frontend Engineer",
      type: "System Design",
      date: "Thursday, Oct 28",
      time: "2:00 PM - 3:00 PM PST",
      interviewer: "Sarah Connor",
      location: "Zoom",
      status: "Pending"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">Upcoming Interviews</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcomingInterviews.map((interview) => (
            <Card key={interview.id} className="overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="h-2 bg-blue-500"></div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={interview.status === "Confirmed" ? "default" : "secondary"} className={interview.status === "Confirmed" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : ""}>
                    {interview.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2 text-zinc-400">
                    <MoreIcon />
                  </Button>
                </div>
                
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg mb-1">{interview.type}</h4>
                <p className="text-zinc-500 text-sm mb-4">with <span className="font-medium text-zinc-700 dark:text-zinc-300">{interview.candidate}</span></p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                    <CalendarIcon className="mr-2 h-4 w-4 text-zinc-400" />
                    {interview.date}
                  </div>
                  <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                    <Clock className="mr-2 h-4 w-4 text-zinc-400" />
                    {interview.time}
                  </div>
                  <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400">
                    <Video className="mr-2 h-4 w-4 text-zinc-400" />
                    {interview.location}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px]">{interview.interviewer.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-zinc-500">{interview.interviewer}</span>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 text-xs">Join Call</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card className="border-dashed border-2 border-zinc-200 dark:border-zinc-800 shadow-none hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors flex items-center justify-center cursor-pointer min-h-[280px]">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
              <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Schedule Interview</h4>
              <p className="text-sm text-zinc-500 mt-1">Set up a new screening or technical round.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">Completed Interviews</h3>
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">David Chen</h4>
                <p className="text-sm text-zinc-500">Culture Fit • Oct 22, 2023</p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Score: 4.5/5
              </div>
              <p className="text-xs text-zinc-500">Jane Doe</p>
            </div>
          </div>
          <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Emily Rodriguez</h4>
                <p className="text-sm text-zinc-500">Technical Screening • Oct 20, 2023</p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Score: 4.8/5
              </div>
              <p className="text-xs text-zinc-500">Jane Doe</p>
            </div>
          </div>
        </Card>
      </div>
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
