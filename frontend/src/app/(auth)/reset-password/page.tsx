"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "../_components/PasswordInput";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Auto redirect after success
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pt-8"
    >
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2 text-center mb-8">
              <h1 className="text-3xl font-semibold tracking-tight">Set new password</h1>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your new password must be different to previously used passwords.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <PasswordInput 
                  id="password" 
                  placeholder="Create new password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  showStrength
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <PasswordInput 
                  id="confirm-password" 
                  placeholder="Confirm new password" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading || !password}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Reset password <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 pt-4 text-center flex flex-col items-center"
          >
            <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 flex items-center justify-center rounded-full mb-2">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">Password reset</h1>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your password has been successfully reset. Redirecting you to login...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
