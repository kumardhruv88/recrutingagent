"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Link 
        href="/login" 
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to login
      </Link>

      <AnimatePresence mode="wait">
        {!isSent ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 pt-4"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">Forgot password?</h1>
              <p className="text-sm text-muted-foreground">
                No worries, we&apos;ll send you reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com" 
                  required 
                />
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Reset password"
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 pt-8 text-center flex flex-col items-center"
          >
            <div className="h-16 w-16 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-2">
              <MailCheck className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">Check your email</h1>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                We sent a password reset link to your email. Click the link inside to continue.
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => router.push("/login")}
            >
              Skip, I&apos;ll confirm later
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
