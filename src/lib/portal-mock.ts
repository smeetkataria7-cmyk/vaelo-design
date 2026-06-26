/** Demo data for the client portal (Marigold Miraya). */

export const portalClient = {
  name: "Marigold Miraya",
  initial: "M",
  accent: "#e76f51",
};

export const portalAiStatus =
  "This week: 4 new creatives delivered, 2 already approved. Your June reel quota is now full. The summer ad campaign is live and performing at 2.8× ROAS.";

export const pendingApprovals = [
  { id: "d1", title: "Summer Lookbook · Post 1", version: 2, grad: ["#e76f51", "#a8442c"] },
  { id: "d2", title: "Festive Reel · Cut B", version: 1, grad: ["#f4a261", "#c97b35"] },
  { id: "d3", title: "Story Set · Drop 03", version: 2, grad: ["#264653", "#13242b"] },
];

export const portalUsage = [
  { label: "Posts", used: 18, limit: 20 },
  { label: "Reels", used: 5, limit: 5 },
];

export const portalInvoice = {
  number: "INV-047",
  memo: "June Retainer",
  due: "Jun 15",
  lineItems: [
    { name: "Instagram management — June", amount: 30000 },
    { name: "Reels production (5)", amount: 10000 },
    { name: "Ad campaign management", amount: 5000 },
  ],
  subtotal: 45000,
  gstRate: 0.18,
};

export const approvalComment = {
  author: "Alex Vaelo",
  text: "Updated the headline contrast and warmed the tone per your last note. Ready for your sign-off.",
  at: "2h ago",
};

export const vaultItems = [
  { id: "v1", title: "Spring Campaign", type: "Photo set", grad: ["#e76f51", "#a8442c"] },
  { id: "v2", title: "Brand Reel 01", type: "Video", grad: ["#f4a261", "#c97b35"] },
  { id: "v3", title: "Logo Pack", type: "Brand", grad: ["#264653", "#13242b"] },
  { id: "v4", title: "Product Shots", type: "Photo set", grad: ["#9b59b6", "#5e3470"] },
  { id: "v5", title: "May Report", type: "Report", grad: ["#2a9d8f", "#176055"] },
  { id: "v6", title: "Festive Stories", type: "Photo set", grad: ["#3b82f6", "#1d4ed8"] },
];
