"use client";

import { ResumeAnalysis } from "@/data/resume-intelligence";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OptimizerTabProps {
  data: ResumeAnalysis;
}

export function OptimizerTab({ data }: OptimizerTabProps) {
  return (
    <div className="space-y-6">
      <Card className="border-blue-200 dark:border-blue-900 shadow-sm bg-blue-50/30 dark:bg-blue-900/10">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400 fill-current" />
              AI Resume Optimization
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1 max-w-xl">
              Applying these suggestions could increase the candidate&apos;s ATS score from <span className="font-bold">{data.scores.ats}</span> to an estimated <span className="font-bold text-emerald-600 dark:text-emerald-400">92</span>.
            </p>
          </div>
          <Button className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-sm">
            Apply All Changes (Preview)
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Bullet Point Enhancements
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              {data.optimizer.bulletImprovements.map((improvement, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/50">
                      Impact: {improvement.impact}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 relative">
                      <span className="absolute top-0 right-0 bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg uppercase">Before</span>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 pr-10 mt-1">{improvement.before}</p>
                    </div>
                    
                    <div className="hidden md:flex items-center justify-center -mx-6 z-10 relative">
                      <div className="bg-white dark:bg-zinc-950 rounded-full p-1 border border-zinc-200 dark:border-zinc-800 shadow-sm text-zinc-400">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/50 relative shadow-sm">
                      <span className="absolute top-0 right-0 bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg uppercase">After</span>
                      <p className="text-sm text-zinc-900 dark:text-zinc-100 pr-10 mt-1 font-medium">{improvement.after}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-base flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-500" />
                Grammar & Tone Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {data.optimizer.grammarSuggestions.map((suggestion, i) => (
                  <div key={i} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col gap-3">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 line-through text-red-500/70 text-sm">
                        {suggestion.original}
                      </div>
                      <div className="flex-1 font-medium text-emerald-600 dark:text-emerald-400 text-sm">
                        {suggestion.suggestion}
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded">
                      <span className="font-semibold mr-1">Why:</span>
                      {suggestion.reason}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-6">
            <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-base">Missing Keywords</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-zinc-500 mb-4">
                Adding these industry-standard keywords can improve visibility to recruiters and ATS systems.
              </p>
              <div className="flex flex-wrap gap-2">
                {data.optimizer.missingKeywords.map((keyword, i) => (
                  <Badge key={i} variant="outline" className="border-purple-200 text-purple-700 bg-purple-50 dark:border-purple-900/50 dark:text-purple-400 dark:bg-purple-900/20 px-3 py-1 cursor-pointer hover:bg-purple-100 transition-colors">
                    + {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
