"use client";

import { motion } from "framer-motion";
import { mockPaymentMethods } from "@/data/billing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, CreditCard as CreditCardIcon, MoreVertical, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PaymentMethodsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payment Methods</h2>
          <p className="text-muted-foreground mt-1">
            Manage your saved credit cards and billing information.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPaymentMethods.map((pm) => (
          <Card key={pm.id} className={`relative flex flex-col ${pm.isDefault ? 'border-primary shadow-sm' : 'border-border'}`}>
            {pm.isDefault && (
              <div className="absolute -top-3 -right-2">
                <Badge className="bg-primary text-primary-foreground shadow-sm px-2 py-0.5 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Default
                </Badge>
              </div>
            )}
            <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-14 bg-muted border rounded flex items-center justify-center font-bold text-xs tracking-tighter">
                  {pm.type.toUpperCase()}
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">{pm.type} ending in {pm.last4}</CardTitle>
                  <CardDescription>Expires {pm.expiry}</CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!pm.isDefault && (
                    <DropdownMenuItem>Set as default</DropdownMenuItem>
                  )}
                  <DropdownMenuItem>Edit details</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Remove card</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="mt-4 text-sm text-muted-foreground bg-muted/30 p-3 rounded-md border">
                Name on card: <span className="font-medium text-foreground">John Doe</span>
                <br />
                Billing Zip: <span className="font-medium text-foreground">94107</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Card Placeholder */}
        <button className="h-full min-h-[200px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer group">
          <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-background shadow-sm transition-colors mb-4">
            <Plus className="h-6 w-6" />
          </div>
          <span className="font-medium">Add new payment method</span>
          <span className="text-xs mt-1 opacity-70">Credit Card, Debit Card</span>
        </button>
      </div>

      <div className="mt-12 bg-muted/30 border rounded-lg p-6 max-w-3xl">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
          Secure Payments
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HireMind AI uses industry-standard encryption to protect your payment details. 
          We do not store your full credit card information on our servers. All transactions are securely processed via our payment partners.
        </p>
      </div>
    </motion.div>
  );
}
