export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, Contract
  hiringManager: string;
  applicationsCount: number;
  openPositions: number;
  aiScore: number;
  status: "Published" | "Draft" | "Internal" | "Closed" | "On Hold";
  createdDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salaryRange: string;
}

export const mockJobs: Job[] = [
  {
    id: "j-001",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    hiringManager: "Jane Doe",
    applicationsCount: 145,
    openPositions: 2,
    aiScore: 92,
    status: "Published",
    createdDate: "Oct 12, 2023",
    salaryRange: "$160k - $210k",
    description: "We are looking for a Senior Frontend Engineer to lead the development of our next-generation hiring platform.",
    requirements: [
      "5+ years of experience with React and TypeScript.",
      "Experience with Next.js App Router.",
      "Deep understanding of web performance and accessibility."
    ],
    responsibilities: [
      "Architect and build scalable frontend applications.",
      "Collaborate with product and design teams.",
      "Mentor junior engineers and conduct code reviews."
    ],
    benefits: [
      "Comprehensive health insurance.",
      "401(k) matching.",
      "Unlimited PTO.",
      "Home office stipend."
    ]
  },
  {
    id: "j-002",
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "Full-time",
    hiringManager: "Sarah Connor",
    applicationsCount: 89,
    openPositions: 1,
    aiScore: 85,
    status: "Published",
    createdDate: "Oct 15, 2023",
    salaryRange: "$130k - $170k",
    description: "Drive go-to-market strategies and product positioning for our enterprise software suite.",
    requirements: [
      "4+ years in product marketing for B2B SaaS.",
      "Excellent written and verbal communication skills.",
      "Strong analytical and presentation skills."
    ],
    responsibilities: [
      "Develop messaging and positioning for new product launches.",
      "Create sales enablement materials.",
      "Conduct market and competitor research."
    ],
    benefits: [
      "Comprehensive health insurance.",
      "401(k) matching.",
      "Unlimited PTO.",
      "Quarterly team offsites."
    ]
  },
  {
    id: "j-003",
    title: "Data Scientist",
    department: "Data & AI",
    location: "Remote",
    type: "Full-time",
    hiringManager: "Alan Turing",
    applicationsCount: 210,
    openPositions: 1,
    aiScore: 88,
    status: "On Hold",
    createdDate: "Sep 28, 2023",
    salaryRange: "$150k - $190k",
    description: "Build predictive models and NLP systems to power our AI Copilot features.",
    requirements: [
      "M.S. or Ph.D. in Computer Science, Statistics, or related field.",
      "Strong proficiency in Python, PyTorch, and SQL.",
      "Experience deploying ML models to production."
    ],
    responsibilities: [
      "Develop and optimize recommendation algorithms.",
      "Analyze large datasets to extract actionable insights.",
      "Collaborate with engineering to deploy models."
    ],
    benefits: [
      "Comprehensive health insurance.",
      "401(k) matching.",
      "Unlimited PTO.",
      "Conference allowance."
    ]
  },
  {
    id: "j-004",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    hiringManager: "Jane Doe",
    applicationsCount: 54,
    openPositions: 1,
    aiScore: 75,
    status: "Draft",
    createdDate: "Oct 22, 2023",
    salaryRange: "$140k - $180k",
    description: "Manage and scale our cloud infrastructure using modern DevOps practices.",
    requirements: [
      "3+ years experience with AWS or GCP.",
      "Proficiency with Kubernetes and Terraform.",
      "Experience with CI/CD pipelines (GitHub Actions)."
    ],
    responsibilities: [
      "Maintain and improve cloud infrastructure.",
      "Implement security best practices.",
      "Monitor system performance and reliability."
    ],
    benefits: [
      "Comprehensive health insurance.",
      "401(k) matching.",
      "Unlimited PTO."
    ]
  },
  {
    id: "j-005",
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Chicago, IL",
    type: "Full-time",
    hiringManager: "Michael Scott",
    applicationsCount: 312,
    openPositions: 3,
    aiScore: 82,
    status: "Published",
    createdDate: "Oct 01, 2023",
    salaryRange: "$90k - $120k",
    description: "Ensure our enterprise clients achieve their hiring goals using our platform.",
    requirements: [
      "3+ years in customer success or account management.",
      "Experience with enterprise B2B clients.",
      "High emotional intelligence and empathy."
    ],
    responsibilities: [
      "Onboard new clients and conduct training.",
      "Conduct regular business reviews.",
      "Identify upsell and expansion opportunities."
    ],
    benefits: [
      "Comprehensive health insurance.",
      "401(k) matching.",
      "Unlimited PTO."
    ]
  }
];

export const mockJobActivityTimeline = [
  { id: 1, action: "Job Created", details: "Jane Doe drafted the job description.", time: "Oct 12, 2023 - 09:00 AM", type: "system" },
  { id: 2, action: "Job Published", details: "Published to Careers Page and LinkedIn.", time: "Oct 12, 2023 - 10:30 AM", type: "system" },
  { id: 3, action: "First Application", details: "Alex Turner applied.", time: "Oct 13, 2023 - 02:15 PM", type: "application" },
  { id: 4, action: "Interview Scheduled", details: "Technical Screening scheduled for Alex Turner.", time: "Oct 15, 2023 - 11:00 AM", type: "interview" },
  { id: 5, action: "Offer Sent", details: "Offer extended to Sarah Jenkins.", time: "Oct 20, 2023 - 04:30 PM", type: "offer" }
];

export const mockPipelineData = {
  columns: [
    { id: "applied", title: "Applied", count: 42 },
    { id: "screening", title: "Screening", count: 18 },
    { id: "interview", title: "Interview", count: 12 },
    { id: "assessment", title: "Assessment", count: 5 },
    { id: "offer", title: "Offer", count: 2 },
    { id: "hired", title: "Hired", count: 1 }
  ],
  candidates: [
    { id: "c-1", name: "Alex Turner", role: "Senior Frontend Engineer", stage: "interview", aiScore: 92, avatar: "", experience: "6 years" },
    { id: "c-2", name: "Maria Garcia", role: "Data Scientist", stage: "screening", aiScore: 88, avatar: "", experience: "4 years" },
    { id: "c-3", name: "David Chen", role: "Product Manager", stage: "assessment", aiScore: 95, avatar: "", experience: "5 years" },
    { id: "c-4", name: "Sarah Jenkins", role: "Backend Developer", stage: "offer", aiScore: 85, avatar: "", experience: "3 years" },
    { id: "c-5", name: "Emily Rodriguez", role: "UX Designer", stage: "applied", aiScore: 90, avatar: "", experience: "7 years" },
    { id: "c-7", name: "Linda Wang", role: "Full Stack Engineer", stage: "hired", aiScore: 98, avatar: "", experience: "5 years" }
  ]
};

export const mockAnalyticsData = {
  applicationsOverTime: [
    { name: "Week 1", applications: 45 },
    { name: "Week 2", applications: 82 },
    { name: "Week 3", applications: 120 },
    { name: "Week 4", applications: 145 }
  ],
  funnel: [
    { stage: "Applied", count: 145, color: "#3b82f6" },
    { stage: "Screening", count: 42, color: "#8b5cf6" },
    { stage: "Interview", count: 18, color: "#f59e0b" },
    { stage: "Offer", count: 4, color: "#10b981" }
  ],
  sources: [
    { name: "LinkedIn", value: 65, color: "#0077b5" },
    { name: "Careers Page", value: 45, color: "#10b981" },
    { name: "Referrals", value: 25, color: "#f59e0b" },
    { name: "Indeed", value: 10, color: "#3b82f6" }
  ]
};
