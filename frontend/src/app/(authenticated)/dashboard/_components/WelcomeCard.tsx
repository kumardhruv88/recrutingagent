"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";

export function WelcomeCard() {
  const currentHour = new Date().getHours();
  let greeting = "Good Evening";
  if (currentHour < 12) greeting = "Good Morning";
  else if (currentHour < 18) greeting = "Good Afternoon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col space-y-1 pb-4"
    >
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {greeting}, Jane
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400">
        Here&apos;s what&apos;s happening with your candidates today, {format(new Date(), "MMMM do, yyyy")}.
      </p>
    </motion.div>
  );
}
