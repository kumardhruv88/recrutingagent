export interface RecruiterProfile {
  name: string;
  role: string;
  avatarUrl: string;
  workload: "Light" | "Optimal" | "Heavy";
  pendingReviews: number;
  upcomingInterviewsCount: number;
  activeJobs: number;
  aiProductivityScore: number;
}

export interface AssignedJob {
  id: string;
  title: string;
  department: string;
  applications: number;
  interviews: number;
  status: "Active" | "Paused" | "Closed";
  progress: number;
}

export interface Candidate {
  id: string;
  name: string;
  jobId: string;
  jobTitle: string;
  aiMatch: number;
  stage: "Sourced" | "Screening" | "Interview" | "Offer" | "Hired" | "Rejected";
  lastActivity: string;
  avatarUrl: string;
}

export interface RecruiterTask {
  id: string;
  title: string;
  type: "Review" | "Schedule" | "Approve" | "Offer" | "FollowUp";
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}

export interface Interview {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  role: string;
  time: string;
  type: "Video" | "On-site" | "Phone";
  status: "Scheduled" | "Completed" | "Canceled";
}

export interface AIAssistantInsight {
  id: string;
  type: "Priority" | "Warning" | "Suggestion" | "Insight";
  message: string;
  actionText?: string;
}

export interface PerformanceMetrics {
  candidatesReviewed: number;
  interviewsCompleted: number;
  offersSent: number;
  avgResponseTimeHours: number;
  hiringEfficiencyScore: number;
}

export interface ActivityEvent {
  id: string;
  type: "Review" | "Move" | "Interview" | "Offer";
  description: string;
  time: string;
}

// --- MOCK DATA ---

export const mockRecruiterProfile: RecruiterProfile = {
  name: "Sarah Jenkins",
  role: "Senior Technical Recruiter",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop",
  workload: "Optimal",
  pendingReviews: 12,
  upcomingInterviewsCount: 4,
  activeJobs: 5,
  aiProductivityScore: 92,
};

export const mockAssignedJobs: AssignedJob[] = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    applications: 145,
    interviews: 12,
    status: "Active",
    progress: 75,
  },
  {
    id: "job-2",
    title: "Product Designer",
    department: "Design",
    applications: 89,
    interviews: 8,
    status: "Active",
    progress: 40,
  },
  {
    id: "job-3",
    title: "Backend Developer (Go)",
    department: "Engineering",
    applications: 210,
    interviews: 15,
    status: "Active",
    progress: 90,
  },
];

export const mockCandidates: Candidate[] = [
  {
    id: "cand-1",
    name: "Alex Rivera",
    jobId: "job-1",
    jobTitle: "Senior Frontend Engineer",
    aiMatch: 95,
    stage: "Interview",
    lastActivity: "2 hours ago",
    avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&auto=format&fit=crop",
  },
  {
    id: "cand-2",
    name: "Jordan Lee",
    jobId: "job-2",
    jobTitle: "Product Designer",
    aiMatch: 88,
    stage: "Screening",
    lastActivity: "5 hours ago",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&auto=format&fit=crop",
  },
  {
    id: "cand-3",
    name: "Taylor Smith",
    jobId: "job-3",
    jobTitle: "Backend Developer",
    aiMatch: 92,
    stage: "Offer",
    lastActivity: "1 day ago",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&auto=format&fit=crop",
  },
  {
    id: "cand-4",
    name: "Casey Patel",
    jobId: "job-1",
    jobTitle: "Senior Frontend Engineer",
    aiMatch: 78,
    stage: "Sourced",
    lastActivity: "2 days ago",
    avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&auto=format&fit=crop",
  }
];

export const mockTasks: RecruiterTask[] = [
  {
    id: "task-1",
    title: "Review Alex Rivera's technical assessment",
    type: "Review",
    completed: false,
    priority: "High",
    dueDate: "Today",
  },
  {
    id: "task-2",
    title: "Schedule final round for Taylor Smith",
    type: "Schedule",
    completed: false,
    priority: "High",
    dueDate: "Today",
  },
  {
    id: "task-3",
    title: "Follow up with Design Director on Jordan's portfolio",
    type: "FollowUp",
    completed: true,
    priority: "Medium",
    dueDate: "Today",
  },
  {
    id: "task-4",
    title: "Prepare offer letter draft for Backend Dev role",
    type: "Offer",
    completed: false,
    priority: "Low",
    dueDate: "Tomorrow",
  },
];

export const mockInterviews: Interview[] = [
  {
    id: "int-1",
    candidateName: "Alex Rivera",
    candidateAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&auto=format&fit=crop",
    role: "Senior Frontend Engineer",
    time: "10:00 AM - 11:00 AM",
    type: "Video",
    status: "Scheduled",
  },
  {
    id: "int-2",
    candidateName: "Jordan Lee",
    candidateAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&auto=format&fit=crop",
    role: "Product Designer",
    time: "2:30 PM - 3:00 PM",
    type: "Phone",
    status: "Scheduled",
  },
  {
    id: "int-3",
    candidateName: "Sam Wilson",
    candidateAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&auto=format&fit=crop",
    role: "DevOps Engineer",
    time: "4:00 PM - 5:00 PM",
    type: "On-site",
    status: "Scheduled",
  },
];

export const mockAIAssistantInsights: AIAssistantInsight[] = [
  {
    id: "insight-1",
    type: "Priority",
    message: "Taylor Smith has been in the Offer stage for 2 days. Recommend following up.",
    actionText: "Send Follow-up Email",
  },
  {
    id: "insight-2",
    type: "Warning",
    message: "Candidate pipeline for Product Designer role has dropped by 30% this week.",
    actionText: "Review Sourcing Strategy",
  },
  {
    id: "insight-3",
    type: "Suggestion",
    message: "Alex Rivera's AI Match Score updated to 95 after the latest GitHub analysis.",
    actionText: "Fast-track Application",
  },
];

export const mockPerformanceMetrics: PerformanceMetrics = {
  candidatesReviewed: 342,
  interviewsCompleted: 48,
  offersSent: 12,
  avgResponseTimeHours: 18,
  hiringEfficiencyScore: 88,
};

export const mockActivityFeed: ActivityEvent[] = [
  {
    id: "act-1",
    type: "Interview",
    description: "Completed phone screen with Jordan Lee",
    time: "10 mins ago",
  },
  {
    id: "act-2",
    type: "Move",
    description: "Moved Taylor Smith to Offer stage",
    time: "1 hour ago",
  },
  {
    id: "act-3",
    type: "Review",
    description: "Reviewed 15 new applications for Frontend Engineer",
    time: "3 hours ago",
  },
  {
    id: "act-4",
    type: "Offer",
    description: "Offer accepted by previous Backend candidate",
    time: "1 day ago",
  },
];
