"use client";

import { RecruiterProfile } from "@/data/recruiter";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Briefcase, Clock, CalendarCheck, Zap } from "lucide-react";

interface RecruiterSummaryProps {
  profile: RecruiterProfile;
}

export function RecruiterSummary({ profile }: RecruiterSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-sm">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none -mt-20 -mr-20" />
        
        <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-6 lg:items-center justify-between relative">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20 border-2 border-white dark:border-zinc-900 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} className="object-cover" />
              <AvatarFallback className="text-xl font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Welcome back, {profile.name.split(" ")[0]}
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">{profile.role}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800 font-medium">
                  Workload: {profile.workload}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Active Jobs</p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{profile.activeJobs}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Pending Reviews</p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{profile.pendingReviews}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center shrink-0">
                <CalendarCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Interviews</p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{profile.upcomingInterviewsCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-0 lg:pl-8 lg:border-l border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center shrink-0 shadow-sm">
                <Zap className="h-6 w-6 text-indigo-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">AI Score</p>
                <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{profile.aiProductivityScore}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
