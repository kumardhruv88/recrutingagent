"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDashboardData } from "@/data/dashboard";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIInsights() {
  const { aiInsights } = mockDashboardData;

  return (
    <Card className="col-span-full lg:col-span-1 xl:col-span-1 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-indigo-950/20 dark:to-blue-950/20 border-indigo-100 dark:border-indigo-900/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
          <Sparkles className="h-5 w-5" />
          HireMind AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {aiInsights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group p-4 rounded-xl bg-white dark:bg-zinc-900 border border-indigo-50 dark:border-indigo-900/30 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                {insight.title}
              </h4>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                {insight.confidence}% Conf.
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              {insight.description}
            </p>
            <Button variant="link" className="p-0 h-auto text-indigo-600 dark:text-indigo-400 font-medium text-xs group-hover:text-indigo-700 dark:group-hover:text-indigo-300 flex items-center gap-1">
              {insight.action} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
