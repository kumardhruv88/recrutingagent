export const mockOrganization = {
  id: "org_1",
  name: "Acme Corp",
  industry: "Technology",
  plan: "Enterprise",
  memberCount: 42,
  logo: "https://i.pravatar.cc/150?u=acmecorp",
  website: "https://acmecorp.com",
  address: "123 Innovation Way, Tech City, TC 12345",
  timezone: "America/Los_Angeles",
};

export const mockMembers = [
  {
    id: "usr_1",
    name: "John Doe",
    email: "john@acmecorp.com",
    role: "Admin",
    status: "Active",
    lastActive: "Just now",
    avatar: "https://i.pravatar.cc/150?u=john",
    department: "Engineering"
  },
  {
    id: "usr_2",
    name: "Jane Smith",
    email: "jane@acmecorp.com",
    role: "Hiring Manager",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "https://i.pravatar.cc/150?u=jane",
    department: "Product"
  },
  {
    id: "usr_3",
    name: "Mike Johnson",
    email: "mike@acmecorp.com",
    role: "Recruiter",
    status: "Offline",
    lastActive: "1 day ago",
    avatar: "https://i.pravatar.cc/150?u=mike",
    department: "HR"
  },
  {
    id: "usr_4",
    name: "Emily Davis",
    email: "emily@acmecorp.com",
    role: "Interviewer",
    status: "Active",
    lastActive: "5 mins ago",
    avatar: "https://i.pravatar.cc/150?u=emily",
    department: "Design"
  }
];

export const mockInvitations = [
  {
    id: "inv_1",
    email: "sarah@acmecorp.com",
    role: "Recruiter",
    status: "Pending",
    sentAt: "2026-07-20T10:00:00Z",
    sentBy: "John Doe"
  },
  {
    id: "inv_2",
    email: "david@acmecorp.com",
    role: "Interviewer",
    status: "Expired",
    sentAt: "2026-07-10T10:00:00Z",
    sentBy: "Jane Smith"
  }
];

export const mockTeams = [
  {
    id: "team_1",
    name: "Frontend Core",
    description: "Core UI and component library development",
    memberCount: 8,
    lead: "Jane Smith"
  },
  {
    id: "team_2",
    name: "Recruiting Ops",
    description: "Sourcing and initial screening team",
    memberCount: 5,
    lead: "Mike Johnson"
  },
  {
    id: "team_3",
    name: "Product Design",
    description: "UX/UI design and research",
    memberCount: 4,
    lead: "Emily Davis"
  }
];

export const mockDepartments = [
  {
    id: "dept_1",
    name: "Engineering",
    memberCount: 45,
    openPositions: 12,
    headCount: 60
  },
  {
    id: "dept_2",
    name: "Human Resources",
    memberCount: 15,
    openPositions: 2,
    headCount: 20
  },
  {
    id: "dept_3",
    name: "Product",
    memberCount: 25,
    openPositions: 5,
    headCount: 30
  }
];

export const mockUsageData = [
  { name: "Jan", credits: 4000, storage: 2400, interviews: 240 },
  { name: "Feb", credits: 3000, storage: 1398, interviews: 2210 },
  { name: "Mar", credits: 2000, storage: 9800, interviews: 2290 },
  { name: "Apr", credits: 2780, storage: 3908, interviews: 2000 },
  { name: "May", credits: 1890, storage: 4800, interviews: 2181 },
  { name: "Jun", credits: 2390, storage: 3800, interviews: 2500 },
  { name: "Jul", credits: 3490, storage: 4300, interviews: 2100 },
];
