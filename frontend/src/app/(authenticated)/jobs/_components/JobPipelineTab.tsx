"use client";

import { Job, mockPipelineData } from "@/data/jobs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobPipelineTabProps {
  job: Job;
}

export function JobPipelineTab({}: JobPipelineTabProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 h-[calc(100vh-280px)] min-h-[500px]">
      {mockPipelineData.columns.map((column) => (
        <div key={column.id} className="w-[300px] shrink-0 flex flex-col bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl border border-zinc-200 dark:border-zinc-800/60 overflow-hidden">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800/60 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 sticky top-0 z-10">
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">{column.title}</h3>
            <span className="inline-flex items-center justify-center bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-full px-2 py-0.5 text-xs font-medium min-w-[24px]">
              {column.count}
            </span>
          </div>
          
          <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
            {mockPipelineData.candidates
              .filter(c => c.stage === column.id)
              .map(candidate => (
                <div 
                  key={candidate.id} 
                  className="bg-white dark:bg-zinc-950 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1 cursor-grab text-zinc-400">
                        <GripVertical className="h-4 w-4" />
                      </div>
                      <Avatar className="h-8 w-8 border border-zinc-200 dark:border-zinc-800">
                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                        <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs">
                          {candidate.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-zinc-700">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{candidate.name}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">{candidate.experience}</p>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                      AI Score: {candidate.aiScore}
                    </div>
                  </div>
                </div>
              ))}
              
            {/* Show an empty state style placeholder if no candidates */}
            {mockPipelineData.candidates.filter(c => c.stage === column.id).length === 0 && (
              <div className="h-24 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center">
                <p className="text-xs text-zinc-400">Drop candidate here</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
