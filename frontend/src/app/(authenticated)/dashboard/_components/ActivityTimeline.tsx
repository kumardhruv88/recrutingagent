"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDashboardData } from "@/data/dashboard";
import { Activity, UserPlus, CheckCircle, Brain, Calendar } from "lucide-react";

export function ActivityTimeline() {
  const { recentActivity } = mockDashboardData;

  const getIcon = (type: string) => {
    switch (type) {
      case "application": return <UserPlus className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case "ai": return <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />;
      case "interview": return <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />;
      case "offer": return <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      default: return <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "application": return "bg-green-100 dark:bg-green-900/30";
      case "ai": return "bg-indigo-100 dark:bg-indigo-900/30";
      case "interview": return "bg-orange-100 dark:bg-orange-900/30";
      case "offer": return "bg-emerald-100 dark:bg-emerald-900/30";
      default: return "bg-blue-100 dark:bg-blue-900/30";
    }
  };

  return (
    <Card className="col-span-full lg:col-span-1 xl:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-zinc-500" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 dark:before:via-zinc-800 before:to-transparent">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Icon */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-zinc-950 ${getIconBg(activity.type)} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10`}>
                {getIcon(activity.type)}
              </div>
              
              {/* Content */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{activity.action}</span>
                  <span className="text-xs font-medium text-zinc-400">{activity.time}</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug">
                  {activity.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
