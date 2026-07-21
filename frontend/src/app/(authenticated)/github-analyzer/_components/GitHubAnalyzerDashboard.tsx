"use client";

import { 
  mockGithubProfile, 
  mockAIAnalysis, 
  mockLanguageDistribution, 
  mockSkillCategories,
  mockCommitTrends,
  mockProjectQuality,
  mockRepositories,
  mockActivityTimeline
} from "@/data/github";
import { GitHubProfileHeader } from "./GitHubProfileHeader";
import { AIAnalysisSummary } from "./AIAnalysisSummary";
import { SkillsIntelligence } from "./SkillsIntelligence";
import { ContributionDashboard } from "./ContributionDashboard";
import { ProjectQualitySection } from "./ProjectQualitySection";
import { RepositoryExplorer } from "./RepositoryExplorer";
import { ActivityTimeline } from "./ActivityTimeline";

export function GitHubAnalyzerDashboard() {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* 1. Header Section */}
      <GitHubProfileHeader profile={mockGithubProfile} />

      {/* 2. Top Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AIAnalysisSummary analysis={mockAIAnalysis} />
        </div>
        <div className="lg:col-span-1">
          <ProjectQualitySection metrics={mockProjectQuality} />
        </div>
      </div>

      {/* 3. Deep Intelligence Row */}
      <SkillsIntelligence 
        languageData={mockLanguageDistribution} 
        skillData={mockSkillCategories} 
      />

      {/* 4. Activity & Timelines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ContributionDashboard commitTrends={mockCommitTrends} />
        </div>
        <div className="lg:col-span-1">
          <ActivityTimeline events={mockActivityTimeline} />
        </div>
      </div>

      {/* 5. Repositories */}
      <div className="pt-4">
        <RepositoryExplorer repositories={mockRepositories} />
      </div>

    </div>
  );
}
