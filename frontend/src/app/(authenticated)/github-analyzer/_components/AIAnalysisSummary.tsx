"use client";

import { AIAnalysisSummary as AIAnalysisSummaryType } from "@/data/github";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface AIAnalysisSummaryProps {
  analysis: AIAnalysisSummaryType;
}

export function AIAnalysisSummary({ analysis }: AIAnalysisSummaryProps) {
  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "Strong Hire":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800";
      case "Hire":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
      case "Consider":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
      default:
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            AI Executive Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {analysis.executiveSummary}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
              <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Level</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{analysis.engineeringLevel}</span>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
              <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Recommendation</span>
              <Badge variant="outline" className={`mt-1 ${getRecommendationColor(analysis.hiringRecommendation)}`}>
                {analysis.hiringRecommendation}
              </Badge>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
              <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">AI Confidence</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{analysis.confidenceScore}%</span>
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
            <div>
              <h4 className="text-sm font-semibold flex items-center gap-2 text-zinc-900 dark:text-zinc-100 mb-3">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                Key Strengths
              </h4>
              <ul className="space-y-2">
                {analysis.keyStrengths.map((strength, i) => (
                  <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold flex items-center gap-2 text-zinc-900 dark:text-zinc-100 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Areas for Growth
              </h4>
              <ul className="space-y-2">
                {analysis.areasForImprovement.map((area, i) => (
                  <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
