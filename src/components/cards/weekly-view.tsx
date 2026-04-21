import type { Activity } from '@/types/activity'
import { SessionBadge } from '@/components/ui/session-badge'

interface WeeklyViewProps {
  activities: Activity[]
  weekOffset?: number
}

function getWeekBounds(offset: number): { start: Date; end: Date } {
  const base = new Date()
  const day = base.getDay()
  const diffToMonday = day === 0 ? -6 : 1 - day
  const monday = new Date(base)
  monday.setDate(base.getDate() + diffToMonday + offset * 7)
  monday.setHours(0, 0, 0, 0)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)

  return { start: monday, end: sunday }
}

function formatWeekRange(start: Date, end: Date): string {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
  const startStr = start.toLocaleDateString('es-ES', opts)
  const endStr = end.toLocaleDateString('es-ES', opts)
  return `${startStr} — ${endStr}`
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

function formatTime(decimalMinutes: number): string {
  const totalMinutes = Math.round(decimalMinutes)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, '0')}min`
  }
  return `${minutes}min`
}

function getWeekActivities(activities: Activity[], start: Date, end: Date): Activity[] {
  return activities
    .filter((a) => a.fecha >= start && a.fecha <= end)
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
}

export function WeeklyView({ activities, weekOffset = 0 }: WeeklyViewProps) {
  const { start, end } = getWeekBounds(weekOffset)
  const weekActivities = getWeekActivities(activities, start, end)

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {formatWeekRange(start, end)}
      </div>

      {weekActivities.length === 0 ? (
        <p className="text-sm text-gray-500 italic">Sin actividad esta semana</p>
      ) : (
        <ul className="space-y-2">
          {weekActivities.map((activity) => (
            <li
              key={activity.id}
              className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(activity.fecha)}
                  </span>
                  <span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.nombre}
                  </span>
                </div>
                <SessionBadge type={activity.tipoSesion} />
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
                <span>{activity.distanciaKm.toFixed(2)} km</span>
                <span>{formatTime(activity.tiempoMin)}</span>
                <span>{activity.ritmoMinKm} /km</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}