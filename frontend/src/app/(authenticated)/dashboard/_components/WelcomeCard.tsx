"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";

export function WelcomeCard() {
  const { user } = useUser();
  const currentHour = new Date().getHours();
  let greeting = "Good Evening";
  if (currentHour < 12) greeting = "Good Morning";
  else if (currentHour < 18) greeting = "Good Afternoon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col space-y-1.5 pb-2"
    >
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {greeting}, {user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || "Recruiter"}
      </h1>
      <p className="text-muted-foreground text-base">
        Here&apos;s what&apos;s happening with your candidates today, <span className="font-medium text-foreground">{format(new Date(), "MMMM do, yyyy")}</span>.
      </p>
    </motion.div>
  );
}
