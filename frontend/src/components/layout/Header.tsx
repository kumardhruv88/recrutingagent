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
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4 lg:gap-6">
          <MobileDrawer />
          
          {/* Organization Switcher Placeholder */}
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium">
            <Button variant="ghost" className="h-9 px-3 flex items-center gap-2 border border-transparent hover:border-border bg-surface">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Acme Corp</span>
            </Button>
            <div className="h-4 w-px bg-border" />
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
