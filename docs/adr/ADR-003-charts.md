# ADR-003 — Librería de gráficos

| Campo | Valor |
|-------|-------|
| Estado | Aceptado |
| Fecha | Abril 2026 |
| Autor | Joaquin |

---

## Contexto

El dashboard requiere múltiples tipos de visualización: gráficos de línea para tendencia de ritmo, barras para km semanales/mensuales, y posiblemente área para comparaciones. Se prioriza: (1) atractivo visual por defecto, (2) integración nativa con React/Next.js, (3) facilidad de uso.

## Opciones consideradas

| Librería | Integración React | Atractivo default | Facilidad | Notas |
|----------|:-----------------:|:-----------------:|:---------:|-------|
| **Recharts** | Nativa | Bueno | Alta | Composable, basado en SVG |
| Nivo | Nativa | Excelente | Media | Más configuración, muy personalizable |
| Chart.js | Via wrapper | Bueno | Alta | Originalmente para vanilla JS |
| Tremor | Nativa | Excelente | Muy alta | Componentes completos, menos control |
| D3.js | Manual | Total control | Baja | Demasiado low-level para este caso |

## Decisión

**Recharts.**

- API completamente declarativa y composable — cada parte del gráfico es un componente React
- Integración natural con Next.js App Router (Client Components)
- Responsive por defecto via `ResponsiveContainer`
- Con Tailwind para colores y tipografía, el resultado visual es muy bueno
- Amplia documentación y comunidad activa

## Consecuencias

**Positivas**
- Curva de aprendizaje baja — un gráfico básico funciona en ~10 líneas
- OpenCode conoce bien Recharts y puede generar componentes correctos
- Fácil customización progresiva — se empieza simple y se refina

**Negativas / trade-offs**
- Menos "wow" visual out-of-the-box que Nivo (se compensa con Tailwind)
- Renderiza en SVG — no ideal para datasets muy grandes (no aplica a este caso)

## Tipos de gráfico a usar

| Feature | Tipo de gráfico | Componente Recharts |
|---------|----------------|---------------------|
| Tendencia de ritmo | Línea | `LineChart` |
| Km por semana | Barras | `BarChart` |
| Km por mes | Barras agrupadas | `BarChart` |
| Comparación semanas | Área | `AreaChart` |

---

*Revisión sugerida: si se necesita más control estético en fases posteriores, evaluar migrar visualizaciones puntuales a Nivo.*