---
name: chart-component
description: Cómo crear componentes de gráficos con Recharts en RunningDashboard. Activar al implementar cualquier feature que incluya un gráfico (F-003, F-004, F-005).
---

# Skill — Chart Component (Recharts)

## Cuándo usar este skill

- Al implementar F-003 (comparación semana a semana)
- Al implementar F-004 (comparación mes a mes)
- Al implementar F-005 (tendencia de ritmo)
- Al crear cualquier componente nuevo en `src/components/charts/`

---

## Regla fundamental

**Todos los componentes de Recharts son Client Components.**
Siempre incluir `"use client"` como primera línea.

El patrón correcto en Next.js App Router es:
1. Server Component fetcha los datos
2. Pasa los datos como props al Chart Component (Client)

```
page.tsx (Server) → fetcha datos → <WeeklyChart data={data} /> (Client)
```

---

## Estructura de un componente de gráfico

```
src/components/charts/
├── weekly-km-chart.tsx      ← F-003
├── monthly-km-chart.tsx     ← F-004
└── pace-trend-chart.tsx     ← F-005
```

Cada archivo sigue esta estructura:

```typescript
"use client"

import {
  ResponsiveContainer,
  BarChart,        // o LineChart, AreaChart según el caso
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

interface Props {
  data: ChartDataPoint[]  // tipo específico por gráfico
}

export function WeeklyKmChart({ data }: Props) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="km" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
```

---

## ResponsiveContainer — siempre requerido

Recharts necesita dimensiones explícitas. **Siempre** envolver en `ResponsiveContainer`
con el padre teniendo altura definida:

```tsx
// ✅ Correcto
<div className="w-full h-64">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart ...>

// ❌ Incorrecto — altura 0, gráfico invisible
<ResponsiveContainer width="100%" height="100%">
  <BarChart ...>
```

---

## Tooltip personalizado

Siempre usar tooltip personalizado para mostrar datos con formato correcto:

```typescript
function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm text-sm">
      <p className="font-medium text-gray-900 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  )
}
```

---

## Colores — sistema consistente en todo el proyecto

Usar siempre estas clases/valores para mantener consistencia visual:

| Uso | Color hex | Tailwind |
|-----|-----------|---------|
| Semana/mes actual | `#3b82f6` | `blue-500` |
| Barras/líneas neutras | `#94a3b8` | `slate-400` |
| Tipo Base | `#3b82f6` | `blue-500` |
| Tipo Long Run | `#22c55e` | `green-500` |
| Tipo Intervalos | `#f97316` | `orange-500` |
| Sin clasificar | `#94a3b8` | `slate-400` |

---

## Gráfico de ritmo — eje Y invertido (F-005)

En running, ritmo menor = más rápido = mejor. Configurar el eje Y así:

```tsx
<YAxis
  domain={['dataMin - 0.5', 'dataMax + 0.5']}
  reversed={false}
  tickFormatter={(value) => formatPace(value)}  // "6:31" en vez de 6.52
/>
```

Y para que valores menores aparezcan arriba, invertir el dominio:

```tsx
<YAxis
  domain={['dataMax + 0.5', 'dataMin - 0.5']}
  tickFormatter={formatPace}
/>
```

Función de formato de ritmo:

```typescript
export function formatPace(decimalMinutes: number): string {
  const minutes = Math.floor(decimalMinutes)
  const seconds = Math.round((decimalMinutes - minutes) * 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
```

---

## Gráfico de múltiples líneas — F-005

Para separar líneas por tipo de sesión:

```typescript
// Transformación de datos para MultiLine
const types: SessionType[] = ['Base', 'Long Run', 'Intervalos', 'Sin clasificar']

// Cada punto de datos tiene un campo por tipo
type PaceDataPoint = {
  fecha: string
  Base?: number
  'Long Run'?: number
  Intervalos?: number
  'Sin clasificar'?: number
}

// En el componente
{types.map((type) => (
  <Line
    key={type}
    type="monotone"
    dataKey={type}
    stroke={SESSION_COLORS[type]}
    dot={{ r: 3 }}
    connectNulls={false}   // no conectar si hay sesión sin ese tipo
  />
))}
```

---

## Checklist antes de dar por terminado un gráfico

- [ ] `"use client"` en la primera línea
- [ ] Envuelto en `<div className="w-full h-[N]px">` con altura explícita
- [ ] `ResponsiveContainer` con `width="100%" height="100%"`
- [ ] Tooltip personalizado (no el default de Recharts)
- [ ] Colores del sistema de color del proyecto
- [ ] Datos vacíos o `[]` no rompen el componente
- [ ] Props tipadas con TypeScript (no `any`)