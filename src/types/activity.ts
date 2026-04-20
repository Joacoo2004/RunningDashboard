export type SessionType = 'Base' | 'Long Run' | 'Intervalos' | 'Sin clasificar'

export interface Activity {
  id: number
  nombre: string
  fecha: Date
  distanciaKm: number
  tiempoMin: number
  ritmoMinKm: string
  elevacionM: number
  intervalos: string | null
  tipoSesion: SessionType
}