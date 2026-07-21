import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

export default function ApplicationsPage() {
  return (
    <PageContainer>
      <PageHeader 
        title="Applications" 
        description="Review incoming applications"
        primaryAction={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Applications
          </Button>
        }
      />
      <EmptyState 
        title="No applications found"
        description="Get started by creating a new applications."
        icon={FileText}
        action={
          <Button variant="outline">
            Create Applications
          </Button>
        }
      />
    </PageContainer>
  );
}
