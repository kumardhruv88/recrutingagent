import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { CheckSquare, Plus } from "lucide-react";

export default function AssessmentsPage() {
  return (
    <PageContainer>
      <PageHeader 
        title="Assessments" 
        description="Manage candidate technical assessments"
        primaryAction={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Assessments
          </Button>
        }
      />
      <EmptyState 
        title="No assessments found"
        description="Get started by creating a new assessments."
        icon={CheckSquare}
        action={
          <Button variant="outline">
            Create Assessments
          </Button>
        }
      />
    </PageContainer>
  );
}
