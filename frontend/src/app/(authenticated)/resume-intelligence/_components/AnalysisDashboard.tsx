"use client";

import { useState } from "react";
import { ResumeAnalysis } from "@/data/resume-intelligence";
import { AIAssistantPanel } from "./AIAssistantPanel";
import { OverviewTab } from "./tabs/OverviewTab";
import { ParserTab } from "./tabs/ParserTab";
import { ATSCheckerTab } from "./tabs/ATSCheckerTab";
import { OptimizerTab } from "./tabs/OptimizerTab";
import { JobMatchTab } from "./tabs/JobMatchTab";
import { HistoryTab } from "./tabs/HistoryTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Share2, FileText, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

interface AnalysisDashboardProps {
  data: ResumeAnalysis;
  onBack: () => void;
}

export function AnalysisDashboard({ data, onBack }: AnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-120px)]">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3 tracking-tight">
                {data.candidateName}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  {data.role}
                </span>
              </h2>
              <p className="text-sm text-zinc-500 mt-1 flex items-center gap-2">
                <FileText className="h-3.5 w-3.5" />
                Uploaded on {data.uploadDate}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-xl justify-start overflow-x-auto overflow-y-hidden no-scrollbar w-full border border-zinc-200 dark:border-zinc-800">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm">Overview</TabsTrigger>
            <TabsTrigger value="parser" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm">Parser</TabsTrigger>
            <TabsTrigger value="ats" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm">ATS Checker</TabsTrigger>
            <TabsTrigger value="optimizer" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm">Optimizer</TabsTrigger>
            <TabsTrigger value="matches" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm">Job Matches</TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950 data-[state=active]:shadow-sm">History</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 mt-6 overflow-y-auto custom-scrollbar relative pr-2">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="pb-10"
            >
              <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
                <OverviewTab data={data} />
              </TabsContent>
              <TabsContent value="parser" className="mt-0 focus-visible:outline-none">
                <ParserTab data={data} />
              </TabsContent>
              <TabsContent value="ats" className="mt-0 focus-visible:outline-none">
                <ATSCheckerTab data={data} />
              </TabsContent>
              <TabsContent value="optimizer" className="mt-0 focus-visible:outline-none">
                <OptimizerTab data={data} />
              </TabsContent>
              <TabsContent value="matches" className="mt-0 focus-visible:outline-none">
                <JobMatchTab data={data} />
              </TabsContent>
              <TabsContent value="history" className="mt-0 focus-visible:outline-none">
                <HistoryTab data={data} />
              </TabsContent>
            </motion.div>
          </div>
        </Tabs>
      </div>

      {/* Right Sidebar - AI Assistant */}
      <div className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 pt-6 lg:pt-0 lg:pl-6 overflow-y-auto custom-scrollbar">
        <AIAssistantPanel assistantData={data.aiAssistant} scores={data.scores} />
      </div>
    </div>
  );
}
