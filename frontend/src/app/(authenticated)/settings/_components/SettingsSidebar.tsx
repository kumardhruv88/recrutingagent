"use client";

import { cn } from "@/lib/utils";
import {
  User,
  Palette,
  Bell,
  Building2,
  Cpu,
  Unplug,
  ShieldCheck,
  CreditCard,
  FileText,
} from "lucide-react";

export type SettingsCategory =
  | "profile"
  | "appearance"
  | "notifications"
  | "organization"
  | "ai"
  | "integrations"
  | "security"
  | "billing"
  | "audit";

interface SettingsSidebarProps {
  activeTab: SettingsCategory;
  onTabChange: (tab: SettingsCategory) => void;
}

const navGroups = [
  {
    title: "Account",
    items: [
      { id: "profile", label: "Profile", icon: User },
      { id: "appearance", label: "Appearance", icon: Palette },
      { id: "notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    title: "Workspace",
    items: [
      { id: "organization", label: "Organization", icon: Building2 },
      { id: "ai", label: "AI Preferences", icon: Cpu },
      { id: "integrations", label: "Integrations", icon: Unplug },
    ],
  },
  {
    title: "Security & Billing",
    items: [
      { id: "security", label: "Security", icon: ShieldCheck },
      { id: "billing", label: "Billing", icon: CreditCard },
      { id: "audit", label: "Audit Logs", icon: FileText },
    ],
  },
];

export function SettingsSidebar({
  activeTab,
  onTabChange,
}: SettingsSidebarProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-8">
      {navGroups.map((group) => (
        <div key={group.title} className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
            {group.title}
          </h4>
          <nav className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id as SettingsCategory)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "")} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
}
