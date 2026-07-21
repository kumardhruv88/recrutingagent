"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockRoles } from "@/data/auth";
import { ArrowRight, Loader2, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InviteTeamPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [invites, setInvites] = useState([{ id: 1, email: "", role: "recruiter" }]);

  const addInvite = () => {
    setInvites([...invites, { id: Date.now(), email: "", role: "hiring_manager" }]);
  };

  const removeInvite = (id: number) => {
    setInvites(invites.filter((inv) => inv.id !== id));
  };

  const updateInvite = (id: number, field: string, value: string) => {
    setInvites(
      invites.map((inv) => (inv.id === id ? { ...inv, [field]: value } : inv))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding/role");
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Invite your team</h1>
        <p className="text-sm text-muted-foreground">
          HireMind works best when your whole hiring team collaborates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <AnimatePresence>
            {invites.map((invite) => (
              <motion.div
                key={invite.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center space-x-2"
              >
                <div className="flex-1 space-y-1">
                  <Input
                    placeholder="colleague@company.com"
                    type="email"
                    value={invite.email}
                    onChange={(e) => updateInvite(invite.id, "email", e.target.value)}
                  />
                </div>
                <div className="w-[140px] space-y-1">
                  <Select
                    value={invite.role}
                    onValueChange={(val) => updateInvite(invite.id, "role", val as string)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {invites.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeInvite(invite.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed bg-transparent hover:bg-muted/50"
            onClick={addInvite}
          >
            <Plus className="mr-2 h-4 w-4" /> Add another teammate
          </Button>
        </div>

        <div className="flex flex-col space-y-3 pt-4">
          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Send Invites <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => router.push("/onboarding/role")}
          >
            Skip for now
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
