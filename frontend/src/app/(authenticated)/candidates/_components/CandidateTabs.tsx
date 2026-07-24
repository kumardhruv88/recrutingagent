"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Candidate } from "@/services/candidates";
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
    <div className="py-12 text-center border-2 border-dashed border-border rounded-xl">
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">This section is currently under development.</p>
    </div>
  );

  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="overflow-x-auto pb-2 mb-6 scrollbar-none">
        <TabsList className="h-11 inline-flex w-max bg-muted p-1 rounded-full space-x-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-full px-4 text-muted-foreground hover:text-foreground transition-all">Overview</TabsTrigger>
          <TabsTrigger value="resume" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-full px-4 text-muted-foreground hover:text-foreground transition-all">Resume</TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-full px-4 flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-all">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            AI Analysis
          </TabsTrigger>
          <TabsTrigger value="applications" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-full px-4 text-muted-foreground hover:text-foreground transition-all">Applications</TabsTrigger>
          <TabsTrigger value="interviews" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-full px-4 text-muted-foreground hover:text-foreground transition-all">Interviews</TabsTrigger>
          <TabsTrigger value="assessments" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-full px-4 text-muted-foreground hover:text-foreground transition-all">Assessments</TabsTrigger>
          <TabsTrigger value="github" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-full px-4 text-muted-foreground hover:text-foreground transition-all">GitHub</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-full px-4 text-muted-foreground hover:text-foreground transition-all">Activity</TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-full px-4 text-muted-foreground hover:text-foreground transition-all">Notes</TabsTrigger>
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
