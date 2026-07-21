"use client";

import { mockBilling } from "@/data/settings";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Receipt, CreditCard, Sparkles } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BillingTabProps {
  onChange: () => void;
}

export function BillingTab({}: BillingTabProps) {
  const billing = mockBilling;
  const usagePercentage = (billing.creditsUsed / billing.creditsTotal) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing & Usage</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription plan, AI credits, and view invoices.
        </p>
      </div>
      <div className="h-px bg-border" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-primary/20 bg-primary/5 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
              <h4 className="text-2xl font-bold flex items-center">
                {billing.plan}
                <Badge className="ml-2 bg-primary text-primary-foreground text-xs uppercase tracking-wider">
                  Active
                </Badge>
              </h4>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Billing Cycle</span>
              <span className="font-medium capitalize">{billing.billingCycle}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Next Payment Date</span>
              <span className="font-medium">{new Date(billing.nextBillingDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount Due</span>
              <span className="font-medium">${billing.amountDue.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1" variant="default">Upgrade Plan</Button>
            <Button className="flex-1" variant="outline">Manage Subscription</Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <h4 className="font-medium">AI Compute Credits</h4>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm font-medium">
                <span>{billing.creditsUsed.toLocaleString()} used</span>
                <span className="text-muted-foreground">{billing.creditsTotal.toLocaleString()} total</span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
            </div>
            
            <p className="text-xs text-muted-foreground mb-4">
              Credits reset automatically at the beginning of your next billing cycle.
            </p>
            <Button variant="secondary" size="sm" className="w-full">
              Buy Add-on Credits
            </Button>
          </Card>
        </div>
      </div>

      <div className="pt-6">
        <h4 className="text-sm font-medium mb-4 flex items-center">
          <Receipt className="h-4 w-4 mr-2 text-muted-foreground" />
          Invoice History
        </h4>
        <div className="border rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billing.invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.id}</TableCell>
                  <TableCell>{new Date(inv.date).toLocaleDateString()}</TableCell>
                  <TableCell>${inv.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-transparent">
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      Download
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
