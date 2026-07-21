"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if there's a value
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.length > 0) {
      const newOtp = [...otp];
      pastedData.forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtp(newOtp);
      // Focus the next empty input or the last one
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding/organization");
    }, 1500);
  };

  const isComplete = otp.every(val => val !== "");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pt-4 text-center"
    >
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 bg-primary/10 text-primary flex items-center justify-center rounded-2xl">
          <Mail className="h-8 w-8" />
        </div>
      </div>
      
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Check your email</h1>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
          We&apos;ve sent a 6-digit verification code to <span className="font-medium text-foreground">john@company.com</span>.
          Enter the code to verify your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div 
          className="flex justify-center gap-2 sm:gap-3"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={cn(
                "w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold rounded-xl border-2 transition-all outline-none focus-visible:ring-0",
                digit ? "border-primary text-primary" : "border-border text-foreground",
                "focus:border-primary focus:shadow-[0_0_0_3px_rgba(var(--primary),0.2)]"
              )}
            />
          ))}
        </div>

        <Button type="submit" className="w-full h-11" disabled={isLoading || !isComplete}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Verify Email <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground pt-4">
        Didn&apos;t receive the code?{" "}
        <button className="font-semibold text-primary hover:underline" type="button">
          Click to resend
        </button>
      </p>
    </motion.div>
  );
}
