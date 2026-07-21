"use client";

import { Candidate } from "@/data/candidates";
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
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {candidate.summary}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative pl-6 border-l border-zinc-200 dark:border-zinc-800 pb-2">
              <div className="absolute w-3 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full -left-[6.5px] top-1.5 ring-4 ring-white dark:ring-zinc-950"></div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{candidate.currentRole}</h4>
              <p className="text-sm text-zinc-500 mb-2">2021 - Present • {candidate.location}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Led the development of multiple scalable microservices. Mentored junior developers and improved system performance by 40%.</p>
            </div>
            <div className="relative pl-6 border-l border-zinc-200 dark:border-zinc-800 border-transparent">
              <div className="absolute w-3 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full -left-[6.5px] top-1.5 ring-4 ring-white dark:ring-zinc-950"></div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Previous Role</h4>
              <p className="text-sm text-zinc-500 mb-2">2018 - 2021</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Developed responsive user interfaces using React and Redux. Participated in daily stand-ups and sprint planning.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-500" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{candidate.education}</h4>
              <p className="text-sm text-zinc-500">Graduated 2018</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-2.5 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <LinkIcon className="h-4 w-4" />
              linkedin.com/in/{candidate.name.toLowerCase().replace(' ', '')}
            </a>
            {candidate.githubUsername && (
              <a href={`https://github.com/${candidate.githubUsername}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                <LinkIcon className="h-4 w-4" />
                github.com/{candidate.githubUsername}
              </a>
            )}
            <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <LinkIcon className="h-4 w-4" />
              Portfolio Website
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
