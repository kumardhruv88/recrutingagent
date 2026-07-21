"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAuditEvents, mockAuditMetrics, AuditEvent } from "@/data/audit";
import { AuditLogTable } from "./_components/AuditLogTable";
import { EventDetailDrawer } from "./_components/EventDetailDrawer";
import { AuditFilters } from "./_components/AuditFilters";
import { ShieldCheck, AlertTriangle, XCircle, TrendingUp, Lock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: 'Mon', events: 120 },
  { name: 'Tue', events: 150 },
  { name: 'Wed', events: 180 },
  { name: 'Thu', events: 90 },
  { name: 'Fri', events: 210 },
  { name: 'Sat', events: 50 },
  { name: 'Sun', events: 40 },
];

export default function AuditDashboardPage() {
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const handleRowClick = (event: AuditEvent) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  // Filter logic
  const filteredEvents = mockAuditEvents.filter(event => {
    const matchesSearch = searchTerm === "" || 
      event.actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.ipAddress.includes(searchTerm);
      
    const matchesModule = moduleFilter === "all" || event.module === moduleFilter;
    const matchesSeverity = severityFilter === "all" || event.severity === severityFilter;

    return matchesSearch && matchesModule && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events (7d)</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAuditMetrics.totalEvents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
              <span className="text-emerald-500 font-medium">+{mockAuditMetrics.weeklyTrend}%</span> from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAuditMetrics.criticalEvents}</div>
            <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Actions</CardTitle>
            <XCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAuditMetrics.failedActions}</div>
            <p className="text-xs text-muted-foreground mt-1">Permission denials & errors</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <Lock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAuditMetrics.securityAlerts}</div>
            <p className="text-xs text-muted-foreground mt-1">High severity incidents</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
        {/* Main Log Table */}
        <div className="xl:col-span-2 space-y-4">
          <AuditFilters 
            onSearch={setSearchTerm} 
            onFilterModule={setModuleFilter}
            onFilterSeverity={setSeverityFilter}
          />
          <AuditLogTable events={filteredEvents} onRowClick={handleRowClick} />
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Trend</CardTitle>
              <CardDescription>Daily event volume over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                    <XAxis 
                      dataKey="name" 
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
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip 
                      cursor={{fill: 'hsl(var(--muted))', opacity: 0.4}}
                      contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }}
                      formatter={(value) => [`${value} events`, undefined]}
                    />
                    <Bar dataKey="events" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Recent Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAuditEvents.filter(e => e.severity === 'critical').slice(0, 3).map((event) => (
                  <div key={event.id} className="flex flex-col space-y-1 text-sm border-l-2 border-destructive pl-3 py-1">
                    <span className="font-medium">{event.action.replace('_', ' ')}</span>
                    <span className="text-muted-foreground text-xs">{event.actor.email} • {event.ipAddress}</span>
                  </div>
                ))}
                {mockAuditEvents.filter(e => e.severity === 'critical').length === 0 && (
                  <p className="text-sm text-muted-foreground">No critical security events detected.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <EventDetailDrawer 
        event={selectedEvent} 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />
    </div>
  );
}
