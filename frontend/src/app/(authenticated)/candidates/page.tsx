import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { CandidateList } from "./_components/CandidateList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CandidatesPage() {
  return (
    <PageContainer>
      <PageHeader 
        title="Candidates" 
        description="Manage and review your candidate pipeline."
        primaryAction={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
        }
      />
      <div className="mt-6">
        <CandidateList />
      </div>
    </PageContainer>
  );
}
