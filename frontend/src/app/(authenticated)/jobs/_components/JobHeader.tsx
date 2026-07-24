"use client";

import { Job } from "@/services/jobs";
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
      case "Draft": return <Badge className="bg-muted text-foreground dark:text-muted-foreground border-none">Draft</Badge>;
      case "Internal": return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-none">Internal</Badge>;
      case "Closed": return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-none">Closed</Badge>;
      case "On Hold": return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-none">On Hold</Badge>;
    }
  };

  return (
    <div className="bg-background border-b border-border pb-6 pt-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/jobs" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Jobs
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-foreground">{job.title}</h1>
              {getStatusBadge(job.status)}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-3">
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                {job.department}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                {job.type}
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
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
              <Button variant="outline" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/50 border-amber-200 dark:border-amber-900/50">
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
            ) : (
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Play className="mr-2 h-4 w-4" />
                Publish
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="outline" size="icon">
                  <Archive className="h-4 w-4 text-muted-foreground" />
                </Button>
              } />
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-destructive focus:text-destructive">Archive Job</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">Delete Job</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
