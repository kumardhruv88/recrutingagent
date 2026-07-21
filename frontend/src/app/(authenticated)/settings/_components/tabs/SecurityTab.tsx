"use client";

import { useState } from "react";
import { mockSecurity } from "@/data/settings";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Monitor, Smartphone, Globe, Clock, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SecurityTabProps {
  onChange: () => void;
}

export function SecurityTab({ onChange }: SecurityTabProps) {
  const [security, setSecurity] = useState(mockSecurity);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Manage your password, 2FA, and active sessions.
        </p>
      </div>
      <div className="h-px bg-border" />

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Change Password</h4>
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" />
            </div>
            <Button className="mt-2" onClick={onChange}>Update Password</Button>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
            <Card className="p-4 bg-muted/50 border-dashed">
              <div className="flex items-center space-x-3 mb-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {security.twoFactorEnabled ? "2FA is Enabled" : "2FA is Disabled"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Add an extra layer of security to your account by requiring a code from your authenticator app when you log in.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Require 2FA on login</span>
                <Switch
                  checked={security.twoFactorEnabled}
                  onCheckedChange={(val: boolean) => {
                    setSecurity({ ...security, twoFactorEnabled: val });
                    onChange();
                  }}
                />
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div>
            <h4 className="text-sm font-medium">Active Sessions</h4>
            <p className="text-xs text-muted-foreground">
              These are the devices that have logged into your account. Revoke any sessions that you do not recognize.
            </p>
          </div>

          <div className="space-y-3">
            {security.activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-muted rounded-lg mt-1">
                    {session.device.includes("iPhone") ? (
                      <Smartphone className="h-5 w-5" />
                    ) : (
                      <Monitor className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-sm">{session.device}</p>
                      {session.isCurrent && (
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-transparent text-[10px] h-5 px-1.5 py-0">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1 space-x-4">
                      <div className="flex items-center">
                        <Globe className="h-3 w-3 mr-1" />
                        {session.location} ({session.ip})
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {session.lastActive}
                      </div>
                    </div>
                  </div>
                </div>
                {!session.isCurrent && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="h-8 w-8 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-destructive">
                        Revoke Session
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
