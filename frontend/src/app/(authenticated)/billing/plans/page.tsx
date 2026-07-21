"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { mockPlans, mockCurrentSubscription } from "@/data/billing";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const comparisonFeatures = [
  { category: "Recruitment", features: [
    { name: "Active Jobs", free: "5", starter: "15", growth: "50", enterprise: "Unlimited" },
    { name: "Team Members", free: "2", starter: "5", growth: "15", enterprise: "Unlimited" },
    { name: "Custom Workflows", free: false, starter: false, growth: true, enterprise: true },
  ]},
  { category: "AI Features", features: [
    { name: "AI Credits / Month", free: "100", starter: "1,000", growth: "5,000", enterprise: "Unlimited" },
    { name: "Resume Intelligence", free: true, starter: true, growth: true, enterprise: true },
    { name: "Voice Interviews", free: false, starter: "5 hrs", growth: "20 hrs", enterprise: "Custom" },
    { name: "GitHub Analysis", free: false, starter: true, growth: true, enterprise: true },
  ]},
  { category: "Support", features: [
    { name: "Support Level", free: "Community", starter: "Email", growth: "Priority", enterprise: "Dedicated" },
    { name: "SLA", free: false, starter: false, growth: false, enterprise: true },
  ]}
];

export default function PlansPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Upgrade your hiring workflow</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Choose a plan that fits your organization&apos;s needs. Change or cancel anytime.
        </p>
        
        <div className="flex items-center justify-center gap-3 pt-4">
          <span className={`text-sm font-medium ${!isAnnual ? "" : "text-muted-foreground"}`}>Monthly</span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <span className={`text-sm font-medium flex items-center gap-1.5 ${isAnnual ? "" : "text-muted-foreground"}`}>
            Annual <Badge variant="secondary" className="text-[10px] text-emerald-600 bg-emerald-100 hover:bg-emerald-100 border-emerald-200">Save 20%</Badge>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {mockPlans.map((plan) => {
          const isCurrentPlan = mockCurrentSubscription.planName.toLowerCase() === plan.name.toLowerCase();
          const price = isAnnual ? plan.price.annual : plan.price.monthly;
          
          return (
            <Card 
              key={plan.id} 
              className={`flex flex-col relative ${plan.recommended ? 'border-primary shadow-md' : 'border-border'}`}
            >
              {plan.recommended && (
                <div className="absolute top-0 inset-x-0 -mt-3 flex justify-center">
                  <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-0.5">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pt-6">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="min-h-[40px]">{plan.description}</CardDescription>
                <div className="pt-4 pb-2">
                  <span className="text-4xl font-bold">${price}</span>
                  {price > 0 && <span className="text-muted-foreground">/mo</span>}
                </div>
                {isAnnual && price > 0 && (
                  <div className="text-sm text-muted-foreground font-medium text-emerald-600">
                    Billed ${price * 12} yearly
                  </div>
                )}
                {!isAnnual && price > 0 && (
                  <div className="text-sm text-transparent select-none">Spacer</div>
                )}
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-2.5 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isCurrentPlan ? (
                  <Button variant="outline" className="w-full" disabled>Current Plan</Button>
                ) : (
                  <Dialog>
                    <DialogTrigger 
                      className={buttonVariants({ variant: plan.recommended ? "default" : "outline" }) + " w-full"}
                      onClick={() => setSelectedPlan(plan.name)}
                    >
                      {price === 0 ? "Downgrade" : "Upgrade to " + plan.name}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Plan Change</DialogTitle>
                        <DialogDescription>
                          You are about to switch to the <strong>{selectedPlan}</strong> plan on a {isAnnual ? "yearly" : "monthly"} billing cycle.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="py-6 space-y-4">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">New Plan</span>
                          <span className="font-medium">{selectedPlan}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Billing Cycle</span>
                          <span className="font-medium">{isAnnual ? "Annual" : "Monthly"}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 text-lg">
                          <span>Total due today</span>
                          <span>${isAnnual && selectedPlan ? (mockPlans.find(p => p.name === selectedPlan)?.price.annual ?? 0) * 12 : (mockPlans.find(p => p.name === selectedPlan)?.price.monthly ?? 0)}</span>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Confirm Payment</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="pt-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Compare Plans</h2>
          <p className="text-muted-foreground mt-2">Detailed breakdown of features and limits.</p>
        </div>

        <div className="rounded-md border bg-card overflow-x-auto max-w-5xl mx-auto shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0">
              <TableRow>
                <TableHead className="w-[300px]">Features</TableHead>
                <TableHead className="text-center font-semibold">Free</TableHead>
                <TableHead className="text-center font-semibold">Starter</TableHead>
                <TableHead className="text-center font-semibold text-primary">Growth</TableHead>
                <TableHead className="text-center font-semibold">Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonFeatures.map((category, idx) => (
                <React.Fragment key={idx}>
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={5} className="font-semibold text-sm">
                      {category.category}
                    </TableCell>
                  </TableRow>
                  {category.features.map((feature, fIdx) => (
                    <TableRow key={fIdx}>
                      <TableCell className="font-medium text-sm text-muted-foreground">
                        {feature.name}
                      </TableCell>
                      {['free', 'starter', 'growth', 'enterprise'].map((planKey) => {
                        const val = feature[planKey as keyof typeof feature];
                        return (
                          <TableCell key={planKey} className="text-center">
                            {typeof val === 'boolean' ? (
                              val ? <Check className="h-4 w-4 text-primary mx-auto" /> : <span className="text-muted-foreground/30">-</span>
                            ) : (
                              <span className="text-sm font-medium">{val as string}</span>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
}
