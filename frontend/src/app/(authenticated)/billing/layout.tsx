import { Metadata } from "next";
import { BillingNav } from "./_components/BillingNav";
import { CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "HireMind AI - Billing & Subscription",
  description: "Manage your plan, usage, and invoices.",
};

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            Billing & Subscription
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your organization&apos;s plan, monitor usage, and review payment history.
          </p>
        </div>
      </div>
      
      <BillingNav />
      
      <main className="pt-4 mx-auto w-full max-w-6xl">
        {children}
      </main>
    </div>
  );
}
