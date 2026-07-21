"use client";


import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PlusCircle, Search, Mail, Users, FileText, CalendarPlus } from "lucide-react";

export function QuickActionGrid() {
  const actions = [
    { label: "Post New Job", icon: <PlusCircle className="h-5 w-5" />, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Source Candidates", icon: <Search className="h-5 w-5" />, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { label: "Email Campaign", icon: <Mail className="h-5 w-5" />, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { label: "Review Talent Pool", icon: <Users className="h-5 w-5" />, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
    { label: "Analyze Resumes", icon: <FileText className="h-5 w-5" />, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
    { label: "Schedule Event", icon: <CalendarPlus className="h-5 w-5" />, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto py-4 flex flex-col items-center justify-center gap-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm group"
          >
            <div className={`p-2 rounded-full ${action.bg} ${action.color} group-hover:scale-110 transition-transform duration-200`}>
              {action.icon}
            </div>
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">{action.label}</span>
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
