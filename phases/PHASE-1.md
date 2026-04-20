# Phase 1 — Esqueleto & Conexión de datos

| Campo | Valor |
|-------|-------|
| Estado | ✅ Completa |
| Objetivo | Proyecto Next.js funcional con datos reales llegando desde Google Sheets |
| Entregable | Dashboard en Vercel mostrando datos crudos sin styling final |
| Prerequisito | Fase 0 completa, credenciales de Google Cloud configuradas |

---

## Qué incluye esta fase

Sin features de UI todavía. El objetivo es tener la infraestructura base funcionando:
data pipeline, tipos, estructura de carpetas, y deploy inicial.

---

## Tareas en orden de ejecución

### Tarea 1 — Scaffold del proyecto Next.js

**Prompt para OpenCode:**
```
Leer CLAUDE.md y docs/adr/ADR-001-stack.md antes de comenzar.

Crear el proyecto Next.js 15 con TypeScript estricto usando:
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir

Configurar tsconfig.json con strict: true.
Instalar dependencias: recharts googleapis.
Crear la estructura de carpetas definida en CLAUDE.md:
  src/app/, src/components/charts/, src/components/cards/,
  src/components/ui/, src/lib/, src/types/
No crear ningún componente todavía. Solo estructura vacía con index files.
```

**Criterio de done:** `npm run dev` corre sin errores, estructura de carpetas creada.

**Archivos que toca:** `package.json`, `tsconfig.json`, `src/` (estructura vacía)

---

### Tarea 2 — Tipos del dominio

**Prompt para OpenCode:**
```
Leer CLAUDE.md y docs/skills/skill-sheets-fetch.md antes de comenzar.

Crear src/types/activity.ts con los tipos definidos en el skill:
  - SessionType
  - Activity

No crear ningún otro archivo. Solo los tipos.
```

**Criterio de done:** `src/types/activity.ts` existe, compila sin errores con strict: true.

**Archivos que toca:** `src/types/activity.ts`

---

### Tarea 3 — Funciones de transformación

**Prompt para OpenCode:**
```
Leer CLAUDE.md y docs/skills/skill-sheets-fetch.md antes de comenzar.

Crear src/lib/transforms.ts con las funciones definidas en el skill:
  - parseMinutes(value: string): number
  - parseActivity(row: string[]): Activity | null
  - parseDate(value: string): Date (función interna)
  - parseSessionType(value: string): SessionType (función interna)
  - formatPace(decimalMinutes: number): string

Cada función debe tener un comentario explicando qué hace.
No modificar ningún otro archivo.
```

**Criterio de done:** `src/lib/transforms.ts` existe, todas las funciones tipadas, compila sin errores.

**Archivos que toca:** `src/lib/transforms.ts`

---

### Tarea 4 — Cliente Google Sheets API

**Prompt para OpenCode:**
```
Leer CLAUDE.md y docs/skills/skill-sheets-fetch.md antes de comenzar.

Crear src/lib/sheets.ts con la función getActivities() definida en el skill.
Las variables de entorno requeridas son:
  GOOGLE_SERVICE_ACCOUNT_EMAIL
  GOOGLE_PRIVATE_KEY
  GOOGLE_SHEET_ID

Crear también src/lib/sheets.ts con manejo de errores:
si la llamada falla, loguear el error y retornar [].

No modificar ningún otro archivo.
```

**Criterio de done:** `src/lib/sheets.ts` existe, importa desde `./transforms`, compila sin errores.

**Archivos que toca:** `src/lib/sheets.ts`

---

### Tarea 5 — Variables de entorno

**Prompt para OpenCode:**
```
Crear el archivo .env.local con las variables de entorno necesarias
para Google Sheets API (con valores placeholder, no reales):

GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-spreadsheet-id

Verificar que .env.local esté en .gitignore.
Si no está, agregarlo.
No commitear credenciales reales.
```

**Criterio de done:** `.env.local` existe con placeholders, está en `.gitignore`.

**Archivos que toca:** `.env.local`, `.gitignore`

> ⚠️ Después de esta tarea: reemplazar los placeholders con credenciales reales manualmente. OpenCode no debe ver ni tocar credenciales reales.

---

### Tarea 6 — Página principal con datos crudos

**Prompt para OpenCode:**
```
Leer CLAUDE.md antes de comenzar.

Modificar src/app/page.tsx para:
1. Llamar a getActivities() desde src/lib/sheets.ts (server-side)
2. Mostrar los datos en una tabla HTML básica sin styling:
   columnas: fecha, nombre, distancia, ritmo, tipo de sesión
3. Si no hay datos, mostrar el mensaje "No hay actividades"

No usar Tailwind todavía. No crear componentes nuevos.
El objetivo es verificar que los datos llegan correctamente desde el Sheet.
```

**Criterio de done:** La página muestra datos reales del Sheet en el navegador.

**Archivos que toca:** `src/app/page.tsx`

---

### Tarea 7 — Deploy inicial en Vercel

**Instrucciones manuales (no para OpenCode):**

1. Crear proyecto en vercel.com vinculado al repo `Joacoo2004/RunningDashboard`
2. Configurar variables de entorno en Vercel Dashboard → Settings → Environment Variables:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
3. Hacer push a `main` — Vercel despliega automáticamente
4. Verificar que la URL de producción muestra los datos

**Criterio de done:** URL de Vercel accesible, datos del Sheet visibles en producción.

> Actualizar `README.md` con la URL de producción una vez obtenida.

---

## Commits de esta fase

```
chore(phase-1): scaffold Next.js 15 project
feat(phase-1): add Activity types
feat(phase-1): add data transform functions
feat(phase-1): add Google Sheets API client
chore(phase-1): add env vars template
feat(phase-1): render raw activities on homepage
chore(phase-1): deploy to Vercel, add production URL to README
```

---

## Definición de done — Fase 1

- [ ] `npm run dev` corre sin errores
- [ ] `npm run build` compila sin errores de TypeScript
- [ ] Los datos del Sheet se muestran en la página principal
- [ ] El deploy en Vercel está funcionando con datos reales
- [ ] No hay credenciales en el repositorio