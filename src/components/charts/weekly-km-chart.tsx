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
import type { WeeklyKmPoint } from '@/types/activity'

interface Props {
  data: WeeklyKmPoint[]
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null

  const data = payload[0]

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm text-sm">
      <p className="font-medium text-gray-900 mb-1">{label}</p>
      <p style={{ color: '#3b82f6' }}>{data?.value} km</p>
      <p className="text-gray-500">{data?.value > 0 ? '1' : '0'} sesión(es)</p>
    </div>
  )
}

export function WeeklyKmChart({ data }: Props) {
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
              <Cell key={entry.semana} fill={entry.isCurrent ? '#3b82f6' : '#94a3b8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}