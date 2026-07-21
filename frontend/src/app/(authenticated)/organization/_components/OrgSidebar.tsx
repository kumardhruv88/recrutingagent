"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Building2, 
  Settings2, 
  Users, 
  UsersRound, 
  Mail, 
  Briefcase, 
  LayoutDashboard 
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/organization",
    icon: LayoutDashboard,
    exact: true
  },
  {
    title: "Members",
    href: "/organization/members",
    icon: Users,
  },
  {
    title: "Teams",
    href: "/organization/teams",
    icon: UsersRound,
  },
  {
    title: "Departments",
    href: "/organization/departments",
    icon: Briefcase,
  },
  {
    title: "Invitations",
    href: "/organization/invitations",
    icon: Mail,
  },
  {
    title: "Organization Profile",
    href: "/organization/profile",
    icon: Building2,
  },
  {
    title: "Preferences",
    href: "/organization/preferences",
    icon: Settings2,
  },
  {
    title: "Usage & Billing",
    href: "/organization/usage",
    icon: BarChart3,
  },
];

export function OrgSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-1 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
      {sidebarNavItems.map((item) => {
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
