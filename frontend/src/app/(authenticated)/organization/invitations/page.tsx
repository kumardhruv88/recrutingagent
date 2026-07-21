"use client";

import { motion } from "framer-motion";
import { mockInvitations } from "@/data/organization";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function InvitationsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Pending Invitations</h3>
          <p className="text-sm text-muted-foreground">
            View and manage invitations sent to join your organization.
          </p>
        </div>
        <Button>
          <Mail className="mr-2 h-4 w-4" />
          Send Invite
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email Address</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent At</TableHead>
              <TableHead>Sent By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvitations.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-medium">
                  {inv.email}
                </TableCell>
                <TableCell>
                  {inv.role}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={inv.status === "Pending" ? "text-amber-500 border-amber-500/20 bg-amber-500/10" : "text-muted-foreground"}
                  >
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(inv.sentAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {inv.sentBy}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                      <DropdownMenuItem>Copy Link</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Revoke</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {mockInvitations.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No pending invitations.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
