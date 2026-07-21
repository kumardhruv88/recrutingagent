"use client";

import { AssignedJob } from "@/data/recruiter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight, Users, CalendarCheck } from "lucide-react";

interface AssignedJobsListProps {
  jobs: AssignedJob[];
}

export function AssignedJobsList({ jobs }: AssignedJobsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800";
      case "Paused": return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
      case "Closed": return "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700";
      default: return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              My Active Roles
            </CardTitle>
            <CardDescription>Roles currently assigned to your pipeline</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hidden sm:flex">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group cursor-pointer">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.title}</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{job.department}</p>
                </div>
                <Badge variant="outline" className={getStatusColor(job.status)}>
                  {job.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <Users className="h-4 w-4 text-zinc-400" />
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{job.applications}</span> Apps
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <CalendarCheck className="h-4 w-4 text-zinc-400" />
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{job.interviews}</span> Interviews
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-zinc-500">Hiring Progress</span>
                  <span className="text-zinc-900 dark:text-zinc-100">{job.progress}%</span>
                </div>
                <Progress value={job.progress} className="h-1.5">
                  <ProgressTrack className="bg-zinc-200 dark:bg-zinc-800">
                    <ProgressIndicator className="bg-blue-500" />
                  </ProgressTrack>
                </Progress>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-auto sm:hidden">
            View All Roles
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
