import { getActivities } from '@/lib/sheets'

export default async function Home() {
  const activities = await getActivities()

  return (
    <main>
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
