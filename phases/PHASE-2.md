# Phase 2 — KPI Cards & Vista semanal

| Campo | Valor |
|-------|-------|
| Estado | ✅ Completa |
| Objetivo | Primera versión útil del dashboard con métricas reales |
| Entregable | Dashboard deployado con KPI cards y vista semanal funcional |
| Prerequisito | Fase 1 completa — datos llegando correctamente desde Google Sheets |
| Specs | F-001, F-002, F-006 |

---

## Tareas en orden de ejecución

### Tarea 1 — Funciones de agregación de datos

**Prompt para OpenCode:**
```
Leer CLAUDE.md, docs/specs/F-001-kpi-cards.md y docs/specs/F-002-weekly-view.md
antes de comenzar.

Agregar a src/lib/transforms.ts las siguientes funciones de agregación:
  - getWeekActivities(activities: Activity[], date?: Date): Activity[]
    Filtra actividades de la semana ISO que contiene `date` (default: hoy).
    Lunes como primer día de semana.
  - getMonthActivities(activities: Activity[], date?: Date): Activity[]
    Filtra actividades del mes de `date` (default: hoy).
  - calcWeeklyKm(activities: Activity[]): number
  - calcMonthlyKm(activities: Activity[]): number
  - calcAveragePace(activities: Activity[]): string
    Retorna el ritmo promedio en formato "M:SS". Si no hay actividades, retorna "—".

No modificar ningún otro archivo.
```

**Criterio de done:** Funciones tipadas, compilan sin errores, cubren edge cases de semana vacía.

---

### Tarea 2 — Componente KPI Card base

**Prompt para OpenCode:**
```
Leer CLAUDE.md y docs/specs/F-001-kpi-cards.md antes de comenzar.

Crear src/components/cards/kpi-card.tsx:
  Props: { label: string, value: string | number, unit?: string }
  UI: etiqueta pequeña arriba, valor grande en el centro, unidad pequeña abajo.
  Usar Tailwind para los estilos.
  Es un Server Component (sin "use client").

No crear la grilla de cards todavía. Solo el componente individual.
```

**Criterio de done:** Componente creado, tipado, compila sin errores.

---

### Tarea 3 — Sección KPI Cards en homepage

**Prompt para OpenCode:**
```
Leer CLAUDE.md y docs/specs/F-001-kpi-cards.md antes de comenzar.

Modificar src/app/page.tsx para:
1. Calcular los 4 KPIs usando las funciones de src/lib/transforms.ts:
   - Km esta semana
   - Km este mes
   - Ritmo promedio de la semana (formato M:SS, "—" si no hay datos)
   - Sesiones esta semana
2. Renderizar 4 <KpiCard /> en una grilla de 4 columnas (2 en mobile).
3. Mantener la tabla de datos crudos debajo por ahora.

Usar solo Server Components.
```

**Criterio de done:** 4 cards visibles con datos reales, responsive en mobile.

---

### Tarea 4 — Badge de tipo de sesión

**Prompt para OpenCode:**
```
Leer CLAUDE.md y docs/specs/F-002-weekly-view.md antes de comenzar.

Crear src/components/ui/session-badge.tsx:
  Props: { type: SessionType }
  Renderiza un badge con el nombre del tipo y color según:
    Base → azul
    Long Run → verde
    Intervalos → naranja
    Sin clasificar → gris
  Es un Server Component.
```

**Criterio de done:** Badge creado con los 4 colores, compila sin errores.

---

### Tarea 5 — Componente Vista semanal

**Prompt para OpenCode:**
```
Leer CLAUDE.md y docs/specs/F-002-weekly-view.md antes de comenzar.

Crear src/components/cards/weekly-view.tsx:
  Props: { activities: Activity[], weekOffset?: number }
  - weekOffset=0 es la semana actual, weekOffset=-1 es la semana anterior, etc.
  - Mostrar encabezado con rango de fechas de la semana
  - Listar las sesiones de esa semana con: fecha, nombre, distancia, tiempo, ritmo, badge de tipo
  - Días sin sesión NO se muestran (simplificar respecto al spec original)
  - Si no hay sesiones: mostrar "Sin actividad esta semana"
  Es un Server Component.

No agregar navegación entre semanas todavía (eso es interactividad, Fase 4).
```

**Criterio de done:** Componente muestra sesiones de la semana actual con datos reales.

---

### Tarea 6 — Componente Tabla de sesiones (F-006)

**Prompt para OpenCode:**
```
Leer CLAUDE.md y docs/specs/F-006-sessions-table.md antes de comenzar.
Leer también docs/skills/skill-sheets-fetch.md para el mapeo de columnas.

Crear src/components/cards/sessions-table.tsx:
  Props: { activities: Activity[] }
  - Mostrar las últimas 10 sesiones ordenadas por fecha descendente
  - Columnas: Fecha, Sesión, Distancia, Tiempo, Ritmo, Elevación, Tipo
  - Usar <SessionBadge /> para la columna Tipo
  - Elevación vacía o 0 → mostrar "—"
  - Sin paginación todavía (se agrega en Fase 4)
  Es un Server Component.
  Usar Tailwind para los estilos. Tabla responsive con scroll horizontal en mobile.
```

**Criterio de done:** Tabla visible con datos reales, badge de tipo correcto, responsive.

---

### Tarea 7 — Composición final de la página

**Prompt para OpenCode:**
```
Leer CLAUDE.md antes de comenzar.

Actualizar src/app/page.tsx para componer el layout final de esta fase:
  1. KPI Cards (grilla de 4)
  2. Vista semanal (semana actual)
  3. Tabla de sesiones recientes

Eliminar la tabla de datos crudos de la Fase 1.
Agregar un título y estructura básica de layout con Tailwind.
Mantener todo como Server Components.
```

**Criterio de done:** Layout completo visible, sin datos crudos, deploy en Vercel funcional.

---

## Commits de esta fase

```
feat(phase-2): add data aggregation functions
feat(phase-2): add KpiCard component
feat(phase-2): add KPI cards section to homepage
feat(phase-2): add SessionBadge component
feat(phase-2): add WeeklyView component
feat(phase-2): add SessionsTable component (F-006)
feat(phase-2): compose final phase-2 layout
```

---

## Definición de done — Fase 2

- [ ] 4 KPI cards con datos reales de la semana y mes actual
- [ ] Vista semanal mostrando sesiones de la semana actual
- [ ] Tabla con las últimas 10 sesiones y badges de tipo
- [ ] Layout compuesto y limpio, sin datos crudos
- [ ] `npm run build` sin errores
- [ ] Deploy en Vercel actualizado y funcional