export interface GithubRepository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  updatedAt: string;
  aiRating: number;
  url: string;
}

export interface GithubProfile {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  publicRepos: number;
  aiDeveloperScore: number;
}

export interface ProjectQualityMetrics {
  architecture: number;
  readability: number;
  testing: number;
  documentation: number;
  maintainability: number;
  scalability: number;
  security: number;
}

export interface SkillDistribution {
  name: string;
  value: number;
}

export interface ContributionData {
  date: string;
  count: number;
}

export interface CommitTrend {
  month: string;
  commits: number;
}

export interface AIAnalysisSummary {
  executiveSummary: string;
  engineeringLevel: string;
  hiringRecommendation: "Strong Hire" | "Hire" | "Consider" | "No Hire";
  confidenceScore: number;
  keyStrengths: string[];
  areasForImprovement: string[];
}

export interface ActivityEvent {
  id: string;
  type: "commit" | "pr" | "issue" | "release";
  repoName: string;
  title: string;
  date: string;
}

// --- MOCK DATA ---

export const mockGithubProfile: GithubProfile = {
  username: "johndoe",
  name: "John Doe",
  avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&auto=format&fit=crop",
  bio: "Senior Full-Stack Engineer | Open Source Contributor | React & Node.js Enthusiast",
  location: "San Francisco, CA",
  followers: 1254,
  following: 89,
  publicRepos: 42,
  aiDeveloperScore: 94,
};

export const mockRepositories: GithubRepository[] = [
  {
    id: "repo-1",
    name: "react-query-builder",
    description: "A highly customizable visual query builder for React, supporting complex logical grouping and deep nesting.",
    language: "TypeScript",
    stars: 892,
    forks: 145,
    issues: 12,
    updatedAt: "2 days ago",
    aiRating: 96,
    url: "#"
  },
  {
    id: "repo-2",
    name: "fast-node-api",
    description: "High-performance Node.js REST API boilerplate using Express, Redis, and PostgreSQL with clean architecture.",
    language: "JavaScript",
    stars: 450,
    forks: 82,
    issues: 5,
    updatedAt: "1 week ago",
    aiRating: 88,
    url: "#"
  },
  {
    id: "repo-3",
    name: "go-micro-auth",
    description: "Scalable authentication microservice written in Go with JWT and Redis session management.",
    language: "Go",
    stars: 1205,
    forks: 210,
    issues: 24,
    updatedAt: "3 weeks ago",
    aiRating: 92,
    url: "#"
  },
  {
    id: "repo-4",
    name: "nextjs-portfolio-theme",
    description: "Minimalist portfolio template built with Next.js App Router, Tailwind CSS, and Framer Motion.",
    language: "TypeScript",
    stars: 320,
    forks: 45,
    issues: 2,
    updatedAt: "1 month ago",
    aiRating: 85,
    url: "#"
  }
];

export const mockLanguageDistribution: SkillDistribution[] = [
  { name: "TypeScript", value: 45 },
  { name: "JavaScript", value: 30 },
  { name: "Go", value: 15 },
  { name: "Python", value: 10 },
];

export const mockSkillCategories: SkillDistribution[] = [
  { name: "Frontend", value: 90 },
  { name: "Backend", value: 85 },
  { name: "DevOps", value: 70 },
  { name: "Database", value: 80 },
  { name: "System Design", value: 75 },
];

export const mockProjectQuality: ProjectQualityMetrics = {
  architecture: 92,
  readability: 95,
  testing: 88,
  documentation: 82,
  maintainability: 90,
  scalability: 85,
  security: 89,
};

export const mockCommitTrends: CommitTrend[] = [
  { month: "Jan", commits: 120 },
  { month: "Feb", commits: 150 },
  { month: "Mar", commits: 180 },
  { month: "Apr", commits: 140 },
  { month: "May", commits: 210 },
  { month: "Jun", commits: 250 },
];

export const mockAIAnalysis: AIAnalysisSummary = {
  executiveSummary: "John demonstrates exceptional proficiency in modern JavaScript/TypeScript ecosystems. Their open-source contributions indicate a deep understanding of React performance optimization and clean backend architecture. Their code is highly readable and well-tested, though there is slight room for improvement in CI/CD automation.",
  engineeringLevel: "Senior / Staff",
  hiringRecommendation: "Strong Hire",
  confidenceScore: 92,
  keyStrengths: [
    "Expert-level TypeScript and React knowledge",
    "Clean, scalable microservices architecture in Go",
    "Strong emphasis on code readability and DRY principles"
  ],
  areasForImprovement: [
    "Documentation could be more comprehensive for smaller side projects",
    "Opportunity to deepen knowledge in advanced Kubernetes orchestration"
  ]
};

export const mockActivityTimeline: ActivityEvent[] = [
  {
    id: "evt-1",
    type: "pr",
    repoName: "react-query-builder",
    title: "Merged PR: Add support for custom operators",
    date: "Today"
  },
  {
    id: "evt-2",
    type: "commit",
    repoName: "fast-node-api",
    title: "Refactor Redis caching layer",
    date: "Yesterday"
  },
  {
    id: "evt-3",
    type: "issue",
    repoName: "go-micro-auth",
    title: "Opened Issue: Token refresh race condition",
    date: "3 days ago"
  },
  {
    id: "evt-4",
    type: "release",
    repoName: "react-query-builder",
    title: "Released v2.1.0",
    date: "1 week ago"
  }
];
