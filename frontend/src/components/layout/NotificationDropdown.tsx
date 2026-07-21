"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="relative h-9 w-9">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600" />
            <span className="sr-only">Notifications</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {/* Placeholder Notification */}
          <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-pointer">
            <span className="font-medium text-sm">New Application</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Sarah Jenkins applied for Senior Frontend Engineer.
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400 mt-1">2 mins ago</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-pointer">
            <span className="font-medium text-sm">Interview Scheduled</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Technical interview with David Lee is starting in 15 mins.
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400 mt-1">1 hour ago</span>
          </DropdownMenuItem>
        </div>
        <DropdownMenuItem className="p-0 border-t border-zinc-200 dark:border-zinc-800 focus:bg-transparent cursor-default">
          <Link href="/notifications" className="w-full text-center py-3 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
