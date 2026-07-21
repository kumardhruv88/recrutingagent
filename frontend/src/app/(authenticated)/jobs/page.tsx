import { JobsList } from "./_components/JobsList";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";

export default function JobsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Jobs"
        description="Manage your open positions and track hiring pipelines."
      />
      <div className="mt-8">
        <JobsList />
      </div>
    </PageContainer>
  );
}
