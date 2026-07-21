import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AuditEvent } from "@/data/audit";
import { format } from "date-fns";
import { ArrowRight, SearchX } from "lucide-react";

interface AuditLogTableProps {
  events: AuditEvent[];
  onRowClick: (event: AuditEvent) => void;
}

export function AuditLogTable({ events, onRowClick }: AuditLogTableProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center border rounded-lg bg-card">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <SearchX className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No events found</h3>
        <p className="text-muted-foreground text-sm mt-1 max-w-sm">
          There are no audit logs matching your current filters. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Timestamp</TableHead>
            <TableHead>Actor</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow 
              key={event.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors group"
              onClick={() => onRowClick(event)}
            >
              <TableCell className="text-xs whitespace-nowrap text-muted-foreground">
                {format(new Date(event.timestamp), "MMM dd, HH:mm:ss")}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">
                    {event.actor.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">{event.actor.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm font-medium capitalize">{event.action.replace('_', ' ')}</span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{event.module}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm truncate max-w-[200px] block" title={event.target}>
                  {event.target}
                </span>
              </TableCell>
              <TableCell className="text-xs font-mono text-muted-foreground">
                {event.ipAddress}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Badge variant={event.severity === "critical" ? "destructive" : event.severity === "warning" ? "secondary" : "outline"} className="text-[10px]">
                    {event.status === "failed" ? "Failed" : event.severity === "warning" ? "Warn" : "Success"}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
