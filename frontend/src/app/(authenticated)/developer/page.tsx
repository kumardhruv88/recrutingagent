"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDeveloperMetrics, mockWebhooks, mockAPIKeys, mockIntegrations } from "@/data/developer";
import { Webhook, Key, Puzzle, Activity, ArrowRight, ServerCrash } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

const chartData = [
  { time: '00:00', requests: 400 },
  { time: '04:00', requests: 300 },
  { time: '08:00', requests: 550 },
  { time: '12:00', requests: 1200 },
  { time: '16:00', requests: 800 },
  { time: '20:00', requests: 600 },
  { time: '24:00', requests: 450 },
];

export default function DeveloperDashboardPage() {
  const activeKeys = mockAPIKeys.filter(k => k.status === 'active');
  const connectedIntegrations = mockIntegrations.filter(i => i.status === 'connected');

  return (
    <div className="space-y-6">
      
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total API Requests (24h)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDeveloperMetrics.totalApiRequests24h.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Error rate: <span className={mockDeveloperMetrics.errorRate > 0.1 ? "text-destructive" : "text-emerald-500"}>{(mockDeveloperMetrics.errorRate * 100).toFixed(1)}%</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Webhooks</CardTitle>
            <Webhook className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDeveloperMetrics.activeWebhooks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockDeveloperMetrics.failingWebhooks > 0 ? (
                <span className="text-destructive flex items-center gap-1">
                  <ServerCrash className="h-3 w-3" /> {mockDeveloperMetrics.failingWebhooks} failing
                </span>
              ) : "All systems operational"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active API Keys</CardTitle>
            <Key className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeKeys.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all environments</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Apps</CardTitle>
            <Puzzle className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedIntegrations.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of {mockIntegrations.length} available</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
        {/* Main Chart */}
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Traffic</CardTitle>
              <CardDescription>Requests per hour over the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                    <XAxis 
                      dataKey="time" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }}
                      formatter={(value) => [`${value} reqs`, undefined]}
                    />
                    <Area type="monotone" dataKey="requests" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRequests)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/developer/integrations" className="block">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader className="pb-2">
                  <Puzzle className="h-5 w-5 text-indigo-500 mb-2" />
                  <CardTitle className="text-base">Browse Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Discover and connect third-party tools.</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/developer/api-keys" className="block">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader className="pb-2">
                  <Key className="h-5 w-5 text-orange-500 mb-2" />
                  <CardTitle className="text-base">Generate API Key</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Create secure tokens for programmatic access.</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/developer/webhooks" className="block">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader className="pb-2">
                  <Webhook className="h-5 w-5 text-primary mb-2" />
                  <CardTitle className="text-base">Add Webhook</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Subscribe to real-time events via HTTP.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Webhooks</CardTitle>
                <Link href="/developer/webhooks" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  View all
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWebhooks.slice(0, 3).map(hook => (
                  <div key={hook.id} className="flex flex-col space-y-2 border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate pr-2 max-w-[200px]" title={hook.endpoint}>
                        {new URL(hook.endpoint).hostname}
                      </span>
                      <Badge variant={hook.status === "active" ? "default" : hook.status === "failing" ? "destructive" : "secondary"} className="text-[10px]">
                        {hook.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center justify-between">
                      <span>{hook.events.length} events</span>
                      <span>
                        {hook.lastDelivery ? format(new Date(hook.lastDelivery), "MMM dd, HH:mm") : "Never"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ServerCrash className="h-5 w-5 text-primary" />
                Delivery Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockDeveloperMetrics.failingWebhooks > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm">You have {mockDeveloperMetrics.failingWebhooks} failing webhook endpoints.</p>
                  <Link href="/developer/webhooks/logs" className={cn(buttonVariants({ variant: "default", size: "sm" }), "w-full")}>
                    View Delivery Logs <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">All webhook deliveries are succeeding. No recent issues detected.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
