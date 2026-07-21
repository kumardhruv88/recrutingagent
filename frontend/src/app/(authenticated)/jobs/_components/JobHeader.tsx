"use client";

import { Job } from "@/data/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Briefcase, MapPin, Building2, Play, Pause, Archive, Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface JobHeaderProps {
  job: Job;
}

export function JobHeader({ job }: JobHeaderProps) {
  const getStatusBadge = (status: Job["status"]) => {
    switch (status) {
      case "Published": return <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-none">Published</Badge>;
      case "Draft": return <Badge className="bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border-none">Draft</Badge>;
      case "Internal": return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-none">Internal</Badge>;
      case "Closed": return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-none">Closed</Badge>;
      case "On Hold": return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-none">On Hold</Badge>;
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 pb-6 pt-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/jobs" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6 transition-colors">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Jobs
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{job.title}</h1>
              {getStatusBadge(job.status)}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mt-3">
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-zinc-400" />
                {job.department}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-zinc-400" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-zinc-400" />
                {job.type}
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                <BrainCircuit className="h-3.5 w-3.5" />
                <span className="font-medium">AI Score: {job.aiScore}% Avg</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:flex">
              <Settings className="mr-2 h-4 w-4" />
              Edit Job
            </Button>
            
            {job.status === "Published" ? (
              <Button variant="outline" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/50 border-orange-200 dark:border-orange-900/50">
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
            ) : (
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Play className="mr-2 h-4 w-4" />
                Publish
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="outline" size="icon">
                  <Archive className="h-4 w-4 text-zinc-500" />
                </Button>
              } />
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-red-600">Archive Job</DropdownMenuItem>
                <DropdownMenuItem>Delete Job</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
