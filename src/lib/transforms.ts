import type { Activity, SessionType } from '@/types/activity'

const SESSION_TYPES: SessionType[] = ['Base', 'Long Run', 'Intervalos']

export function parseMinutes(value: string): number {
  if (!value) return 0
  const num = parseFloat(value)
  if (isNaN(num)) return 0

  const decimal = num % 1
  if (decimal > 0 && decimal < 1) {
    const decimalsStr = value.split('.')[1] ?? '0'
    const seconds = parseInt(decimalsStr.padEnd(2, '0').slice(0, 2))
    if (seconds >= 60) {
      const minutes = Math.floor(num)
      return minutes + seconds / 60
    }
  }
  return num
}

function parseDate(value: string): Date {
  const [day, month, year] = value.split('/')
  return new Date(Number(year), Number(month) - 1, Number(day))
}

function parseSessionType(value: string): SessionType {
  if (SESSION_TYPES.includes(value as SessionType)) {
    return value as SessionType
  }
  return 'Sin clasificar'
}

export function formatPace(decimalMinutes: number): string {
  const minutes = Math.floor(decimalMinutes)
  const seconds = Math.round((decimalMinutes - minutes) * 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function parseActivity(row: string[]): Activity | null {
  try {
    return {
      id: Number(row[0]),
      nombre: row[1] ?? '',
      fecha: parseDate(row[2]),
      distanciaKm: parseFloat(row[3]) || 0,
      tiempoMin: parseMinutes(row[4]),
      ritmoMinKm: row[5] ?? '',
      elevacionM: parseFloat(row[6]) || 0,
      intervalos: row[7] || null,
      tipoSesion: parseSessionType(row[8]),
    }
  } catch {
    return null
  }
}