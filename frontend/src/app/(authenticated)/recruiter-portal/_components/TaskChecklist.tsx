"use client";

import { useState } from "react";
import { RecruiterTask } from "@/data/recruiter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Calendar, Search, Mail, FileCheck, CheckCircle2 } from "lucide-react";

interface TaskChecklistProps {
  initialTasks: RecruiterTask[];
}

export function TaskChecklist({ initialTasks }: TaskChecklistProps) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "Review": return <Search className="h-4 w-4" />;
      case "Schedule": return <Calendar className="h-4 w-4" />;
      case "Approve": return <FileCheck className="h-4 w-4" />;
      case "Offer": return <CheckCircle2 className="h-4 w-4" />;
      case "FollowUp": return <Mail className="h-4 w-4" />;
      default: return <CheckSquare className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-transparent";
      case "Medium": return "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-transparent";
      case "Low": return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border-transparent";
      default: return "";
    }
  };

  // Sort tasks: incomplete first, then by priority (High -> Medium -> Low)
  const priorityWeight = { High: 3, Medium: 2, Low: 1 };
  
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }
    return a.completed ? 1 : -1;
  });

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="h-full"
    >
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-emerald-500" />
              Today&apos;s Tasks
            </CardTitle>
            <CardDescription>
              {completedCount} of {tasks.length} completed
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-1">
            <AnimatePresence>
              {sortedTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors border border-transparent ${
                    task.completed 
                      ? "opacity-60 bg-transparent" 
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:border-zinc-200 dark:hover:border-zinc-800"
                  }`}
                >
                  <div className="pt-0.5">
                    <Checkbox 
                      checked={task.completed} 
                      onCheckedChange={() => toggleTask(task.id)}
                      className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 rounded-sm"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label 
                      className={`text-sm font-medium leading-none cursor-pointer select-none ${
                        task.completed ? "line-through text-zinc-400 dark:text-zinc-500" : "text-zinc-900 dark:text-zinc-100"
                      }`}
                      onClick={() => toggleTask(task.id)}
                    >
                      {task.title}
                    </label>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-medium bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-sm">
                        {getTaskIcon(task.type)}
                        {task.type}
                      </div>
                      {!task.completed && (
                        <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-4 rounded-sm ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
