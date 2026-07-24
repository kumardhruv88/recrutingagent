"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, FileText, Calendar, Send, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from "@/data/dashboard";

const kpiConfig = [
  { key: "openJobs", title: "Open Jobs", icon: Briefcase, color: "text-blue-600 dark:text-blue-400" },
  { key: "candidates", title: "Candidates", icon: Users, color: "text-purple-600 dark:text-purple-400" },
  { key: "applications", title: "Applications", icon: FileText, color: "text-green-600 dark:text-green-400" },
  { key: "interviewsToday", title: "Interviews Today", icon: Calendar, color: "text-orange-600 dark:text-orange-400" },
  { key: "offersSent", title: "Offers Sent", icon: Send, color: "text-pink-600 dark:text-pink-400" },
  { key: "avgHireTime", title: "Average Hiring Time", icon: Clock, color: "text-emerald-600 dark:text-emerald-400" },
];

export function KPICards() {
  const { kpis } = useDashboardData();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {kpiConfig.map((config, index) => {
        const data = kpis[config.key as keyof typeof kpis];
        const Icon = config.icon;

        return (
          <motion.div
            key={config.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex"
          >
            <Card className="w-full flex flex-col justify-between transition-all hover:shadow-sm bg-surface border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{config.title}</CardTitle>
                <div className={`p-2 rounded-full bg-background ${config.color} bg-opacity-10 dark:bg-opacity-20`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight text-foreground">{data.value}</div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center">
                  <span
                    className={`font-semibold mr-1.5 flex items-center gap-0.5 ${
                      data.trend === "up"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {data.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {data.change}%
                  </span>
                  from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
