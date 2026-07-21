"use client";

import { InterviewTemplate } from "@/data/voice-interview";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Layout, Database, BrainCircuit, Settings, ArrowRight } from "lucide-react";

interface InterviewTemplateCardProps {
  template: InterviewTemplate;
  onClick: (id: string) => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Layout": return <Layout className="h-5 w-5 text-blue-500" />;
    case "Database": return <Database className="h-5 w-5 text-emerald-500" />;
    case "BrainCircuit": return <BrainCircuit className="h-5 w-5 text-purple-500" />;
    default: return <Settings className="h-5 w-5 text-zinc-500" />;
  }
};

export function InterviewTemplateCard({ template, onClick }: InterviewTemplateCardProps) {
  return (
    <Card 
      className="group cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden relative"
      onClick={() => onClick(template.id)}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-blue-500 transition-colors"></div>
      <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
        <div>
          <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            {getIcon(template.icon)}
          </div>
          <CardTitle className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{template.title}</CardTitle>
          <CardDescription className="text-xs text-zinc-500 mt-1.5 line-clamp-2">
            {template.description}
          </CardDescription>
        </div>
        
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
          <div className="text-xs font-medium text-zinc-500">
            {template.durationMins} mins • {template.questionCount} Qs
          </div>
          <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-600 dark:text-blue-400">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
