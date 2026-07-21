"use client";

import { ResumeAnalysis } from "@/data/resume-intelligence";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoryTabProps {
  data: ResumeAnalysis;
}

export function HistoryTab({ data }: HistoryTabProps) {
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Analysis History</h3>
        <p className="text-sm text-zinc-500">View previous versions and score changes over time.</p>
      </div>

      <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 space-y-8 pb-4">
        {data.history.map((event, i) => (
          <div key={i} className="relative pl-8">
            <div className={`absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-zinc-950 ${i === 0 ? "bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30" : "bg-zinc-300 dark:bg-zinc-600"}`}></div>
            
            <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {event.version}
                      </span>
                      <span className="text-sm text-zinc-500 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {event.date}
                      </span>
                    </div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mt-2">{event.action}</h4>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Score</span>
                      <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{event.score}</span>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      View
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        <div className="relative pl-8">
          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="py-1">
            <p className="text-sm text-zinc-500">No further history available.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
