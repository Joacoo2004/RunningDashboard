# RunningDashboard

Dashboard web personal para análisis de entrenamiento de running. Consume datos de un Google Sheet poblado automáticamente desde Strava y los presenta con gráficos, comparaciones y métricas semanales y mensuales.

---

## Stack

| Tecnología | Uso |
|------------|-----|
| Next.js 15 (App Router) | Framework principal |
| TypeScript (strict) | Tipado estático |
| Tailwind CSS | Estilos |
| Recharts | Gráficos |
| Google Sheets API v4 | Fuente de datos |
| Vercel | Deploy |

---

## Arquitectura de datos

```
Strava → Google Apps Script → Google Sheet → Google Sheets API → Dashboard
```

El pipeline Strava → Google Sheet ya existe y está operativo. Este proyecto consume el Sheet como fuente de datos — no se conecta directamente a Strava.

---

## Funcionalidades (v1)

- **KPI Cards** — resumen de km semanales, km mensuales, ritmo promedio y sesiones de la semana
- **Vista semanal** — sesiones de la semana actual con navegación entre semanas
- **Comparación semana a semana** — gráfico de barras de las últimas 12 semanas
- **Comparación mes a mes** — gráfico de barras de los últimos 6 meses
- **Tendencia de ritmo** — gráfico de líneas por tipo de sesión (Base, Long Run, Intervalos)
- **Tabla de sesiones** — historial de las últimas sesiones con paginación

---

## Metodología

Este proyecto sigue **Spec-Driven Development (SDD)**. Toda la documentación existe antes del código. El orden de trabajo es:

```
Project Brief → ADRs → Feature Specs → Implementation Plan → Código
```

El agente de desarrollo (OpenCode) trabaja siempre sobre specs aprobados. No se implementa nada que no tenga spec.

---

## Estructura del proyecto

```
RunningDashboard/
├── .opencode/
│   └── skills/              ← skills instalados desde skills.sh
├── docs/
│   ├── project-brief.md     ← qué es y qué no es este proyecto
│   ├── adr/                 ← decisiones técnicas documentadas
│   ├── specs/               ← specs de cada feature
│   └── skills/              ← patrones reutilizables para el agente
├── phases/                  ← plan de trabajo por fase
├── src/
│   ├── app/                 ← Next.js App Router
│   ├── components/          ← componentes React
│   ├── lib/                 ← cliente Google Sheets API y transforms
│   └── types/               ← tipos TypeScript del dominio
├── CLAUDE.md                ← contexto persistente para OpenCode
└── opencode.jsonc           ← configuración de MCPs
```

---

## Fases de desarrollo

| Fase | Contenido | Estado |
|------|-----------|--------|
| 0 | Setup & Documentación completa | ✅ Completa |
| 1 | Esqueleto & Conexión a Google Sheets | ⬜ Pendiente |
| 2 | KPI Cards & Vista semanal | ⬜ Pendiente |
| 3 | Comparaciones & Tendencia de ritmo | ⬜ Pendiente |
| 4 | Polish & Deploy estable | ⬜ Pendiente |

---

## Setup local

### Requisitos

- Node.js 18+
- Una cuenta de Google Cloud con la Sheets API habilitada
- Acceso al Google Sheet con los datos de Strava

### Variables de entorno

Crear `.env.local` en la raíz con:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=id-de-tu-spreadsheet
```

> Las credenciales se obtienen creando una Service Account en Google Cloud Console y compartiendo el Sheet con el email de la service account.

### Instalación

```bash
git clone https://github.com/Joacoo2004/RunningDashboard.git
cd RunningDashboard
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Deploy

El proyecto hace deploy automático en Vercel en cada push a `main`. Las variables de entorno están configuradas en el panel de Vercel — no en el repo.

**URL de producción:** _se agrega al completar la Fase 1_

---

## Documentación

- [Project Brief](docs/project-brief.md)
- [ADR-001 — Stack](docs/adr/ADR-001-stack.md)
- [ADR-002 — Fuente de datos](docs/adr/ADR-002-datasource.md)
- [ADR-003 — Gráficos](docs/adr/ADR-003-charts.md)
- [ADR-004 — Deploy](docs/adr/ADR-004-deploy.md)

---

## Convención de commits

```
docs: descripción           ← documentación, specs, ADRs
feat(phase-N): descripción  ← nueva feature
fix: descripción            ← corrección de bug
refactor: descripción       ← refactor sin cambio de comportamiento
chore: descripción          ← setup, dependencias, config
```