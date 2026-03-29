import clsx from 'clsx'

interface KpiCardProps {
  label: string
  value: string | number
  sub?: string
  trend?: number        // positive = up, negative = down
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
}

const colorMap = {
  blue:   'bg-blue-50 text-blue-600',
  green:  'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
  red:    'bg-red-50 text-red-600',
}

export default function KpiCard({ label, value, sub, trend, color = 'blue' }: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
      <span className={clsx('inline-flex self-start text-xs font-semibold px-2 py-0.5 rounded-full', colorMap[color])}>
        {label}
      </span>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {trend !== undefined && (
          <span
            className={clsx(
              'text-xs font-semibold flex items-center gap-0.5',
              trend >= 0 ? 'text-green-600' : 'text-red-500'
            )}
          >
            {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  )
}
