"use client";

import { ResumeAnalysis } from "@/data/resume-intelligence";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell } from "recharts";
import { CheckCircle2, AlertTriangle, FileText, Type, Eye, Search, Award } from "lucide-react";

interface ATSCheckerTabProps {
  data: ResumeAnalysis;
}

export function ATSCheckerTab({ data }: ATSCheckerTabProps) {
  const breakdownData = [
    { name: "Formatting", score: data.atsBreakdown.formatting, fill: "#3b82f6", icon: FileText },
    { name: "Keywords", score: data.atsBreakdown.keywords, fill: "#8b5cf6", icon: Search },
    { name: "Readability", score: data.atsBreakdown.readability, fill: "#10b981", icon: Eye },
    { name: "Contact Info", score: data.atsBreakdown.contactInfo, fill: "#f59e0b", icon: Type },
    { name: "Achievements", score: data.atsBreakdown.achievements, fill: "#ef4444", icon: Award },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Score */}
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-950">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-6">Overall ATS Compatibility</h3>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" 
                barSize={15} data={[{ name: 'Score', value: data.scores.ats, fill: '#6366f1' }]} 
                startAngle={180} endAngle={0}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-[-10px]">
              <span className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">{data.scores.ats}</span>
              <span className="text-sm text-zinc-500 font-medium mt-1">out of 100</span>
            </div>
          </div>
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 max-w-[250px] mt-2">
            This resume is highly parsable by modern Applicant Tracking Systems.
          </p>
        </Card>

        {/* Breakdown Chart */}
        <Card className="lg:col-span-2 border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-950">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakdownData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e4e4e7" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#71717a" }} width={90} />
                  <RechartsTooltip 
                    cursor={{fill: '#f4f4f5', opacity: 0.5}}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                    {breakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Passed Checks
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Standard Sections Detected</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Experience, Education, and Skills were successfully parsed.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 shrink-0">
                  <Type className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Clean Typography</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">No unparsable custom fonts, icons, or complex columns found.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 shrink-0">
                  <Eye className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Optimal Length</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Document is concise and falls within the recommended 1-2 page limit.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm border-t-amber-500 border-t-2">
          <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-4">
              {data.atsBreakdown.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{rec}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
