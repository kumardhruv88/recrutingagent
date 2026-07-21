"use client";

/* eslint-disable @next/next/no-img-element */

import { InterviewSession, mockReviewData } from "@/data/voice-interview";
import { ScoreCard } from "./ScoreCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, PlayCircle, Download, CheckCircle2, AlertTriangle, MessageSquare, TrendingUp, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InterviewReviewWorkspaceProps {
  session: InterviewSession;
  onBack: () => void;
}

export function InterviewReviewWorkspace({ session, onBack }: InterviewReviewWorkspaceProps) {
  const review = mockReviewData[session.id] || mockReviewData["session-2"];

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0 -ml-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3 tracking-tight">
            {session.candidateName}
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/50">
              Completed
            </Badge>
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            {session.candidateRole} • {session.durationMins} mins • AI Interview Evaluation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Video & Transcript */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200&h=675" 
              alt="Interview Recording Placeholder" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 cursor-pointer hover:bg-white/20 hover:scale-110 transition-all">
                <PlayCircle className="h-8 w-8 text-white fill-white/20" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                45:00
              </span>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1.5">
                <MessageSquare className="h-3 w-3" />
                AI Analyzed
              </span>
            </div>
          </div>

          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-zinc-500" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {review.summary}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-900/10 shadow-sm">
              <CardHeader className="pb-3 border-b border-emerald-100 dark:border-emerald-900/30">
                <CardTitle className="text-base flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Key Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {review.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-800 dark:text-emerald-300">
                      <span className="text-emerald-500 mt-1.5 text-[10px]">●</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-amber-100 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-900/10 shadow-sm">
              <CardHeader className="pb-3 border-b border-amber-100 dark:border-amber-900/30">
                <CardTitle className="text-base flex items-center gap-2 text-amber-900 dark:text-amber-100">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Areas of Concern
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {review.weaknesses.map((weak, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-300">
                      <span className="text-amber-500 mt-1.5 text-[10px]">●</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Scores */}
        <div className="space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className={`h-2 w-full ${review.recommendation === 'Strong Hire' ? 'bg-emerald-500' : review.recommendation === 'Hire' ? 'bg-blue-500' : review.recommendation === 'Consider' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
            <CardContent className="p-6 text-center">
              <p className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-widest">AI Recommendation</p>
              <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">{review.recommendation}</h3>
              <Button className="w-full">
                Advance to Next Stage
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Evaluation Scores
            </h4>
            
            <ScoreCard 
              title="Overall Match" 
              score={review.scores.overall} 
              description="Aggregate score based on role requirements and interview performance."
              colorClass="text-blue-600 dark:text-blue-400"
              bgClass="bg-blue-500"
            />
            
            <ScoreCard 
              title="Technical Depth" 
              score={review.scores.technical} 
              description="Accuracy, system design knowledge, and problem-solving ability."
              colorClass="text-purple-600 dark:text-purple-400"
              bgClass="bg-purple-500"
            />
            
            <ScoreCard 
              title="Communication" 
              score={review.scores.communication} 
              description="Clarity of thought, articulation, and conciseness of answers."
              colorClass="text-emerald-600 dark:text-emerald-400"
              bgClass="bg-emerald-500"
            />

            <ScoreCard 
              title="Confidence" 
              score={review.scores.confidence} 
              description="Vocal tone, minimal hesitation, and assertive delivery."
              colorClass="text-amber-600 dark:text-amber-500"
              bgClass="bg-amber-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
