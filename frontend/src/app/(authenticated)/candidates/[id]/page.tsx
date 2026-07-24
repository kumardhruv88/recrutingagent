"use client";

import { PageContainer } from "@/components/shared/PageContainer";
import { CandidateHeader } from "../_components/CandidateHeader";
import { CandidateTabs } from "../_components/CandidateTabs";
import { useQuery } from "@tanstack/react-query";
import { candidateService } from "@/services/candidates";
import { use } from "react";

// Next.js 15 page props resolution
export default function CandidateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params);
  
  const { data: candidate, isLoading, isError } = useQuery({
    queryKey: ["candidate", resolvedParams.id],
    queryFn: () => candidateService.getCandidate(resolvedParams.id)
  });

  if (isLoading) {
    return <PageContainer><div className="max-w-6xl mx-auto w-full pt-12 text-center text-muted-foreground">Loading candidate profile...</div></PageContainer>;
  }

  if (isError || !candidate) {
    return <PageContainer><div className="max-w-6xl mx-auto w-full pt-12 text-center text-destructive">Failed to load candidate profile.</div></PageContainer>;
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
