"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-center space-y-8 min-h-[400px]">
      {/* Optional Confetti effect - using a simple div structure as placeholder if library missing */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Confetti placeholder or actual Confetti component if installed */}
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="relative z-10"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
          <div className="h-24 w-24 bg-primary text-primary-foreground flex items-center justify-center rounded-3xl shadow-xl relative z-10 mx-auto">
            <Sparkles className="h-12 w-12" />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1 z-20 shadow-sm"
          >
            <CheckCircle2 className="h-6 w-6" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-3 relative z-10"
      >
        <h1 className="text-4xl font-bold tracking-tight">You&apos;re all set!</h1>
        <p className="text-lg text-muted-foreground max-w-[300px] mx-auto">
          Your workspace is ready. Let&apos;s start hiring smarter with HireMind AI.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full relative z-10 pt-4"
      >
        <Button 
          size="lg" 
          className="w-full h-12 text-base font-medium" 
          onClick={handleFinish}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            "Go to Dashboard"
          )}
        </Button>
      </motion.div>
    </div>
  );
}
