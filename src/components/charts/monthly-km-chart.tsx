"use client"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'
import type { MonthlyKmPoint } from '@/types/activity'

interface Props {
  data: MonthlyKmPoint[]
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; payload: MonthlyKmPoint }>; label?: string }) {
  if (!active || !payload?.length) return null

  const { value } = payload[0]
  const { sesiones } = payload[0].payload

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm text-sm">
      <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">{label}</p>
      <p style={{ color: '#3b82f6' }}>{value} km</p>
      <p className="text-gray-500 dark:text-gray-400">{sesiones} sesión(es)</p>
    </div>
  )
}

export function MonthlyKmChart({ data }: Props) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="km" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.mes} fill={entry.isCurrent ? '#3b82f6' : '#94a3b8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}