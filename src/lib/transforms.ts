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

export function parsePace(value: string): number {
  if (!value) return 0
  const parts = value.split(':')
  if (parts.length !== 2) return 0
  const minutes = parseInt(parts[0], 10) || 0
  const seconds = parseInt(parts[1], 10) || 0
  return minutes + seconds / 60
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

function getWeekBounds(date: Date): { start: Date; end: Date } {
  const d = new Date(date)
  const day = d.getDay()
  const diffToMonday = day === 0 ? -6 : 1 - day
  const start = new Date(d)
  start.setDate(d.getDate() + diffToMonday)
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return { start, end }
}

function getMonthBounds(date: Date): { start: Date; end: Date } {
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
  return { start, end }
}

export function getWeekActivities(activities: Activity[], date?: Date): Activity[] {
  const targetDate = date ?? new Date()
  const { start, end } = getWeekBounds(targetDate)
  return activities.filter((a) => a.fecha >= start && a.fecha <= end)
}

export function getMonthActivities(activities: Activity[], date?: Date): Activity[] {
  const targetDate = date ?? new Date()
  const { start, end } = getMonthBounds(targetDate)
  return activities.filter((a) => a.fecha >= start && a.fecha <= end)
}

export function calcWeeklyKm(activities: Activity[]): number {
  return activities.reduce((sum, a) => sum + a.distanciaKm, 0)
}

export function calcMonthlyKm(activities: Activity[]): number {
  return activities.reduce((sum, a) => sum + a.distanciaKm, 0)
}

export function calcAveragePace(activities: Activity[]): string {
  if (activities.length === 0) return '—'

  let totalPaceMin = 0
  let totalKm = 0

  for (const a of activities) {
    if (a.ritmoMinKm && a.distanciaKm > 0) {
      const paceMin = parsePace(a.ritmoMinKm)
      if (paceMin > 0) {
        totalPaceMin += paceMin * a.distanciaKm
        totalKm += a.distanciaKm
      }
    }
  }

  if (totalKm === 0) return '—'

  const avgPaceMin = totalPaceMin / totalKm
  return formatPace(avgPaceMin)
}