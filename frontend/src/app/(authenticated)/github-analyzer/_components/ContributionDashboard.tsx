"use client";

import { CommitTrend } from "@/data/github";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface ContributionDashboardProps {
  commitTrends: CommitTrend[];
}

export function ContributionDashboard({ commitTrends }: ContributionDashboardProps) {
  // Generate a mock heatmap grid (just visual)
  const heatmapDays = Array.from({ length: 140 }, () => Math.floor(Math.random() * 5));

  const getIntensityColor = (level: number) => {
    switch (level) {
      case 0: return "bg-zinc-100 dark:bg-zinc-800/50";
      case 1: return "bg-emerald-200 dark:bg-emerald-900/40";
      case 2: return "bg-emerald-300 dark:bg-emerald-700/60";
      case 3: return "bg-emerald-400 dark:bg-emerald-600/80";
      case 4: return "bg-emerald-500 dark:bg-emerald-500";
      default: return "bg-zinc-100 dark:bg-zinc-800/50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-6"
    >
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-500" />
            Contribution Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Heatmap */}
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">1,432 contributions in the last year</p>
              <div className="flex flex-wrap gap-1 md:gap-1.5 justify-start">
                {heatmapDays.map((level, i) => (
                  <div 
                    key={i}
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${getIntensityColor(level)} hover:ring-2 ring-zinc-400 dark:ring-zinc-500 transition-all cursor-pointer`}
                    title={`${level * 5} contributions`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mt-3 justify-end">
                <span>Less</span>
                <div className={`w-3 h-3 rounded-sm ${getIntensityColor(0)}`} />
                <div className={`w-3 h-3 rounded-sm ${getIntensityColor(1)}`} />
                <div className={`w-3 h-3 rounded-sm ${getIntensityColor(2)}`} />
                <div className={`w-3 h-3 rounded-sm ${getIntensityColor(3)}`} />
                <div className={`w-3 h-3 rounded-sm ${getIntensityColor(4)}`} />
                <span>More</span>
              </div>
            </div>

            {/* Commit Trend Chart */}
            <div className="h-[250px] w-full pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <h4 className="text-sm font-semibold mb-6">Commit Trends</h4>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={commitTrends} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#10b981', fontWeight: 600 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="commits" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorCommits)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
