import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuditEvent } from "@/data/audit";
import { format } from "date-fns";
import { Shield, MapPin, Globe, Fingerprint, Activity } from "lucide-react";

interface EventDetailDrawerProps {
  event: AuditEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailDrawer({ event, open, onOpenChange }: EventDetailDrawerProps) {
  if (!event) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl overflow-hidden flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              Event Details
            </SheetTitle>
            <Badge variant={event.severity === "critical" ? "destructive" : event.severity === "warning" ? "secondary" : "default"}>
              {event.severity.toUpperCase()}
            </Badge>
          </div>
          <SheetDescription>
            {event.id} • {format(new Date(event.timestamp), "MMM dd, yyyy HH:mm:ss")}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-6">
            
            {/* Overview Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Overview</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Action</span>
                  <div className="text-sm font-medium">{event.action}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <div className="text-sm font-medium">
                    <Badge variant={event.status === "success" ? "outline" : "destructive"} className="h-5 text-xs">
                      {event.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Module</span>
                  <div className="text-sm font-medium">{event.module}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Target</span>
                  <div className="text-sm font-medium">{event.target}</div>
                </div>
              </div>
            </div>

            {/* Actor Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Actor</h4>
              <div className="rounded-lg border p-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                  {event.actor.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium">{event.actor.name}</div>
                  <div className="text-xs text-muted-foreground">{event.actor.email}</div>
                </div>
              </div>
            </div>

            {/* Context Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Context</h4>
              <div className="rounded-lg border divide-y text-sm">
                <div className="flex items-center gap-3 p-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium w-24">IP Address</span>
                  <span className="text-muted-foreground font-mono">{event.ipAddress}</span>
                </div>
                {event.metadata?.location && (
                  <div className="flex items-center gap-3 p-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium w-24">Location</span>
                    <span className="text-muted-foreground">{event.metadata.location}</span>
                  </div>
                )}
                {event.metadata?.userAgent && (
                  <div className="flex items-center gap-3 p-3">
                    <Fingerprint className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium w-24">User Agent</span>
                    <span className="text-muted-foreground truncate" title={event.metadata.userAgent}>{event.metadata.userAgent}</span>
                  </div>
                )}
                {event.metadata?.requestId && (
                  <div className="flex items-center gap-3 p-3">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium w-24">Request ID</span>
                    <span className="text-muted-foreground font-mono">{event.metadata.requestId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payload Changes */}
            {(event.metadata?.before || event.metadata?.after) && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Payload Changes</h4>
                
                {event.metadata?.before && (
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-destructive">Before</span>
                    <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto font-mono">
                      {JSON.stringify(event.metadata.before, null, 2)}
                    </pre>
                  </div>
                )}
                
                {event.metadata?.after && (
                  <div className="space-y-2 mt-4">
                    <span className="text-xs font-medium text-emerald-600">After</span>
                    <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto font-mono">
                      {JSON.stringify(event.metadata.after, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
