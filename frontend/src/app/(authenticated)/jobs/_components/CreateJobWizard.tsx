"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Plus } from "lucide-react";

export function CreateJobWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  
  const handleFinish = () => {
    setOpen(false);
    // Reset state after closing animation
    setTimeout(() => setStep(1), 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>
      } />
      <DialogContent className="sm:max-w-[600px] w-[95vw] p-0 overflow-hidden bg-background">
        <div className="flex bg-muted/50 border-b border-border p-4 overflow-x-auto no-scrollbar">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1 min-w-[60px] last:flex-none">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium border transition-colors ${
                step > s 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : step === s 
                    ? "bg-foreground text-background border-foreground" 
                    : "bg-background text-muted-foreground border-border"
              }`}>
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s !== 4 && (
                <div className="flex-1 h-px mx-2 bg-border min-w-[20px]"></div>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 h-[400px] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
                    <p className="text-sm text-muted-foreground">Provide the fundamental details about the role.</p>
                  </div>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input id="title" placeholder="e.g. Senior Frontend Engineer" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="department">Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="type">Employment Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fulltime">Full-time</SelectItem>
                            <SelectItem value="parttime">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g. San Francisco, CA (Hybrid)" />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">Description & Requirements</h3>
                    <p className="text-sm text-muted-foreground">Define what you are looking for in a candidate.</p>
                  </div>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea id="description" placeholder="Brief overview of the role..." className="h-24" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="requirements">Requirements (One per line)</Label>
                      <Textarea id="requirements" placeholder="- 5+ years experience..." className="h-24" />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">Responsibilities & Benefits</h3>
                    <p className="text-sm text-muted-foreground">What will the candidate do and what do you offer?</p>
                  </div>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="responsibilities">Responsibilities (One per line)</Label>
                      <Textarea id="responsibilities" placeholder="- Architect scalable systems..." className="h-24" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="benefits">Benefits (One per line)</Label>
                      <Textarea id="benefits" placeholder="- Comprehensive health insurance..." className="h-24" />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">Review & Publish</h3>
                    <p className="text-sm text-muted-foreground">Review the details before publishing the job to your career site.</p>
                  </div>
                  <div className="bg-muted/50 border border-border rounded-xl p-4 space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground">Senior Frontend Engineer</h4>
                      <p className="text-sm text-muted-foreground">Engineering • Full-time • San Francisco, CA (Hybrid)</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">We are looking for a Senior Frontend Engineer to lead the development of our next-generation hiring platform.</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">All required fields completed</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <DialogFooter className="p-4 border-t border-border bg-muted/30">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              Back
            </Button>
            {step < totalSteps ? (
              <Button onClick={nextStep}>
                Next Step <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleFinish} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Publish Job
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
