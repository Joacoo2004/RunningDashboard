import type { SessionType } from '@/types/activity'

interface SessionBadgeProps {
  type: SessionType
}

const badgeStyles: Record<SessionType, { bg: string; text: string }> = {
  'Base': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Long Run': { bg: 'bg-green-100', text: 'text-green-700' },
  'Intervalos': { bg: 'bg-orange-100', text: 'text-orange-700' },
  'Sin clasificar': { bg: 'bg-gray-100', text: 'text-gray-600' },
}

export function SessionBadge({ type }: SessionBadgeProps) {
  const styles = badgeStyles[type]

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${styles.bg} ${styles.text}`}
    >
      {type}
    </span>
  )
}