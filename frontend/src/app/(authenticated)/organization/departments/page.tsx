"use client";

import { motion } from "framer-motion";
import { mockDepartments } from "@/data/organization";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Plus, Briefcase, Users, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DepartmentsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Departments</h3>
          <p className="text-sm text-muted-foreground">
            Manage high-level organizational structure and track hiring needs per department.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {mockDepartments.map((dept) => (
          <Card key={dept.id} className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-start justify-between pb-4 space-y-0">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-muted rounded-xl flex items-center justify-center">
                  <LayoutGrid className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {dept.memberCount} active members
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="font-normal">
                {dept.openPositions} Open Roles
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col space-y-1 p-3 bg-muted/30 rounded-lg">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" /> Target Headcount
                  </span>
                  <span className="font-semibold">{dept.headCount}</span>
                </div>
                <div className="flex flex-col space-y-1 p-3 bg-muted/30 rounded-lg">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Briefcase className="h-3 w-3" /> Active Jobs
                  </span>
                  <span className="font-semibold">{dept.openPositions}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full">
                View Open Positions
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
