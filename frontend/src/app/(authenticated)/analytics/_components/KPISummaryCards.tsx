"use client";

import { motion } from "framer-motion";
import { Users, Clock, Filter, Activity, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const kpiConfig = [
  { key: "totalHires", title: "Total Hires", value: "142", change: 18, trend: "up", icon: Users, color: "text-primary" },
  { key: "timeToHire", title: "Avg. Time-to-Hire", value: "18 days", change: -12, trend: "up", icon: Clock, color: "text-emerald-600 dark:text-emerald-400" },
  { key: "conversionRate", title: "Offer Acceptance", value: "85%", change: 4, trend: "up", icon: Filter, color: "text-blue-600 dark:text-blue-400" },
  { key: "recruiterActivity", title: "Interviews Conducted", value: "348", change: -5, trend: "down", icon: Activity, color: "text-orange-600 dark:text-orange-400" },
];

export function KPISummaryCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpiConfig.map((config, index) => {
        const Icon = config.icon;

        return (
          <motion.div
            key={config.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex"
          >
            <Card className="w-full flex flex-col justify-between transition-all duration-200 hover:shadow-md bg-card border-border rounded-xl shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{config.title}</CardTitle>
                <div className={`p-2 rounded-full bg-muted ${config.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight text-foreground">{config.value}</div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center">
                  <span
                    className={`font-semibold mr-1.5 flex items-center gap-0.5 ${
                      config.trend === "up" ? "text-success" : "text-danger"
                    }`}
                  >
                    {config.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(config.change)}%
                  </span>
                  vs last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
