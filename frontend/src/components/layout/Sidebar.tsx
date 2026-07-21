"use client";

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
  Zap,
  Code2,
  Home,
  Inbox,
  CalendarDays,
  ShieldAlert,
  Terminal,
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
    title: "Developers",
    items: [{ title: "Integrations & API", href: "/developer", icon: Terminal }],
  },
  {
    title: "Administration",
    items: [
      { title: "Settings", href: "/settings", icon: Settings },
      { title: "Audit Logs", href: "/audit-logs", icon: ShieldAlert },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 lg:block lg:w-64 lg:flex-shrink-0 h-screen sticky top-0 flex-col">
      <div className="h-14 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg tracking-tight">
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
    </div>
  );
}
