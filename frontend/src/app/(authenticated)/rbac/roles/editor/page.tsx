"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { mockPermissionGroups } from "@/data/rbac";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RoleEditorPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/rbac/roles" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Create Custom Role</h3>
            <p className="text-sm text-muted-foreground">
              Define the specific permissions for this role.
            </p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Role"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Role Name</Label>
                <Input id="roleName" placeholder="e.g., External Sourcer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Briefly describe what this role can do..." 
                  className="resize-none h-24"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-dashed">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Permission Matrix</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Toggle individual permissions on the right. Group permissions override individual selections.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-md border bg-card overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
                <TableRow>
                  <TableHead className="w-[300px]">Permission</TableHead>
                  <TableHead className="text-center">View</TableHead>
                  <TableHead className="text-center">Create</TableHead>
                  <TableHead className="text-center">Edit</TableHead>
                  <TableHead className="text-center">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPermissionGroups.map((group) => (
                  <React.Fragment key={group.name}>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableCell colSpan={5} className="font-semibold text-sm">
                        {group.name}
                      </TableCell>
                    </TableRow>
                    {group.permissions.map((perm) => (
                      <TableRow key={perm.id}>
                        <TableCell>
                          <div className="font-medium text-sm">{perm.name}</div>
                          <div className="text-xs text-muted-foreground">{perm.description}</div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch defaultChecked={true} />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch />
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
