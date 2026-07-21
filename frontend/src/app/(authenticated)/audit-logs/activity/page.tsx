import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAuditEvents } from "@/data/audit";
import { format } from "date-fns";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ActivityTimelinePage() {
  // Sort events chronologically (newest first)
  const sortedEvents = [...mockAuditEvents].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Group by date (e.g., "Jul 20, 2026")
  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const dateStr = format(new Date(event.timestamp), 'MMM dd, yyyy');
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(event);
    return acc;
  }, {} as Record<string, typeof mockAuditEvents>);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Activity Feed</h2>
        <p className="text-muted-foreground mt-1">A chronological timeline of all organizational events.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>Most recent events across the organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {Object.entries(groupedEvents).map(([date, events]) => (
              <div key={date}>
                <div className="sticky top-14 z-10 bg-card py-2">
                  <Badge variant="outline" className="font-medium bg-background text-xs">
                    {date}
                  </Badge>
                </div>
                
                <div className="mt-4 space-y-0">
                  {events.map((event, index) => {
                    const isLast = index === events.length - 1;
                    return (
                      <div key={event.id} className="relative flex gap-4">
                        {/* Timeline Connector */}
                        <div className="flex flex-col items-center">
                          <div className="relative flex h-8 w-8 items-center justify-center rounded-full border bg-background z-10">
                            {event.severity === "critical" ? (
                              <XCircle className="h-4 w-4 text-destructive" />
                            ) : event.severity === "warning" ? (
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          {!isLast && <div className="w-px h-full bg-border -mt-2" />}
                        </div>
                        
                        {/* Event Content */}
                        <div className="flex-1 pb-8 pt-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">{event.actor.name}</span>
                                <span className="text-muted-foreground text-sm">
                                  {event.action.replace('_', ' ')}
                                </span>
                                <span className="font-medium text-sm text-foreground">
                                  {event.target}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{event.module}</Badge>
                                <span className="text-xs font-mono text-muted-foreground">{event.ipAddress}</span>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {format(new Date(event.timestamp), 'HH:mm:ss')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
