"use client";

import { Candidate } from "@/services/candidates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, LinkIcon } from "lucide-react";

interface CandidateOverviewTabProps {
  candidate: Candidate;
}

export function CandidateOverviewTab({ candidate }: CandidateOverviewTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {candidate.notes || "No summary or notes provided for this candidate."}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative pl-6 border-l border-border pb-2">
              <div className="absolute w-3 h-3 bg-border rounded-full -left-[6.5px] top-1.5 ring-4 ring-background"></div>
              <h4 className="font-semibold text-foreground">{candidate.current_title || "Unknown Role"} {candidate.current_company ? `at ${candidate.current_company}` : ""}</h4>
              <p className="text-sm text-muted-foreground mb-2">{candidate.location || "Remote"}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Led the development of multiple scalable microservices. Mentored junior developers and improved system performance by 40%.</p>
            </div>
            <div className="relative pl-6 border-l border-transparent">
              <div className="absolute w-3 h-3 bg-border rounded-full -left-[6.5px] top-1.5 ring-4 ring-background"></div>
              <h4 className="font-semibold text-foreground">Previous Role</h4>
              <p className="text-sm text-muted-foreground mb-2">2018 - 2021</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Developed responsive user interfaces using React and Redux. Participated in daily stand-ups and sprint planning.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <h4 className="font-semibold text-foreground">Degree Information</h4>
              <p className="text-sm text-muted-foreground">Education details are extracted via resume parsing.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Top Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(candidate.skills || []).length > 0 ? candidate.skills!.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-2.5 py-1 font-normal text-muted-foreground">
                  {skill}
                </Badge>
              )) : (
                <p className="text-sm text-muted-foreground">No skills listed.</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {candidate.linkedin_url && (
              <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline line-clamp-1">
                <LinkIcon className="h-4 w-4 shrink-0" />
                {candidate.linkedin_url.replace(/^https?:\/\//, '')}
              </a>
            )}
            {candidate.github_url && (
              <a href={candidate.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline line-clamp-1">
                <LinkIcon className="h-4 w-4 shrink-0" />
                {candidate.github_url.replace(/^https?:\/\//, '')}
              </a>
            )}
            {candidate.portfolio_url && (
              <a href={candidate.portfolio_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline line-clamp-1">
                <LinkIcon className="h-4 w-4 shrink-0" />
                Portfolio Website
              </a>
            )}
            {!candidate.linkedin_url && !candidate.github_url && !candidate.portfolio_url && (
              <p className="text-sm text-muted-foreground">No links provided.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
