"use client";

import { useState } from "react";
import { mockWebhooks, Webhook } from "@/data/developer";
import { WebhookTable } from "./_components/WebhookTable";
import { WebhookEditor } from "./_components/WebhookEditor";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function WebhooksPage() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<Webhook | null>(null);

  const handleCreate = () => {
    setSelectedWebhook(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (webhook: Webhook) => {
    setSelectedWebhook(webhook);
    setIsEditorOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Webhooks</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Configure endpoints to receive HTTP payloads when specific events occur.
          </p>
        </div>
        
        <div className="flex w-full sm:w-auto gap-2">
          <Link href="/developer/webhooks/logs" className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}>
            View Logs
          </Link>
          <Button onClick={handleCreate} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Webhook
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <WebhookTable webhooks={mockWebhooks} onEdit={handleEdit} />
      </div>

      <WebhookEditor 
        webhook={selectedWebhook} 
        open={isEditorOpen} 
        onOpenChange={setIsEditorOpen} 
      />
    </div>
  );
}
