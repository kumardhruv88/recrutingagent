"use client";

import { Job } from "@/services/jobs";
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
        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg">About the Role</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {job.description}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-primary" />
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {job.requirements && job.requirements.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground mt-2">
                {job.requirements.map((req: string, i: number) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground mt-2">No specific requirements listed.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            {job.responsibilities && job.responsibilities.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground mt-2">
                {job.responsibilities.map((resp: string, i: number) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground mt-2">No specific responsibilities listed.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="shadow-sm border-border bg-muted/30">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
              Key Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-background border border-border flex items-center justify-center text-muted-foreground">
                <Briefcase className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Department</p>
                <p className="text-sm font-medium text-foreground">{job.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-background border border-border flex items-center justify-center text-muted-foreground">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Location</p>
                <p className="text-sm font-medium text-foreground">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-background border border-border flex items-center justify-center text-muted-foreground">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Employment Type</p>
                <p className="text-sm font-medium text-foreground">{job.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-background border border-border flex items-center justify-center text-muted-foreground">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Salary Range</p>
                <div className="text-sm text-muted-foreground">
                  {job.salary_min && job.salary_max ? `${job.salary_currency || '$'}${job.salary_min.toLocaleString()} - ${job.salary_currency || '$'}${job.salary_max.toLocaleString()}` : "Not specified"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
              Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((benefit, i) => (
                <Badge key={i} variant="secondary" className="bg-secondary/50 hover:bg-secondary text-secondary-foreground font-normal border-none">
                  <CheckCircle2 className="mr-1 h-3 w-3 text-primary" />
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
