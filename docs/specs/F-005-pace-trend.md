# F-005 — Gráfico de tendencia de ritmo

| Campo | Valor |
|-------|-------|
| Estado | Aprobado |
| Prioridad | Alta |
| Fase | 3 |
| Autor | Joaquin |

---

## Goal

Visualizar la evolución del ritmo (pace) sesión a sesión, diferenciando por tipo de entrenamiento, para detectar mejoras reales en el rendimiento.

## User story

Como corredor, quiero ver cómo evoluciona mi ritmo a lo largo del tiempo diferenciado por tipo de sesión, para saber si realmente estoy corriendo más rápido en cada tipo de entrenamiento.

## Acceptance criteria

- [ ] Se muestra un gráfico de línea con el ritmo de cada sesión en el tiempo
- [ ] El eje X muestra la fecha de cada sesión
- [ ] El eje Y muestra el ritmo en `min/km` (valores menores = más rápido = arriba del gráfico)
- [ ] Cada tipo de sesión tiene su propia línea con color distinto
- [ ] Las sesiones sin tipo asignado forman una línea separada ("Sin clasificar")
- [ ] Al hacer hover se muestra: fecha, nombre de la sesión, ritmo, tipo
- [ ] El gráfico muestra las últimas 30 sesiones por defecto
- [ ] El gráfico es responsive

## Data requirements

- Fuente: Google Sheets API — hoja `Actividades`
- Columnas usadas: `Fecha`, `Ritmo (min/km)`, `Tipo de Sesión`, `Nombre`
- Ordenar por `Fecha` ascendente
- Período: últimas 30 sesiones

## Nota importante — eje Y invertido

En running, un ritmo menor es mejor (6:00 min/km es más rápido que 7:00 min/km). El gráfico debe configurarse con el eje Y de forma que valores menores aparezcan **arriba** — esto es contra-intuitivo en Recharts y requiere configuración explícita (`domain` y `reversed`).

## Transformación de datos requerida

```
Input: lista de actividades con fecha, ritmo y tipo
Output: datos separados por tipo para Recharts MultiLine

Tipos a separar: Base | Long Run | Intervalos | Sin clasificar
```

## Codificación visual de líneas

| Tipo | Color |
|------|-------|
| Base | Azul |
| Long Run | Verde |
| Intervalos | Coral/Naranja |
| Sin clasificar | Gris |

## Edge cases

- Sesión con ritmo vacío o `0` → excluir del gráfico (no conectar la línea)
- Tipo de sesión nuevo no contemplado → asignar a "Sin clasificar"
- Ritmo en formato string `"6:31"` → convertir a número decimal para graficar, mostrar en formato `MM:SS` en tooltip
- Menos de 30 sesiones → mostrar las disponibles

## Out of scope

- Línea de tendencia (regresión) sobre el gráfico
- Filtro interactivo por tipo de sesión
- Comparación de ritmo por distancia (pace vs distance curve)