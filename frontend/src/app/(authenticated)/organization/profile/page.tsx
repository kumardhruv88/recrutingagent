"use client";

import { motion } from "framer-motion";
import { mockOrganization } from "@/data/organization";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function OrganizationProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-3xl"
    >
      <div>
        <h3 className="text-xl font-semibold tracking-tight">Organization Profile</h3>
        <p className="text-sm text-muted-foreground">
          Manage your organization&apos;s brand and contact information.
        </p>
      </div>

      <form onSubmit={handleSave}>
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              This information is visible to candidates and team members.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 hover:border-primary/50 transition-colors cursor-pointer group relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mockOrganization.logo} alt="Logo" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-20 transition-opacity" />
                <UploadCloud className="h-6 w-6 mb-1 group-hover:text-primary transition-colors relative z-10" />
                <span className="text-[10px] uppercase font-medium relative z-10">Update</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Company Logo</h4>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Upload a high-resolution logo in PNG or SVG format. Max size 2MB.
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" defaultValue={mockOrganization.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" defaultValue={mockOrganization.industry} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input id="website" type="url" defaultValue={mockOrganization.website} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Headquarters Address</Label>
              <Input id="address" defaultValue={mockOrganization.address} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t py-4">
            <div className="text-sm text-muted-foreground flex items-center">
              {isSaved && (
                <span className="flex items-center text-emerald-500">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Saved successfully
                </span>
              )}
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </motion.div>
  );
}
