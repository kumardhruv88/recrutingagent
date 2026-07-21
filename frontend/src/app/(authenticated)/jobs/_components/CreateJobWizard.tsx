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
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium border ${
                step > s 
                  ? "bg-emerald-500 text-white border-emerald-500" 
                  : step === s 
                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-950 dark:border-white" 
                    : "bg-white text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
              }`}>
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s !== 4 && (
                <div className="flex-1 h-px mx-2 bg-zinc-200 dark:bg-zinc-800"></div>
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
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Basic Information</h3>
                    <p className="text-sm text-zinc-500">Provide the fundamental details about the role.</p>
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
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Description & Requirements</h3>
                    <p className="text-sm text-zinc-500">Define what you are looking for in a candidate.</p>
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
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Responsibilities & Benefits</h3>
                    <p className="text-sm text-zinc-500">What will the candidate do and what do you offer?</p>
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
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Review & Publish</h3>
                    <p className="text-sm text-zinc-500">Review the details before publishing the job to your career site.</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 space-y-3">
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Senior Frontend Engineer</h4>
                      <p className="text-sm text-zinc-500">Engineering • Full-time • San Francisco, CA (Hybrid)</p>
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      <p className="mb-2">We are looking for a Senior Frontend Engineer to lead the development of our next-generation hiring platform.</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">All required fields completed</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <DialogFooter className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              Back
            </Button>
            {step < totalSteps ? (
              <Button onClick={nextStep}>
                Next Step <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleFinish} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Publish Job
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
