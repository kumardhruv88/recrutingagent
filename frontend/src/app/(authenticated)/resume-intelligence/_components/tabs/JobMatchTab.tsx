"use client";

import { ResumeAnalysis } from "@/data/resume-intelligence";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Building, Sparkles, CheckCircle2 } from "lucide-react";

interface JobMatchTabProps {
  data: ResumeAnalysis;
}

export function JobMatchTab({ data }: JobMatchTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recommended Roles</h3>
          <p className="text-sm text-zinc-500">Based on parsed skills, experience, and AI analysis.</p>
        </div>
        <Button variant="outline" size="sm">
          <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
          Refresh Matches
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {data.jobMatches.map((job) => (
          <Card key={job.id} className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-all hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Score Column */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800 shrink-0 md:w-48">
                  <div className="relative h-20 w-20 flex items-center justify-center mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-zinc-200 dark:text-zinc-800" />
                      <circle 
                        cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" 
                        strokeDasharray={226.2} strokeDashoffset={226.2 - (226.2 * job.matchScore) / 100}
                        className={job.matchScore > 85 ? "text-emerald-500" : job.matchScore > 70 ? "text-amber-500" : "text-red-500"} 
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{job.matchScore}%</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Match Score</span>
                </div>
                
                {/* Details Column */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{job.role}</h4>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mt-1">
                          <Building className="h-3.5 w-3.5" />
                          {job.company}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="hidden sm:flex">
                        Compare Profile
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mt-4 mb-6">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-zinc-400" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4 text-zinc-400" />
                        {job.salary}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {job.skillGaps.length > 0 ? (
                      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="font-medium text-amber-600 dark:text-amber-500">Skill Gaps:</span>
                        <div className="flex flex-wrap gap-1">
                          {job.skillGaps.map((gap, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                              {gap}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-500 font-medium">
                        <CheckCircle2 className="h-4 w-4" />
                        No critical skill gaps identified
                      </div>
                    )}
                    
                    <div className="flex gap-2 shrink-0">
                      <Button className="w-full sm:w-auto" variant="default">
                        Add to Pipeline
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
