"use client";

import { useQuery } from "@tanstack/react-query";
import { applicationService } from "@/services/applications";
import { Job } from "@/services/jobs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface JobApplicationsTabProps {
  job: Job;
}

export function JobApplicationsTab({ job }: JobApplicationsTabProps) {
  const { data: applicationsResponse, isLoading, isError } = useQuery({
    queryKey: ["applications", { job_id: job.id }],
    queryFn: () => applicationService.getApplications()
  });

  const applications = (applicationsResponse?.items || []).filter(app => app.job_id === job.id);

  const getStageBadge = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "applied": return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-none">Applied</Badge>;
      case "screening": return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-none">Screening</Badge>;
      case "interview": return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-none">Interview</Badge>;
      case "assessment": return <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 border-none">Assessment</Badge>;
      case "offer": return <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-none">Offer</Badge>;
      case "hired": return <Badge className="bg-muted text-foreground dark:text-muted-foreground border-none">Hired</Badge>;
      default: return <Badge variant="outline">{stage}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search candidates..." className="pl-9 bg-background" />
        </div>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-x-auto shadow-sm">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="whitespace-nowrap">Candidate</TableHead>
              <TableHead className="whitespace-nowrap">Experience</TableHead>
              <TableHead className="whitespace-nowrap">AI Score</TableHead>
              <TableHead className="whitespace-nowrap">Stage</TableHead>
              <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Loading applications...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-destructive">
                  Failed to load applications.
                </TableCell>
              </TableRow>
            ) : applications.length > 0 ? applications.map((application) => {
              const candidate = application.candidate;
              const candidateName = candidate ? `${candidate.first_name} ${candidate.last_name}` : "Unknown Candidate";
              return (
              <TableRow key={application.id} className="group cursor-pointer hover:bg-muted/50">
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={candidate?.resume_url || undefined} alt={candidateName} />
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {candidate?.first_name ? candidate.first_name.charAt(0) : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{candidateName}</p>
                      <p className="text-xs text-muted-foreground">{candidate?.current_title || "Unknown Role"}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{candidate?.years_of_experience || 0} years</TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                    {application.ai_match_score || "N/A"}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">{getStageBadge(application.current_stage)}</TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    } />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem render={<Link href={`/candidates/${application.candidate_id}`}>View Profile</Link>} />
                      <DropdownMenuItem>Move Stage</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">Reject</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )}) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No applications found for this job.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
