"use client";

import { Candidate } from "@/data/recruiter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, ArrowRight, Sparkles, Clock } from "lucide-react";

interface CandidateListProps {
  candidates: Candidate[];
}

export function CandidateList({ candidates }: CandidateListProps) {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Sourced": return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
      case "Screening": return "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Interview": return "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "Offer": return "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Hired": return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      default: return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="h-full"
    >
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-500" />
              Candidate Pipeline
            </CardTitle>
            <CardDescription>Recent activity across your assigned roles</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400 hidden sm:flex">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div 
                key={candidate.id} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group cursor-pointer border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border border-zinc-200 dark:border-zinc-800">
                    <AvatarImage src={candidate.avatarUrl} alt={candidate.name} className="object-cover" />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                      {candidate.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {candidate.name}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[150px] sm:max-w-[200px]">
                      {candidate.jobTitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden md:flex flex-col items-end">
                    <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <Sparkles className="h-3 w-3" />
                      {candidate.aiMatch}% Match
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-0.5">
                      <Clock className="h-3 w-3" />
                      {candidate.lastActivity}
                    </div>
                  </div>
                  <Badge variant="secondary" className={`shrink-0 ${getStageColor(candidate.stage)} border-transparent`}>
                    {candidate.stage}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-6 sm:hidden">
            View All Candidates
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
