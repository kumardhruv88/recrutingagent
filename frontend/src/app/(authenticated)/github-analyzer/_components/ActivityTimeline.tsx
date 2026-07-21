"use client";

import { ActivityEvent } from "@/data/github";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, AlertCircle, Tag, History } from "lucide-react";

interface ActivityTimelineProps {
  events: ActivityEvent[];
}

export function ActivityTimeline({ events }: ActivityTimelineProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "commit": return <GitCommit className="h-4 w-4 text-emerald-500" />;
      case "pr": return <GitPullRequest className="h-4 w-4 text-blue-500" />;
      case "issue": return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "release": return <Tag className="h-4 w-4 text-purple-500" />;
      default: return <History className="h-4 w-4 text-zinc-500" />;
    }
  };

  const getEventBg = (type: string) => {
    switch (type) {
      case "commit": return "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800";
      case "pr": return "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800";
      case "issue": return "bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800";
      case "release": return "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800";
      default: return "bg-zinc-100 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="h-full"
    >
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="h-5 w-5 text-zinc-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 space-y-6 mt-2">
            {events.map((event, index) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                className="relative pl-6"
              >
                <div className={`absolute -left-3.5 top-0 w-7 h-7 rounded-full flex items-center justify-center border shadow-sm ${getEventBg(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                <div>
                  <div className="flex items-baseline justify-between mb-0.5">
                    <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{event.repoName}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{event.date}</span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{event.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
