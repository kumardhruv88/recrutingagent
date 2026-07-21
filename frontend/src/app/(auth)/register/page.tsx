"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialLogins } from "../_components/SocialLogins";
import { PasswordInput } from "../_components/PasswordInput";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call and redirect to email verification
    setTimeout(() => {
      setIsLoading(false);
      router.push("/verify-email");
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Start hiring smarter with HireMind AI
        </p>
      </div>

      <SocialLogins action="Sign up" />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            placeholder="John Doe" 
            required 
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="john@company.com" 
            required 
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput 
            id="password" 
            placeholder="Create a strong password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showStrength
            autoComplete="new-password"
          />
        </div>

        <p className="text-xs text-muted-foreground pt-2">
          By clicking continue, you agree to our{" "}
          <Link href="#" className="underline hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-primary">
            Privacy Policy
          </Link>.
        </p>

        <Button type="submit" className="w-full h-11" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              Create account <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground pt-4">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
