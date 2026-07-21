import { PageContainer } from "@/components/shared/PageContainer";
import { CandidateHeader } from "../_components/CandidateHeader";
import { CandidateTabs } from "../_components/CandidateTabs";
import { mockCandidates } from "@/data/candidates";
import { notFound } from "next/navigation";

// Next.js 15 page props resolution
export default async function CandidateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const candidate = mockCandidates.find(c => c.id === resolvedParams.id);

  if (!candidate) {
    notFound();
  }

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto w-full pt-4">
        <CandidateHeader candidate={candidate} />
        <CandidateTabs candidate={candidate} />
      </div>
    </PageContainer>
  );
}
