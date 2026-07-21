"use client";

import { useState } from "react";
import { mockNotifications } from "@/data/settings";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Mail, Smartphone, Monitor } from "lucide-react";

interface NotificationsTabProps {
  onChange: () => void;
}

export function NotificationsTab({ onChange }: NotificationsTabProps) {
  const [notifications, setNotifications] = useState(mockNotifications);

  const toggle = (category: "email" | "push" | "browser", key: string, value: boolean) => {
    setNotifications({
      ...notifications,
      [category]: {
        ...notifications[category],
        [key]: value,
      },
    });
    onChange();
  };

  const NotificationGroup = ({
    title,
    icon: Icon,
    category,
  }: {
    title: string;
    icon: React.ElementType;
    category: "email" | "push" | "browser";
  }) => (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 text-primary rounded-lg">
          <Icon className="h-5 w-5" />
        </div>
        <h4 className="font-medium text-lg">{title}</h4>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Interview Updates</Label>
            <p className="text-sm text-muted-foreground">
              Reschedules, cancellations, and upcoming reminders.
            </p>
          </div>
          <Switch
            checked={(notifications[category] as Record<string, boolean>).interviewUpdates}
            onCheckedChange={(val) => toggle(category, "interviewUpdates", val)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>AI Reports Ready</Label>
            <p className="text-sm text-muted-foreground">
              When an AI analysis of a resume or interview finishes.
            </p>
          </div>
          <Switch
            checked={(notifications[category] as Record<string, boolean>).aiReports}
            onCheckedChange={(val) => toggle(category, "aiReports", val)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Job Alerts</Label>
            <p className="text-sm text-muted-foreground">
              When candidates apply to your assigned jobs.
            </p>
          </div>
          <Switch
            checked={(notifications[category] as Record<string, boolean>).jobAlerts}
            onCheckedChange={(val) => toggle(category, "jobAlerts", val)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Mentions</Label>
            <p className="text-sm text-muted-foreground">
              When someone tags you in a note.
            </p>
          </div>
          <Switch
            checked={(notifications[category] as Record<string, boolean>).mentions}
            onCheckedChange={(val) => toggle(category, "mentions", val)}
          />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you want to be alerted about activity.
        </p>
      </div>
      <div className="h-px bg-border" />

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NotificationGroup title="Email Notifications" icon={Mail} category="email" />
          <NotificationGroup title="Push Notifications" icon={Smartphone} category="push" />
        </div>
        <NotificationGroup title="Browser Notifications" icon={Monitor} category="browser" />

        <div className="space-y-2">
          <Label>Digest Frequency</Label>
          <p className="text-sm text-muted-foreground mb-2">
            How often do you want to receive a summary of all activity?
          </p>
          <Select
            value={notifications.digestFrequency}
            onValueChange={(val) => {
              setNotifications({ ...notifications, digestFrequency: (val || "daily") as "daily" | "weekly" | "never" });
              onChange();
            }}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily Digest</SelectItem>
              <SelectItem value="weekly">Weekly Digest</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
