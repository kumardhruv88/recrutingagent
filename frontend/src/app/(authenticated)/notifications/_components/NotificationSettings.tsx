"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings } from "lucide-react";

export function NotificationSettings() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    mentions: true,
    aiInsights: true,
    candidates: true,
    jobs: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hidden md:flex h-8 w-8">
        <Settings className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <DialogHeader>
          <DialogTitle>Notification Preferences</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Channels</h4>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-600 dark:text-zinc-400">Email Notifications</label>
              <input type="checkbox" checked={settings.email} onChange={() => toggleSetting('email')} className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-600 dark:text-zinc-400">Push Notifications</label>
              <input type="checkbox" checked={settings.push} onChange={() => toggleSetting('push')} className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 h-4 w-4" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Categories</h4>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-600 dark:text-zinc-400">Mentions & Replies</label>
              <input type="checkbox" checked={settings.mentions} onChange={() => toggleSetting('mentions')} className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-600 dark:text-zinc-400">AI Insights</label>
              <input type="checkbox" checked={settings.aiInsights} onChange={() => toggleSetting('aiInsights')} className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-600 dark:text-zinc-400">Candidate Updates</label>
              <input type="checkbox" checked={settings.candidates} onChange={() => toggleSetting('candidates')} className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-600 dark:text-zinc-400">Job Alerts</label>
              <input type="checkbox" checked={settings.jobs} onChange={() => toggleSetting('jobs')} className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 h-4 w-4" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
