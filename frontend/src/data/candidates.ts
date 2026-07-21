export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  currentRole: string;
  experience: string;
  avatarUrl?: string;
  status: "New" | "Screening" | "Interview" | "Assessment" | "Offer" | "Hired" | "Rejected";
  aiScore: number;
  appliedJob: string;
  recruiter: string;
  lastUpdated: string;
  skills: string[];
  education: string;
  summary: string;
  githubUsername?: string;
}

export const mockCandidates: Candidate[] = [
  {
    id: "c-001",
    name: "Alex Turner",
    email: "alex.turner@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    currentRole: "Senior Frontend Engineer at TechCorp",
    experience: "6 years",
    status: "New",
    aiScore: 92,
    appliedJob: "Senior Frontend Engineer",
    recruiter: "Jane Doe",
    lastUpdated: "2 hours ago",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    education: "B.S. Computer Science, UC Berkeley",
    summary: "Experienced frontend engineer with a focus on performance and accessibility. Led migration of legacy monolith to Next.js micro-frontends.",
    githubUsername: "alexturnerdev",
  },
  {
    id: "c-002",
    name: "Maria Garcia",
    email: "m.garcia@example.com",
    phone: "+1 (555) 987-6543",
    location: "Austin, TX (Remote)",
    currentRole: "Data Scientist at Analytica",
    experience: "4 years",
    status: "Screening",
    aiScore: 88,
    appliedJob: "Data Scientist",
    recruiter: "John Smith",
    lastUpdated: "4 hours ago",
    skills: ["Python", "PyTorch", "SQL", "Machine Learning", "Data Visualization"],
    education: "M.S. Data Science, UT Austin",
    summary: "Data scientist specializing in predictive modeling and natural language processing. Built recommendation engines serving 1M+ users.",
    githubUsername: "mgarciadata",
  },
  {
    id: "c-003",
    name: "David Chen",
    email: "david.c@example.com",
    phone: "+1 (555) 456-7890",
    location: "New York, NY",
    currentRole: "Product Manager at StartupX",
    experience: "5 years",
    status: "Interview",
    aiScore: 95,
    appliedJob: "Senior Product Manager",
    recruiter: "Jane Doe",
    lastUpdated: "1 day ago",
    skills: ["Product Strategy", "Agile", "User Research", "Wireframing", "Jira"],
    education: "MBA, NYU Stern",
    summary: "Product manager with a track record of launching successful SaaS products. Strong technical background combined with business acumen.",
  },
  {
    id: "c-004",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    location: "Seattle, WA",
    currentRole: "Backend Developer at CloudSys",
    experience: "3 years",
    status: "Offer",
    aiScore: 85,
    appliedJob: "Backend Developer",
    recruiter: "Mike Johnson",
    lastUpdated: "3 days ago",
    skills: ["Node.js", "PostgreSQL", "AWS", "Docker", "REST APIs"],
    education: "B.S. Software Engineering, University of Washington",
    summary: "Backend developer focused on building scalable APIs and microservices. Strong advocate for test-driven development.",
    githubUsername: "sjenkinsbackend",
  },
  {
    id: "c-005",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    currentRole: "UX Designer at DesignHub",
    experience: "7 years",
    status: "Assessment",
    aiScore: 90,
    appliedJob: "Lead UX Designer",
    recruiter: "Jane Doe",
    lastUpdated: "2 days ago",
    skills: ["Figma", "User Testing", "Prototyping", "Design Systems", "UI Design"],
    education: "B.F.A. Graphic Design, RISD",
    summary: "Lead UX designer passionate about creating intuitive and inclusive user experiences. Created comprehensive design systems for enterprise clients.",
  },
  {
    id: "c-006",
    name: "James Wilson",
    email: "j.wilson@example.com",
    phone: "+1 (555) 678-9012",
    location: "Boston, MA",
    currentRole: "DevOps Engineer at ScaleIt",
    experience: "8 years",
    status: "Rejected",
    aiScore: 72,
    appliedJob: "DevOps Engineer",
    recruiter: "John Smith",
    lastUpdated: "1 week ago",
    skills: ["Kubernetes", "Terraform", "CI/CD", "Linux", "Ansible"],
    education: "B.S. Information Technology, Boston University",
    summary: "DevOps engineer with extensive experience in cloud infrastructure automation and container orchestration.",
    githubUsername: "jwilsonops",
  },
  {
    id: "c-007",
    name: "Linda Wang",
    email: "l.wang@example.com",
    phone: "+1 (555) 789-0123",
    location: "San Jose, CA",
    currentRole: "Full Stack Engineer at WebCorp",
    experience: "5 years",
    status: "Hired",
    aiScore: 98,
    appliedJob: "Senior Full Stack Engineer",
    recruiter: "Mike Johnson",
    lastUpdated: "2 weeks ago",
    skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    education: "M.S. Computer Science, Stanford University",
    summary: "Full stack engineer proficient in the MERN stack. Loves building end-to-end solutions and optimizing application performance.",
    githubUsername: "lindawangdev",
  },
  {
    id: "c-008",
    name: "Robert Fox",
    email: "rfox@example.com",
    phone: "+1 (555) 890-1234",
    location: "Denver, CO",
    currentRole: "Marketing Specialist",
    experience: "2 years",
    status: "New",
    aiScore: 65,
    appliedJob: "Marketing Manager",
    recruiter: "Sarah Connor",
    lastUpdated: "1 hour ago",
    skills: ["SEO", "Content Creation", "Social Media", "Google Analytics"],
    education: "B.A. Marketing, CU Boulder",
    summary: "Creative marketing specialist with experience in growing social media presence and driving organic traffic.",
  },
];

export const mockAiAnalysis = {
  atsScore: 92,
  confidence: 95,
  executiveSummary: "Alex Turner is a highly qualified candidate for the Senior Frontend Engineer role. His deep expertise in React and Next.js perfectly aligns with the job requirements. He has demonstrated leadership in migrating legacy systems, which is a key responsibility for this position.",
  strengths: [
    "Extensive experience with React, TypeScript, and Next.js (6 years).",
    "Proven track record of leading large-scale architectural migrations.",
    "Strong focus on web performance and accessibility standards."
  ],
  weaknesses: [
    "Limited experience with Vue.js or Angular, though not strictly required.",
    "Has not managed a team larger than 3 developers."
  ],
  recommendations: [
    "Probe on specific challenges faced during the Next.js migration.",
    "Assess interest in mentoring junior developers.",
    "Evaluate cultural fit regarding fast-paced, iterative delivery."
  ],
  hiringRecommendation: "Strong Yes. Proceed immediately to technical interview."
};

export const mockActivityTimeline = [
  { id: 1, action: "Candidate Applied", details: "Applied via LinkedIn for Senior Frontend Engineer", time: "Oct 24, 2023 - 09:30 AM", type: "application" },
  { id: 2, action: "Resume Parsed", details: "AI successfully extracted skills and experience", time: "Oct 24, 2023 - 09:32 AM", type: "system" },
  { id: 3, action: "AI Analysis Complete", details: "Generated match score of 92%", time: "Oct 24, 2023 - 09:35 AM", type: "ai" },
  { id: 4, action: "Status Updated", details: "Jane Doe moved candidate to Screening", time: "Oct 25, 2023 - 11:15 AM", type: "status" },
  { id: 5, action: "Interview Scheduled", details: "Technical Screening scheduled for Oct 28", time: "Oct 26, 2023 - 02:00 PM", type: "interview" },
];

export const mockNotes = [
  { id: 1, author: "Jane Doe", content: "Strong candidate. Mentioned they are actively looking and have one other offer on the table. We need to move fast.", timestamp: "Oct 25, 2023 - 11:20 AM", isPinned: true },
  { id: 2, author: "Tech Interviewer (System)", content: "Technical screening completed. Passed all React concepts. Code quality was excellent.", timestamp: "Oct 28, 2023 - 04:00 PM", isPinned: false },
];
