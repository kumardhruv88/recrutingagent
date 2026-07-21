"use client";

import * as React from "react";
import { MobileDrawer } from "./MobileDrawer";
import { GlobalSearch } from "./GlobalSearch";
import { NotificationDropdown } from "./NotificationDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { Breadcrumbs } from "./Breadcrumbs";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4 lg:gap-6">
          <MobileDrawer />
          
          {/* Organization Switcher Placeholder */}
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium">
            <Button variant="ghost" className="h-9 px-3 flex items-center gap-2 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Acme Corp</span>
            </Button>
            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
            <Breadcrumbs />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="w-full max-w-[200px] lg:max-w-[300px]">
            <GlobalSearch />
          </div>
          <ThemeToggle />
          <NotificationDropdown />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
