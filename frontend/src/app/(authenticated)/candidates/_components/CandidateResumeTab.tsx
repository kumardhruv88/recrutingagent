"use client";

import { Candidate } from "@/services/candidates";
import { Button } from "@/components/ui/button";
import { Download, Maximize2, ExternalLink, Minus, Plus, FileText } from "lucide-react";

interface CandidateResumeTabProps {
  candidate: Candidate;
}

export function CandidateResumeTab({}: CandidateResumeTabProps) {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between p-4 bg-muted rounded-xl border border-border shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2 bg-background">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-background">
            <ExternalLink className="h-4 w-4" />
            Open in New Tab
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r border-border pr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground w-12 text-center">100%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="w-full min-h-[600px] md:h-[calc(100vh-280px)] bg-muted/30 rounded-xl border border-border flex items-center justify-center overflow-hidden relative shadow-sm">
        {/* Placeholder for actual PDF viewer */}
        <div className="w-[800px] h-[1050px] bg-background shadow-sm p-12 my-8 origin-top transform scale-75 md:scale-90 xl:scale-100 flex flex-col gap-6 relative">
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex items-center justify-center flex-col gap-3">
            <FileText className="h-12 w-12 text-muted-foreground opacity-50" />
            <div className="text-muted-foreground font-medium text-lg">Document Preview Ready</div>
            <div className="text-sm text-muted-foreground/80 max-w-xs text-center">Resume preview requires a PDF rendering library integration.</div>
          </div>
          
          <div className="border-b border-border pb-4 mb-4">
            <div className="h-8 bg-muted w-1/3 rounded mb-3 animate-pulse"></div>
            <div className="h-4 bg-muted w-1/4 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-muted w-1/5 rounded animate-pulse"></div>
          </div>
          
          <div className="space-y-4">
            <div className="h-6 bg-muted w-1/4 rounded mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted/60 w-full rounded animate-pulse"></div>
            <div className="h-4 bg-muted/60 w-full rounded animate-pulse"></div>
            <div className="h-4 bg-muted/60 w-3/4 rounded animate-pulse"></div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="h-6 bg-muted w-1/4 rounded mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted/60 w-full rounded animate-pulse"></div>
            <div className="h-4 bg-muted/60 w-5/6 rounded animate-pulse"></div>
            <div className="h-4 bg-muted/60 w-4/5 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
