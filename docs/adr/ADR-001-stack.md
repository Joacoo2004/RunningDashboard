# ADR-001 — Stack tecnológico

| Campo | Valor |
|-------|-------|
| Estado | Aceptado |
| Fecha | Abril 2026 |
| Autor | Joaquin |

---

## Contexto

Se necesita un stack para construir un dashboard web personal de análisis de running. El proyecto será desarrollado con asistencia de agentes de IA (OpenCode), deployado en Vercel, y mantenido por una sola persona. No requiere autenticación ni multi-usuario en v1.

## Opciones consideradas

| Opción | Motivo de descarte |
|--------|--------------------|
| React + Vite | Sin SSR nativo, más configuración manual para deploy |
| Remix | Curva de aprendizaje mayor, ecosistema más chico |
| Vue / Nuxt | Sin experiencia previa, no aporta ventaja sobre Next.js |
| **Next.js 15 + TypeScript** | **Seleccionado** |

## Decisión

**Next.js 15 con TypeScript estricto.**

- App Router para estructura de rutas y layouts
- Server Components para el fetch de datos (Google Sheets API se llama server-side)
- TypeScript estricto (`strict: true`) desde el inicio
- Tailwind CSS para estilos

## Consecuencias

**Positivas**
- Deploy en Vercel sin configuración adicional (Vercel es el creador de Next.js)
- Server Components eliminan la necesidad de un backend separado para consumir la API de Google Sheets
- El desarrollador tiene experiencia previa con Next.js 15
- OpenCode tiene excelente soporte para este stack

**Negativas / trade-offs**
- App Router tiene más conceptos que aprender vs Pages Router
- Server Components requieren atención a la separación client/server

---

*Revisión sugerida: si el proyecto escala a multi-usuario, evaluar agregar NextAuth.js (ya usado en proyectos anteriores).*