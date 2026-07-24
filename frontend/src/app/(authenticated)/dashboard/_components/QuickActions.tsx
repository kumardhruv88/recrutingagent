"use client";

import { motion } from "framer-motion";
import { PlusCircle, FileText, Users, Calendar, BarChart3 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

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
          <Link
            href={action.href}
            className={buttonVariants({
              variant: "outline",
              className: "h-9 gap-2 font-medium shadow-sm transition-shadow hover:shadow-sm bg-background",
            })}
          >
            <action.icon className="h-4 w-4 text-primary" />
            {action.name}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
