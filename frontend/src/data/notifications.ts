export type NotificationCategory = "Mentions" | "AI" | "System" | "Candidates" | "Interviews" | "Jobs";
export type NotificationStatus = "Unread" | "Read";

export interface NotificationAction {
  label: string;
  url?: string;
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string; // ISO date string preferred, but we can use relative strings for simplicity
  category: NotificationCategory;
  status: NotificationStatus;
  isPinned: boolean;
  actor: {
    name: string;
    avatarUrl?: string;
    initials?: string;
  };
  entity?: {
    id: string;
    name: string;
    type: "Job" | "Candidate" | "Interview" | "System" | "AI";
  };
  actions?: NotificationAction[];
}

const generateMockNotifications = (): NotificationItem[] => {
  
  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&auto=format&fit=crop"
  ];

  const firstNames = ["Sarah", "Alex", "Jordan", "Taylor", "Casey", "HireMind AI", "System Admin"];
  
  const templates = [
    { cat: "Mentions", title: "Mentioned you in a note", desc: "Hey, take a look at this candidate's recent project. Looks like a great fit." },
    { cat: "AI", title: "Resume Analysis Completed", desc: "The batch analysis for 'Senior Frontend Engineer' is complete. Found 4 strong matches." },
    { cat: "AI", title: "Candidate Ranking Updated", desc: "AI ranking updated for Product Designer. Jordan Lee moved up 3 spots." },
    { cat: "System", title: "Weekly Report Ready", desc: "Your weekly hiring analytics report is ready to view." },
    { cat: "Candidates", title: "New Application", desc: "Sam Wilson applied for DevOps Engineer." },
    { cat: "Candidates", title: "Offer Accepted", desc: "Taylor Smith has accepted the offer for Backend Developer." },
    { cat: "Interviews", title: "Interview Scheduled", desc: "Final round interview scheduled with Alex Rivera." },
    { cat: "Interviews", title: "Interview Feedback Submitted", desc: "Technical feedback submitted for Jordan Lee. Score: Strong Hire." },
    { cat: "Jobs", title: "Job Post Expiring", desc: "The job post for 'Product Manager' expires in 3 days." },
    { cat: "Mentions", title: "Replied to your comment", desc: "I agree, we should fast-track them to the technical round." }
  ];

  const items: NotificationItem[] = [];
  let currentDate = new Date();

  for (let i = 1; i <= 50; i++) {
    const template = templates[i % templates.length];
    const isUnread = i <= 8; // First 8 are unread
    const isPinned = i === 2 || i === 5;
    const avatarIndex = i % avatars.length;
    const actorName = firstNames[i % firstNames.length];
    
    // Decrement time slightly for chronological order
    currentDate = new Date(currentDate.getTime() - Math.floor(Math.random() * 10000000));
    
    let actions: NotificationAction[] | undefined = undefined;
    
    if (template.cat === "Mentions") {
      actions = [{ label: "Reply", variant: "default" }];
    } else if (template.cat === "Candidates") {
      actions = [{ label: "View Profile", variant: "outline" }];
    } else if (template.cat === "AI") {
      actions = [{ label: "View Insights", variant: "secondary" }];
    }

    items.push({
      id: `notif-${i}`,
      title: template.title,
      description: template.desc,
      timestamp: currentDate.toISOString(),
      category: template.cat as NotificationCategory,
      status: isUnread ? "Unread" : "Read",
      isPinned,
      actor: {
        name: actorName,
        avatarUrl: actorName !== "HireMind AI" && actorName !== "System Admin" ? avatars[avatarIndex] : undefined,
        initials: actorName.substring(0, 2).toUpperCase()
      },
      entity: {
        id: `entity-${i}`,
        name: template.cat === "Jobs" ? "Product Manager" : "Alex Rivera",
        type: template.cat === "Jobs" ? "Job" : "Candidate"
      },
      actions
    });
  }

  return items;
};

export const mockNotifications = generateMockNotifications();
