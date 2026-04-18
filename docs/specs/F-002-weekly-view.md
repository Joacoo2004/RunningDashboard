# F-002 — Vista semanal

| Campo | Valor |
|-------|-------|
| Estado | Aprobado |
| Prioridad | Alta |
| Fase | 2 |
| Autor | Joaquin |

---

## Goal

Mostrar todas las sesiones de la semana actual en una vista consolidada, diferenciando el tipo de entrenamiento de cada una.

## User story

Como corredor, quiero ver un resumen visual de mis sesiones de la semana actual, para entender qué hice cada día y cómo se distribuye mi carga de entrenamiento.

## Acceptance criteria

- [ ] Se listan todas las sesiones de la semana actual (lunes a domingo)
- [ ] Cada sesión muestra: fecha, nombre, distancia, tiempo, ritmo, tipo de sesión
- [ ] El tipo de sesión se diferencia visualmente (color o badge)
- [ ] Los días sin sesión se muestran como días vacíos (no se omiten)
- [ ] Se puede navegar a la semana anterior y siguiente con flechas
- [ ] La semana actual es la vista por defecto al abrir

## Data requirements

- Fuente: Google Sheets API — hoja `Actividades`
- Columnas usadas: `Fecha`, `Nombre`, `Distancia (km)`, `Tiempo (min)`, `Ritmo (min/km)`, `Tipo de Sesión`
- Filtro: registros cuya `Fecha` pertenece a la semana seleccionada
- Ordenar por `Fecha` ascendente

## Tipos de sesión — codificación visual

| Tipo de Sesión | Color sugerido |
|----------------|----------------|
| `Base` | Azul |
| `Long Run` | Verde |
| `Intervalos` | Naranja/Coral |
| Sin tipo (`null` / vacío) | Gris |

## UI

Vista de lista o cards verticales, una por sesión. Encabezado con rango de fechas de la semana y controles de navegación (`← semana anterior` / `semana siguiente →`). Cada item muestra:

```
[ Lunes 14/04 ]  [ Long Run ]
Carrera por la mañana
7.68 km  ·  50:08 min  ·  6:31 min/km
```

## Edge cases

- Semana sin sesiones → mostrar mensaje "Sin actividad esta semana"
- Sesión con `Tipo de Sesión` vacío → mostrar badge "Sin clasificar" en gris
- Navegación hacia el futuro → deshabilitar botón "semana siguiente" si la semana siguiente no tiene datos
- Tiempo en formato mixto → usar `parseMinutes()` definida en F-001

## Out of scope

- Editar o eliminar sesiones desde esta vista
- Agregar sesiones manualmente
- Filtrar por tipo de sesión dentro de la semana