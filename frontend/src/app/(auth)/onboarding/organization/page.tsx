"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockCompanySizes, mockCountries, mockIndustries } from "@/data/auth";
import { ArrowRight, Loader2, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

export default function OrganizationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding/invite");
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Create your workspace</h1>
        <p className="text-sm text-muted-foreground">
          Let&apos;s set up your organization so you can start hiring.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-20 w-20 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 hover:border-primary/50 transition-colors cursor-pointer group">
              <UploadCloud className="h-6 w-6 mb-1 group-hover:text-primary transition-colors" />
              <span className="text-[10px] uppercase font-medium">Logo</span>
            </div>
            <div className="space-y-1">
              <Label htmlFor="orgName">Organization Name *</Label>
              <Input 
                id="orgName" 
                placeholder="Acme Corp" 
                required 
                className="w-[280px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Industry</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {mockIndustries.map((ind) => (
                  <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Size</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {mockCompanySizes.map((size) => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Country</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {mockCountries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full h-11 mt-4" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
