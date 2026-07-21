export type InterviewStatus = "upcoming" | "active" | "completed";

export interface InterviewTemplate {
  id: string;
  title: string;
  description: string;
  durationMins: number;
  questionCount: number;
  icon: string;
}

export interface InterviewSession {
  id: string;
  candidateName: string;
  candidateRole: string;
  candidateAvatar?: string;
  scheduledTime: string;
  durationMins: number;
  status: InterviewStatus;
  templateId: string;
  aiRating?: number;
}

export interface TranscriptMessage {
  id: string;
  speaker: "ai" | "candidate";
  text: string;
  timestamp: string;
  isComplete: boolean;
}

export interface InterviewReviewData {
  sessionId: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  scores: {
    communication: number;
    technical: number;
    confidence: number;
    overall: number;
  };
  recommendation: "Strong Hire" | "Hire" | "Consider" | "No Hire";
}

export const mockTemplates: InterviewTemplate[] = [
  {
    id: "tpl-frontend",
    title: "Frontend Developer",
    description: "Focuses on React, modern CSS, web performance, and system design.",
    durationMins: 45,
    questionCount: 8,
    icon: "Layout"
  },
  {
    id: "tpl-backend",
    title: "Backend Developer",
    description: "Evaluates API design, database modeling, and distributed systems.",
    durationMins: 45,
    questionCount: 8,
    icon: "Database"
  },
  {
    id: "tpl-ml",
    title: "ML Engineer",
    description: "Covers model deployment, training pipelines, and data engineering.",
    durationMins: 60,
    questionCount: 10,
    icon: "BrainCircuit"
  },
  {
    id: "tpl-custom",
    title: "Custom Template",
    description: "Create a tailored interview from scratch using custom knowledge bases.",
    durationMins: 30,
    questionCount: 5,
    icon: "Settings"
  }
];

export const mockSessions: InterviewSession[] = [
  {
    id: "session-1",
    candidateName: "Sarah Jenkins",
    candidateRole: "Senior Frontend Engineer",
    scheduledTime: "Today, 2:00 PM",
    durationMins: 45,
    status: "active",
    templateId: "tpl-frontend"
  },
  {
    id: "session-2",
    candidateName: "Michael Chen",
    candidateRole: "Backend Developer",
    scheduledTime: "Yesterday, 11:30 AM",
    durationMins: 45,
    status: "completed",
    templateId: "tpl-backend",
    aiRating: 92
  },
  {
    id: "session-3",
    candidateName: "Elena Rodriguez",
    candidateRole: "ML Engineer",
    scheduledTime: "Tomorrow, 10:00 AM",
    durationMins: 60,
    status: "upcoming",
    templateId: "tpl-ml"
  },
  {
    id: "session-4",
    candidateName: "James Wilson",
    candidateRole: "Frontend Developer",
    scheduledTime: "Oct 18, 4:00 PM",
    durationMins: 45,
    status: "completed",
    templateId: "tpl-frontend",
    aiRating: 78
  }
];

export const mockActiveTranscript: TranscriptMessage[] = [
  {
    id: "msg-1",
    speaker: "ai",
    text: "Hello Sarah, welcome to your interview for the Senior Frontend Engineer position at HireMind. I'm Alex, the AI interviewer. Are you ready to begin?",
    timestamp: "00:00",
    isComplete: true
  },
  {
    id: "msg-2",
    speaker: "candidate",
    text: "Hi Alex. Yes, I'm ready.",
    timestamp: "00:15",
    isComplete: true
  },
  {
    id: "msg-3",
    speaker: "ai",
    text: "Great. Let's start with your experience. I see you recently led a migration to Next.js at your previous company. Can you walk me through the primary technical challenges you faced during that transition?",
    timestamp: "00:20",
    isComplete: true
  },
  {
    id: "msg-4",
    speaker: "candidate",
    text: "Sure. The biggest challenge was migrating our custom client-side routing to the App Router while maintaining our complex global state in Redux. We had to rethink how we fetched data, moving a lot of logic to React Server Components to improve our core web vitals.",
    timestamp: "00:35",
    isComplete: true
  },
  {
    id: "msg-5",
    speaker: "ai",
    text: "That makes sense. Server Components require a shift in mental models regarding state. How did you handle authenticated state that needed to be accessed both on the server and the client?",
    timestamp: "01:05",
    isComplete: false
  }
];

export const mockReviewData: Record<string, InterviewReviewData> = {
  "session-2": {
    sessionId: "session-2",
    summary: "Michael demonstrated exceptional knowledge of backend systems. He clearly articulated complex architectural decisions, particularly around database sharding and caching strategies. His communication was clear, concise, and highly professional.",
    strengths: [
      "Deep understanding of PostgreSQL performance tuning.",
      "Clear articulation of system design principles.",
      "Strong emphasis on observability and monitoring."
    ],
    weaknesses: [
      "Slightly hesitant when discussing container orchestration edge cases.",
      "Could improve on estimating infrastructure costs."
    ],
    scores: {
      communication: 95,
      technical: 90,
      confidence: 88,
      overall: 92
    },
    recommendation: "Strong Hire"
  },
  "session-4": {
    sessionId: "session-4",
    summary: "James showed a solid foundation in React and modern JavaScript. However, he struggled with some of the more advanced questions regarding browser rendering pipelines and memory leak debugging.",
    strengths: [
      "Good working knowledge of React Hooks.",
      "Enthusiastic and eager to learn.",
      "Strong CSS fundamentals."
    ],
    weaknesses: [
      "Struggled with advanced performance optimization concepts.",
      "Lacked experience in setting up CI/CD pipelines."
    ],
    scores: {
      communication: 85,
      technical: 72,
      confidence: 75,
      overall: 78
    },
    recommendation: "Consider"
  }
};
