"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreCardProps {
  title: string;
  score: number;
  description: string;
  colorClass: string;
  bgClass: string;
}

export function ScoreCard({ title, score, description, colorClass, bgClass }: ScoreCardProps) {
  return (
    <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{title}</h4>
          <span className={`text-xl font-bold ${colorClass}`}>{score}/100</span>
        </div>
        <Progress value={score} className={`h-2 mb-3 bg-zinc-100 dark:bg-zinc-800 [&>div]:${bgClass}`} />
        <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
