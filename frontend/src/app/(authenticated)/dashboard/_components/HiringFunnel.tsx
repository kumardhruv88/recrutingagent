"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDashboardData } from "@/data/dashboard";
import { Filter } from "lucide-react";

export function HiringFunnel() {
  const { funnel } = mockDashboardData;
  const maxCount = Math.max(...funnel.map((s) => s.count));

  return (
    <Card className="col-span-full xl:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-500" />
          Hiring Funnel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {funnel.map((stage, index) => {
          const width = Math.max((stage.count / maxCount) * 100, 5); // Ensure minimum width for visibility

          return (
            <div key={stage.stage} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {stage.stage}
                </span>
                <span className="text-zinc-500 font-semibold">{stage.count}</span>
              </div>
              <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${width}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full ${stage.color}`}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
