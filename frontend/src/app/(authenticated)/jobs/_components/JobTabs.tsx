"use client";

import { Job } from "@/services/jobs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { JobOverviewTab } from "./JobOverviewTab";
import { JobApplicationsTab } from "./JobApplicationsTab";
import { JobPipelineTab } from "./JobPipelineTab";
import { JobInterviewsTab } from "./JobInterviewsTab";
import { JobAnalyticsTab } from "./JobAnalyticsTab";
import { JobActivityTab } from "./JobActivityTab";

interface JobTabsProps {
  job: Job;
}

export function JobTabs({ job }: JobTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full">
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <div className="border-b border-border bg-background px-4 sm:px-6 sticky top-14 z-10">
          <div className="max-w-7xl mx-auto overflow-x-auto no-scrollbar">
            <TabsList className="h-14 w-full justify-start bg-transparent p-0 flex-nowrap min-w-max">
              {["Overview", "Applications", "Pipeline", "Interviews", "Analytics", "Activity"].map((tab) => {
                const value = tab.toLowerCase();
                return (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="relative h-14 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-4 font-medium text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    {tab}
                    {value === "applications" && (
                      <span className="ml-2 inline-flex items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs text-foreground font-medium">
                        {job.applicationsCount}
                      </span>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
                <JobOverviewTab job={job} />
              </TabsContent>
              <TabsContent value="applications" className="mt-0 focus-visible:outline-none">
                <JobApplicationsTab job={job} />
              </TabsContent>
              <TabsContent value="pipeline" className="mt-0 focus-visible:outline-none">
                <JobPipelineTab job={job} />
              </TabsContent>
              <TabsContent value="interviews" className="mt-0 focus-visible:outline-none">
                <JobInterviewsTab job={job} />
              </TabsContent>
              <TabsContent value="analytics" className="mt-0 focus-visible:outline-none">
                <JobAnalyticsTab job={job} />
              </TabsContent>
              <TabsContent value="activity" className="mt-0 focus-visible:outline-none">
                <JobActivityTab job={job} />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
}
