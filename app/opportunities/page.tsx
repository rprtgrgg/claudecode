'use client'

import Header from '@/components/Header'
import KpiCard from '@/components/KpiCard'
import {
  opportunitiesOverview,
  pipelineStages,
  wonLostTrend,
  topOpportunities,
} from '@/lib/mock-data'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
} from 'recharts'

const STAGE_COLORS = ['#818cf8', '#60a5fa', '#34d399', '#fbbf24', '#4ade80']

const stageBadge: Record<string, string> = {
  'New Lead': 'bg-blue-100 text-blue-700',
  Qualified: 'bg-yellow-100 text-yellow-700',
  Proposal: 'bg-purple-100 text-purple-700',
  Negotiation: 'bg-orange-100 text-orange-700',
  'Closed Won': 'bg-green-100 text-green-700',
}

function fmtCurrency(n: number) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return '$' + (n / 1_000).toFixed(0) + 'k'
  return '$' + n
}

export default function OpportunitiesPage() {
  return (
    <>
      <Header title="Opportunities" subtitle="Pipeline health and deal tracking" />
      <div className="flex-1 p-6 space-y-6">

        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <KpiCard label="Total Deals" value={opportunitiesOverview.total} color="green" />
          <KpiCard label="Pipeline Value" value={fmtCurrency(opportunitiesOverview.totalValue)} trend={8} color="green" />
          <KpiCard label="Closed Won" value={fmtCurrency(opportunitiesOverview.closedWonValue)} sub={`${opportunitiesOverview.closedWon} deals`} color="green" />
          <KpiCard label="Conversion Rate" value={opportunitiesOverview.conversionRate + '%'} trend={5} color="green" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* Pipeline funnel */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Pipeline Funnel</h2>
            <ResponsiveContainer width="100%" height={240}>
              <FunnelChart>
                <Tooltip
                  formatter={(val: number) => [val.toLocaleString(), 'Deals']}
                  contentStyle={{ fontSize: 12 }}
                />
                <Funnel
                  dataKey="count"
                  data={pipelineStages}
                  isAnimationActive
                >
                  <LabelList position="center" fill="#fff" stroke="none" dataKey="stage" style={{ fontSize: 11, fontWeight: 600 }} />
                  {pipelineStages.map((_, i) => (
                    <Cell key={i} fill={STAGE_COLORS[i]} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Won vs Lost trend */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Won vs Lost (6 months)</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={wonLostTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="won" fill="#4ade80" radius={[4, 4, 0, 0]} name="Won" />
                <Bar dataKey="lost" fill="#f87171" radius={[4, 4, 0, 0]} name="Lost" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline value by stage */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Pipeline Value by Stage</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-5 py-3">Stage</th>
                  <th className="text-right px-5 py-3">Deals</th>
                  <th className="text-right px-5 py-3">Value</th>
                  <th className="px-5 py-3">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pipelineStages.map((s, i) => {
                  const pct = Math.round((s.count / opportunitiesOverview.total) * 100)
                  return (
                    <tr key={s.stage} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stageBadge[s.stage] ?? 'bg-gray-100 text-gray-600'}`}>
                          {s.stage}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-semibold">{s.count}</td>
                      <td className="px-5 py-3 text-right font-semibold">{fmtCurrency(s.value)}</td>
                      <td className="px-5 py-3 w-40">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full"
                              style={{ width: `${pct}%`, backgroundColor: STAGE_COLORS[i] }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top opportunities */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Top Opportunities</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-5 py-3">Opportunity</th>
                  <th className="text-left px-5 py-3">Contact</th>
                  <th className="text-right px-5 py-3">Value</th>
                  <th className="text-left px-5 py-3">Stage</th>
                  <th className="text-right px-5 py-3">Probability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topOpportunities.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{o.name}</td>
                    <td className="px-5 py-3 text-gray-500">{o.contact}</td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-900">{fmtCurrency(o.value)}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stageBadge[o.stage] ?? 'bg-gray-100 text-gray-600'}`}>
                        {o.stage}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-green-400" style={{ width: `${o.probability}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{o.probability}%</span>
                      </div>
                    </td>
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
