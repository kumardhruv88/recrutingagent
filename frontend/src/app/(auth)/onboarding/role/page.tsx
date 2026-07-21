"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { mockRoles } from "@/data/auth";
import { ArrowRight, Loader2, Users, Briefcase, Shield, Video, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const roleIcons: Record<string, React.ReactNode> = {
  users: <Users className="h-6 w-6" />,
  briefcase: <Briefcase className="h-6 w-6" />,
  shield: <Shield className="h-6 w-6" />,
  video: <Video className="h-6 w-6" />,
  user: <User className="h-6 w-6" />
};

export default function RoleSelectionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("recruiter");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding/welcome");
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">How will you use HireMind?</h1>
        <p className="text-sm text-muted-foreground">
          We&apos;ll customize your dashboard based on your primary role.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-3">
          {mockRoles.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={cn(
                "flex items-start space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-muted/50",
                selectedRole === role.id 
                  ? "border-primary bg-primary/5" 
                  : "border-border bg-card"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg mt-0.5",
                selectedRole === role.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {roleIcons[role.icon]}
              </div>
              <div>
                <h3 className="font-semibold">{role.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full h-11 mt-4" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
