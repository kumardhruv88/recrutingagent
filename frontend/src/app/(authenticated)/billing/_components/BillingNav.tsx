"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  {
    title: "Overview",
    href: "/billing",
    exact: true,
  },
  {
    title: "Plans",
    href: "/billing/plans",
  },
  {
    title: "Usage",
    href: "/billing/usage",
  },
  {
    title: "AI Credits",
    href: "/billing/ai-credits",
  },
  {
    title: "Invoices",
    href: "/billing/invoices",
  },
  {
    title: "Payment Methods",
    href: "/billing/payment-methods",
  },
];

export function BillingNav() {
  const pathname = usePathname();

  return (
    <div className="border-b">
      <nav className="flex space-x-2 md:space-x-4 overflow-x-auto p-1 scrollbar-hide">
        {navItems.map((item) => {
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname?.startsWith(item.href);
            
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                isActive
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-transparent hover:text-foreground",
                "justify-start flex-shrink-0 px-4 rounded-full transition-colors"
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
