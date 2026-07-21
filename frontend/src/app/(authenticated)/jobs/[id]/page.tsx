import { mockJobs } from "@/data/jobs";
import { notFound } from "next/navigation";
import { JobHeader } from "./../_components/JobHeader";
import { JobTabs } from "./../_components/JobTabs";

interface JobPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params;
  
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    notFound();
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
