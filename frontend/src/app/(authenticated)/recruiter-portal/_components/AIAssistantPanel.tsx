"use client";

import { AIAssistantInsight } from "@/data/recruiter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertTriangle, Info, ArrowRight, Lightbulb } from "lucide-react";

interface AIAssistantPanelProps {
  insights: AIAssistantInsight[];
}

export function AIAssistantPanel({ insights }: AIAssistantPanelProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case "Priority": return <AlertTriangle className="h-5 w-5 text-rose-500" />;
      case "Warning": return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "Suggestion": return <Sparkles className="h-5 w-5 text-indigo-500" />;
      case "Insight": return <Lightbulb className="h-5 w-5 text-blue-500" />;
      default: return <Info className="h-5 w-5 text-zinc-500" />;
    }
  };

  const getInsightBg = (type: string) => {
    switch (type) {
      case "Priority": return "bg-rose-50 border-rose-200 dark:bg-rose-900/10 dark:border-rose-900/50";
      case "Warning": return "bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-900/50";
      case "Suggestion": return "bg-indigo-50 border-indigo-200 dark:bg-indigo-900/10 dark:border-indigo-900/50";
      case "Insight": return "bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-900/50";
      default: return "bg-zinc-50 border-zinc-200 dark:bg-zinc-900/10 dark:border-zinc-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="h-full"
    >
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-lg h-full flex flex-col relative overflow-hidden bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-950 dark:to-zinc-900/50">
        {/* Magic Glow Effect */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/15 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

        <CardHeader className="pb-4 relative">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </div>
            AI Assistant
          </CardTitle>
          <CardDescription>Real-time insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 relative">
          <div className="space-y-4">
            <AnimatePresence>
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                  className={`p-4 rounded-xl border ${getInsightBg(insight.type)} shadow-sm hover:shadow-md transition-shadow group`}
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-snug">
                        {insight.message}
                      </p>
                      {insight.actionText && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-3 h-8 px-3 text-xs font-semibold bg-white/60 dark:bg-zinc-950/40 hover:bg-white dark:hover:bg-zinc-900 transition-colors shadow-sm w-full justify-between group-hover:border-zinc-300 dark:group-hover:border-zinc-700 border border-transparent"
                        >
                          {insight.actionText}
                          <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-8 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Daily Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
