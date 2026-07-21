"use client";

import { motion } from "framer-motion";
import { mockUsers } from "@/data/rbac";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

// Modules derived from mockPermissionGroups for the matrix columns
const modules = ["Candidates", "Jobs", "Interviews", "Organization"];

export default function RbacMatrixPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold tracking-tight">Access Matrix</h3>
        <p className="text-sm text-muted-foreground">
          A bird&apos;s-eye view of which users have access to which system modules based on their roles.
        </p>
      </div>

      <div className="rounded-md border bg-card overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">User</TableHead>
              <TableHead>Role</TableHead>
              {modules.map(mod => (
                <TableHead key={mod} className="text-center whitespace-nowrap px-4">
                  {mod}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => {
              const isAdmin = user.role === "Admin";
              
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  {modules.map(mod => {
                    // Fake logic to show checks and crosses
                    let hasAccess = false;
                    if (isAdmin) hasAccess = true;
                    else if (mod === "Candidates" || mod === "Jobs") hasAccess = true;
                    else if (mod === "Interviews" && (user.role === "Interviewer" || user.role === "Hiring Manager")) hasAccess = true;
                    else if (mod === "Organization" && user.role === "Admin") hasAccess = true;

                    return (
                      <TableCell key={mod} className="text-center">
                        <div className="flex justify-center">
                          {hasAccess ? (
                            <Check className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground/30" />
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
