interface KpiCardProps {
  label: string
  value: string | number
  unit?: string
}

export function KpiCard({ label, value, unit }: KpiCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-card rounded-lg border">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-3xl font-semibold">{value}</span>
      {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
    </div>
  )
}