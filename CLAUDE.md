# CLAUDE.md — RunningDashboard

Este archivo es leído automáticamente por OpenCode al iniciar cada sesión.
Leerlo completo antes de escribir cualquier código o sugerir cualquier cambio.

---

## Qué es este proyecto

Dashboard web personal para análisis de entrenamiento de running. Consume datos
de un Google Sheet (poblado automáticamente desde Strava) y los presenta con
gráficos, comparaciones y métricas. Proyecto personal desarrollado con metodología
Spec-Driven Development (SDD).

**Repositorio:** github.com/Joacoo2004/RunningDashboard
**Deploy:** Vercel (automático en cada push a `main`)
**Estado actual:** ver sección "Fase actual" al final de este archivo

---

## Stack

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 15 | Framework principal, App Router |
| TypeScript | 5.x | Estricto (`strict: true`) |
| Tailwind CSS | 3.x | Estilos |
| Recharts | 2.x | Gráficos |
| Google Sheets API | v4 | Fuente de datos |

---

## Estructura del proyecto

```
running-dashboard/
├── CLAUDE.md                      ← este archivo
├── mcp.json                       ← configuración MCP servers
├── docs/
│   ├── project-brief.md           ← qué es y qué no es este proyecto
│   ├── adr/                       ← decisiones técnicas (leer antes de proponer cambios)
│   │   ├── ADR-001-stack.md
│   │   ├── ADR-002-datasource.md
│   │   ├── ADR-003-charts.md
│   │   └── ADR-004-deploy.md
│   ├── specs/                     ← specs de cada feature (leer SIEMPRE antes de implementar)
│   │   ├── F-001-kpi-cards.md
│   │   ├── F-002-weekly-view.md
│   │   ├── F-003-weekly-comparison.md
│   │   ├── F-004-monthly-comparison.md
│   │   ├── F-005-pace-trend.md
│   │   └── F-006-sessions-table.md
│   └── skills/                    ← patrones reutilizables para este proyecto
│       ├── skill-sheets-fetch.md
│       └── skill-chart-component.md
├── src/
│   ├── app/                       ← App Router de Next.js
│   ├── components/                ← componentes React
│   │   ├── charts/                ← componentes de gráficos (Recharts)
│   │   ├── cards/                 ← KPI cards y cards de sesión
│   │   └── ui/                    ← componentes base reutilizables
│   ├── lib/
│   │   ├── sheets.ts              ← cliente Google Sheets API
│   │   └── transforms.ts          ← funciones de transformación de datos
│   └── types/
│       └── activity.ts            ← tipos TypeScript del dominio
└── phases/
    ├── PHASE-0.md
    ├── PHASE-1.md
    └── ...
```

---

## Reglas de trabajo — OBLIGATORIAS

### Antes de implementar cualquier feature
1. Revisar los skills disponibles en `docs/skills/` — puede haber un patrón ya definido
2. Leer el spec correspondiente en `docs/specs/`
3. Verificar que el spec tenga estado "Aprobado"
4. No implementar nada que no esté en el spec — si falta algo, preguntar

### Antes de proponer cambios de stack o arquitectura
1. Leer los ADRs relevantes en `docs/adr/`
2. No sugerir reemplazar tecnologías ya decididas sin justificación explícita

### TypeScript
- `strict: true` siempre — nunca usar `any`
- Todos los tipos del dominio van en `src/types/`
- El tipo principal es `Activity` definido en `src/types/activity.ts`

### Componentes
- Server Components por defecto
- Agregar `"use client"` solo cuando sea estrictamente necesario (interactividad, hooks)
- Los gráficos de Recharts son siempre Client Components
- Nombrar componentes en PascalCase, archivos en kebab-case

### Datos y API
- El fetch a Google Sheets ocurre SIEMPRE server-side (nunca exponer credenciales al cliente)
- Las credenciales viven en variables de entorno — nunca hardcodear
- Usar la función utilitaria `parseMinutes()` en `src/lib/transforms.ts` para normalizar
  el campo `Tiempo (min)` del Sheet (tiene valores mixtos MM.SS y decimales)

### Variables de entorno requeridas
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
```
En desarrollo: archivo `.env.local` (está en `.gitignore`, nunca al repo).
En producción: configuradas en Vercel Dashboard.

### Instalación de dependencias
No instalar dependencias nuevas sin consultar primero. Si una dependencia es
necesaria, proponer primero y esperar confirmación.

---

## Schema del Google Sheet

Hoja: `Actividades`

| Columna | Tipo | Notas |
|---------|------|-------|
| ID | number | ID de actividad Strava |
| Nombre | string | Nombre de la sesión |
| Fecha | string | Formato DD/MM/YYYY |
| Distancia (km) | number | Km de la sesión |
| Tiempo (min) | string | ⚠️ Formato mixto: MM.SS o decimal |
| Ritmo (min/km) | string | Formato MM:SS |
| Elevación (m) | number | Metros de desnivel acumulado |
| Intervalos (Día 1) | string | Descripción del intervalo si aplica |
| Tipo de Sesión | string | `Base` / `Long Run` / `Intervalos` / vacío |

**Atención:** el campo `Tiempo (min)` tiene inconsistencias de formato. Usar
siempre `parseMinutes(value)` de `src/lib/transforms.ts` antes de operar con él.

---

## Tipo principal — Activity

```typescript
// src/types/activity.ts
export type SessionType = 'Base' | 'Long Run' | 'Intervalos' | 'Sin clasificar'

export interface Activity {
  id: number
  nombre: string
  fecha: Date
  distanciaKm: number
  tiempoMin: number        // siempre en minutos decimales, ya normalizado
  ritmoMinKm: string       // formato "M:SS"
  elevacionM: number
  intervalos: string | null
  tipoSesion: SessionType
}
```

---

## Convención de commits

```
docs: descripción        ← documentación, specs, ADRs
feat(phase-N): descripción  ← nueva feature
fix: descripción         ← corrección de bug
refactor: descripción    ← refactor sin cambio de comportamiento
chore: descripción       ← setup, dependencias, config
```

---

## Fase actual

**FASE 0 — Setup & Documentación** (en curso)

Documentación completa antes de escribir código de negocio.
Ver `phases/PHASE-0.md` para el detalle de qué incluye esta fase.

Próxima fase: **FASE 1 — Esqueleto & Conexión de datos**