"use client";

import { Candidate, mockAiAnalysis } from "@/data/candidates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, CheckCircle2, AlertTriangle, Lightbulb, Target } from "lucide-react";

interface CandidateAITabProps {
  candidate: Candidate;
}

export function CandidateAITab({ candidate }: CandidateAITabProps) {
  // Use real AI data if provided, fallback to mock
  const aiData = mockAiAnalysis;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-100 dark:border-blue-900/50">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            <div className="w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-blue-700 dark:text-blue-400">{candidate.aiScore}%</span>
            </div>
            <h3 className="font-semibold text-lg text-blue-900 dark:text-blue-300">Match Score</h3>
            <p className="text-sm text-blue-700/80 dark:text-blue-400/80 mt-1">Based on role requirements</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-gradient-to-br from-slate-50 to-zinc-50 dark:from-zinc-900/50 dark:to-zinc-900/30">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-indigo-500" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {aiData.executiveSummary}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium border border-emerald-200 dark:border-emerald-800">
              <Target className="h-4 w-4" />
              Recommendation: {aiData.hiringRecommendation}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
              Key Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {aiData.strengths.map((strength, i) => (
                <li key={i} className="flex gap-3 text-zinc-700 dark:text-zinc-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-orange-700 dark:text-orange-400">
              <AlertTriangle className="h-5 w-5" />
              Potential Weaknesses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {aiData.weaknesses.map((weakness, i) => (
                <li key={i} className="flex gap-3 text-zinc-700 dark:text-zinc-300">
                  <span className="h-2 w-2 rounded-full bg-orange-500 mt-2 shrink-0"></span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-400">
            <Lightbulb className="h-5 w-5" />
            Interview Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {aiData.recommendations.map((rec, i) => (
              <li key={i} className="flex gap-3 text-zinc-700 dark:text-zinc-300 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                <span className="text-blue-500 font-bold">{i + 1}.</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
