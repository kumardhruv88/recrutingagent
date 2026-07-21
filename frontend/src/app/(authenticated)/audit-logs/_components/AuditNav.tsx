"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  {
    title: "Overview",
    href: "/audit-logs",
    exact: true,
  },
  {
    title: "Activity Feed",
    href: "/audit-logs/activity",
  },
  {
    title: "Exports",
    href: "/audit-logs/exports",
  }
];

export function AuditNav() {
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
