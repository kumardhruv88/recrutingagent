"use client";

import { motion } from "framer-motion";
import { mockTeams } from "@/data/organization";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { UsersRound, Plus, Users, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TeamsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Teams</h3>
          <p className="text-sm text-muted-foreground">
            Group your members into specific hiring or operational teams.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mockTeams.map((team) => (
          <Card key={team.id} className="relative group">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <UsersRound className="h-5 w-5 text-primary" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Team</DropdownMenuItem>
                    <DropdownMenuItem>Manage Members</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete Team</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle>{team.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {team.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{team.memberCount} Members</span>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 py-3 border-t">
              <div className="flex justify-between items-center w-full text-xs">
                <span className="text-muted-foreground">Lead</span>
                <span className="font-medium">{team.lead}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
