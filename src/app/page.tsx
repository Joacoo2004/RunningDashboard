import { getActivities } from '@/lib/sheets'
import { getWeekActivities, getMonthActivities, calcWeeklyKm, calcMonthlyKm, calcAveragePace, getWeeklyKmData, getMonthlyKmData, getPaceTrendData } from '@/lib/transforms'
import { KpiCard } from '@/components/cards/kpi-card'
import { WeeklyView } from '@/components/cards/weekly-view'
import { SessionsTable } from '@/components/cards/sessions-table'
import { WeeklyKmChart } from '@/components/charts/weekly-km-chart'
import { MonthlyKmChart } from '@/components/charts/monthly-km-chart'
import { PaceTrendChart } from '@/components/charts/pace-trend-chart'

export default async function Home() {
  const activities = await getActivities()

  const weekActivities = getWeekActivities(activities)
  const monthActivities = getMonthActivities(activities)

  const kmThisWeek = calcWeeklyKm(weekActivities)
  const kmThisMonth = calcMonthlyKm(monthActivities)
  const avgPaceThisWeek = calcAveragePace(weekActivities)
  const sessionsThisWeek = weekActivities.length

  const weeklyKmData = getWeeklyKmData(activities)
  const monthlyKmData = getMonthlyKmData(activities)
  const paceTrendData = getPaceTrendData(activities)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        <header className="border-b border-gray-200 dark:border-gray-800 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Running Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tu progreso de entrenamiento
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Métricas clave
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Progreso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Km por semana</h3>
              <WeeklyKmChart data={weeklyKmData} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Km por mes</h3>
              <MonthlyKmChart data={monthlyKmData} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Tendencia de ritmo</h3>
            <PaceTrendChart data={paceTrendData} />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Vista semanal
          </h2>
          <WeeklyView activities={activities} />
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Sesiones recientes
          </h2>
          <SessionsTable activities={activities} />
        </section>
      </div>
    </main>
  )
}
