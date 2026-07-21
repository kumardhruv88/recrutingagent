"use client";

import { ResumeAnalysis } from "@/data/resume-intelligence";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";

interface OverviewTabProps {
  data: ResumeAnalysis;
}

export function OverviewTab({ data }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-sm">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <span className="text-sm font-medium opacity-90 mb-1">Overall Score</span>
            <span className="text-4xl font-bold">{data.scores.overall}</span>
          </CardContent>
        </Card>
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <span className="text-sm font-medium text-zinc-500 mb-1">ATS Compatibility</span>
            <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{data.scores.ats}%</span>
          </CardContent>
        </Card>
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <span className="text-sm font-medium text-zinc-500 mb-1">AI Match</span>
            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">{data.scores.aiMatch}%</span>
          </CardContent>
        </Card>
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
            <span className="text-sm font-medium text-zinc-500 mb-1">Impact Score</span>
            <span className="text-3xl font-bold text-purple-600 dark:text-purple-500">{data.scores.impact}%</span>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            Hiring Recommendation: {data.overview.hiringRecommendation.split('.')[0]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
            {data.overview.executiveSummary}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              Key Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {data.overview.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              Potential Weaknesses
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              {data.overview.weaknesses.map((weakness, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <CardTitle className="text-base">Extracted Skills</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 flex flex-wrap gap-2">
          {data.overview.keySkills.map((skill, i) => (
            <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40">
              {skill}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
