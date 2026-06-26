/**
 * Demo data for the Vaelo Agency OS UI.
 * Mirrors the design canvas so every screen renders without a live database.
 * Swap these reads for Prisma/Supabase queries when the DB is wired (Task 7).
 */

export type ClientKey =
  | "dvoc"
  | "zerolys"
  | "marigold"
  | "arcivox"
  | "lumina";

export const CLIENT_ACCENT: Record<ClientKey, string> = {
  dvoc: "#c8331f",
  zerolys: "#2a9d8f",
  marigold: "#e76f51",
  arcivox: "#9b59b6",
  lumina: "#3b82f6",
};

// ----------------------------- Owner -----------------------------

export const OWNER = {
  name: "Alex Vaelo",
  role: "Owner",
  initial: "A",
};

// ----------------------------- Clients -----------------------------

export interface Client {
  key: ClientKey;
  name: string;
  initial: string;
  category: string;
  accent: string;
  creatives: number;
  caseStudies: number;
  active?: boolean;
  monthly?: number;
}

export const clients: Client[] = [
  {
    key: "dvoc",
    name: "DVOC Institute",
    initial: "D",
    category: "Ed-Tech",
    accent: CLIENT_ACCENT.dvoc,
    creatives: 12,
    caseStudies: 1,
    active: true,
    monthly: 60000,
  },
  {
    key: "zerolys",
    name: "Zerolys",
    initial: "Z",
    category: "Sustainability",
    accent: CLIENT_ACCENT.zerolys,
    creatives: 8,
    caseStudies: 2,
    monthly: 40000,
  },
  {
    key: "marigold",
    name: "Marigold Miraya",
    initial: "M",
    category: "Fashion & Beauty",
    accent: CLIENT_ACCENT.marigold,
    creatives: 24,
    caseStudies: 1,
    active: true,
    monthly: 48000,
  },
  {
    key: "arcivox",
    name: "Arcivox Studios",
    initial: "A",
    category: "Music Production",
    accent: CLIENT_ACCENT.arcivox,
    creatives: 6,
    caseStudies: 0,
    monthly: 30000,
  },
  {
    key: "lumina",
    name: "Lumina Labs",
    initial: "L",
    category: "SaaS · Tech",
    accent: CLIENT_ACCENT.lumina,
    creatives: 15,
    caseStudies: 2,
    monthly: 35000,
  },
];

export const clientByKey = (k: ClientKey) =>
  clients.find((c) => c.key === k)!;

// ----------------------------- Dashboard -----------------------------

export const dashboardMetrics = [
  { label: "Active Clients", value: 5, trend: "+2 this month", tone: "success" as const },
  { label: "Total Assets", value: 342, trend: "+18 this week", tone: "success" as const },
  { label: "Creatives / Month", value: 47, trend: "+12 vs last month", tone: "success" as const },
  { label: "Case Studies", value: 5, trend: "3 published · 2 draft", tone: "neutral" as const },
];

export const recentCreatives = [
  { id: 1, grad: ["#c8331f", "#7a1d12"], duration: "0:42" },
  { id: 2, grad: ["#2a9d8f", "#176055"], duration: "1:15" },
  { id: 3, grad: ["#e76f51", "#a8442c"], duration: "2:34" },
  { id: 4, grad: ["#9b59b6", "#5e3470"], duration: "0:58" },
  { id: 5, grad: ["#3b82f6", "#1d4ed8"], duration: "1:48" },
  { id: 6, grad: ["#2a9d8f", "#0f4f45"], duration: "3:07" },
  { id: 7, grad: ["#c8331f", "#5e150c"], duration: "0:31" },
];

export const creativeOutput = [
  { day: "Jun 19", uploads: 8 },
  { day: "Jun 20", uploads: 12 },
  { day: "Jun 21", uploads: 9 },
  { day: "Jun 22", uploads: 15 },
  { day: "Jun 23", uploads: 10 },
  { day: "Jun 24", uploads: 12 },
  { day: "Jun 25", uploads: 9 },
];

export const activityFeed = [
  { id: 1, kind: "success" as const, text: "DVOC study **published**", time: "2h ago" },
  { id: 2, kind: "info" as const, text: "**42 assets** uploaded · Marigold", time: "3d ago" },
  { id: 3, kind: "neutral" as const, text: "Sarah **invited** John", time: "3d ago" },
  { id: 4, kind: "error" as const, text: "Upload **failed** · Lumina", time: "5d ago" },
];

// ----------------------------- Case studies -----------------------------

export type CaseStudyStatus = "published" | "draft" | "archived";

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  accent: string;
  status: CaseStudyStatus;
  updated: string;
  category?: string;
  subtitle?: string;
  results?: { label: string; value: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-1",
    title: "360° Lead Gen Overhaul",
    clientName: "DVOC Institute",
    accent: CLIENT_ACCENT.dvoc,
    status: "published",
    updated: "2 days ago",
    category: "Lead Generation",
    subtitle:
      "How we built a full-funnel lead generation system for a leading ed-tech platform.",
    results: [
      { label: "Lead volume", value: "4.2×" },
      { label: "Lower CPA", value: "68%" },
      { label: "To results", value: "90d" },
    ],
  },
  {
    id: "cs-2",
    title: "Regenerative Packaging Campaign",
    clientName: "Zerolys",
    accent: CLIENT_ACCENT.zerolys,
    status: "published",
    updated: "5 days ago",
    category: "Brand Campaign",
  },
  {
    id: "cs-3",
    title: "Luxury Rebrand Campaign",
    clientName: "Marigold Miraya",
    accent: CLIENT_ACCENT.marigold,
    status: "draft",
    updated: "1 hour ago",
    category: "Rebrand",
  },
  {
    id: "cs-4",
    title: "SaaS Growth Playbook",
    clientName: "Lumina Labs",
    accent: CLIENT_ACCENT.lumina,
    status: "published",
    updated: "1 week ago",
    category: "Growth",
  },
  {
    id: "cs-5",
    title: "Sound Identity Rebrand",
    clientName: "Arcivox Studios",
    accent: CLIENT_ACCENT.arcivox,
    status: "draft",
    updated: "2 weeks ago",
    category: "Brand Identity",
  },
  {
    id: "cs-6",
    title: "Q4 Consulting Impact",
    clientName: "Thornfeld & Co.",
    accent: "#6b7280",
    status: "archived",
    updated: "3 months ago",
    category: "Consulting",
  },
];

// ----------------------------- CRM / Leads -----------------------------

export type LeadStatus = "new" | "contacted" | "proposal" | "won" | "lost";

export interface Lead {
  id: string;
  brand: string;
  handle: string;
  industry: string;
  service?: string;
  status: LeadStatus;
  meta?: string; // date/source line
  note?: string;
  monthly?: number;
}

export const leads: Lead[] = [
  { id: "l1", brand: "Brew & Bloom", handle: "@brewbloomco", industry: "F&B", service: "AI photoshoots", status: "new", meta: "Jun 24 · DM" },
  { id: "l2", brand: "Neon Nomad", handle: "@neonnomad", industry: "Travel", service: "Insta mgmt", status: "new", meta: "Jun 22 · Website" },
  { id: "l3", brand: "Spice Route", handle: "@spiceroute", industry: "Food", note: "AI sample sent", status: "contacted", meta: "Follow-up: Jun 28" },
  { id: "l4", brand: "The Salt Room", handle: "@saltroom", industry: "Restaurant", note: "Viewed 3×", status: "proposal", monthly: 45000 },
  { id: "l5", brand: "DVOC Institute", handle: "@dvoc.institute", industry: "Ed-Tech", note: "Active client", status: "won", monthly: 60000 },
  { id: "l6", brand: "Marigold Miraya", handle: "@marigoldmiraaya", industry: "Fashion", note: "Active client", status: "won", monthly: 48000 },
  { id: "l7", brand: "Vibe Studios", handle: "@vibestudios", industry: "Media", note: "Budget mismatch", status: "lost", meta: "May 12" },
];

export const LEAD_COLUMNS: { key: LeadStatus; label: string; tone: string }[] = [
  { key: "new", label: "New", tone: "var(--muted)" },
  { key: "contacted", label: "Contacted", tone: "var(--info)" },
  { key: "proposal", label: "Proposal", tone: "var(--warning)" },
  { key: "won", label: "Won", tone: "var(--success)" },
  { key: "lost", label: "Lost", tone: "var(--error)" },
];

// ----------------------------- Proposals -----------------------------

export type ProposalStatus = "draft" | "sent" | "viewed" | "accepted" | "declined";

export interface Proposal {
  id: string;
  title: string;
  clientName: string;
  monthly: number;
  status: ProposalStatus;
  sent?: string;
  views?: number;
}

export const proposals: Proposal[] = [
  { id: "p1", title: "DVOC Retainer Package", clientName: "DVOC Institute", monthly: 60000, status: "accepted", sent: "Apr 3", views: 4 },
  { id: "p2", title: "Marigold Miraya — Full Service", clientName: "Marigold Miraya", monthly: 48000, status: "accepted", sent: "Mar 18", views: 7 },
  { id: "p3", title: "The Salt Room — Starter", clientName: "The Salt Room", monthly: 35000, status: "viewed", sent: "Jun 20", views: 3 },
  { id: "p4", title: "Spice Route — Growth Pack", clientName: "Spice Route", monthly: 28000, status: "draft" },
];

export const proposalPipeline = [
  { label: "Draft", value: 1, tone: "neutral" as const },
  { label: "Sent", value: 1, tone: "warning" as const },
  { label: "Viewed", value: 1, tone: "info" as const },
  { label: "Accepted", value: 2, tone: "success" as const },
  { label: "Declined", value: 0, tone: "error" as const },
];

// ----------------------------- Invoicing -----------------------------

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "void";
export type InvoiceType = "Retainer" | "One-off";

export interface Invoice {
  id: string;
  number: string;
  clientName: string;
  memo: string;
  total: number;
  due?: string;
  dueNote?: string;
  status: InvoiceStatus;
  type: InvoiceType;
}

export const invoiceStats = {
  outstanding: { amount: 124000, note: "3 invoices pending" },
  overdue: { amount: 48000, note: "1 invoice · 8 days late" },
  paidThisMonth: { amount: 216000, note: "4 invoices" },
  retainers: { count: 5, note: "Active recurring · Jul 1" },
};

export const invoices: Invoice[] = [
  { id: "i1", number: "INV-047", clientName: "Marigold Miraya", memo: "Jun Retainer", total: 56640, due: "Jun 15", dueNote: "8d late", status: "overdue", type: "Retainer" },
  { id: "i2", number: "INV-046", clientName: "DVOC Institute", memo: "Jun Retainer", total: 70800, due: "Jun 30", status: "sent", type: "Retainer" },
  { id: "i3", number: "INV-045", clientName: "Lumina Labs", memo: "Ads + Reels Pack", total: 23600, due: "Jun 25", status: "paid", type: "One-off" },
  { id: "i4", number: "INV-044", clientName: "Zerolys", memo: "May Retainer", total: 47200, due: "May 31", status: "paid", type: "Retainer" },
  { id: "i5", number: "INV-043", clientName: "Spice Route", memo: "Onboarding setup", total: 11800, status: "draft", type: "One-off" },
];

// ----------------------------- Projects -----------------------------

export type ProjectStatus = "active" | "at_risk" | "onboarding";

export interface Milestone {
  label: string;
  date?: string;
  state: "done" | "current" | "pending" | "alert";
}

export interface Project {
  id: string;
  clientName: string;
  accent: string;
  service: string;
  status: ProjectStatus;
  ai: { kind: "status" | "alert"; text: string };
  milestones: Milestone[];
  health?: { score: number; band: "healthy" | "at_risk" };
  monthly: number;
  onboardingStep?: { current: number; total: number };
}

export const projects: Project[] = [
  {
    id: "pr1",
    clientName: "DVOC Institute",
    accent: CLIENT_ACCENT.dvoc,
    service: "Instagram + Paid Ads",
    status: "active",
    ai: {
      kind: "status",
      text: "12 creatives delivered, 8 approved, 2 in review. Reel limit reached — upsell opportunity flagged.",
    },
    milestones: [
      { label: "Onboarding complete", date: "Apr 5", state: "done" },
      { label: "Month 1 creatives delivered", date: "May 1", state: "done" },
      { label: "Month 3 campaign review", date: "Jul 1", state: "current" },
    ],
    health: { score: 94, band: "healthy" },
    monthly: 60000,
  },
  {
    id: "pr2",
    clientName: "Marigold Miraya",
    accent: CLIENT_ACCENT.marigold,
    service: "Full Service",
    status: "at_risk",
    ai: {
      kind: "alert",
      text: "Invoice INV-047 overdue 8 days. 3 creatives awaiting client approval. Payment delay may indicate churn risk.",
    },
    milestones: [
      { label: "Brand Brain populated", date: "Mar 20", state: "done" },
      { label: "Invoice overdue — follow up", date: "Jun 15", state: "alert" },
    ],
    health: { score: 62, band: "at_risk" },
    monthly: 48000,
  },
  {
    id: "pr3",
    clientName: "Zerolys",
    accent: CLIENT_ACCENT.zerolys,
    service: "Content + Ads",
    status: "active",
    ai: {
      kind: "status",
      text: "8 posts delivered, all approved. Ad campaign performing at 3.2× ROAS. On track for milestone.",
    },
    milestones: [],
    health: { score: 88, band: "healthy" },
    monthly: 40000,
  },
  {
    id: "pr4",
    clientName: "Spice Route",
    accent: "#b06f3c",
    service: "Starter Package",
    status: "onboarding",
    ai: {
      kind: "status",
      text: "Proposal accepted Jun 24 — auto-onboarding triggered. Portal invite sent, brand form pending completion.",
    },
    milestones: [
      { label: "Portal invite sent", state: "done" },
      { label: "Brand onboarding form — awaiting", state: "pending" },
    ],
    monthly: 28000,
    onboardingStep: { current: 2, total: 4 },
  },
];

// ----------------------------- Retainers -----------------------------

export interface RetainerLine {
  label: string;
  used: number;
  limit: number;
}

export interface Retainer {
  id: string;
  clientName: string;
  accent: string;
  cycle: string;
  monthly: number;
  band: "healthy" | "at_risk";
  lines: RetainerLine[];
  upsell?: { label: string; cta: string };
  note?: string;
}

export const retainers: Retainer[] = [
  {
    id: "r1",
    clientName: "DVOC Institute",
    accent: CLIENT_ACCENT.dvoc,
    cycle: "Jun 1 – Jun 30",
    monthly: 60000,
    band: "healthy",
    lines: [
      { label: "Posts", used: 18, limit: 20 },
      { label: "Reels", used: 5, limit: 5 },
      { label: "Ad Campaigns", used: 1, limit: 2 },
    ],
    upsell: { label: "Limit reached", cta: "Create upsell invoice" },
    note: "2 remaining this cycle",
  },
  {
    id: "r2",
    clientName: "Marigold Miraya",
    accent: CLIENT_ACCENT.marigold,
    cycle: "Jun 1 – Jun 30",
    monthly: 48000,
    band: "at_risk",
    lines: [
      { label: "Posts", used: 24, limit: 20 },
      { label: "Reels", used: 5, limit: 5 },
      { label: "Ad Campaigns", used: 2, limit: 2 },
    ],
    upsell: { label: "4 posts over limit", cta: "Invoice ₹8,000" },
  },
  {
    id: "r3",
    clientName: "Zerolys",
    accent: CLIENT_ACCENT.zerolys,
    cycle: "Jun 1 – Jun 30",
    monthly: 40000,
    band: "healthy",
    lines: [
      { label: "Posts", used: 8, limit: 16 },
      { label: "Reels", used: 2, limit: 4 },
      { label: "Ad Campaigns", used: 1, limit: 1 },
    ],
  },
  {
    id: "r4",
    clientName: "Lumina Labs",
    accent: CLIENT_ACCENT.lumina,
    cycle: "Jun 1 – Jun 30",
    monthly: 35000,
    band: "healthy",
    lines: [
      { label: "Posts", used: 12, limit: 20 },
      { label: "Reels", used: 1, limit: 3 },
    ],
  },
];

// ----------------------------- Brand Brain -----------------------------

export interface BrandBrain {
  key: ClientKey;
  clientName: string;
  accent: string;
  updated: string;
  colors: string[];
  fonts: string;
  tone: string;
  toneTags: { label: string; negative?: boolean }[];
  audience: string;
  positioning: string;
  usps: string;
  styleRefs: { grad: [string, string]; approved?: boolean }[];
  rules: { always: string[]; never: string[] };
}

export const brandBrains: BrandBrain[] = [
  {
    key: "dvoc",
    clientName: "DVOC Institute",
    accent: CLIENT_ACCENT.dvoc,
    updated: "2 days ago",
    colors: ["#c8331f", "#1e2a4a", "#f4f3ee", "#d4af37"],
    fonts: "Playfair Display · DM Sans",
    tone: "Authoritative yet approachable. Academic credibility without jargon. Inspire confidence in career-changers.",
    toneTags: [
      { label: "empowering" },
      { label: "aspirational" },
      { label: "credible" },
      { label: "never: salesy", negative: true },
    ],
    audience: "Working professionals 24–38 seeking upskilling in digital marketing",
    positioning: "Premium ed-tech with job placement guarantee",
    usps: "Live projects, industry mentors, 94% placement rate",
    styleRefs: [
      { grad: ["#c8331f", "#7a1d12"], approved: true },
      { grad: ["#1e2a4a", "#0d1426"], approved: true },
      { grad: ["#c8331f", "#e76f51"], approved: true },
      { grad: ["#2d2d2d", "#1a1a1a"] },
    ],
    rules: {
      always: [
        "Red + dark navy contrast",
        "Placement rate stats",
        "Student success stories",
        "Professional settings",
      ],
      never: [
        "Generic stock photos",
        "Discount language",
        "Competitor names",
        "Casual/slang tone",
      ],
    },
  },
  {
    key: "marigold",
    clientName: "Marigold Miraya",
    accent: CLIENT_ACCENT.marigold,
    updated: "1 day ago",
    colors: ["#e76f51", "#f4a261", "#264653", "#f4f3ee"],
    fonts: "Cormorant · Inter",
    tone: "Warm, luxurious, and aspirational. Speaks to refined taste without pretension.",
    toneTags: [{ label: "elegant" }, { label: "warm" }, { label: "never: cheap" , negative: true }],
    audience: "Urban women 25–45 with premium fashion sensibilities",
    positioning: "Accessible luxury, handcrafted fashion",
    usps: "Limited drops, ethically sourced, signature palette",
    styleRefs: [
      { grad: ["#e76f51", "#a8442c"], approved: true },
      { grad: ["#f4a261", "#c97b35"], approved: true },
      { grad: ["#264653", "#13242b"] },
      { grad: ["#1a1a1a", "#2d2d2d"] },
    ],
    rules: {
      always: ["Warm earthy palette", "Editorial photography", "Craftsmanship details"],
      never: ["Discount framing", "Fast-fashion language", "Cluttered layouts"],
    },
  },
  {
    key: "zerolys",
    clientName: "Zerolys",
    accent: CLIENT_ACCENT.zerolys,
    updated: "4 days ago",
    colors: ["#2a9d8f", "#264653", "#e9c46a", "#f4f3ee"],
    fonts: "Sora · Inter",
    tone: "Confident, science-led sustainability. Optimistic, never preachy.",
    toneTags: [{ label: "credible" }, { label: "optimistic" }, { label: "never: greenwashing", negative: true }],
    audience: "Eco-conscious brands & procurement leads",
    positioning: "Regenerative packaging that performs",
    usps: "Carbon-negative materials, drop-in compatible, certified",
    styleRefs: [
      { grad: ["#2a9d8f", "#176055"], approved: true },
      { grad: ["#e9c46a", "#b8923a"], approved: true },
      { grad: ["#264653", "#13242b"] },
      { grad: ["#1a1a1a", "#2d2d2d"] },
    ],
    rules: {
      always: ["Data-backed claims", "Natural textures", "Certification marks"],
      never: ["Vague eco-claims", "Stock leaves imagery", "Overpromising"],
    },
  },
  {
    key: "lumina",
    clientName: "Lumina Labs",
    accent: CLIENT_ACCENT.lumina,
    updated: "6 days ago",
    colors: ["#3b82f6", "#1d4ed8", "#0f172a", "#f4f3ee"],
    fonts: "Geist · Inter",
    tone: "Sharp, technical, and confident. Speaks to builders.",
    toneTags: [{ label: "technical" }, { label: "direct" }, { label: "never: fluffy", negative: true }],
    audience: "Engineering & product leaders at B2B SaaS",
    positioning: "Developer-first analytics platform",
    usps: "Sub-second queries, self-serve, transparent pricing",
    styleRefs: [
      { grad: ["#3b82f6", "#1d4ed8"], approved: true },
      { grad: ["#0f172a", "#020617"], approved: true },
      { grad: ["#1a1a1a", "#2d2d2d"] },
      { grad: ["#2d2d2d", "#1a1a1a"] },
    ],
    rules: {
      always: ["Product screenshots", "Concrete benchmarks", "Code samples"],
      never: ["Buzzwords", "Stock business imagery", "Vague claims"],
    },
  },
  {
    key: "arcivox",
    clientName: "Arcivox Studios",
    accent: CLIENT_ACCENT.arcivox,
    updated: "2 weeks ago",
    colors: ["#9b59b6", "#5e3470", "#1a1a1a", "#f4f3ee"],
    fonts: "Clash Display · Inter",
    tone: "Bold, sonic, and cinematic. Made for artists.",
    toneTags: [{ label: "bold" }, { label: "cinematic" }, { label: "never: corporate", negative: true }],
    audience: "Independent artists & labels",
    positioning: "Premium sound identity studio",
    usps: "Signature sonic branding, mastering, motion",
    styleRefs: [
      { grad: ["#9b59b6", "#5e3470"], approved: true },
      { grad: ["#1a1a1a", "#2d2d2d"] },
      { grad: ["#2d2d2d", "#1a1a1a"] },
      { grad: ["#5e3470", "#2a1733"] },
    ],
    rules: {
      always: ["High-contrast visuals", "Motion-first", "Waveform motifs"],
      never: ["Corporate stock", "Flat lighting", "Generic typography"],
    },
  },
];

// ----------------------------- Integrations -----------------------------

export type IntegrationStatus = "connected" | "pending" | "disconnected";

export interface Integration {
  key: string;
  name: string;
  desc: string;
  status: IntegrationStatus;
  note: string;
  iconBg: string;
}

export const integrations: Integration[] = [
  { key: "razorpay", name: "Razorpay", desc: "Payments · UPI · Subscriptions · INR", status: "connected", note: "KYC verified ✓", iconBg: "#3395ff" },
  { key: "whatsapp", name: "WhatsApp", desc: "Meta Cloud API · Client notifications", status: "connected", note: "3 templates approved", iconBg: "#25d366" },
  { key: "claude", name: "Claude API", desc: "AI proposals · Status updates · Brand Brain", status: "connected", note: "claude-opus-4", iconBg: "#d97757" },
  { key: "resend", name: "Resend", desc: "Transactional email · Reminders · Invites", status: "connected", note: "DNS verified ✓", iconBg: "#1a1a1a" },
  { key: "meta", name: "Meta Graph + Marketing API", desc: "Instagram insights · Ad performance reports", status: "pending", note: "App review: 14d est.", iconBg: "#1877f2" },
  { key: "fal", name: "Fal.ai", desc: "AI image generation · Creative drafts", status: "disconnected", note: "Connect", iconBg: "#7c3aed" },
];
