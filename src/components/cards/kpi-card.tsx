interface KpiCardProps {
  label: string
  value: string | number
  unit?: string
}

export function KpiCard({ label, value, unit }: KpiCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-5 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{value}</span>
      {unit && <span className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">{unit}</span>}
    </div>
  )
}