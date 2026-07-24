"use client";

import { Candidate } from "@/services/candidates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Download, Mail, MapPin, MoreHorizontal, Phone, Share2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CandidateHeaderProps {
  candidate: Candidate;
}

export function CandidateHeader({ candidate }: CandidateHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "Screening": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      case "Interview": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      case "Assessment": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "Offer": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      case "Hired": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
      case "Rejected": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
      default: return "bg-secondary text-secondary-foreground border-border";
    }
  };

  return (
    <div className="space-y-6 mb-8">
      <Link href="/candidates" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Candidates
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Avatar className="h-20 w-20 border border-border shadow-sm">
            <AvatarImage src={candidate.resume_url || undefined} alt={`${candidate.first_name} ${candidate.last_name}`} />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
              {candidate.first_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{candidate.first_name} {candidate.last_name}</h1>
              <Badge variant="outline" className={`${getStatusColor(candidate.status)}`}>
                {candidate.status}
              </Badge>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold text-muted-foreground bg-secondary`}>
                AI: N/A
              </span>
            </div>
            
            <p className="text-lg text-muted-foreground font-medium">
              {candidate.current_title || "Unknown Role"}
            </p>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {candidate.location || "Remote"}
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${candidate.email}`} className="hover:underline hover:text-foreground transition-colors">{candidate.email}</a>
              </div>
              {candidate.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${candidate.phone}`} className="hover:underline hover:text-foreground transition-colors">{candidate.phone}</a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 flex-wrap">
          <Button className="gap-2 shadow-sm">
            <Calendar className="h-4 w-4" />
            Schedule Interview
          </Button>
          <Button variant="outline" className="gap-2 shadow-sm">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Resume</span>
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 shadow-sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="icon" className="h-9 w-9 shadow-sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem>Assign to Job</DropdownMenuItem>
              <DropdownMenuItem>Request Assessment</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer">Reject Candidate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
