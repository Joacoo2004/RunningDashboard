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

export interface WeeklyKmPoint {
  semana: string
  label: string
  km: number
  sesiones: number
  isCurrent: boolean
}

export interface MonthlyKmPoint {
  mes: string
  label: string
  km: number
  sesiones: number
  isCurrent: boolean
}

export interface PaceTrendPoint {
  fecha: string
  Base?: number
  'Long Run'?: number
  Intervalos?: number
  'Sin clasificar'?: number
}