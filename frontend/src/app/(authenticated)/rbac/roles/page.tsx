"use client";

import { motion } from "framer-motion";
import { mockRoles } from "@/data/rbac";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, ShieldCheck, MoreVertical, Settings2, Copy, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function RbacRolesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Roles</h3>
          <p className="text-sm text-muted-foreground">
            Manage system roles and create custom roles to define granular access.
          </p>
        </div>
        <Link href="/rbac/roles/editor" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" />
          Create Custom Role
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mockRoles.map((role) => (
          <Card key={role.id} className="relative group flex flex-col h-full">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {role.type === "System" ? (
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  ) : (
                    <Settings2 className="h-5 w-5 text-primary" />
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={`/rbac/roles/editor?id=${role.id}`} className="w-full cursor-pointer">
                        Edit Role
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Clone Role
                    </DropdownMenuItem>
                    {role.type === "Custom" && (
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Role
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center justify-between">
                <CardTitle>{role.name}</CardTitle>
                <Badge variant={role.type === "System" ? "secondary" : "outline"} className="text-[10px] uppercase">
                  {role.type}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2 mt-2 min-h-[40px]">
                {role.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded-md w-fit">
                <Users className="h-4 w-4" />
                <span className="font-medium text-foreground">{role.memberCount}</span> Members
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
