"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Candidate } from "@/data/candidates";
import { motion, AnimatePresence } from "framer-motion";

import { CandidateOverviewTab } from "./CandidateOverviewTab";
import { CandidateResumeTab } from "./CandidateResumeTab";
import { CandidateAITab } from "./CandidateAITab";
import { CandidateActivityTab } from "./CandidateActivityTab";

interface CandidateTabsProps {
  candidate: Candidate;
}

export function CandidateTabs({ candidate }: CandidateTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Placeholder components for tabs
  const TabPlaceholder = ({ title }: { title: string }) => (
    <div className="py-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-500">This section is currently under development.</p>
    </div>
  );

  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="overflow-x-auto pb-2 mb-6 scrollbar-none">
        <TabsList className="h-10 inline-flex w-max bg-transparent space-x-2">
          <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-800 rounded-full px-4">Overview</TabsTrigger>
          <TabsTrigger value="resume" className="data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-800 rounded-full px-4">Resume</TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-800 rounded-full px-4 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            AI Analysis
          </TabsTrigger>
          <TabsTrigger value="applications" className="data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-800 rounded-full px-4">Applications</TabsTrigger>
          <TabsTrigger value="interviews" className="data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-800 rounded-full px-4">Interviews</TabsTrigger>
          <TabsTrigger value="assessments" className="data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-800 rounded-full px-4">Assessments</TabsTrigger>
          <TabsTrigger value="github" className="data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-800 rounded-full px-4">GitHub</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-800 rounded-full px-4">Activity</TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-zinc-100 dark:data-[state=active]:bg-zinc-800 rounded-full px-4">Notes</TabsTrigger>
        </TabsList>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
            <CandidateOverviewTab candidate={candidate} />
          </TabsContent>
          <TabsContent value="resume" className="mt-0 focus-visible:outline-none">
            <CandidateResumeTab candidate={candidate} />
          </TabsContent>
          <TabsContent value="ai" className="mt-0 focus-visible:outline-none">
             <CandidateAITab candidate={candidate} />
          </TabsContent>
          <TabsContent value="applications" className="mt-0 focus-visible:outline-none">
            <TabPlaceholder title="Applications" />
          </TabsContent>
          <TabsContent value="interviews" className="mt-0 focus-visible:outline-none">
            <TabPlaceholder title="Interviews" />
          </TabsContent>
          <TabsContent value="assessments" className="mt-0 focus-visible:outline-none">
            <TabPlaceholder title="Assessments" />
          </TabsContent>
          <TabsContent value="github" className="mt-0 focus-visible:outline-none">
            <TabPlaceholder title="GitHub Insights" />
          </TabsContent>
          <TabsContent value="activity" className="mt-0 focus-visible:outline-none">
            <CandidateActivityTab candidate={candidate} />
          </TabsContent>
          <TabsContent value="notes" className="mt-0 focus-visible:outline-none">
            <TabPlaceholder title="Recruiter Notes" />
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  );
}
