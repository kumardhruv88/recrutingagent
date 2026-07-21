export interface Integration {
  id: string;
  name: string;
  description: string;
  category: "Communication" | "Storage" | "Authentication" | "AI" | "ATS" | "Productivity";
  status: "connected" | "disconnected";
  icon: string;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  environment: "Live" | "Test";
  created: string;
  lastUsed: string | null;
  status: "active" | "disabled";
}

export interface Webhook {
  id: string;
  endpoint: string;
  events: string[];
  status: "active" | "disabled" | "failing";
  secret: string;
  created: string;
  lastDelivery: string | null;
}

export interface DeliveryLog {
  id: string;
  webhookId: string;
  endpoint: string;
  event: string;
  status: number;
  latency: number;
  attempts: number;
  timestamp: string;
  payload: {
    request: {
      headers: Record<string, string>;
      body: Record<string, unknown>;
    };
    response: {
      headers: Record<string, string>;
      body: Record<string, unknown>;
    };
  };
}

export const mockIntegrations: Integration[] = [
  { id: "int_1", name: "Slack", description: "Send interview notifications to channels.", category: "Communication", status: "connected", icon: "Hash" },
  { id: "int_2", name: "Google Calendar", description: "Sync interview schedules bi-directionally.", category: "Productivity", status: "connected", icon: "Calendar" },
  { id: "int_3", name: "OpenAI", description: "Power Resume AI and Copilot.", category: "AI", status: "connected", icon: "Sparkles" },
  { id: "int_4", name: "Linear", description: "Create issues from candidate feedback.", category: "Productivity", status: "disconnected", icon: "List" },
  { id: "int_5", name: "GitHub", description: "Analyze candidate code repositories.", category: "Productivity", status: "connected", icon: "Github" },
  { id: "int_6", name: "Workday", description: "Sync employee data automatically.", category: "ATS", status: "disconnected", icon: "Briefcase" },
];

export const mockAPIKeys: APIKey[] = [
  { id: "key_live_1", name: "Production App", key: "hm_live_8f92********************3a1c", environment: "Live", created: "2026-03-15T10:00:00Z", lastUsed: "2026-07-21T09:12:00Z", status: "active" },
  { id: "key_test_1", name: "Local Development", key: "hm_test_1b4d********************9f2e", environment: "Test", created: "2026-05-20T14:30:00Z", lastUsed: "2026-07-21T08:45:00Z", status: "active" },
  { id: "key_live_2", name: "Legacy Integration", key: "hm_live_7c3a********************8b2d", environment: "Live", created: "2025-11-10T09:00:00Z", lastUsed: "2026-01-15T10:00:00Z", status: "disabled" },
];

export const mockWebhooks: Webhook[] = [
  { id: "wh_1", endpoint: "https://api.acme.com/webhooks/hiremind", events: ["candidate.created", "candidate.updated"], status: "active", secret: "whsec_8f92********************3a1c", created: "2026-04-10T11:00:00Z", lastDelivery: "2026-07-21T08:30:00Z" },
  { id: "wh_2", endpoint: "https://hooks.slack.com/services/T000/B000/XXX", events: ["interview.scheduled", "interview.completed"], status: "active", secret: "whsec_1b4d********************9f2e", created: "2026-05-15T13:45:00Z", lastDelivery: "2026-07-21T09:15:00Z" },
  { id: "wh_3", endpoint: "https://internal-tools.acme.corp/sync", events: ["job.published", "job.closed"], status: "failing", secret: "whsec_7c3a********************8b2d", created: "2026-06-01T09:30:00Z", lastDelivery: "2026-07-20T14:20:00Z" },
];

export const mockDeliveryLogs: DeliveryLog[] = [
  {
    id: "del_1",
    webhookId: "wh_1",
    endpoint: "https://api.acme.com/webhooks/hiremind",
    event: "candidate.created",
    status: 200,
    latency: 142,
    attempts: 1,
    timestamp: "2026-07-21T08:30:00Z",
    payload: {
      request: {
        headers: { "Content-Type": "application/json", "HireMind-Signature": "t=1784530200,v1=5257a8..." },
        body: { id: "can_123", email: "alice@example.com", name: "Alice Smith" }
      },
      response: {
        headers: { "Content-Type": "application/json" },
        body: { success: true, received: true }
      }
    }
  },
  {
    id: "del_2",
    webhookId: "wh_3",
    endpoint: "https://internal-tools.acme.corp/sync",
    event: "job.published",
    status: 502,
    latency: 5042,
    attempts: 3,
    timestamp: "2026-07-20T14:20:00Z",
    payload: {
      request: {
        headers: { "Content-Type": "application/json", "HireMind-Signature": "t=1784458800,v1=982b1c..." },
        body: { id: "job_456", title: "Senior Engineer", department: "Engineering" }
      },
      response: {
        headers: { "Content-Type": "text/html" },
        body: { error: "Bad Gateway" }
      }
    }
  },
  {
    id: "del_3",
    webhookId: "wh_2",
    endpoint: "https://hooks.slack.com/services/T000/B000/XXX",
    event: "interview.scheduled",
    status: 200,
    latency: 89,
    attempts: 1,
    timestamp: "2026-07-21T09:15:00Z",
    payload: {
      request: {
        headers: { "Content-Type": "application/json", "HireMind-Signature": "t=1784532900,v1=3c4d5e..." },
        body: { id: "int_789", candidate: "Bob Jones", date: "2026-07-25T10:00:00Z" }
      },
      response: {
        headers: { "Content-Type": "text/plain" },
        body: { ok: true }
      }
    }
  }
];

export const mockDeveloperMetrics = {
  activeWebhooks: 2,
  failingWebhooks: 1,
  totalApiRequests24h: 12450,
  errorRate: 0.05,
};
