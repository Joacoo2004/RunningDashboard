import type { Activity, SessionType, WeeklyKmPoint, MonthlyKmPoint, PaceTrendPoint } from '@/types/activity'

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

export function getWeeklyKmData(activities: Activity[], weeks: number = 12): WeeklyKmPoint[] {
  const now = new Date()
  const currentWeek = getWeekNumber(now)

  const weekMap = new Map<string, { km: number; sesiones: number }>()

  for (let i = weeks - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i * 7)
    const weekKey = getWeekKey(date)
    weekMap.set(weekKey, { km: 0, sesiones: 0 })
  }

  for (const activity of activities) {
    const weekKey = getWeekKey(activity.fecha)
    if (weekMap.has(weekKey)) {
      const current = weekMap.get(weekKey)!
      current.km += activity.distanciaKm
      current.sesiones += 1
    }
  }

  const result: WeeklyKmPoint[] = []
  const sortedKeys = Array.from(weekMap.keys()).sort()

  for (const weekKey of sortedKeys) {
    const data = weekMap.get(weekKey)!
    const [, weekNum] = weekKey.split('-W')
    result.push({
      semana: weekKey,
      label: `S${weekNum}`,
      km: Math.round(data.km * 10) / 10,
      sesiones: data.sesiones,
      isCurrent: parseInt(weekNum, 10) === currentWeek,
    })
  }

  return result
}

export function getMonthlyKmData(activities: Activity[], months: number = 6): MonthlyKmPoint[] {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const monthMap = new Map<string, { km: number; sesiones: number }>()

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
    monthMap.set(monthKey, { km: 0, sesiones: 0 })
  }

  for (const activity of activities) {
    const monthKey = `${activity.fecha.getFullYear()}-${(activity.fecha.getMonth() + 1).toString().padStart(2, '0')}`
    if (monthMap.has(monthKey)) {
      const current = monthMap.get(monthKey)!
      current.km += activity.distanciaKm
      current.sesiones += 1
    }
  }

  const result: MonthlyKmPoint[] = []
  const sortedKeys = Array.from(monthMap.keys()).sort()

  for (const monthKey of sortedKeys) {
    const data = monthMap.get(monthKey)!
    const [, m] = monthKey.split('-')
    const monthNum = parseInt(m, 10)
    const label = getMonthLabel(monthNum)
    const [year] = monthKey.split('-')
    const isCurrent = monthNum === currentMonth + 1 && parseInt(year, 10) === currentYear

    result.push({
      mes: monthKey,
      label: `${label} ${year.slice(2)}`,
      km: Math.round(data.km * 10) / 10,
      sesiones: data.sesiones,
      isCurrent,
    })
  }

  return result
}

export function getPaceTrendData(activities: Activity[], limit: number = 30): PaceTrendPoint[] {
  const sorted = [...activities]
    .filter((a) => a.ritmoMinKm && parsePace(a.ritmoMinKm) > 0)
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
    .slice(-limit)

  const result: PaceTrendPoint[] = []

  for (const activity of sorted) {
    const pace = parsePace(activity.ritmoMinKm)
    const fechaStr = activity.fecha.toISOString().split('T')[0]

    result.push({
      fecha: fechaStr,
      [activity.tipoSesion]: pace,
    })
  }

  return result
}

function getWeekNumber(date: Date): number {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const dayNum = d.getDay()
  const diffToMonday = dayNum === 0 ? -6 : 1 - dayNum
  d.setDate(d.getDate() + diffToMonday)
  const week1 = new Date(d.getFullYear(), 0, 1)
  const diffDays = Math.floor((d.getTime() - week1.getTime()) / (24 * 60 * 60 * 1000))
  return Math.ceil((diffDays + week1.getDay() + 1) / 7)
}

function getWeekKey(date: Date): string {
  const week = getWeekNumber(date)
  return `${date.getFullYear()}-W${week.toString().padStart(2, '0')}`
}

function getMonthLabel(month: number): string {
  const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return labels[month - 1] || ''
}