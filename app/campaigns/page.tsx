'use client'

import Header from '@/components/Header'
import KpiCard from '@/components/KpiCard'
import {
  campaignOverview,
  campaignPerformance,
  emailTrend,
} from '@/lib/mock-data'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function pct(a: number, b: number) {
  return b === 0 ? '0%' : ((a / b) * 100).toFixed(1) + '%'
}

export default function CampaignsPage() {
  return (
    <>
      <Header title="Campaigns & Marketing" subtitle="Email and SMS campaign performance" />
      <div className="flex-1 p-6 space-y-6">

        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <KpiCard label="Active Campaigns" value={campaignOverview.activeCampaigns} color="purple" />
          <KpiCard label="Emails Sent" value={campaignOverview.emailsSent.toLocaleString()} color="purple" />
          <KpiCard label="SMS Sent" value={campaignOverview.smsSent.toLocaleString()} color="purple" />
          <KpiCard label="Avg Open Rate" value={campaignOverview.avgOpenRate + '%'} trend={4} color="purple" />
          <KpiCard label="Avg Click Rate" value={campaignOverview.avgClickRate + '%'} trend={-1} color="purple" />
          <KpiCard label="Avg Conversion" value={campaignOverview.avgConversionRate + '%'} trend={2} color="purple" />
        </div>

        {/* Email trend chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Email Volume Trend (6 months)</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={emailTrend} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="sent" stroke="#818cf8" strokeWidth={2} dot={false} name="Sent" />
              <Line type="monotone" dataKey="opens" stroke="#34d399" strokeWidth={2} dot={false} name="Opens" />
              <Line type="monotone" dataKey="clicks" stroke="#fbbf24" strokeWidth={2} dot={false} name="Clicks" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign performance table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Campaign Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-5 py-3">Campaign</th>
                  <th className="text-left px-5 py-3">Type</th>
                  <th className="text-right px-5 py-3">Sent</th>
                  <th className="text-right px-5 py-3">Opens</th>
                  <th className="text-right px-5 py-3">Open Rate</th>
                  <th className="text-right px-5 py-3">Clicks</th>
                  <th className="text-right px-5 py-3">Click Rate</th>
                  <th className="text-right px-5 py-3">Conversions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {campaignPerformance.map((c) => (
                  <tr key={c.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.type === 'Email' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {c.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-gray-700">{c.sent.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right text-gray-700">{c.opens.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right font-semibold text-green-600">{pct(c.opens, c.sent)}</td>
                    <td className="px-5 py-3 text-right text-gray-700">{c.clicks.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right font-semibold text-yellow-600">{pct(c.clicks, c.sent)}</td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900">{c.conversions.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Opens vs Clicks bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Opens vs Clicks by Campaign</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={campaignPerformance}
              margin={{ top: 4, right: 4, left: -20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="opens" fill="#818cf8" radius={[4, 4, 0, 0]} name="Opens" />
              <Bar dataKey="clicks" fill="#fbbf24" radius={[4, 4, 0, 0]} name="Clicks" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </>
  )
}
