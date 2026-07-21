export interface ResumeAnalysis {
  id: string;
  candidateName: string;
  role: string;
  uploadDate: string;
  scores: {
    overall: number;
    ats: number;
    aiMatch: number;
    impact: number;
  };
  overview: {
    executiveSummary: string;
    keySkills: string[];
    strengths: string[];
    weaknesses: string[];
    hiringRecommendation: string;
  };
  parser: {
    personalInfo: {
      email: string;
      phone: string;
      location: string;
      linkedin: string;
    };
    experience: Array<{
      title: string;
      company: string;
      duration: string;
      highlights: string[];
    }>;
    education: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
  };
  atsBreakdown: {
    formatting: number;
    keywords: number;
    readability: number;
    contactInfo: number;
    achievements: number;
    recommendations: string[];
  };
  optimizer: {
    missingKeywords: string[];
    grammarSuggestions: Array<{
      original: string;
      suggestion: string;
      reason: string;
    }>;
    bulletImprovements: Array<{
      before: string;
      after: string;
      impact: string;
    }>;
  };
  jobMatches: Array<{
    id: string;
    company: string;
    role: string;
    location: string;
    salary: string;
    matchScore: number;
    skillGaps: string[];
  }>;
  history: Array<{
    date: string;
    score: number;
    version: string;
    action: string;
  }>;
  aiAssistant: {
    summary: string;
    topRecommendations: string[];
    warnings: string[];
    quickTips: string[];
    confidence: number;
  };
}

export const mockResumeAnalysis: ResumeAnalysis = {
  id: "res-001",
  candidateName: "Alex Turner",
  role: "Senior Frontend Engineer",
  uploadDate: "Oct 24, 2023",
  scores: {
    overall: 84,
    ats: 78,
    aiMatch: 92,
    impact: 85,
  },
  overview: {
    executiveSummary: "Alex Turner is a highly experienced Frontend Engineer with 7+ years of expertise in React, Next.js, and modern web architectures. Strong track record of improving performance and leading UI migrations. Demonstrates excellent product sense and mentoring capabilities.",
    keySkills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "Node.js", "System Design"],
    strengths: ["Strong modern frontend stack", "Proven performance optimization", "Leadership experience"],
    weaknesses: ["Limited backend/cloud infrastructure exposure", "Missing some CI/CD specifics"],
    hiringRecommendation: "Strong Hire for Senior Frontend roles. Proceed to technical screening focusing on system design."
  },
  parser: {
    personalInfo: {
      email: "alex.turner@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA (Remote)",
      linkedin: "linkedin.com/in/alexturner"
    },
    experience: [
      {
        title: "Senior Frontend Engineer",
        company: "TechCorp Inc.",
        duration: "2020 - Present",
        highlights: [
          "Led the migration from Create React App to Next.js, improving Core Web Vitals by 40%.",
          "Architected a new design system using Tailwind CSS and Radix UI.",
          "Mentored 3 junior engineers and established frontend testing standards."
        ]
      },
      {
        title: "Frontend Developer",
        company: "WebSolutions LLC",
        duration: "2017 - 2020",
        highlights: [
          "Developed responsive web applications for enterprise clients using React and Redux.",
          "Integrated RESTful APIs and improved state management.",
          "Reduced bundle size by 25% through code splitting and lazy loading."
        ]
      }
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "University of Technology",
        year: "2013 - 2017"
      }
    ]
  },
  atsBreakdown: {
    formatting: 85,
    keywords: 72,
    readability: 90,
    contactInfo: 100,
    achievements: 80,
    recommendations: [
      "Add more action verbs to the earlier experience section.",
      "Include 'State Management' explicitly as a keyword.",
      "Standardize date formats across all experience entries."
    ]
  },
  optimizer: {
    missingKeywords: ["State Management", "CI/CD", "Webpack", "A/B Testing"],
    grammarSuggestions: [
      {
        original: "Responsible for building UI components",
        suggestion: "Built and maintained highly reusable UI components",
        reason: "Active voice is more impactful than passive voice."
      }
    ],
    bulletImprovements: [
      {
        before: "Worked on improving website speed.",
        after: "Optimized website performance, increasing Lighthouse score by 35 points and reducing TTI by 2.1s.",
        impact: "High - Quantifies the achievement"
      }
    ]
  },
  jobMatches: [
    {
      id: "job-1",
      company: "HireMind AI",
      role: "Lead Frontend Engineer",
      location: "San Francisco, CA",
      salary: "$160k - $200k",
      matchScore: 92,
      skillGaps: ["WebRTC"]
    },
    {
      id: "job-2",
      company: "FinTech Startup",
      role: "Senior React Developer",
      location: "Remote",
      salary: "$150k - $180k",
      matchScore: 88,
      skillGaps: ["Financial Data Visualization"]
    },
    {
      id: "job-3",
      company: "E-commerce Giant",
      role: "Frontend Architect",
      location: "New York, NY",
      salary: "$180k - $220k",
      matchScore: 76,
      skillGaps: ["Micro-frontends", "A/B Testing Frameworks"]
    }
  ],
  history: [
    {
      date: "Oct 24, 2023",
      score: 84,
      version: "v2.1",
      action: "ATS Optimization Applied"
    },
    {
      date: "Oct 20, 2023",
      score: 72,
      version: "v1.0",
      action: "Initial Upload"
    }
  ],
  aiAssistant: {
    summary: "Alex's resume is well-structured and highlights relevant modern frontend skills. The Next.js migration experience is highly valuable.",
    topRecommendations: [
      "Quantify the impact in the WebSolutions role.",
      "Add missing keywords like 'CI/CD' if applicable."
    ],
    warnings: [
      "Missing context on testing frameworks used (Jest, Cypress, etc.)."
    ],
    quickTips: [
      "Move the Skills section above Education for Senior roles."
    ],
    confidence: 94
  }
};
