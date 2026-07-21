"use client";

import { Candidate } from "@/data/candidates";
import { Button } from "@/components/ui/button";
import { Download, Maximize2, ZoomIn, ZoomOut } from "lucide-react";

interface CandidateResumeTabProps {
  candidate: Candidate;
}

export function CandidateResumeTab({ candidate }: CandidateResumeTabProps) {
  return (
    <div className="h-[800px] flex flex-col bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between p-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {candidate.name.replace(' ', '_')}_Resume.pdf
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-zinc-500 w-12 text-center">100%</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* PDF Placeholder */}
      <div className="flex-1 overflow-auto p-8 flex justify-center">
        <div className="w-full max-w-3xl aspect-[1/1.414] bg-white dark:bg-zinc-950 shadow-sm p-12 relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 gap-4">
            <div className="h-16 w-16 rounded border-2 border-dashed border-current flex items-center justify-center opacity-50">
              PDF
            </div>
            <p className="font-medium text-sm">PDF Viewer Placeholder</p>
          </div>
          
          {/* Simulated text lines */}
          <div className="space-y-4 opacity-10 blur-[2px]">
            <div className="h-8 bg-current w-1/3 rounded mx-auto mb-8"></div>
            <div className="h-4 bg-current w-1/4 rounded mx-auto mb-12"></div>
            
            <div className="h-5 bg-current w-1/4 rounded"></div>
            <div className="h-2 bg-current w-full rounded"></div>
            <div className="h-2 bg-current w-full rounded"></div>
            <div className="h-2 bg-current w-5/6 rounded"></div>
            
            <div className="h-5 bg-current w-1/4 rounded mt-8"></div>
            <div className="h-2 bg-current w-full rounded"></div>
            <div className="h-2 bg-current w-full rounded"></div>
            <div className="h-2 bg-current w-4/5 rounded"></div>
            
            <div className="h-5 bg-current w-1/4 rounded mt-8"></div>
            <div className="h-2 bg-current w-full rounded"></div>
            <div className="h-2 bg-current w-5/6 rounded"></div>
            <div className="h-2 bg-current w-1/2 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
