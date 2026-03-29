import Header from '@/components/Header'
import KpiCard from '@/components/KpiCard'
import Link from 'next/link'
import {
  contactsOverview,
  opportunitiesOverview,
  campaignOverview,
  appointmentsOverview,
} from '@/lib/mock-data'

function fmt(n: number) {
  return n.toLocaleString()
}

function fmtCurrency(n: number) {
  return '$' + n.toLocaleString()
}

const sections = [
  {
    title: 'Contacts & Leads',
    href: '/contacts',
    color: 'blue' as const,
    kpis: [
      { label: 'Total Contacts', value: fmt(contactsOverview.total) },
      { label: 'New This Month', value: fmt(contactsOverview.newThisMonth) },
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Opportunities',
    href: '/opportunities',
    color: 'green' as const,
    kpis: [
      { label: 'Pipeline Value', value: fmtCurrency(opportunitiesOverview.totalValue) },
      { label: 'Conversion Rate', value: opportunitiesOverview.conversionRate + '%' },
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Campaigns',
    href: '/campaigns',
    color: 'purple' as const,
    kpis: [
      { label: 'Emails Sent', value: fmt(campaignOverview.emailsSent) },
      { label: 'Avg Open Rate', value: campaignOverview.avgOpenRate + '%' },
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Appointments',
    href: '/appointments',
    color: 'orange' as const,
    kpis: [
      { label: 'Total Booked', value: fmt(appointmentsOverview.totalBooked) },
      { label: 'Show Rate', value: appointmentsOverview.showRate + '%' },
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const colorBadge: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
}

export default function OverviewPage() {
  return (
    <>
      <Header title="Overview" subtitle="All key metrics at a glance" />
      <div className="flex-1 p-6 space-y-8">

        {/* Top-level KPI strip */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <KpiCard label="Total Contacts" value={fmt(contactsOverview.total)} sub="All time" trend={12} color="blue" />
          <KpiCard label="Pipeline Value" value={fmtCurrency(opportunitiesOverview.totalValue)} sub="Open deals" trend={8} color="green" />
          <KpiCard label="Emails Sent" value={fmt(campaignOverview.emailsSent)} sub="Last 6 months" trend={18} color="purple" />
          <KpiCard label="Appt Show Rate" value={appointmentsOverview.showRate + '%'} sub="Last 6 months" trend={3} color="orange" />
        </div>

        {/* Section cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {sections.map(({ title, href, color, kpis, icon }) => (
            <Link
              key={href}
              href={href}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className={`w-8 h-8 rounded-lg border flex items-center justify-center ${colorBadge[color]}`}>
                    {icon}
                  </span>
                  <span className="font-semibold text-gray-900 text-sm">{title}</span>
                </div>
                <span className="text-xs text-brand-600 font-medium group-hover:underline">View report →</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {kpis.map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-lg px-3 py-2.5">
                    <p className="text-[11px] text-gray-500 mb-0.5">{label}</p>
                    <p className="text-xl font-bold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Quick stats table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 text-sm">Performance Summary</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3">Metric</th>
                <th className="text-right px-5 py-3">Value</th>
                <th className="text-right px-5 py-3">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { metric: 'New leads this month', value: fmt(contactsOverview.newThisMonth), cat: 'Contacts' },
                { metric: 'Closed won deals', value: fmt(opportunitiesOverview.closedWon), cat: 'Opportunities' },
                { metric: 'Closed won value', value: fmtCurrency(opportunitiesOverview.closedWonValue), cat: 'Opportunities' },
                { metric: 'Active campaigns', value: campaignOverview.activeCampaigns, cat: 'Campaigns' },
                { metric: 'Avg click rate', value: campaignOverview.avgClickRate + '%', cat: 'Campaigns' },
                { metric: 'Appointments today', value: appointmentsOverview.upcomingToday, cat: 'Appointments' },
                { metric: 'No-shows', value: fmt(appointmentsOverview.noShow), cat: 'Appointments' },
              ].map(({ metric, value, cat }) => (
                <tr key={metric} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-700">{metric}</td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-900">{value}</td>
                  <td className="px-5 py-3 text-right text-gray-400 text-xs">{cat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}
