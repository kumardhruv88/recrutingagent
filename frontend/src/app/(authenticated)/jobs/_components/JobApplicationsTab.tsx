"use client";

import { Job, mockPipelineData } from "@/data/jobs";
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

export function JobApplicationsTab({}: JobApplicationsTabProps) {
  const getStageBadge = (stage: string) => {
    switch (stage) {
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
            {mockPipelineData.candidates.map((candidate) => (
              <TableRow key={candidate.id} className="group cursor-pointer hover:bg-muted/50">
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        {candidate.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{candidate.name}</p>
                      <p className="text-xs text-muted-foreground">{candidate.role}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{candidate.experience}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                    {candidate.aiScore}%
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">{getStageBadge(candidate.stage)}</TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    } />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem render={<Link href={`/candidates/${candidate.id}`}>View Profile</Link>} />
                      <DropdownMenuItem>Move Stage</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">Reject</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
