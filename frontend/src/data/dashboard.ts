export const mockDashboardData = {
  kpis: {
    openJobs: { value: 24, change: 12, trend: "up" },
    candidates: { value: 1248, change: 8, trend: "up" },
    applications: { value: 342, change: -2, trend: "down" },
    interviewsToday: { value: 12, change: 20, trend: "up" },
    offersSent: { value: 8, change: 14, trend: "up" },
    avgHireTime: { value: "18 days", change: -5, trend: "up" } // negative days is good (up trend)
  },
  funnel: [
    { stage: "Applied", count: 850, color: "bg-zinc-200 dark:bg-zinc-700" },
    { stage: "Screening", count: 420, color: "bg-blue-200 dark:bg-blue-900" },
    { stage: "Interview", count: 180, color: "bg-blue-400 dark:bg-blue-700" },
    { stage: "Assessment", count: 65, color: "bg-blue-600 dark:bg-blue-500" },
    { stage: "Offer", count: 24, color: "bg-green-400 dark:bg-green-600" },
    { stage: "Hired", count: 18, color: "bg-green-600 dark:bg-green-500" }
  ],
  chartData: [
    { name: "Jan", applications: 400, hires: 24 },
    { name: "Feb", applications: 300, hires: 18 },
    { name: "Mar", applications: 550, hires: 32 },
    { name: "Apr", applications: 450, hires: 28 },
    { name: "May", applications: 600, hires: 42 },
    { name: "Jun", applications: 750, hires: 48 },
  ],
  upcomingInterviews: [
    { id: 1, candidate: "Sarah Jenkins", role: "Senior Frontend Engineer", time: "10:00 AM", interviewer: "David Lee", status: "Confirmed" },
    { id: 2, candidate: "Michael Chen", role: "Product Manager", time: "11:30 AM", interviewer: "Jessica Park", status: "Pending" },
    { id: 3, candidate: "Emily Rodriguez", role: "UX Designer", time: "2:00 PM", interviewer: "Sam Wilson", status: "Confirmed" },
    { id: 4, candidate: "James Smith", role: "Backend Developer", time: "4:00 PM", interviewer: "David Lee", status: "Rescheduled" }
  ],
  recentApplications: [
    { id: 101, candidate: "Alex Turner", role: "Senior Frontend Engineer", applied: "2 hours ago", score: 92, status: "New" },
    { id: 102, candidate: "Maria Garcia", role: "Data Scientist", applied: "4 hours ago", score: 88, status: "Screening" },
    { id: 103, candidate: "John Doe", role: "DevOps Engineer", applied: "5 hours ago", score: 75, status: "Rejected" },
    { id: 104, candidate: "Linda Wang", role: "Product Manager", applied: "1 day ago", score: 95, status: "Interview" },
    { id: 105, candidate: "Robert Fox", role: "UX Designer", applied: "1 day ago", score: 82, status: "New" }
  ],
  aiInsights: [
    { id: 1, title: "Resume quality increased 18%", description: "Candidates from LinkedIn are matching job descriptions significantly better this week.", confidence: 95, action: "Review Sources" },
    { id: 2, title: "Backend Engineer pipeline is slowing", description: "Application volume dropped 20% compared to last week. Consider increasing ad spend.", confidence: 88, action: "Boost Job" },
    { id: 3, title: "Top candidate identified", description: "Linda Wang is a 95% match for Product Manager with strong product strategy skills.", confidence: 98, action: "Review Profile" },
    { id: 4, title: "Interview success rate improved", description: "Standardized technical assessments have increased offer acceptance by 12%.", confidence: 92, action: "View Metrics" }
  ],
  recentActivity: [
    { id: 1, action: "Candidate Applied", details: "Alex Turner applied for Senior Frontend Engineer", time: "2 hours ago", type: "application" },
    { id: 2, action: "Resume Analyzed", details: "AI matched Linda Wang at 95% for Product Manager", time: "4 hours ago", type: "ai" },
    { id: 3, action: "Interview Scheduled", details: "Technical interview set for Sarah Jenkins with David Lee", time: "5 hours ago", type: "interview" },
    { id: 4, action: "Offer Accepted", details: "Tom Hardy accepted the Data Engineer offer", time: "1 day ago", type: "offer" }
  ]
};
