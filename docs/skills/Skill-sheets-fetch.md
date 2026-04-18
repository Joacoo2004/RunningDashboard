---
name: sheets-fetch
description: Cómo consumir Google Sheets API en RunningDashboard. Activar cuando se trabaje con src/lib/sheets.ts, Route Handlers de datos, o cualquier fetch a Google Sheets.
---

# Skill — Google Sheets Fetch

## Cuándo usar este skill

- Al crear o modificar `src/lib/sheets.ts`
- Al crear Route Handlers que devuelvan datos de actividades
- Al agregar nuevas columnas del Sheet al modelo de datos
- Ante cualquier duda sobre cómo autenticar o parsear datos del Sheet

---

## Dependencia requerida

```bash
npm install googleapis
```

---

## Autenticación — Service Account

La autenticación usa una Service Account de Google Cloud. Las credenciales
viven **únicamente en variables de entorno**. Nunca hardcodear, nunca commitear.

Variables requeridas en `.env.local` (desarrollo) y Vercel Dashboard (producción):

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdXXXXXXXXXXXXXXXX
```

⚠️ El `GOOGLE_PRIVATE_KEY` tiene saltos de línea como `\n` literales en el .env.
Al leerlo en código, reemplazar `\n` por saltos reales:

```typescript
privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
```

---

## Implementación base — src/lib/sheets.ts

```typescript
import { google } from 'googleapis'
import type { Activity } from '@/types/activity'
import { parseActivity } from './transforms'

const SHEET_NAME = 'Actividades'
const RANGE = `${SHEET_NAME}!A:I`

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
}

export async function getActivities(): Promise<Activity[]> {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: RANGE,
  })

  const rows = response.data.values
  if (!rows || rows.length < 2) return []

  // Fila 0 = headers, datos desde fila 1
  const [_headers, ...dataRows] = rows

  return dataRows
    .map(parseActivity)
    .filter((a): a is Activity => a !== null)
}
```

---

## Reglas de uso

- `getActivities()` es siempre llamada desde un **Server Component** o **Route Handler**
- Nunca importar `sheets.ts` desde un Client Component (`"use client"`)
- Usar `next: { revalidate: 3600 }` en fetch si se migra a fetch nativo (revalidar cada hora)
- Si la respuesta del Sheet tiene menos columnas de las esperadas, `parseActivity` debe manejar el caso sin tirar error

---

## Mapeo de columnas del Sheet

| Índice | Columna Sheet | Campo Activity |
|--------|--------------|----------------|
| 0 | ID | id |
| 1 | Nombre | nombre |
| 2 | Fecha | fecha |
| 3 | Distancia (km) | distanciaKm |
| 4 | Tiempo (min) | tiempoMin |
| 5 | Ritmo (min/km) | ritmoMinKm |
| 6 | Elevación (m) | elevacionM |
| 7 | Intervalos (Día 1) | intervalos |
| 8 | Tipo de Sesión | tipoSesion |

---

## parseActivity — src/lib/transforms.ts

```typescript
import type { Activity, SessionType } from '@/types/activity'

const SESSION_TYPES: SessionType[] = ['Base', 'Long Run', 'Intervalos']

export function parseActivity(row: string[]): Activity | null {
  try {
    return {
      id: Number(row[0]),
      nombre: row[1] ?? '',
      fecha: parseDate(row[2]),
      distanciaKm: parseFloat(row[3]) || 0,
      tiempoMin: parseMinutes(row[4]),
      ritmoMinKm: row[5] ?? '',
      elevacionM: parseFloat(row[6]) || 0,
      intervalos: row[7] || null,
      tipoSesion: parseSessionType(row[8]),
    }
  } catch {
    return null
  }
}

// Normaliza tiempo en formato mixto: "07.08" (MM.SS) o "50.75" (decimal)
export function parseMinutes(value: string): number {
  if (!value) return 0
  const num = parseFloat(value)
  if (isNaN(num)) return 0

  // Detectar formato MM.SS: parte decimal >= 0.60 no es válida como decimal
  const decimal = num % 1
  if (decimal > 0 && decimal < 1) {
    const decimalsStr = value.split('.')[1] ?? '0'
    const seconds = parseInt(decimalsStr.padEnd(2, '0').slice(0, 2))
    if (seconds >= 60) {
      // Es formato MM.SS
      const minutes = Math.floor(num)
      return minutes + seconds / 60
    }
  }
  return num
}

function parseDate(value: string): Date {
  // Formato DD/MM/YYYY
  const [day, month, year] = value.split('/')
  return new Date(Number(year), Number(month) - 1, Number(day))
}

function parseSessionType(value: string): SessionType {
  if (SESSION_TYPES.includes(value as SessionType)) {
    return value as SessionType
  }
  return 'Sin clasificar'
}
```

---

## Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `invalid_grant` | Private key con `\n` literales | Usar `.replace(/\\n/g, '\n')` |
| `The caller does not have permission` | Sheet no compartido con la service account | Compartir el Sheet con el email de la service account |
| `Unable to parse range` | Nombre de hoja incorrecto | Verificar que la hoja se llama exactamente `Actividades` |
| Filas vacías en los datos | Sheet tiene filas en blanco | El filtro `.filter((a) => a !== null)` las elimina |