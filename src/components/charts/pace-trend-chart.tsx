"use client"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import type { SessionType, PaceTrendPoint } from '@/types/activity'
import { formatPace } from '@/lib/transforms'

const SESSION_COLORS: Record<SessionType, string> = {
  Base: '#3b82f6',
  'Long Run': '#22c55e',
  Intervalos: '#f97316',
  'Sin clasificar': '#94a3b8',
}

const SESSION_TYPES: SessionType[] = ['Base', 'Long Run', 'Intervalos', 'Sin clasificar']

interface Props {
  data: PaceTrendPoint[]
}

interface CustomTooltipPayload {
  name: SessionType
  value: number
  color: string
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: CustomTooltipPayload[]
  label?: string
}) {
  if (!active || !payload?.length) return null

  const validEntries = payload.filter((p) => p.value !== null && p.value !== undefined)

  if (validEntries.length === 0) return null

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm text-sm">
      <p className="font-medium text-gray-900 mb-2">{label}</p>
      {validEntries.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {formatPace(entry.value)}
        </p>
      ))}
    </div>
  )
}

export function PaceTrendChart({ data }: Props) {
  if (!data.length) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-400 text-sm">
        Sin datos disponibles
      </div>
    )
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="fecha"
            tick={{ fontSize: 11 }}
            tickFormatter={(value: string) => {
              const date = new Date(value)
              return `${date.getDate()}/${date.getMonth() + 1}`
            }}
          />
          <YAxis
            domain={['dataMax + 0.5', 'dataMin - 0.5']}
            reversed={false}
            tick={{ fontSize: 11 }}
            tickFormatter={(value: number) => formatPace(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {SESSION_TYPES.map((type) => (
            <Line
              key={type}
              type="monotone"
              dataKey={type}
              stroke={SESSION_COLORS[type]}
              dot={{ r: 3 }}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}