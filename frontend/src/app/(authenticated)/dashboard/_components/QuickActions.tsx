"use client";

import { motion } from "framer-motion";
import { PlusCircle, FileText, Users, Calendar, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { name: "Create Job", icon: PlusCircle, href: "/jobs/new" },
  { name: "Upload Resume", icon: FileText, href: "/candidates/new" },
  { name: "Invite Team", icon: Users, href: "/settings/team" },
  { name: "Schedule Interview", icon: Calendar, href: "/interviews/schedule" },
  { name: "View Analytics", icon: BarChart3, href: "/analytics" },
];

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3 pb-6">
      {actions.map((action, index) => (
        <motion.div
          key={action.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Button 
            variant="outline" 
            className="h-10 gap-2 font-medium" 
            render={
              <a href={action.href}>
                <action.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                {action.name}
              </a>
            } 
          />
        </motion.div>
      ))}
    </div>
  );
}
