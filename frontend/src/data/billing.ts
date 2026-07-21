export const mockCurrentSubscription = {
  planName: "Growth",
  status: "Active",
  billingCycle: "Monthly",
  monthlyPrice: 199,
  renewalDate: "2026-08-15T00:00:00Z",
  teamMembers: 12,
  paymentMethod: "Visa ending in 4242",
  nextInvoiceEstimated: 199,
};

export const mockUsageSummary = {
  teamMembers: { current: 12, limit: 15 },
  activeJobs: { current: 24, limit: 50 },
  candidatesProcessed: { current: 3450, limit: 10000 },
  storage: { current: 14.5, limit: 50, unit: "GB" },
};

export const mockAICredits = {
  total: 5000,
  used: 3450,
  resetDate: "2026-08-01T00:00:00Z",
  breakdown: [
    { name: "Resume Intelligence", used: 1200 },
    { name: "Voice Interviews", used: 1800 },
    { name: "GitHub Analysis", used: 300 },
    { name: "AI Copilot", used: 150 },
  ],
};

export const mockPlans = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for exploring the platform and hiring your first team members.",
    price: { monthly: 0, annual: 0 },
    features: [
      "Up to 2 team members",
      "5 active jobs",
      "Basic ATS features",
      "100 AI credits/mo",
    ],
    limits: {
      teamMembers: 2,
      aiCredits: 100,
      storage: "1 GB",
    },
    recommended: false,
  },
  {
    id: "starter",
    name: "Starter",
    description: "For small teams starting to scale their hiring processes.",
    price: { monthly: 49, annual: 39 },
    features: [
      "Up to 5 team members",
      "15 active jobs",
      "Advanced ATS features",
      "1,000 AI credits/mo",
      "Email support"
    ],
    limits: {
      teamMembers: 5,
      aiCredits: 1000,
      storage: "10 GB",
    },
    recommended: false,
  },
  {
    id: "growth",
    name: "Growth",
    description: "The ideal plan for growing organizations with continuous hiring needs.",
    price: { monthly: 199, annual: 159 },
    features: [
      "Up to 15 team members",
      "50 active jobs",
      "Custom hiring workflows",
      "5,000 AI credits/mo",
      "Voice Interview limits: 20hrs",
      "Priority support"
    ],
    limits: {
      teamMembers: 15,
      aiCredits: 5000,
      storage: "50 GB",
    },
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Advanced controls, unlimited scale, and dedicated account management.",
    price: { monthly: 499, annual: 399 },
    features: [
      "Unlimited team members",
      "Unlimited active jobs",
      "Custom integrations & API",
      "Unlimited AI credits",
      "Custom Voice Interview models",
      "Dedicated Customer Success"
    ],
    limits: {
      teamMembers: "Unlimited",
      aiCredits: "Unlimited",
      storage: "Unlimited",
    },
    recommended: false,
  }
];

export const mockInvoices = [
  {
    id: "INV-2026-07-01",
    date: "2026-07-15T00:00:00Z",
    plan: "Growth",
    amount: 199,
    status: "Paid",
    paymentMethod: "Visa •••• 4242",
    downloadUrl: "#",
    lineItems: [
      { description: "Growth Plan (Monthly)", amount: 199 }
    ]
  },
  {
    id: "INV-2026-06-01",
    date: "2026-06-15T00:00:00Z",
    plan: "Growth",
    amount: 199,
    status: "Paid",
    paymentMethod: "Visa •••• 4242",
    downloadUrl: "#",
    lineItems: [
      { description: "Growth Plan (Monthly)", amount: 199 }
    ]
  },
  {
    id: "INV-2026-05-01",
    date: "2026-05-15T00:00:00Z",
    plan: "Starter",
    amount: 49,
    status: "Paid",
    paymentMethod: "Visa •••• 4242",
    downloadUrl: "#",
    lineItems: [
      { description: "Starter Plan (Monthly)", amount: 49 }
    ]
  }
];

export const mockPaymentMethods = [
  {
    id: "pm_1",
    type: "Visa",
    last4: "4242",
    expiry: "12/28",
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "Mastercard",
    last4: "5555",
    expiry: "09/27",
    isDefault: false,
  }
];

// Historical usage data for Recharts (Usage Dashboard)
export const mockUsageTrends = [
  { month: "Jan", candidates: 400, aiCredits: 1200 },
  { month: "Feb", candidates: 450, aiCredits: 1500 },
  { month: "Mar", candidates: 800, aiCredits: 2100 },
  { month: "Apr", candidates: 650, aiCredits: 1800 },
  { month: "May", candidates: 1200, aiCredits: 3400 },
  { month: "Jun", candidates: 1500, aiCredits: 4200 },
];
