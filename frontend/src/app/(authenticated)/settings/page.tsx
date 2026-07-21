import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Settings, Plus } from "lucide-react";

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader 
        title="Settings" 
        description="Manage your account and team preferences"
        primaryAction={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Settings
          </Button>
        }
      />
      <EmptyState 
        title="No settings found"
        description="Get started by creating a new settings."
        icon={Settings}
        action={
          <Button variant="outline">
            Create Settings
          </Button>
        }
      />
    </PageContainer>
  );
}
