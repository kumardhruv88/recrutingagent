"use client";

import { ResumeAnalysis } from "@/data/resume-intelligence";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, AlertTriangle, Lightbulb, Zap, CheckCircle2 } from "lucide-react";

interface AIAssistantPanelProps {
  assistantData: ResumeAnalysis['aiAssistant'];
  scores: ResumeAnalysis['scores'];
}

export function AIAssistantPanel({ assistantData, scores }: AIAssistantPanelProps) {
  return (
    <div className="space-y-6 pb-10 pr-2 lg:pr-0 sticky top-0">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-800">
          <BrainCircuit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">HireMind AI</h3>
          <p className="text-xs text-zinc-500 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
            {assistantData.confidence}% Confidence Score
          </p>
        </div>
      </div>

      {/* Main Scores */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-medium text-zinc-500 mb-1">Overall Match</span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{scores.aiMatch}%</span>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-medium text-zinc-500 mb-1">ATS Score</span>
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{scores.ats}%</span>
        </div>
      </div>

      <Card className="border-blue-100 dark:border-blue-900/50 shadow-sm bg-blue-50/50 dark:bg-blue-900/10">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-500" />
            Executive Brief
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
            {assistantData.summary}
          </p>
        </CardContent>
      </Card>

      <div>
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          Top Recommendations
        </h4>
        <ul className="space-y-3">
          {assistantData.topRecommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 text-xs mt-0.5">
                {i + 1}
              </span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {assistantData.warnings.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Warnings
          </h4>
          <ul className="space-y-2">
            {assistantData.warnings.map((warning, i) => (
              <li key={i} className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-lg text-sm border border-red-100 dark:border-red-900/30">
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Quick Tips</h4>
        <div className="flex flex-wrap gap-2">
          {assistantData.quickTips.map((tip, i) => (
            <Badge key={i} variant="secondary" className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 font-normal">
              {tip}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
