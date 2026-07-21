"use client";

import { ProjectQualityMetrics } from "@/data/github";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface ProjectQualitySectionProps {
  metrics: ProjectQualityMetrics;
}

export function ProjectQualitySection({ metrics }: ProjectQualitySectionProps) {
  const metricItems = [
    { label: "Architecture", value: metrics.architecture },
    { label: "Readability", value: metrics.readability },
    { label: "Testing", value: metrics.testing },
    { label: "Documentation", value: metrics.documentation },
    { label: "Maintainability", value: metrics.maintainability },
    { label: "Scalability", value: metrics.scalability },
    { label: "Security", value: metrics.security },
  ];

  const getColorForValue = (val: number) => {
    if (val >= 90) return "bg-blue-500";
    if (val >= 80) return "bg-emerald-500";
    if (val >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-indigo-500" />
            Code Quality & Engineering Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-2">
            {metricItems.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.value}/100
                  </span>
                </div>
                {/* We override the progress indicator color dynamically */}
                <Progress 
                  value={item.value} 
                  className="h-2"
                >
                  <ProgressTrack className="bg-zinc-100 dark:bg-zinc-800">
                    <ProgressIndicator className={getColorForValue(item.value)} />
                  </ProgressTrack>
                </Progress>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
