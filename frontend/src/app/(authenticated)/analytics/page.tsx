import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { BarChart3, Plus } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <PageHeader 
        title="Analytics" 
        description="Insights and reporting"
        primaryAction={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Analytics
          </Button>
        }
      />
      <EmptyState 
        title="No analytics found"
        description="Get started by creating a new analytics."
        icon={BarChart3}
        action={
          <Button variant="outline">
            Create Analytics
          </Button>
        }
      />
    </PageContainer>
  );
}
