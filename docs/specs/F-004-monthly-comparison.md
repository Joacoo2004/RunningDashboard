# F-004 — Comparación mes a mes

| Campo | Valor |
|-------|-------|
| Estado | Aprobado |
| Prioridad | Media |
| Fase | 3 |
| Autor | Joaquin |

---

## Goal

Visualizar el volumen mensual de entrenamiento para detectar progresión a largo plazo.

## User story

Como corredor, quiero ver un gráfico con los kilómetros totales por mes, para entender mi progresión a lo largo del tiempo y detectar meses de mayor o menor carga.

## Acceptance criteria

- [ ] Se muestra un gráfico de barras con una barra por mes
- [ ] El eje X muestra el mes y año (ej: "Feb 26", "Mar 26")
- [ ] El eje Y muestra kilómetros totales
- [ ] Se muestran los últimos 6 meses por defecto
- [ ] El mes actual se destaca visualmente
- [ ] Al hacer hover se muestra: mes, km totales, cantidad de sesiones
- [ ] El gráfico es responsive

## Data requirements

- Fuente: Google Sheets API — hoja `Actividades`
- Columnas usadas: `Fecha`, `Distancia (km)`
- Agrupación: sumar `Distancia (km)` por mes + año
- Período: últimos 6 meses desde el mes actual
- Meses sin actividad → incluir con valor `0`

## Transformación de datos requerida

```
Input: lista de actividades con fecha y distancia
Output: array de { mes: string, km: number, sesiones: number }

Ejemplo:
[
  { mes: "2026-02", label: "Feb 26", km: 24.3, sesiones: 7 },
  { mes: "2026-03", label: "Mar 26", km: 31.8, sesiones: 9 },
  { mes: "2026-04", label: "Abr 26", km: 18.2, sesiones: 5 },
]
```

## UI

Gráfico de barras (`BarChart` de Recharts), visualmente similar a F-003 para consistencia. Misma paleta de colores: mes actual destacado, resto neutro.

## Edge cases

- Menos de 6 meses de datos → mostrar los disponibles
- Mes actual en curso → mostrar con datos parciales, sin indicación especial
- Mes sin sesiones → barra en 0, no omitir

## Out of scope

- Desglose por tipo de sesión dentro del mes
- Comparación de un mes contra el mismo mes del año anterior
- Selector de rango de meses personalizado