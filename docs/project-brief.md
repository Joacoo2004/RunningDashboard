# Project Brief — RunningDashboard

> Dashboard personal de análisis de entrenamiento de running

| Campo | Valor |
|-------|-------|
| Versión | v0.1 — draft |
| Autor | Joaquin |
| Fecha | Abril 2026 |
| Stack | Next.js 15 + TypeScript |
| Deploy | Vercel |

---

## Problema

El seguimiento del progreso como corredor se realiza hoy mediante un Google Sheet poblado automáticamente desde la API de Strava. A medida que se acumulan sesiones, el sheet crece a cientos de registros — lo que hace difícil detectar tendencias, comparar períodos o identificar mejoras de forma rápida y clara.

---

## Solución

Un dashboard web personal que consume los datos del Google Sheet y los presenta de forma visual: gráficos de progreso, comparaciones semana a semana y mes a mes, y KPIs clave por sesión. El objetivo es que en 30 segundos de apertura el usuario pueda leer su estado de entrenamiento sin procesar ningún dato crudo.

---

## Métricas principales

| Métrica | Prioridad |
|---------|-----------|
| Km por sesión | Alta |
| Ritmo (pace) por sesión | Alta |
| Tiempo por sesión | Alta |
| Km semanales acumulados | Alta |
| Km mensuales acumulados | Alta |
| Progreso de ritmo (tendencia) | Media |
| Tipo de sesión | Media |

---

## Scope

### Incluido (v1)

- Vista semanal de actividad
- Comparación semana a semana
- Comparación mes a mes
- Gráfico de tendencia de ritmo
- Tabla de sesiones recientes
- KPI cards en header

### Fuera de scope (v1)

- Multi-usuario / autenticación
- Edición de datos desde el dashboard
- Sync directo con Strava API (el pipeline Strava → Google Sheets ya existe)
- Planes de entrenamiento
- Notificaciones / alertas
- App móvil nativa

---

## Fases de entrega

### Fase 0 — Setup & Documentación
Repo, CLAUDE.md, ADRs, specs, MCPs configurados. Sin código de negocio.

### Fase 1 — Esqueleto & Conexión de datos
Layout base, conexión a Google Sheets API, datos renderizados sin styling.

### Fase 2 — KPIs & Vista semanal
Cards de resumen y vista de semana actual. Primera versión funcional y deployada.

### Fase 3 — Comparaciones & Tendencias
Gráficos semana/mes, tendencia de ritmo, tabla de sesiones.

### Fase 4 — Polish & Deploy estable
Diseño final, responsive, optimizaciones, Vercel production.

---

## Criterios de éxito

| Dimensión | Criterio |
|-----------|----------|
| Funcional | El sistema consume datos reales y los muestra correctamente |
| Metodológico | Adherencia a SDD: el código nunca precede al spec |
| Control | Historial de commits limpio y descriptivo por fase |
| Herramientas IA | Uso documentado de OpenCode + MCPs en el proceso |
| Buenas prácticas | TypeScript estricto, componentes reutilizables, env vars seguras |
| Personal | El dashboard reemplaza al sheet como herramienta de seguimiento diario |

---

## Fuente de datos

- **Origen:** Strava API → Google Sheets (pipeline ya existente)
- **Consumo:** Google Sheets API desde Next.js (server-side)
- **Credenciales:** Variables de entorno, nunca en el repo

---

*Documento vivo — actualizar versión ante cambios de scope o decisiones relevantes.*
