import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { CopilotWorkspace } from "./_components/CopilotWorkspace";
import { Button } from "@/components/ui/button";
import { Plus, History } from "lucide-react";
export default function AICopilotPage() {
  return (
    <PageContainer className="h-[calc(100vh-theme(spacing.16))] flex flex-col pt-4">
      <div className="shrink-0">
        <PageHeader 
          title="AI Copilot" 
          description="Your intelligent hiring assistant"
          primaryAction={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <History className="mr-2 h-4 w-4" />
                History
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </div>
          }
        />
      </div>
      <div className="flex-1 mt-4 min-h-0">
        <CopilotWorkspace />
      </div>
    </PageContainer>
  );
}
