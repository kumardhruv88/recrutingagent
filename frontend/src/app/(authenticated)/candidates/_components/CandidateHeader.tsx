"use client";

import { Candidate } from "@/data/candidates";
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
      case "New": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Screening": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "Interview": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "Assessment": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Offer": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "Hired": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Rejected": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  return (
    <div className="space-y-6 mb-8">
      <Link href="/candidates" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Candidates
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Avatar className="h-20 w-20 border-2 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
            <AvatarFallback className="text-2xl font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              {candidate.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{candidate.name}</h1>
              <Badge variant="outline" className={`border-transparent ${getStatusColor(candidate.status)}`}>
                {candidate.status}
              </Badge>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                candidate.aiScore >= 90 ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50" :
                candidate.aiScore >= 80 ? "text-blue-600 bg-blue-50 dark:bg-blue-950/50" :
                "text-zinc-600 bg-zinc-50 dark:bg-zinc-900"
              }`}>
                AI: {candidate.aiScore}%
              </span>
            </div>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium">
              {candidate.currentRole}
            </p>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {candidate.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${candidate.email}`} className="hover:underline">{candidate.email}</a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                <a href={`tel:${candidate.phone}`} className="hover:underline">{candidate.phone}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 flex-wrap">
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Interview
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Resume</span>
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Share2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuItem>Assign to Job</DropdownMenuItem>
              <DropdownMenuItem>Request Assessment</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Reject Candidate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
