# F-003 — Comparación semana a semana

| Campo | Valor |
|-------|-------|
| Estado | Aprobado |
| Prioridad | Alta |
| Fase | 3 |
| Autor | Joaquin |

---

## Goal

Visualizar la evolución del volumen de entrenamiento semana a semana mediante un gráfico de barras, permitiendo detectar tendencias de carga a lo largo del tiempo.

## User story

Como corredor, quiero ver un gráfico con los kilómetros de cada semana de los últimos meses, para identificar si estoy aumentando mi volumen de entrenamiento de forma progresiva.

## Acceptance criteria

- [ ] Se muestra un gráfico de barras con una barra por semana
- [ ] El eje X muestra el identificador de semana (ej: "S14", "S15") o rango de fechas
- [ ] El eje Y muestra kilómetros totales
- [ ] Se muestran las últimas 12 semanas por defecto
- [ ] La semana actual se destaca visualmente (color diferente)
- [ ] Al hacer hover sobre una barra se muestra: semana, km totales, cantidad de sesiones
- [ ] El gráfico es responsive

## Data requirements

- Fuente: Google Sheets API — hoja `Actividades`
- Columnas usadas: `Fecha`, `Distancia (km)`
- Agrupación: sumar `Distancia (km)` por número de semana ISO + año
- Período: últimas 12 semanas desde la semana actual
- Semanas sin actividad → incluir con valor `0` (no omitir)

## Transformación de datos requerida

```
Input: lista de actividades con fecha y distancia
Output: array de { semana: string, km: number, sesiones: number }

Ejemplo:
[
  { semana: "2026-W14", km: 12.5, sesiones: 3 },
  { semana: "2026-W15", km: 0,    sesiones: 0 },
  { semana: "2026-W16", km: 18.2, sesiones: 4 },
]
```

## UI

Gráfico de barras (`BarChart` de Recharts) con:
- Tooltip personalizado mostrando km y cantidad de sesiones
- Barra de la semana actual en color destacado (azul)
- Resto de barras en color neutro (gris)
- Etiquetas del eje X rotadas si es necesario para legibilidad

## Edge cases

- Semana sin sesiones → barra en 0, no omitir del gráfico
- Menos de 12 semanas de datos → mostrar las disponibles sin error
- Semana parcial (semana actual en curso) → mostrar igualmente con los datos disponibles

## Out of scope

- Selección de período personalizado (últimas N semanas)
- Comparación por tipo de sesión dentro de cada barra (stacked bar)
- Exportar el gráfico como imagen