"use client";

import { PerformanceMetrics } from "@/data/recruiter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, CheckCircle2, Zap } from "lucide-react";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";

interface PerformanceCardsProps {
  metrics: PerformanceMetrics;
}

export function PerformanceCards({ metrics }: PerformanceCardsProps) {
  const cards = [
    {
      title: "Hiring Efficiency",
      value: `${metrics.hiringEfficiencyScore}%`,
      icon: <Zap className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      progress: metrics.hiringEfficiencyScore,
      subtitle: "+5% vs last month"
    },
    {
      title: "Candidates Reviewed",
      value: metrics.candidatesReviewed,
      icon: <Users className="h-5 w-5 text-emerald-500" />,
      color: "bg-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      progress: 75,
      subtitle: "Weekly goal: 400"
    },
    {
      title: "Interviews & Offers",
      value: `${metrics.interviewsCompleted} / ${metrics.offersSent}`,
      icon: <CheckCircle2 className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      progress: (metrics.offersSent / metrics.interviewsCompleted) * 100,
      subtitle: "25% conversion rate"
    },
    {
      title: "Avg Response Time",
      value: `${metrics.avgResponseTimeHours}h`,
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      progress: 80, // Inverse metric visually
      subtitle: "-2h vs last week"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card, index) => (
        <Card key={index} className="border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
              {card.title}
            </CardTitle>
            <div className={`p-1.5 rounded-lg ${card.bg} transition-transform group-hover:scale-110`}>
              {card.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-1">
              {card.value}
            </div>
            <div className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-4">
              <TrendingUp className="h-3 w-3 mr-1" />
              {card.subtitle}
            </div>
            <Progress value={card.progress} className="h-1.5">
              <ProgressTrack className="bg-zinc-100 dark:bg-zinc-800">
                <ProgressIndicator className={card.color} />
              </ProgressTrack>
            </Progress>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}
