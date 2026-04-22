# Phase 3 — Comparaciones & Tendencia de ritmo

| Campo | Valor |
|-------|-------|
| Estado | ✅ Completa |
| Objetivo | Agregar los tres gráficos principales al dashboard |
| Entregable | Dashboard con comparaciones semanales, mensuales y tendencia de ritmo |
| Prerequisito | Fase 2 completa |
| Specs | F-003, F-004, F-005 |

---

## Tareas en orden de ejecución

### Tarea 1 — Transformaciones para gráficos

**Prompt para OpenCode:**
```
Leer CLAUDE.md, docs/specs/F-003-weekly-comparison.md,
docs/specs/F-004-monthly-comparison.md y docs/specs/F-005-pace-trend.md
antes de comenzar.

Agregar a src/lib/transforms.ts las siguientes funciones:

  - getWeeklyKmData(activities: Activity[], weeks?: number): WeeklyKmPoint[]
    Agrupa actividades por semana ISO. Últimas `weeks` semanas (default: 12).
    Tipo: { semana: string, label: string, km: number, sesiones: number, isCurrent: boolean }
    Semanas sin actividad → incluir con km: 0.

  - getMonthlyKmData(activities: Activity[], months?: number): MonthlyKmPoint[]
    Agrupa actividades por mes. Últimos `months` meses (default: 6).
    Tipo: { mes: string, label: string, km: number, sesiones: number, isCurrent: boolean }
    Meses sin actividad → incluir con km: 0.

  - getPaceTrendData(activities: Activity[], limit?: number): PaceTrendPoint[]
    Últimas `limit` sesiones (default: 30) ordenadas por fecha ascendente.
    Tipo: { fecha: string, Base?: number, 'Long Run'?: number, Intervalos?: number, 'Sin clasificar'?: number }
    El ritmo se convierte a número decimal para graficar.
    Sesiones con ritmo vacío o 0 → excluir.

Agregar los tipos correspondientes a src/types/activity.ts.
No modificar ningún otro archivo.
```

**Criterio de done:** Funciones tipadas, compilan sin errores, retornan arrays correctamente formateados.

---

### Tarea 2 — Gráfico comparación semanal (F-003)

**Prompt para OpenCode:**
```
Leer CLAUDE.md, docs/specs/F-003-weekly-comparison.md
y docs/skills/skill-chart-component.md antes de comenzar.

Crear src/components/charts/weekly-km-chart.tsx:
  Props: { data: WeeklyKmPoint[] }
  - BarChart de Recharts con una barra por semana
  - Eje X: label de la semana
  - Eje Y: kilómetros
  - Barra de la semana actual en azul (#3b82f6), resto en gris (#94a3b8)
  - Tooltip personalizado: semana, km totales, cantidad de sesiones
  - Envuelto en ResponsiveContainer dentro de un div con altura explícita
  - "use client" como primera línea
```

**Criterio de done:** Gráfico visible con datos reales, tooltip funcionando, semana actual destacada.

---

### Tarea 3 — Gráfico comparación mensual (F-004)

**Prompt para OpenCode:**
```
Leer CLAUDE.md, docs/specs/F-004-monthly-comparison.md
y docs/skills/skill-chart-component.md antes de comenzar.

Crear src/components/charts/monthly-km-chart.tsx.
Mismo patrón que weekly-km-chart.tsx pero con datos mensuales.
  Props: { data: MonthlyKmPoint[] }
  - Mes actual destacado en azul, resto en gris
  - Tooltip: mes, km totales, cantidad de sesiones
Reutilizar el mismo estilo visual que el gráfico semanal para consistencia.
```

**Criterio de done:** Gráfico visible con datos reales, visualmente consistente con F-003.

---

### Tarea 4 — Gráfico tendencia de ritmo (F-005)

**Prompt para OpenCode:**
```
Leer CLAUDE.md, docs/specs/F-005-pace-trend.md
y docs/skills/skill-chart-component.md antes de comenzar.

Crear src/components/charts/pace-trend-chart.tsx:
  Props: { data: PaceTrendPoint[] }
  - LineChart de Recharts con una línea por tipo de sesión
  - Colores según el sistema definido en el skill:
      Base → #3b82f6, Long Run → #22c55e, Intervalos → #f97316, Sin clasificar → #94a3b8
  - Eje Y invertido: valores menores arriba (ritmo menor = más rápido)
  - Eje Y con tickFormatter usando formatPace() de transforms.ts
  - connectNulls={false} para no conectar gaps entre tipos
  - Tooltip personalizado: fecha, tipo, ritmo en formato M:SS
  - "use client" como primera línea
```

**Criterio de done:** Gráfico visible con líneas por tipo, eje Y invertido correctamente, tooltip con formato M:SS.

---

### Tarea 5 — Sección de gráficos en la página

**Prompt para OpenCode:**
```
Leer CLAUDE.md antes de comenzar.

Actualizar src/app/page.tsx para:
1. Calcular los datos para los tres gráficos usando las funciones de transforms.ts
   (server-side, antes del return)
2. Agregar sección de gráficos entre las KPI cards y la vista semanal:
   - Título de sección "Progreso"
   - WeeklyKmChart y MonthlyKmChart en una grilla de 2 columnas (1 en mobile)
   - PaceTrendChart a ancho completo debajo
3. Pasar los datos como props a cada componente (Server → Client)

Los componentes de gráfico son Client Components — asegurarse de que
los datos se calculan server-side y se pasan como props, no se fetchean
desde el cliente.
```

**Criterio de done:** Los 3 gráficos visibles con datos reales en la página, layout correcto.

---

## Commits de esta fase

```
feat(phase-3): add chart data transform functions
feat(phase-3): add WeeklyKmChart component (F-003)
feat(phase-3): add MonthlyKmChart component (F-004)
feat(phase-3): add PaceTrendChart component (F-005)
feat(phase-3): compose charts section in homepage
```

---

## Definición de done — Fase 3

- [ ] Gráfico de barras semanal con últimas 12 semanas
- [ ] Gráfico de barras mensual con últimos 6 meses
- [ ] Gráfico de líneas de ritmo por tipo de sesión con eje Y invertido
- [ ] Datos calculados server-side, pasados como props a Client Components
- [ ] `npm run build` sin errores
- [ ] Deploy en Vercel actualizado