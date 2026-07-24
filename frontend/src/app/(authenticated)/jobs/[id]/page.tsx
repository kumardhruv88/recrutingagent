"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { JobHeader } from "./../_components/JobHeader";
import { JobTabs } from "./../_components/JobTabs";
import { jobService } from "@/services/jobs";
import { use } from "react";

interface JobPageProps {
  params: Promise<{ id: string }>;
}

export default function JobPage({ params }: JobPageProps) {
  const { id } = use(params);
  
  const { data: job, isLoading, isError } = useQuery({
    queryKey: ["job", id],
    queryFn: () => jobService.getJob(id)
  });

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading job details...</div>;
  }

  if (isError || !job) {
    return <div className="p-8 text-center text-destructive">Failed to load job details.</div>;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-zinc-50 dark:bg-zinc-900/50">
      <JobHeader job={job} />
      <div className="flex-1">
        <JobTabs job={job} />
      </div>
    </div>
  );
}
