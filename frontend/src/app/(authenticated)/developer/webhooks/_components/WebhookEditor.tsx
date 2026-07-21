"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy } from "lucide-react";
import { Webhook } from "@/data/developer";

interface WebhookEditorProps {
  webhook: Webhook | null; // null if creating new
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WebhookEditor({ webhook, open, onOpenChange }: WebhookEditorProps) {
  const isEditing = !!webhook;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Webhook" : "Add Webhook"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Modify your webhook configuration." : "Receive real-time HTTP POST payloads when events happen."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="endpoint">Endpoint URL <span className="text-destructive">*</span></Label>
            <Input 
              id="endpoint" 
              placeholder="https://api.yourdomain.com/webhooks/hiremind" 
              defaultValue={webhook?.endpoint || ""}
            />
            <p className="text-xs text-muted-foreground">HTTPS is required for live environments.</p>
          </div>
          
          <div className="space-y-3">
            <Label>Events to send</Label>
            <div className="grid grid-cols-2 gap-4 border p-4 rounded-md bg-muted/10 h-[150px] overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="evt-all" />
                  <label htmlFor="evt-all" className="text-sm font-medium">Send me everything</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="evt-can-create" defaultChecked={webhook?.events.includes("candidate.created") || !isEditing} />
                  <label htmlFor="evt-can-create" className="text-sm">candidate.created</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="evt-can-update" defaultChecked={webhook?.events.includes("candidate.updated")} />
                  <label htmlFor="evt-can-update" className="text-sm">candidate.updated</label>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="evt-int-sch" defaultChecked={webhook?.events.includes("interview.scheduled")} />
                  <label htmlFor="evt-int-sch" className="text-sm">interview.scheduled</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="evt-int-com" defaultChecked={webhook?.events.includes("interview.completed")} />
                  <label htmlFor="evt-int-com" className="text-sm">interview.completed</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="evt-job-pub" defaultChecked={webhook?.events.includes("job.published")} />
                  <label htmlFor="evt-job-pub" className="text-sm">job.published</label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Retry Policy</Label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue placeholder="Select retry policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No retries</SelectItem>
                  <SelectItem value="standard">Standard (3 attempts)</SelectItem>
                  <SelectItem value="aggressive">Aggressive (10 attempts)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue={webhook?.status === "disabled" ? "disabled" : "active"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isEditing && (
            <div className="space-y-2 pt-4 border-t">
              <Label>Signing Secret</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Use this secret to verify that webhook payloads are actually sent by HireMind.
              </p>
              <div className="flex items-center gap-2">
                <Input readOnly type="password" value={webhook.secret} className="font-mono bg-muted/50" />
                <Button size="icon" variant="outline" className="shrink-0" title="Copy Secret">
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="outline" className="shrink-0 whitespace-nowrap">Rotate Secret</Button>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div>
            {isEditing && (
              <Button variant="ghost" className="text-primary">Send Test Event</Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={() => onOpenChange(false)}>{isEditing ? "Save Changes" : "Create Webhook"}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
