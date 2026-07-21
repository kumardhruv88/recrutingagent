export const mockUsers = [
  {
    id: "usr_1",
    name: "John Doe",
    email: "john@acmecorp.com",
    role: "Admin",
    department: "Engineering",
    status: "Active",
    lastActive: "Just now",
    avatar: "https://i.pravatar.cc/150?u=john",
  },
  {
    id: "usr_2",
    name: "Jane Smith",
    email: "jane@acmecorp.com",
    role: "Recruiter",
    department: "HR",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "https://i.pravatar.cc/150?u=jane",
  },
  {
    id: "usr_3",
    name: "Mike Johnson",
    email: "mike@acmecorp.com",
    role: "Hiring Manager",
    department: "Product",
    status: "Offline",
    lastActive: "1 day ago",
    avatar: "https://i.pravatar.cc/150?u=mike",
  },
  {
    id: "usr_4",
    name: "Emily Davis",
    email: "emily@acmecorp.com",
    role: "Interviewer",
    department: "Design",
    status: "Active",
    lastActive: "5 mins ago",
    avatar: "https://i.pravatar.cc/150?u=emily",
  }
];

export const mockRoles = [
  {
    id: "role_admin",
    name: "Admin",
    description: "Full access to all settings, users, and billing.",
    type: "System",
    memberCount: 2,
  },
  {
    id: "role_recruiter",
    name: "Recruiter",
    description: "Can manage jobs, candidates, and pipelines.",
    type: "System",
    memberCount: 15,
  },
  {
    id: "role_hiring_manager",
    name: "Hiring Manager",
    description: "Can view candidates and manage interviews for assigned jobs.",
    type: "System",
    memberCount: 24,
  },
  {
    id: "role_interviewer",
    name: "Interviewer",
    description: "Can view assigned candidate profiles and submit scorecards.",
    type: "System",
    memberCount: 142,
  },
  {
    id: "role_contractor",
    name: "External Sourcer",
    description: "Can only add candidates to the sourcing stage.",
    type: "Custom",
    memberCount: 5,
  },
];

export const mockPermissionGroups = [
  {
    name: "Candidates",
    permissions: [
      { id: "cand_view", name: "View Profiles", description: "View candidate details and resumes" },
      { id: "cand_create", name: "Add Candidates", description: "Manually add or upload new candidates" },
      { id: "cand_edit", name: "Edit Details", description: "Update candidate contact info and stages" },
      { id: "cand_delete", name: "Delete Candidates", description: "Permanently remove a candidate" },
    ]
  },
  {
    name: "Jobs",
    permissions: [
      { id: "jobs_view", name: "View Jobs", description: "View job postings" },
      { id: "jobs_create", name: "Create Jobs", description: "Draft and publish new jobs" },
      { id: "jobs_edit", name: "Edit Jobs", description: "Update job descriptions and settings" },
      { id: "jobs_delete", name: "Close Jobs", description: "Archive or close active jobs" },
    ]
  },
  {
    name: "Interviews",
    permissions: [
      { id: "int_view", name: "View Schedule", description: "See the interview calendar" },
      { id: "int_schedule", name: "Schedule", description: "Book new interviews" },
      { id: "int_score", name: "Submit Scorecards", description: "Fill out interview feedback" },
    ]
  },
  {
    name: "Organization",
    permissions: [
      { id: "org_users", name: "Manage Users", description: "Invite and remove members" },
      { id: "org_roles", name: "Manage Roles", description: "Create and edit RBAC roles" },
      { id: "org_billing", name: "Billing", description: "View invoices and manage plan" },
    ]
  }
];

export const mockAuditEvents = [
  {
    id: "evt_1",
    action: "Role Assigned",
    target: "Emily Davis",
    details: "Assigned role 'Interviewer'",
    actor: "John Doe",
    timestamp: "2026-07-21T09:30:00Z"
  },
  {
    id: "evt_2",
    action: "Permission Changed",
    target: "Role: External Sourcer",
    details: "Added 'Add Candidates' permission",
    actor: "Jane Smith",
    timestamp: "2026-07-20T14:15:00Z"
  },
  {
    id: "evt_3",
    action: "Member Removed",
    target: "david@acmecorp.com",
    details: "Removed from workspace",
    actor: "John Doe",
    timestamp: "2026-07-19T11:00:00Z"
  },
  {
    id: "evt_4",
    action: "Role Created",
    target: "External Sourcer",
    details: "Created new custom role",
    actor: "John Doe",
    timestamp: "2026-07-18T16:45:00Z"
  }
];
