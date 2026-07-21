"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Calendar,
  CheckSquare,
  BrainCircuit,
  Bot,
  BarChart3,
  Settings,
  Code2,
  Home,
  Inbox,
  CalendarDays,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const navigation = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Calendar", href: "/calendar", icon: CalendarDays },
      { title: "Inbox", href: "/notifications", icon: Inbox },
      { title: "Recruiter Portal", href: "/recruiter-portal", icon: Home },
    ],
  },
  {
    title: "Hiring",
    items: [
      { title: "Jobs", href: "/jobs", icon: Briefcase },
      { title: "Candidates", href: "/candidates", icon: Users },
      { title: "Applications", href: "/applications", icon: FileText },
    ],
  },
  {
    title: "Evaluation",
    items: [
      { title: "Interviews", href: "/interviews", icon: Calendar },
      { title: "Assessments", href: "/assessments", icon: CheckSquare },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { title: "Resume AI", href: "/resume-intelligence", icon: BrainCircuit },
      { title: "GitHub Analyzer", href: "/github-analyzer", icon: Code2 },
      { title: "AI Copilot", href: "/copilot", icon: Bot },
    ],
  },
  {
    title: "Insights",
    items: [{ title: "Analytics", href: "/analytics", icon: BarChart3 }],
  },
  {
    title: "Administration",
    items: [{ title: "Settings", href: "/settings", icon: Settings }],
  },
];

export function MobileDrawer() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        }
      />
      <SheetContent side="left" className="w-72 p-0 flex flex-col">
        <div className="h-14 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold text-lg tracking-tight"
            onClick={() => setOpen(false)}
          >
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            HireMind <span className="text-blue-600">AI</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-6 px-4">
          <nav className="space-y-8">
            {navigation.map((group) => (
              <div key={group.title}>
                <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {group.title}
                </h4>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-zinc-200/50 dark:bg-zinc-800 text-blue-600 dark:text-blue-400"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
