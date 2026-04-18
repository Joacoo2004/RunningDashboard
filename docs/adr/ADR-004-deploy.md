# ADR-004 — Estrategia de deploy

| Campo | Valor |
|-------|-------|
| Estado | Aceptado |
| Fecha | Abril 2026 |
| Autor | Joaquin |

---

## Contexto

El dashboard debe estar accesible desde el navegador en todo momento, sin necesidad de ejecutar código localmente. Se busca una solución gratuita, con deploys automáticos ante cada push, y que soporte variables de entorno seguras.

## Opciones consideradas

| Opción | Costo | Deploy automático | Env vars | Soporte Next.js |
|--------|:-----:|:-----------------:|:--------:|:---------------:|
| **Vercel** | Gratis (Hobby) | Sí | Sí | Nativo |
| Netlify | Gratis (tier) | Sí | Sí | Bueno |
| Railway | Créditos gratis | Sí | Sí | Bueno |
| VPS propio | Tiempo de setup | Manual | Manual | Manual |

## Decisión

**Vercel Hobby plan + GitHub como repositorio remoto.**

El flujo es:
```
git push → GitHub → Vercel detecta el push → redeploy automático (~30s) → URL actualizada
```

- Cada push a `main` actualiza la URL de producción
- Cada branch/PR genera una URL de preview independiente
- Las variables de entorno se configuran una vez en Vercel Dashboard y persisten
- HTTPS automático

## Consecuencias

**Positivas**
- Completamente gratuito para uso personal
- Zero configuración adicional — Vercel detecta Next.js automáticamente
- Preview deployments permiten ver cambios antes de mergear a main
- Las credenciales de Google Sheets viven en Vercel, nunca en el repo

**Negativas / trade-offs**
- El Hobby plan de Vercel no permite uso comercial (no aplica — proyecto personal)
- Dependencia de un servicio externo para el deploy

## Convención de branches

| Branch | Propósito | Deploy |
|--------|-----------|--------|
| `main` | Producción estable | URL de producción |
| `phase-N` | Desarrollo de cada fase | URL de preview |
| `feat/nombre` | Features individuales | URL de preview |

## Variables de entorno

Configuradas en Vercel Dashboard → Project → Settings → Environment Variables:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
GOOGLE_SHEET_ID
```

El archivo `.env.local` se usa solo en desarrollo local y está en `.gitignore`.

---

*Revisión sugerida: no aplica para v1. Vercel Hobby es suficiente para el ciclo de vida previsto de este proyecto.*