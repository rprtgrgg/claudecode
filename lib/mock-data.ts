// ─── Contacts & Leads ────────────────────────────────────────────────────────

export const contactsOverview = {
  total: 4_821,
  newThisMonth: 312,
  newLastMonth: 278,
  unsubscribed: 94,
}

export const leadSourceData = [
  { source: 'Organic Search', value: 1_240 },
  { source: 'Paid Ads', value: 980 },
  { source: 'Referral', value: 720 },
  { source: 'Social Media', value: 610 },
  { source: 'Email Campaign', value: 480 },
  { source: 'Direct', value: 791 },
]

export const contactGrowth = [
  { month: 'Oct', contacts: 3_810 },
  { month: 'Nov', contacts: 3_994 },
  { month: 'Dec', contacts: 4_120 },
  { month: 'Jan', contacts: 4_287 },
  { month: 'Feb', contacts: 4_509 },
  { month: 'Mar', contacts: 4_821 },
]

export const recentContacts = [
  { id: 'c1', name: 'Sarah Johnson', email: 'sarah@example.com', source: 'Paid Ads', stage: 'New Lead', date: '2026-03-28' },
  { id: 'c2', name: 'James Carter', email: 'james@example.com', source: 'Organic Search', stage: 'Qualified', date: '2026-03-27' },
  { id: 'c3', name: 'Mei Lin', email: 'mei@example.com', source: 'Referral', stage: 'Proposal', date: '2026-03-27' },
  { id: 'c4', name: 'Ravi Patel', email: 'ravi@example.com', source: 'Social Media', stage: 'New Lead', date: '2026-03-26' },
  { id: 'c5', name: 'Ana Torres', email: 'ana@example.com', source: 'Email Campaign', stage: 'Closed Won', date: '2026-03-25' },
]

// ─── Opportunities / Pipeline ─────────────────────────────────────────────────

export const opportunitiesOverview = {
  total: 248,
  totalValue: 1_420_500,
  closedWon: 62,
  closedWonValue: 487_200,
  closedLost: 34,
  conversionRate: 64.6,
}

export const pipelineStages = [
  { stage: 'New Lead', count: 74, value: 320_000 },
  { stage: 'Qualified', count: 52, value: 280_000 },
  { stage: 'Proposal', count: 38, value: 210_000 },
  { stage: 'Negotiation', count: 22, value: 123_300 },
  { stage: 'Closed Won', count: 62, value: 487_200 },
]

export const wonLostTrend = [
  { month: 'Oct', won: 8, lost: 4 },
  { month: 'Nov', won: 11, lost: 5 },
  { month: 'Dec', won: 9, lost: 6 },
  { month: 'Jan', won: 13, lost: 4 },
  { month: 'Feb', won: 10, lost: 3 },
  { month: 'Mar', won: 11, lost: 5 },
]

export const topOpportunities = [
  { id: 'o1', name: 'Enterprise SaaS Package', contact: 'James Carter', value: 42_000, stage: 'Negotiation', probability: 80 },
  { id: 'o2', name: 'Marketing Automation Suite', contact: 'Mei Lin', value: 28_500, stage: 'Proposal', probability: 60 },
  { id: 'o3', name: 'CRM Onboarding Bundle', contact: 'Sarah Johnson', value: 19_200, stage: 'Qualified', probability: 45 },
  { id: 'o4', name: 'Growth Accelerator Program', contact: 'Ana Torres', value: 34_000, stage: 'Closed Won', probability: 100 },
  { id: 'o5', name: 'Starter Campaign Pack', contact: 'Ravi Patel', value: 7_800, stage: 'New Lead', probability: 20 },
]

// ─── Campaigns & Marketing ────────────────────────────────────────────────────

export const campaignOverview = {
  activeCampaigns: 9,
  emailsSent: 48_320,
  smsSent: 12_840,
  avgOpenRate: 34.8,
  avgClickRate: 7.2,
  avgConversionRate: 2.4,
}

export const campaignPerformance = [
  { name: 'Spring Promo Email', type: 'Email', sent: 8_400, opens: 3_108, clicks: 672, conversions: 210 },
  { name: 'Retargeting SMS Blast', type: 'SMS', sent: 3_200, opens: 2_880, clicks: 480, conversions: 96 },
  { name: 'Onboarding Drip (Wk1)', type: 'Email', sent: 5_100, opens: 1_836, clicks: 408, conversions: 138 },
  { name: 'Upsell Sequence', type: 'Email', sent: 2_700, opens: 1_080, clicks: 189, conversions: 54 },
  { name: 'Re-engagement SMS', type: 'SMS', sent: 1_840, opens: 1_472, clicks: 221, conversions: 44 },
]

export const emailTrend = [
  { month: 'Oct', sent: 6_200, opens: 2_108, clicks: 434 },
  { month: 'Nov', sent: 7_400, opens: 2_516, clicks: 504 },
  { month: 'Dec', sent: 5_900, opens: 2_065, clicks: 413 },
  { month: 'Jan', sent: 8_100, opens: 2_835, clicks: 567 },
  { month: 'Feb', sent: 9_800, opens: 3_430, clicks: 686 },
  { month: 'Mar', sent: 10_920, opens: 3_800, clicks: 760 },
]

// ─── Appointments & Calendar ──────────────────────────────────────────────────

export const appointmentsOverview = {
  totalBooked: 318,
  showed: 247,
  noShow: 42,
  cancelled: 29,
  showRate: 77.7,
  upcomingToday: 8,
}

export const appointmentsByType = [
  { type: 'Discovery Call', count: 124 },
  { type: 'Demo', count: 87 },
  { type: 'Follow-up', count: 63 },
  { type: 'Onboarding', count: 44 },
]

export const appointmentTrend = [
  { month: 'Oct', booked: 42, showed: 32, noShow: 10 },
  { month: 'Nov', booked: 51, showed: 40, noShow: 11 },
  { month: 'Dec', booked: 38, showed: 28, noShow: 10 },
  { month: 'Jan', booked: 55, showed: 44, noShow: 11 },
  { month: 'Feb', booked: 62, showed: 49, noShow: 13 },
  { month: 'Mar', booked: 70, showed: 54, noShow: 16 },
]

export const upcomingAppointments = [
  { id: 'a1', contact: 'Sarah Johnson', type: 'Discovery Call', date: '2026-03-29', time: '09:00 AM', assigned: 'Alex Kim' },
  { id: 'a2', contact: 'James Carter', type: 'Demo', date: '2026-03-29', time: '11:00 AM', assigned: 'Maria Soto' },
  { id: 'a3', contact: 'Ravi Patel', type: 'Follow-up', date: '2026-03-29', time: '02:00 PM', assigned: 'Alex Kim' },
  { id: 'a4', contact: 'Mei Lin', type: 'Onboarding', date: '2026-03-30', time: '10:00 AM', assigned: 'David Wu' },
  { id: 'a5', contact: 'Ana Torres', type: 'Demo', date: '2026-03-30', time: '03:00 PM', assigned: 'Maria Soto' },
]

// ─── GHL API placeholder ──────────────────────────────────────────────────────
// Replace mock data with real API calls by setting GHL_API_KEY and GHL_LOCATION_ID
// in your .env.local file and updating lib/ghl-api.ts
