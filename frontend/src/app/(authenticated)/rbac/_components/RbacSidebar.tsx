"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Users, 
  ShieldCheck, 
  LayoutGrid, 
  History 
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const sidebarNavItems = [
  {
    title: "Members",
    href: "/rbac",
    icon: Users,
    exact: true
  },
  {
    title: "Roles",
    href: "/rbac/roles",
    icon: ShieldCheck,
  },
  {
    title: "Access Matrix",
    href: "/rbac/matrix",
    icon: LayoutGrid,
  },
  {
    title: "Activity Log",
    href: "/rbac/activity",
    icon: History,
  },
];

export function RbacSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-1 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
      {sidebarNavItems.map((item) => {
        // Special logic for exactly matching the root /rbac
        const isActive = item.exact 
          ? pathname === item.href 
          : pathname?.startsWith(item.href);
          
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              isActive
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start flex-shrink-0"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
