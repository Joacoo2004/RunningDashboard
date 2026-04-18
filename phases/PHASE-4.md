# Phase 4 — Polish & Deploy estable

| Campo | Valor |
|-------|-------|
| Estado | ⬜ Pendiente |
| Objetivo | Dashboard visualmente pulido, con interactividad completa y deploy estable |
| Entregable | Versión final del dashboard en producción |
| Prerequisito | Fase 3 completa |

---

## Qué incluye esta fase

Esta fase no agrega features nuevas — mejora lo que ya existe:
diseño final, navegación entre semanas, paginación de la tabla,
y optimizaciones de rendimiento.

---

## Tareas en orden de ejecución

### Tarea 1 — Navegación entre semanas (F-002 interactividad)

**Prompt para OpenCode:**
```
Leer CLAUDE.md y docs/specs/F-002-weekly-view.md antes de comenzar.

Convertir src/components/cards/weekly-view.tsx en un Client Component
para agregar navegación entre semanas:
  - Agregar "use client" y useState para weekOffset
  - Botones ← y → para navegar entre semanas
  - Deshabilitar → cuando weekOffset === 0 (semana actual)
  - El componente recibe todas las actividades como prop y filtra client-side
  - Mostrar el rango de fechas de la semana activa en el encabezado

Props: { activities: Activity[] }
```

**Criterio de done:** Navegación funciona, botón → deshabilitado en semana actual.

---

### Tarea 2 — Paginación en tabla de sesiones (F-006)

**Prompt para OpenCode:**
```
Leer CLAUDE.md y docs/specs/F-006-sessions-table.md antes de comenzar.

Convertir src/components/cards/sessions-table.tsx en un Client Component
para agregar paginación:
  - Mostrar 10 sesiones por página
  - Botón "Ver más" que carga las siguientes 10
  - Ocultar "Ver más" cuando no quedan más sesiones
  - Usar useState para el estado de paginación

Props: { activities: Activity[] }
```

**Criterio de done:** Paginación funciona, botón "Ver más" se oculta al agotar los datos.

---

### Tarea 3 — Diseño y layout final

**Prompt para OpenCode:**
```
Leer CLAUDE.md y docs/skills/skill-chart-component.md antes de comenzar.
Leer también .opencode/skills/frontend-design/SKILL.md para referencia de diseño.

Revisar y mejorar el diseño visual de toda la página:
  - Tipografía consistente y jerarquía visual clara
  - Espaciado y padding uniformes
  - KPI cards con fondo sutil diferenciado
  - Secciones con títulos y separadores claros
  - Colores consistentes con el sistema definido en skill-chart-component.md
  - Dark mode básico usando las clases de Tailwind (dark:)

No cambiar la lógica ni la estructura de componentes.
Solo ajustes de Tailwind CSS.
```

**Criterio de done:** Dashboard visualmente coherente, dark mode funcionando.

---

### Tarea 4 — Loading states y manejo de errores

**Prompt para OpenCode:**
```
Leer CLAUDE.md antes de comenzar.

Agregar manejo de estados vacíos y errores:
  1. Crear src/app/loading.tsx con un skeleton de carga básico
  2. Crear src/app/error.tsx con un mensaje de error amigable
  3. En cada componente que recibe datos, verificar que el array no esté vacío
     antes de renderizar — mostrar mensaje apropiado si está vacío

No usar librerías externas. Solo Next.js built-ins y Tailwind.
```

**Criterio de done:** Loading skeleton visible, error boundary funcionando, estados vacíos manejados.

---

### Tarea 5 — Optimizaciones de rendimiento

**Prompt para OpenCode:**
```
Leer CLAUDE.md antes de comenzar.

Agregar revalidación de caché en src/lib/sheets.ts:
  Configurar que Next.js revalide los datos del Sheet cada 3600 segundos (1 hora).
  Usar la opción next: { revalidate: 3600 } en la llamada a la API.

Verificar que todos los Server Components usen async/await correctamente.
No hacer cambios de lógica, solo optimización de caché.
```

**Criterio de done:** Caché configurado, `npm run build` sin warnings de rendimiento.

---

### Tarea 6 — Revisión final y deploy estable

**Instrucciones manuales:**

1. Correr `npm run build` localmente — cero errores y cero warnings de TypeScript
2. Revisar el dashboard en producción (Vercel) en desktop y mobile
3. Verificar que los datos son correctos comparando con el Sheet
4. Actualizar `README.md`:
   - URL de producción final
   - Estado de todas las fases en la tabla como ✅
5. Crear un tag de versión en git: `git tag v1.0.0`

---

## Commits de esta fase

```
feat(phase-4): add week navigation to WeeklyView
feat(phase-4): add pagination to SessionsTable
feat(phase-4): polish design and layout
feat(phase-4): add loading and error states
perf(phase-4): add cache revalidation for Sheets API
chore(phase-4): final review, update README, tag v1.0.0
```

---

## Definición de done — Fase 4 (proyecto completo)

- [ ] Navegación entre semanas funcional en WeeklyView
- [ ] Paginación funcional en SessionsTable
- [ ] Diseño visual coherente con dark mode
- [ ] Loading skeleton y error boundary implementados
- [ ] Caché de datos configurado (revalidate: 3600)
- [ ] `npm run build` sin errores ni warnings
- [ ] Dashboard funcional en desktop y mobile
- [ ] README actualizado con URL de producción
- [ ] Tag v1.0.0 creado en el repo