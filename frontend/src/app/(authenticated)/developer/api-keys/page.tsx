"use client";

import { useState } from "react";
import { mockAPIKeys } from "@/data/developer";
import { APIKeyTable } from "./_components/APIKeyTable";
import { APIKeyDialog } from "./_components/APIKeyDialog";
import { Button } from "@/components/ui/button";
import { Plus, KeyRound, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function APIKeysPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">API Keys</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage authentication tokens for the HireMind REST API.
          </p>
        </div>
        
        <Button onClick={() => setIsDialogOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Create API Key
        </Button>
      </div>

      <Alert className="bg-primary/5 border-primary/20 text-primary">
        <ShieldAlert className="h-4 w-4 text-primary" />
        <AlertTitle>Security Best Practices</AlertTitle>
        <AlertDescription className="text-xs text-primary/80 mt-1">
          Never commit API keys to version control. Use environment variables. We highly recommend rotating your production keys every 90 days.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-muted-foreground" />
            Active Keys
          </h3>
        </div>
        
        <APIKeyTable keys={mockAPIKeys} />
      </div>

      <APIKeyDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
