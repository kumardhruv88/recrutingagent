export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  organizationId: string;
  module: "Authentication" | "Organization" | "RBAC" | "Jobs" | "Candidates" | "Interviews" | "Billing" | "Settings" | "AI";
  action: string;
  target: string;
  severity: "info" | "warning" | "critical";
  status: "success" | "failed";
  ipAddress: string;
  metadata?: {
    before?: Record<string, unknown>;
    after?: Record<string, unknown>;
    requestId?: string;
    userAgent?: string;
    location?: string;
  };
}

export const mockAuditMetrics = {
  totalEvents: 14592,
  criticalEvents: 24,
  failedActions: 183,
  securityAlerts: 3,
  weeklyTrend: +12.5, // percentage
};

const generateMockEvents = (): AuditEvent[] => {
  const events: AuditEvent[] = [];
  const modules = ["Authentication", "Organization", "RBAC", "Jobs", "Candidates", "Interviews", "Billing", "Settings", "AI"] as const;
  const actions = ["created", "updated", "deleted", "viewed", "exported", "failed_login", "role_changed", "analyzed"];
  const severities = ["info", "info", "info", "info", "warning", "critical"] as const;
  const statuses = ["success", "success", "success", "success", "failed"] as const;
  
  const now = new Date();
  
  for (let i = 0; i < 200; i++) {
    const timestamp = new Date(now.getTime() - i * Math.random() * 3600000 * 2).toISOString(); // Spread over a few days
    
    events.push({
      id: `evt_${Math.random().toString(36).substring(2, 11)}`,
      timestamp,
      actor: {
        id: `usr_${Math.floor(Math.random() * 100)}`,
        name: i % 3 === 0 ? "Dhruv Kumar" : i % 3 === 1 ? "Alice Smith" : "Bob Johnson",
        email: i % 3 === 0 ? "dhruv@hiremind.ai" : i % 3 === 1 ? "alice@hiremind.ai" : "bob@hiremind.ai",
      },
      organizationId: "org_1",
      module: modules[Math.floor(Math.random() * modules.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      target: `Resource_${Math.floor(Math.random() * 1000)}`,
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      metadata: {
        requestId: `req_${Math.random().toString(36).substring(2, 11)}`,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        location: "San Francisco, CA",
        before: { status: "pending" },
        after: { status: "completed" }
      }
    });
  }
  
  // Inject some specific critical security events
  events[2].module = "Authentication";
  events[2].action = "failed_login";
  events[2].severity = "critical";
  events[2].status = "failed";
  events[2].target = "admin@hiremind.ai";
  
  events[15].module = "RBAC";
  events[15].action = "role_changed";
  events[15].severity = "warning";
  events[15].target = "Alice Smith (User -> Admin)";
  
  events[42].module = "Organization";
  events[42].action = "api_key_generated";
  events[42].severity = "warning";
  events[42].target = "Production API Key";
  
  return events;
};

export const mockAuditEvents = generateMockEvents();

export const mockActivityTimelineData = [
  { date: 'Mon', events: 120 },
  { date: 'Tue', events: 150 },
  { date: 'Wed', events: 180 },
  { date: 'Thu', events: 90 },
  { date: 'Fri', events: 210 },
  { date: 'Sat', events: 50 },
  { date: 'Sun', events: 40 },
];
