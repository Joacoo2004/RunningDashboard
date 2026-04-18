# F-006 — Tabla de sesiones recientes

| Campo | Valor |
|-------|-------|
| Estado | Aprobado |
| Prioridad | Media |
| Fase | 2 |
| Autor | Joaquin |

---

## Goal

Mostrar un listado tabular de las últimas sesiones con todos sus datos, como referencia rápida y punto de entrada a los detalles de cada actividad.

## User story

Como corredor, quiero ver una tabla con mis sesiones más recientes y sus métricas, para tener una referencia rápida de lo que hice sin tener que abrir el Google Sheet.

## Acceptance criteria

- [ ] Se muestran las últimas 10 sesiones por defecto
- [ ] Cada fila contiene: fecha, nombre, distancia, tiempo, ritmo, elevación, tipo de sesión
- [ ] El tipo de sesión se muestra como badge con color (mismo sistema que F-002)
- [ ] La tabla está ordenada por fecha descendente (más reciente primero)
- [ ] Hay un botón "Ver más" que carga las siguientes 10 sesiones (paginación simple)
- [ ] La tabla es responsive: en mobile se puede hacer scroll horizontal

## Data requirements

- Fuente: Google Sheets API — hoja `Actividades`
- Columnas usadas: todas (`ID`, `Nombre`, `Fecha`, `Distancia (km)`, `Tiempo (min)`, `Ritmo (min/km)`, `Elevación (m)`, `Tipo de Sesión`)
- Ordenar por `Fecha` descendente
- Paginación: 10 registros por página, cargados en el cliente

## Columnas de la tabla

| Columna | Dato fuente | Formato mostrado |
|---------|-------------|-----------------|
| Fecha | `Fecha` | `DD/MM/YYYY` |
| Sesión | `Nombre` | Texto |
| Distancia | `Distancia (km)` | `X.XX km` |
| Tiempo | `Tiempo (min)` | `MM:SS` (normalizado) |
| Ritmo | `Ritmo (min/km)` | `M:SS min/km` |
| Elevación | `Elevación (m)` | `X m` |
| Tipo | `Tipo de Sesión` | Badge con color |

## Edge cases

- Sesión sin `Tipo de Sesión` → badge "Sin clasificar" en gris
- `Tiempo (min)` en formato mixto → normalizar con `parseMinutes()` de F-001
- Menos de 10 sesiones → mostrar las disponibles, ocultar botón "Ver más"
- `Elevación` vacía o `0` → mostrar `—`

## Out of scope

- Ordenamiento por columna (click en header)
- Filtrado por tipo de sesión
- Detalle expandible de cada sesión
- Enlace directo a la actividad en Strava