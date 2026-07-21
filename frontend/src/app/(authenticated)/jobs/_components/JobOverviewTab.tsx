"use client";

import { Job } from "@/data/jobs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, Clock, ListChecks, CheckCircle2, Zap } from "lucide-react";

interface JobOverviewTabProps {
  job: Job;
}

export function JobOverviewTab({ job }: JobOverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg">About the Role</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {job.description}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-indigo-500" />
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex gap-3 text-zinc-600 dark:text-zinc-400">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {job.responsibilities.map((res, i) => (
                <li key={i} className="flex gap-3 text-zinc-600 dark:text-zinc-400">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">
              Key Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500">
                <Briefcase className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium">Department</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{job.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium">Location</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium">Employment Type</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{job.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium">Salary Range</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{job.salaryRange}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-zinc-500 font-semibold">
              Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((benefit, i) => (
                <Badge key={i} variant="secondary" className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-normal border-none">
                  <CheckCircle2 className="mr-1 h-3 w-3 text-emerald-500" />
                  {benefit}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
