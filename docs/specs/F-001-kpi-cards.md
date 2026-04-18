# F-001 — KPI Cards

| Campo | Valor |
|-------|-------|
| Estado | Aprobado |
| Prioridad | Alta |
| Fase | 2 |
| Autor | Joaquin |

---

## Goal

Mostrar en el header del dashboard un resumen numérico del estado actual del entrenamiento, legible en menos de 5 segundos.

## User story

Como corredor, quiero ver mis métricas clave de un vistazo al abrir el dashboard, para entender rápidamente cómo va mi semana y mi mes sin leer ninguna tabla.

## Acceptance criteria

- [ ] Se muestran 4 KPI cards en la parte superior del dashboard
- [ ] Cada card tiene: etiqueta descriptiva, valor principal, y unidad de medida
- [ ] Los valores se calculan en tiempo real desde los datos del Sheet
- [ ] Si no hay datos para la semana actual, la card muestra `—` (no un error)
- [ ] El layout es responsive: 4 columnas en desktop, 2 en mobile

## Cards a mostrar

| Card | Valor | Cálculo |
|------|-------|---------|
| Km esta semana | Total km de la semana actual | Suma de `Distancia (km)` filtrando por semana ISO actual |
| Km este mes | Total km del mes actual | Suma de `Distancia (km)` filtrando por mes y año actual |
| Ritmo promedio (semana) | Ritmo promedio de la semana | Promedio de `Ritmo (min/km)` de la semana actual |
| Sesiones esta semana | Cantidad de salidas | Count de filas de la semana actual |

## Data requirements

- Fuente: Google Sheets API — hoja `Actividades`
- Columnas usadas: `Fecha`, `Distancia (km)`, `Ritmo (min/km)`
- La semana se calcula con lunes como primer día (ISO 8601)

## UI

Cards horizontales en grid de 4. Cada card muestra:
```
[ etiqueta pequeña arriba ]
[ valor grande           ]
[ unidad pequeña abajo   ]
```

## Edge cases

- Semana sin sesiones → mostrar `—` en lugar de `0` o `NaN`
- Valor de ritmo en formato `MM:SS` vs decimal → normalizar antes de promediar (ver nota de datos)
- Sheet vacío → mostrar estado de carga vacío, no error

## Nota de datos — normalización de Tiempo y Ritmo

El campo `Tiempo (min)` presenta valores mixtos: algunos en formato `MM.SS` (ej: `07.08`) y otros como minutos decimales (ej: `50.75`). El componente que consuma estos datos debe normalizar al mismo formato antes de operar. Definir una función utilitaria `parseMinutes(value: string): number` reutilizable.

## Out of scope

- Comparación con semana anterior en esta card (eso es F-003)
- Indicadores de tendencia (flechas arriba/abajo)
- Filtros por tipo de sesión