export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  timezone: string;
  language: string;
  avatar: string;
  bio: string;
}

export interface OrganizationInfo {
  id: string;
  name: string;
  logo: string;
  address: string;
  departments: string[];
  teamSize: string;
  hiringPreferences: {
    defaultCurrency: string;
    interviewDuration: number;
  };
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  accentColor: string;
  density: "comfortable" | "compact";
  animations: boolean;
  fontSize: "small" | "medium" | "large";
}

export interface NotificationSettings {
  email: {
    interviewUpdates: boolean;
    aiReports: boolean;
    jobAlerts: boolean;
    mentions: boolean;
  };
  push: {
    interviewUpdates: boolean;
    aiReports: boolean;
    jobAlerts: boolean;
    mentions: boolean;
  };
  browser: {
    interviewUpdates: boolean;
    aiReports: boolean;
    jobAlerts: boolean;
    mentions: boolean;
  };
  digestFrequency: "daily" | "weekly" | "never";
}

export interface AIPreferences {
  preferredModel: string;
  resumeAnalysis: {
    extractSkills: boolean;
    scoreExperience: boolean;
    highlightGaps: boolean;
  };
  interviewAnalysis: {
    generateTranscripts: boolean;
    sentimentAnalysis: boolean;
  };
  recommendationSensitivity: number; // 0 to 100
  explainability: boolean;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  activeSessions: {
    id: string;
    device: string;
    location: string;
    ip: string;
    lastActive: string;
    isCurrent: boolean;
  }[];
}

export interface BillingDetails {
  plan: string;
  billingCycle: "monthly" | "annually";
  creditsUsed: number;
  creditsTotal: number;
  nextBillingDate: string;
  amountDue: number;
  invoices: {
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending";
    url: string;
  }[];
}

export interface AuditSettings {
  logRetentionDays: number;
  privacyControls: {
    anonymizeCandidateData: boolean;
    shareUsageStats: boolean;
  };
}

export const mockProfile: UserProfile = {
  id: "USR-001",
  name: "Alex Sterling",
  email: "alex.sterling@hiremind.ai",
  phone: "+1 (555) 123-4567",
  timezone: "America/Los_Angeles",
  language: "en-US",
  avatar: "https://i.pravatar.cc/150?u=alex",
  bio: "Senior Technical Recruiter specializing in AI and Machine Learning roles.",
};

export const mockOrganization: OrganizationInfo = {
  id: "ORG-100",
  name: "HireMind Enterprise",
  logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png",
  address: "100 AI Way, San Francisco, CA 94105",
  departments: ["Engineering", "Product", "Sales", "Marketing"],
  teamSize: "100-500",
  hiringPreferences: {
    defaultCurrency: "USD",
    interviewDuration: 45,
  },
};

export const mockAppearance: AppearanceSettings = {
  theme: "system",
  accentColor: "blue",
  density: "comfortable",
  animations: true,
  fontSize: "medium",
};

export const mockNotifications: NotificationSettings = {
  email: {
    interviewUpdates: true,
    aiReports: true,
    jobAlerts: false,
    mentions: true,
  },
  push: {
    interviewUpdates: true,
    aiReports: false,
    jobAlerts: true,
    mentions: true,
  },
  browser: {
    interviewUpdates: true,
    aiReports: true,
    jobAlerts: true,
    mentions: true,
  },
  digestFrequency: "daily",
};

export const mockAIPreferences: AIPreferences = {
  preferredModel: "gpt-4-turbo",
  resumeAnalysis: {
    extractSkills: true,
    scoreExperience: true,
    highlightGaps: false,
  },
  interviewAnalysis: {
    generateTranscripts: true,
    sentimentAnalysis: true,
  },
  recommendationSensitivity: 80,
  explainability: true,
};

export const mockIntegrations: Integration[] = [
  {
    id: "int-01",
    name: "Google Calendar",
    description: "Sync your interviews with Google Calendar.",
    icon: "Calendar",
    status: "connected",
    lastSync: "2026-07-21T10:00:00Z",
  },
  {
    id: "int-02",
    name: "Slack",
    description: "Receive notifications and alerts in Slack channels.",
    icon: "Hash",
    status: "connected",
    lastSync: "2026-07-21T09:45:00Z",
  },
  {
    id: "int-03",
    name: "GitHub",
    description: "Analyze candidate open-source contributions.",
    icon: "Github",
    status: "disconnected",
  },
  {
    id: "int-04",
    name: "Zoom",
    description: "Automatically generate Zoom links for interviews.",
    icon: "Video",
    status: "disconnected",
  },
];

export const mockSecurity: SecuritySettings = {
  twoFactorEnabled: true,
  activeSessions: [
    {
      id: "sess-01",
      device: "MacBook Pro - Chrome",
      location: "San Francisco, CA",
      ip: "192.168.1.10",
      lastActive: "Just now",
      isCurrent: true,
    },
    {
      id: "sess-02",
      device: "iPhone 15 Pro - Safari",
      location: "San Francisco, CA",
      ip: "10.0.0.5",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
  ],
};

export const mockBilling: BillingDetails = {
  plan: "Enterprise AI",
  billingCycle: "annually",
  creditsUsed: 12500,
  creditsTotal: 25000,
  nextBillingDate: "2027-01-01",
  amountDue: 0,
  invoices: [
    {
      id: "INV-2026-001",
      date: "2026-01-01",
      amount: 12000,
      status: "paid",
      url: "#",
    },
    {
      id: "INV-2025-012",
      date: "2025-01-01",
      amount: 12000,
      status: "paid",
      url: "#",
    },
  ],
};

export const mockAudit: AuditSettings = {
  logRetentionDays: 90,
  privacyControls: {
    anonymizeCandidateData: false,
    shareUsageStats: true,
  },
};
