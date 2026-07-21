"use client";

import { ActivityEvent } from "@/data/recruiter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Activity, ArrowRight, UserCheck, Calendar, FileText, Gift } from "lucide-react";

interface ActivityFeedProps {
  activities: ActivityEvent[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "Review": return <FileText className="h-4 w-4 text-blue-500" />;
      case "Move": return <UserCheck className="h-4 w-4 text-emerald-500" />;
      case "Interview": return <Calendar className="h-4 w-4 text-purple-500" />;
      case "Offer": return <Gift className="h-4 w-4 text-amber-500" />;
      default: return <Activity className="h-4 w-4 text-zinc-500" />;
    }
  };

  const getEventBg = (type: string) => {
    switch (type) {
      case "Review": return "bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800";
      case "Move": return "bg-emerald-100 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800";
      case "Interview": return "bg-purple-100 border-purple-200 dark:bg-purple-900/30 dark:border-purple-800";
      case "Offer": return "bg-amber-100 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800";
      default: return "bg-zinc-100 border-zinc-200 dark:bg-zinc-900/30 dark:border-zinc-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      className="h-full"
    >
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-zinc-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>Live updates from your pipeline</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="hidden sm:flex text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="relative border-l-2 border-zinc-100 dark:border-zinc-800 ml-3 space-y-6 mt-2">
            {activities.map((activity, index) => (
              <motion.div 
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + (index * 0.1) }}
                className="relative pl-6"
              >
                <div className={`absolute -left-[15px] top-0.5 w-7 h-7 rounded-full flex items-center justify-center border shadow-sm ${getEventBg(activity.type)}`}>
                  {getEventIcon(activity.type)}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-0.5 leading-snug">
                    {activity.description}
                  </p>
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-6 sm:hidden">
            View Activity Log
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
