import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Bot, Plus } from "lucide-react";

export default function AICopilotPage() {
  return (
    <PageContainer>
      <PageHeader 
        title="AI Copilot" 
        description="Your intelligent hiring assistant"
        primaryAction={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New AI
          </Button>
        }
      />
      <EmptyState 
        title="No ai copilot found"
        description="Get started by creating a new ai."
        icon={Bot}
        action={
          <Button variant="outline">
            Create AI
          </Button>
        }
      />
    </PageContainer>
  );
}
