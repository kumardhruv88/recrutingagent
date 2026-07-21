"use client";

import { useState } from "react";
import { mockAudit } from "@/data/settings";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, AlertTriangle, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AuditTabProps {
  onChange: () => void;
}

export function AuditTab({ onChange }: AuditTabProps) {
  const [audit, setAudit] = useState(mockAudit);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Audit & Privacy</h3>
        <p className="text-sm text-muted-foreground">
          Manage data retention policies and privacy controls.
        </p>
      </div>
      <div className="h-px bg-border" />

      <div className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center">
            <Shield className="h-4 w-4 mr-2 text-primary" />
            Data Retention
          </h4>
          <Card className="p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1 max-w-lg">
                <Label className="text-base">Log Retention Period</Label>
                <p className="text-sm text-muted-foreground">
                  Determine how long audit logs, system events, and AI analysis history are kept before being permanently deleted.
                </p>
              </div>
              <Select
                value={audit.logRetentionDays.toString()}
                onValueChange={(val) => {
                  setAudit({ ...audit, logRetentionDays: parseInt(val || "90") });
                  onChange();
                }}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                  <SelectItem value="180">6 Months</SelectItem>
                  <SelectItem value="365">1 Year</SelectItem>
                  <SelectItem value="0">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-4 border-t flex justify-end">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Audit Logs (CSV)
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Privacy Controls</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-xl">
              <div className="space-y-0.5">
                <Label className="text-base">Anonymize Candidate Data</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically hide names and contact info in shared reports to reduce bias.
                </p>
              </div>
              <Switch
                checked={audit.privacyControls.anonymizeCandidateData}
                onCheckedChange={(val: boolean) => {
                  setAudit({
                    ...audit,
                    privacyControls: { ...audit.privacyControls, anonymizeCandidateData: val },
                  });
                  onChange();
                }}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-xl">
              <div className="space-y-0.5">
                <Label className="text-base">Share Usage Statistics</Label>
                <p className="text-sm text-muted-foreground">
                  Allow HireMind AI to collect anonymous usage data to improve the platform.
                </p>
              </div>
              <Switch
                checked={audit.privacyControls.shareUsageStats}
                onCheckedChange={(val: boolean) => {
                  setAudit({
                    ...audit,
                    privacyControls: { ...audit.privacyControls, shareUsageStats: val },
                  });
                  onChange();
                }}
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <Card className="p-6 border-destructive/20 bg-destructive/5">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-destructive/10 text-destructive rounded-lg mt-1">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-destructive">Danger Zone</h4>
                <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-xl">
                  Permanently delete your entire organization workspace and all associated data. This action cannot be undone.
                </p>
                <Button variant="destructive">Delete Workspace</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
