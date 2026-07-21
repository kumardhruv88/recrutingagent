"use client";

import {
  mockRecruiterProfile,
  mockAssignedJobs,
  mockCandidates,
  mockTasks,
  mockInterviews,
  mockAIAssistantInsights,
  mockPerformanceMetrics,
  mockActivityFeed,
} from "@/data/recruiter";

import { RecruiterSummary } from "./RecruiterSummary";
import { QuickActionGrid } from "./QuickActionGrid";
import { AssignedJobsList } from "./AssignedJobsList";
import { CandidateList } from "./CandidateList";
import { TaskChecklist } from "./TaskChecklist";
import { InterviewTimeline } from "./InterviewTimeline";
import { AIAssistantPanel } from "./AIAssistantPanel";
import { PerformanceCards } from "./PerformanceCards";
import { ActivityFeed } from "./ActivityFeed";

export function RecruiterPortalDashboard() {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      {/* Top Section */}
      <RecruiterSummary profile={mockRecruiterProfile} />
      <QuickActionGrid />
      
      {/* Main Grid: 3 columns on Desktop, 2 on Tablet, 1 on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Main Content Column (Spans 2 columns on Desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <AssignedJobsList jobs={mockAssignedJobs} />
          <CandidateList candidates={mockCandidates} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TaskChecklist initialTasks={mockTasks} />
            <ActivityFeed activities={mockActivityFeed} />
          </div>
        </div>

        {/* Right Content Column (Spans 1 column on Desktop) */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <div className="flex-1 min-h-[400px]">
            <AIAssistantPanel insights={mockAIAssistantInsights} />
          </div>
          <div className="flex-1 min-h-[300px]">
            <InterviewTimeline interviews={mockInterviews} />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
          Performance & Efficiency
        </h3>
        <PerformanceCards metrics={mockPerformanceMetrics} />
      </div>
    </div>
  );
}
