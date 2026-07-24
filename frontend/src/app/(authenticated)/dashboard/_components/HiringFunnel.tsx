"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from "@/data/dashboard";
import { Filter } from "lucide-react";

export function HiringFunnel() {
  const { funnel } = useDashboardData();
  const maxCount = Math.max(...funnel.map((s) => s.count));

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Hiring Funnel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 flex-1 pt-4 pb-6">
        {funnel.map((stage, index) => {
          const width = Math.max((stage.count / maxCount) * 100, 5); // Ensure minimum width for visibility

          return (
            <div key={stage.stage} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">
                  {stage.stage}
                </span>
                <span className="text-muted-foreground font-semibold">{stage.count}</span>
              </div>
              <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
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
