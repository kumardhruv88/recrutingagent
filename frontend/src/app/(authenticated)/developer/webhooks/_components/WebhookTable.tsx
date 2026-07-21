"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Webhook } from "@/data/developer";
import { format } from "date-fns";
import { MoreHorizontal, Link as LinkIcon, ServerCrash, Edit2, Trash2, PowerOff, Activity } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface WebhookTableProps {
  webhooks: Webhook[];
  onEdit: (webhook: Webhook) => void;
}

export function WebhookTable({ webhooks, onEdit }: WebhookTableProps) {
  if (webhooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center border rounded-lg bg-card border-dashed">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <LinkIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No webhooks</h3>
        <p className="text-muted-foreground text-sm mt-1 max-w-sm">
          Subscribe to events to receive real-time HTTP payloads.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead>Endpoint</TableHead>
            <TableHead>Events</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Delivery</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {webhooks.map((webhook) => (
            <TableRow key={webhook.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {webhook.status === 'failing' ? (
                    <ServerCrash className="h-4 w-4 text-destructive shrink-0" />
                  ) : webhook.status === 'disabled' ? (
                    <PowerOff className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <Activity className="h-4 w-4 text-emerald-500 shrink-0" />
                  )}
                  <span className="font-medium text-sm truncate max-w-[250px]" title={webhook.endpoint}>
                    {webhook.endpoint}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">
                    {webhook.events.length} subscribed events
                  </span>
                  <div className="flex gap-1 flex-wrap">
                    {webhook.events.slice(0, 2).map(evt => (
                      <Badge key={evt} variant="secondary" className="text-[9px] h-4 py-0 px-1">{evt}</Badge>
                    ))}
                    {webhook.events.length > 2 && (
                      <Badge variant="secondary" className="text-[9px] h-4 py-0 px-1">+{webhook.events.length - 2}</Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={webhook.status === "active" ? "default" : webhook.status === "failing" ? "destructive" : "secondary"} 
                  className={webhook.status === "active" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : ""}
                >
                  {webhook.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {webhook.lastDelivery ? format(new Date(webhook.lastDelivery), "MMM dd, HH:mm") : "Never"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted text-muted-foreground focus:outline-none">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuLabel>Webhook Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onEdit(webhook)}>
                      <Edit2 className="mr-2 h-4 w-4 text-muted-foreground" /> Edit
                    </DropdownMenuItem>
                    {webhook.status !== 'disabled' ? (
                      <DropdownMenuItem>
                        <PowerOff className="mr-2 h-4 w-4 text-muted-foreground" /> Disable
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <Activity className="mr-2 h-4 w-4 text-emerald-500" /> Enable
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
