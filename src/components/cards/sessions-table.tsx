'use client'

import { useState } from 'react'
import type { Activity } from '@/types/activity'
import { SessionBadge } from '@/components/ui/session-badge'

interface SessionsTableProps {
  activities: Activity[]
}

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

function formatTime(minutes: number): string {
  if (!minutes || minutes === 0) return '—'
  const mins = Math.floor(minutes)
  const secs = Math.round((minutes - mins) * 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatDistance(km: number): string {
  return `${km.toFixed(2)} km`
}

function formatRitmo(ritmo: string): string {
  if (!ritmo) return '—'
  return `${ritmo} min/km`
}

function formatElevacion(meters: number): string {
  if (!meters || meters === 0) return '—'
  return `${meters} m`
}

export function SessionsTable({ activities }: SessionsTableProps) {
  const [visibleCount, setVisibleCount] = useState(10)

  const sortedActivities = [...activities]
    .sort((a, b) => b.fecha.getTime() - a.fecha.getTime())

  const displayedActivities = sortedActivities.slice(0, visibleCount)
  const hasMore = visibleCount < sortedActivities.length

  const handleLoadMore = () => {
    setVisibleCount((c) => c + 10)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-3 font-semibold text-gray-600">Fecha</th>
            <th className="text-left py-2 px-3 font-semibold text-gray-600">Sesión</th>
            <th className="text-right py-2 px-3 font-semibold text-gray-600">Distancia</th>
            <th className="text-right py-2 px-3 font-semibold text-gray-600">Tiempo</th>
            <th className="text-right py-2 px-3 font-semibold text-gray-600">Ritmo</th>
            <th className="text-right py-2 px-3 font-semibold text-gray-600">Elevación</th>
            <th className="text-left py-2 px-3 font-semibold text-gray-600">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {displayedActivities.map((activity) => (
            <tr
              key={activity.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-2 px-3 text-gray-900">{formatDate(activity.fecha)}</td>
              <td className="py-2 px-3 text-gray-900 font-medium">{activity.nombre}</td>
              <td className="py-2 px-3 text-right text-gray-700">
                {formatDistance(activity.distanciaKm)}
              </td>
              <td className="py-2 px-3 text-right text-gray-700">
                {formatTime(activity.tiempoMin)}
              </td>
              <td className="py-2 px-3 text-right text-gray-700">
                {formatRitmo(activity.ritmoMinKm)}
              </td>
              <td className="py-2 px-3 text-right text-gray-700">
                {formatElevacion(activity.elevacionM)}
              </td>
              <td className="py-2 px-3">
                <SessionBadge type={activity.tipoSesion} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && (
        <div className="mt-4 text-center">
          <button
            onClick={handleLoadMore}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  )
}
