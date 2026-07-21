"use client";

import { motion } from "framer-motion";
import { mockAICredits } from "@/data/billing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { buttonVariants } from "@/components/ui/button";
import { Sparkles, BarChart } from "lucide-react";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function AICreditsPage() {
  const percentageUsed = (mockAICredits.used / mockAICredits.total) * 100;
  
  const resetDate = new Date(mockAICredits.resetDate).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" /> AI Credits
        </h2>
        <p className="text-muted-foreground mt-1">
          Monitor your artificial intelligence consumption across the platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <Card className="shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -mr-32 -mt-32 pointer-events-none" />
            <CardHeader>
              <CardTitle>Monthly Allocation</CardTitle>
              <CardDescription>Credits used in the current billing cycle.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-baseline">
                <div className="space-y-1">
                  <span className="text-4xl font-bold">{mockAICredits.used.toLocaleString()}</span>
                  <span className="text-muted-foreground text-sm ml-2">used</span>
                </div>
                <div className="text-right space-y-1">
                  <span className="text-xl font-semibold text-muted-foreground">{mockAICredits.total.toLocaleString()}</span>
                  <span className="text-muted-foreground text-sm ml-2">total limit</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress value={percentageUsed} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{percentageUsed.toFixed(1)}% consumed</span>
                  <span className="text-muted-foreground">Resets on {resetDate}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t pt-6">
              <Link href="/billing/plans" className={buttonVariants({ variant: "outline" }) + " w-full sm:w-auto"}>
                Increase Limit
              </Link>
            </CardFooter>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BarChart className="h-5 w-5 text-muted-foreground" />
                Usage Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockAICredits.breakdown.map((item, idx) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                        {item.name}
                      </span>
                      <span className="text-muted-foreground">{item.used.toLocaleString()} credits</span>
                    </div>
                    <Progress value={(item.used / mockAICredits.total) * 100} className="h-1.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-sm h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Usage Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center min-h-[300px]">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockAICredits.breakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="used"
                    stroke="none"
                  >
                    {mockAICredits.breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} credits`, undefined]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs mt-4">
                {mockAICredits.breakdown.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="truncate" title={item.name}>{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
