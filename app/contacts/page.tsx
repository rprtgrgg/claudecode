'use client'

import Header from '@/components/Header'
import KpiCard from '@/components/KpiCard'
import {
  contactsOverview,
  leadSourceData,
  contactGrowth,
  recentContacts,
} from '@/lib/mock-data'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const BAR_COLORS = ['#5a66f5', '#7889fb', '#9eb0fd', '#c3d0fe', '#dde6ff', '#a78bfa']

const stageBadge: Record<string, string> = {
  'New Lead': 'bg-blue-100 text-blue-700',
  Qualified: 'bg-yellow-100 text-yellow-700',
  Proposal: 'bg-purple-100 text-purple-700',
  'Closed Won': 'bg-green-100 text-green-700',
}

export default function ContactsPage() {
  const momChange = Math.round(
    ((contactsOverview.newThisMonth - contactsOverview.newLastMonth) /
      contactsOverview.newLastMonth) *
      100
  )

  return (
    <>
      <Header title="Contacts & Leads" subtitle="Contact database and lead source breakdown" />
      <div className="flex-1 p-6 space-y-6">

        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <KpiCard label="Total Contacts" value={contactsOverview.total.toLocaleString()} color="blue" />
          <KpiCard label="New This Month" value={contactsOverview.newThisMonth} trend={momChange} color="blue" sub={`vs ${contactsOverview.newLastMonth} last month`} />
          <KpiCard label="New Last Month" value={contactsOverview.newLastMonth} color="blue" />
          <KpiCard label="Unsubscribed" value={contactsOverview.unsubscribed} color="red" sub="All time" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* Growth chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Contact Growth (6 months)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={contactGrowth} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="contactGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5a66f5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#5a66f5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="contacts"
                  stroke="#5a66f5"
                  strokeWidth={2}
                  fill="url(#contactGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Lead source chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Lead Sources</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={leadSourceData} layout="vertical" margin={{ top: 4, right: 16, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="source" type="category" tick={{ fontSize: 11 }} width={60} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {leadSourceData.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent contacts table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Recent Contacts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-5 py-3">Name</th>
                  <th className="text-left px-5 py-3">Email</th>
                  <th className="text-left px-5 py-3">Source</th>
                  <th className="text-left px-5 py-3">Stage</th>
                  <th className="text-left px-5 py-3">Date Added</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-5 py-3 text-gray-500">{c.email}</td>
                    <td className="px-5 py-3 text-gray-600">{c.source}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stageBadge[c.stage] ?? 'bg-gray-100 text-gray-600'}`}>
                        {c.stage}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  )
}
