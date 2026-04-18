# ADR-002 — Fuente de datos

| Campo | Valor |
|-------|-------|
| Estado | Aceptado |
| Fecha | Abril 2026 |
| Autor | Joaquin |

---

## Contexto

Los datos de entrenamiento se originan en Strava. Ya existe un pipeline funcional que sincroniza automáticamente las actividades de Strava a un Google Sheet via Google Apps Script y la Strava V3 API. El dashboard debe consumir esos datos de alguna forma.

## Opciones consideradas

### Opción A — Consumir Strava API directamente
Hacer el fetch desde el dashboard directo a la Strava V3 API.

**Descartada.** El pipeline Strava → Google Sheets ya funciona y está probado. Duplicar esa integración agrega complejidad sin beneficio. Además, Strava tiene rate limits estrictos en el plan gratuito.

### Opción B — Exportar el Sheet a JSON estático
Generar un archivo JSON desde el Sheet y subirlo al repo manualmente.

**Descartada.** Requiere intervención manual cada vez que hay nuevos datos. Rompe la automatización existente.

### Opción C — Google Sheets API (server-side) ✓
Consumir el Google Sheet directamente desde Next.js usando la Google Sheets API v4, en un Server Component o Route Handler.

**Seleccionada.**

## Decisión

**Google Sheets API v4 consumida server-side desde Next.js.**

- Las credenciales (Service Account JSON) se configuran como variables de entorno en Vercel
- El fetch ocurre en Server Components — los datos nunca se exponen al cliente
- Se implementa caché con `revalidate` de Next.js para no golpear la API en cada render

## Consecuencias

**Positivas**
- Reutiliza el pipeline existente sin modificarlo
- Datos siempre actualizados (cada vez que Strava → Sheet sincroniza, el dashboard lo refleja)
- Credenciales seguras via env vars, nunca en el repo

**Negativas / trade-offs**
- Dependencia de Google Sheets como capa de datos (no es una DB real)
- Si el schema del Sheet cambia, hay que actualizar los mapeos en el código
- Requiere configurar una Service Account en Google Cloud Console (setup inicial)

## Variables de entorno requeridas

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
```

Estas variables se configuran en Vercel Dashboard → Settings → Environment Variables. **Nunca van al repositorio.**

---

*Revisión sugerida: si el volumen de datos crece significativamente, evaluar migrar a una DB (PostgreSQL/Supabase) con sync desde el Sheet.*