"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showStrength?: boolean;
}

export function PasswordInput({ className, showStrength = false, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const value = (props.value as string) || "";

  // Simple strength check
  const hasLength = value.length >= 8;
  const hasNumber = /\d/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
  const strengthScore = (hasLength ? 1 : 0) + (hasNumber ? 1 : 0) + (hasSpecial ? 1 : 0);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </Button>
      </div>

      {showStrength && value.length > 0 && (
        <div className="flex space-x-1 mt-2">
          <div className={cn("h-1 flex-1 rounded-full transition-colors", strengthScore >= 1 ? "bg-destructive" : "bg-muted", strengthScore >= 2 && "bg-amber-500", strengthScore >= 3 && "bg-emerald-500")} />
          <div className={cn("h-1 flex-1 rounded-full transition-colors", strengthScore >= 2 ? "bg-amber-500" : "bg-muted", strengthScore >= 3 && "bg-emerald-500")} />
          <div className={cn("h-1 flex-1 rounded-full transition-colors", strengthScore >= 3 ? "bg-emerald-500" : "bg-muted")} />
        </div>
      )}
    </div>
  );
}
