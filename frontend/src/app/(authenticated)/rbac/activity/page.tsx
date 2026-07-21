"use client";

import { motion } from "framer-motion";
import { mockAuditEvents } from "@/data/rbac";
import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, ShieldAlert, UserMinus, ShieldPlus, Clock } from "lucide-react";

const getEventIcon = (action: string) => {
  switch (action) {
    case "Role Assigned":
      return <UserCheck className="h-4 w-4 text-emerald-500" />;
    case "Permission Changed":
      return <ShieldAlert className="h-4 w-4 text-amber-500" />;
    case "Member Removed":
      return <UserMinus className="h-4 w-4 text-destructive" />;
    case "Role Created":
      return <ShieldPlus className="h-4 w-4 text-blue-500" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

export default function RbacActivityPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-4xl"
    >
      <div>
        <h3 className="text-xl font-semibold tracking-tight">Activity Log</h3>
        <p className="text-sm text-muted-foreground">
          Audit trail of role assignments, permission changes, and member access events.
        </p>
      </div>

      <div className="relative border-l ml-3 md:ml-4 space-y-8 pb-8">
        {mockAuditEvents.map((event) => (
          <div key={event.id} className="relative pl-6 md:pl-8 group">
            <div className="absolute -left-[17px] top-1 h-8 w-8 bg-background border rounded-full flex items-center justify-center shadow-sm">
              {getEventIcon(event.action)}
            </div>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{event.action}</span>
                    <span className="text-muted-foreground text-sm">&rarr; {event.target}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.details}
                  </p>
                </div>
                
                <div className="flex flex-col sm:items-end text-sm gap-1">
                  <span className="text-muted-foreground whitespace-nowrap">
                    {new Date(event.timestamp).toLocaleString(undefined, { 
                      month: 'short', 
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="font-medium text-xs bg-muted px-2 py-1 rounded-md w-fit">
                    by {event.actor}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
