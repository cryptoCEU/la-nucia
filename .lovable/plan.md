## Objetivo
Quitar la conexión de Google (Search Console) que se vinculó al proyecto y dejar únicamente el snippet de Google Tag Manager (`GTM-NM89HWWB`) que tú proporcionaste.

## Cambios

1. **Desconectar la integración de Google**
   - Llamar a `standard_connectors--disconnect` sobre la conexión `Marketing Activum` (`google_search_console`, id `std_01krk8851te2fbevty48q20eye`).
   - Esto elimina los secretos del proyecto pero deja la conexión disponible en tu workspace por si más adelante la quieres re-vincular.

2. **Conservar tal cual el código de GTM en `index.html`**
   - Script de GTM en `<head>` (líneas 6–12) → se mantiene.
   - `<noscript>` de GTM en `<body>` (líneas 88–91) → se mantiene.
   - No se toca el `meta google-site-verification` (es solo verificación pasiva de dominio, no carga scripts de Google).

3. **No tocar el resto**
   - `src/pages/Gracias.tsx` mantiene su `dataLayer.push({ event: 'form_submitted' })` porque ese evento lo consume tu propio contenedor GTM.
   - Fuentes de Google Fonts y enlaces a Google Maps en componentes no son tracking; permanecen.

## Resultado
- Cero conexiones de Google activas en el proyecto.
- Solo queda el contenedor GTM `GTM-NM89HWWB` cargando, listo para que tú configures GA4 / Ads / etc. desde la UI de Tag Manager sin interferencias.
