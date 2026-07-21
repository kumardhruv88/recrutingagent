"use client";

import { mockSessions, mockTemplates } from "@/data/voice-interview";
import { SessionTable } from "./SessionTable";
import { InterviewTemplateCard } from "./InterviewTemplateCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Activity, Clock, Users, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";

interface VoiceInterviewDashboardProps {
  onJoinSession: (id: string) => void;
  onReviewSession: (id: string) => void;
}

export function VoiceInterviewDashboard({ onJoinSession, onReviewSession }: VoiceInterviewDashboardProps) {
  const activeCount = mockSessions.filter(s => s.status === "active").length;
  const upcomingCount = mockSessions.filter(s => s.status === "upcoming").length;
  const completedCount = mockSessions.filter(s => s.status === "completed").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader 
        title="Voice Interviews" 
        description="Launch, monitor, and review AI-led interviews."
        primaryAction={
          <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-sm">
            <Mic className="mr-2 h-4 w-4" />
            New AI Interview
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
              <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Active Now</p>
              <h4 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{activeCount}</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Upcoming Today</p>
              <h4 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{upcomingCount}</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Completed</p>
              <h4 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{completedCount}</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm bg-zinc-900 dark:bg-white flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
          <CardContent className="p-5 flex items-center justify-between w-full">
            <span className="font-semibold text-white dark:text-zinc-950">Analytics Hub</span>
            <div className="h-8 w-8 rounded-full bg-zinc-800 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900">
              <ChevronRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active & Recent Sessions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Sessions</h3>
          <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400">View All</Button>
        </div>
        <SessionTable sessions={mockSessions} onJoin={onJoinSession} onReview={onReviewSession} />
      </div>

      {/* Templates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">AI Templates</h3>
            <p className="text-sm text-zinc-500">Select a pre-configured AI persona and question bank.</p>
          </div>
          <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400">Manage Templates</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockTemplates.map((tpl) => (
            <InterviewTemplateCard key={tpl.id} template={tpl} onClick={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}
