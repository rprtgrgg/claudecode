'use client'

import Header from '@/components/Header'
import KpiCard from '@/components/KpiCard'
import {
  appointmentsOverview,
  appointmentsByType,
  appointmentTrend,
  upcomingAppointments,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const PIE_COLORS = ['#5a66f5', '#34d399', '#fbbf24', '#f87171']

const typeBadge: Record<string, string> = {
  'Discovery Call': 'bg-blue-100 text-blue-700',
  Demo: 'bg-purple-100 text-purple-700',
  'Follow-up': 'bg-yellow-100 text-yellow-700',
  Onboarding: 'bg-green-100 text-green-700',
}

export default function AppointmentsPage() {
  return (
    <>
      <Header title="Appointments & Calendar" subtitle="Booking stats, show rates, and upcoming sessions" />
      <div className="flex-1 p-6 space-y-6">

        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <KpiCard label="Total Booked" value={appointmentsOverview.totalBooked} color="orange" />
          <KpiCard label="Showed Up" value={appointmentsOverview.showed} color="orange" />
          <KpiCard label="No-Shows" value={appointmentsOverview.noShow} color="red" />
          <KpiCard label="Cancelled" value={appointmentsOverview.cancelled} color="red" />
          <KpiCard label="Show Rate" value={appointmentsOverview.showRate + '%'} trend={3} color="orange" />
          <KpiCard label="Today" value={appointmentsOverview.upcomingToday} color="orange" sub="upcoming" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* Booking trend */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Booking Trend (6 months)</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={appointmentTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="booked" fill="#fb923c" radius={[4, 4, 0, 0]} name="Booked" />
                <Bar dataKey="showed" fill="#4ade80" radius={[4, 4, 0, 0]} name="Showed" />
                <Bar dataKey="noShow" fill="#f87171" radius={[4, 4, 0, 0]} name="No-Show" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Appointments by type pie */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Appointments by Type</h2>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={220}>
                <PieChart>
                  <Pie
                    data={appointmentsByType}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {appointmentsByType.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {appointmentsByType.map((item, i) => (
                  <div key={item.type} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                      />
                      <span className="text-gray-700 text-xs">{item.type}</span>
                    </div>
                    <span className="font-semibold text-gray-900 text-xs">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming appointments table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Upcoming Appointments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-5 py-3">Contact</th>
                  <th className="text-left px-5 py-3">Type</th>
                  <th className="text-left px-5 py-3">Date</th>
                  <th className="text-left px-5 py-3">Time</th>
                  <th className="text-left px-5 py-3">Assigned To</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {upcomingAppointments.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{a.contact}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeBadge[a.type] ?? 'bg-gray-100 text-gray-600'}`}>
                        {a.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{a.date}</td>
                    <td className="px-5 py-3 text-gray-600">{a.time}</td>
                    <td className="px-5 py-3 text-gray-500">{a.assigned}</td>
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
