import { getActivities } from '@/lib/sheets'
import { getWeekActivities, getMonthActivities, calcWeeklyKm, calcMonthlyKm, calcAveragePace } from '@/lib/transforms'
import { KpiCard } from '@/components/cards/kpi-card'

export default async function Home() {
  const activities = await getActivities()

  const weekActivities = getWeekActivities(activities)
  const monthActivities = getMonthActivities(activities)

  const kmThisWeek = calcWeeklyKm(weekActivities)
  const kmThisMonth = calcMonthlyKm(monthActivities)
  const avgPaceThisWeek = calcAveragePace(weekActivities)
  const sessionsThisWeek = weekActivities.length

  return (
    <main>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

      {activities.length === 0 ? (
        <p>No hay actividades</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Distancia</th>
              <th>Ritmo</th>
              <th>Tipo de sesión</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.fecha.toLocaleDateString('es-AR')}</td>
                <td>{activity.nombre}</td>
                <td>{activity.distanciaKm} km</td>
                <td>{activity.ritmoMinKm}</td>
                <td>{activity.tipoSesion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}
