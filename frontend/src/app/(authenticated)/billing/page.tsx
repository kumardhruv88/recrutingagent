"use client";

import { motion } from "framer-motion";
import { mockCurrentSubscription, mockUsageSummary } from "@/data/billing";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Calendar, Users, Briefcase, Database } from "lucide-react";
import Link from "next/link";

export default function BillingOverviewPage() {
  const nextInvoiceDate = new Date(mockCurrentSubscription.renewalDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Plan Card */}
        <Card className="flex flex-col h-full border-primary/20 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                {mockCurrentSubscription.planName}
                <Badge variant="default" className="text-xs uppercase bg-primary text-primary-foreground font-semibold">
                  {mockCurrentSubscription.status}
                </Badge>
              </CardTitle>
            </div>
            <CardDescription>
              Your organization&apos;s currently on the {mockCurrentSubscription.planName} plan, billed {mockCurrentSubscription.billingCycle.toLowerCase()}.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="flex items-baseline gap-1 text-3xl font-bold">
              ${mockCurrentSubscription.monthlyPrice}
              <span className="text-sm font-normal text-muted-foreground">/mo</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t">
              <div className="space-y-1">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> Renewal Date
                </span>
                <p className="font-medium">{nextInvoiceDate}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> Team Members
                </span>
                <p className="font-medium">{mockCurrentSubscription.teamMembers} Members</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t bg-muted/30">
            <Link href="/billing/plans" className={buttonVariants({ variant: "default" }) + " w-full sm:w-auto"}>Upgrade Plan</Link>
            <Button variant="outline" className="w-full sm:w-auto text-destructive hover:bg-destructive/10 hover:text-destructive">
              Cancel Subscription
            </Button>
          </CardFooter>
        </Card>

        {/* Billing Summary */}
        <Card className="flex flex-col h-full shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              Billing Summary
            </CardTitle>
            <CardDescription>
              Overview of your upcoming charges and active payment method.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium flex items-center gap-2">
                <div className="h-6 w-8 bg-muted rounded flex items-center justify-center text-[10px] font-bold tracking-tighter">VISA</div>
                {mockCurrentSubscription.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Next Invoice</span>
              <span className="font-medium">{nextInvoiceDate}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Estimated Total</span>
              <span className="font-bold text-lg">${mockCurrentSubscription.nextInvoiceEstimated}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/billing/payment-methods" className={buttonVariants({ variant: "ghost" }) + " w-full justify-between"}>
              Manage Payment Methods <span>&rarr;</span>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Usage Highlights */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold tracking-tight">Usage Highlights</h3>
          <Link href="/billing/usage" className={buttonVariants({ variant: "link" }) + " p-0 h-auto"}>View All Usage &rarr;</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Team Seats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-bold">{mockUsageSummary.teamMembers.current}</span>
                <span className="text-sm text-muted-foreground">of {mockUsageSummary.teamMembers.limit}</span>
              </div>
              <Progress value={(mockUsageSummary.teamMembers.current / mockUsageSummary.teamMembers.limit) * 100} className="h-2" />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Active Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-bold">{mockUsageSummary.activeJobs.current}</span>
                <span className="text-sm text-muted-foreground">of {mockUsageSummary.activeJobs.limit}</span>
              </div>
              <Progress value={(mockUsageSummary.activeJobs.current / mockUsageSummary.activeJobs.limit) * 100} className="h-2" />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Database className="h-4 w-4" />
                Storage Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-bold">{mockUsageSummary.storage.current}{mockUsageSummary.storage.unit}</span>
                <span className="text-sm text-muted-foreground">of {mockUsageSummary.storage.limit}{mockUsageSummary.storage.unit}</span>
              </div>
              <Progress value={(mockUsageSummary.storage.current / mockUsageSummary.storage.limit) * 100} className="h-2" />
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
