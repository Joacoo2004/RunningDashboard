import { getActivities } from '@/lib/sheets'
import { getWeekActivities, getMonthActivities, calcWeeklyKm, calcMonthlyKm, calcAveragePace } from '@/lib/transforms'
import { KpiCard } from '@/components/cards/kpi-card'
import { WeeklyView } from '@/components/cards/weekly-view'
import { SessionsTable } from '@/components/cards/sessions-table'

export default async function Home() {
  const activities = await getActivities()

  const weekActivities = getWeekActivities(activities)
  const monthActivities = getMonthActivities(activities)

  const kmThisWeek = calcWeeklyKm(weekActivities)
  const kmThisMonth = calcMonthlyKm(monthActivities)
  const avgPaceThisWeek = calcAveragePace(weekActivities)
  const sessionsThisWeek = weekActivities.length

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Running Dashboard
        </h1>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          label="Km esta semana"
          value={kmThisWeek > 0 ? kmThisWeek : '—'}
          unit="km"
        />
        <KpiCard
          label="Km este mes"
          value={kmThisMonth > 0 ? kmThisMonth : '—'}
          unit="km"
        />
        <KpiCard
          label="Ritmo promedio"
          value={avgPaceThisWeek}
          unit="min/km"
        />
        <KpiCard
          label="Sesiones esta semana"
          value={sessionsThisWeek > 0 ? sessionsThisWeek : '—'}
          unit="salidas"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Vista semanal
        </h2>
        <WeeklyView activities={activities} />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Sesiones recientes
        </h2>
        <SessionsTable activities={activities} />
      </section>
    </main>
  )
}
