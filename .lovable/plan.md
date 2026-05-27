## Objetivo
Crear una página de agradecimiento a la que se redirija al usuario tras enviar cualquier formulario (Contacto, embed y Landing), para poder medir conversiones desde Google Tag Manager mediante un Page View dedicado.

## Cambios

### 1. Nueva página `src/pages/Gracias.tsx`
- Layout editorial coherente con el resto del sitio (Navbar + Footer en versión Contacto; en versión Landing, sin navbar para no romper el flujo).
- Contenido:
  - Eyebrow "Solicitud recibida"
  - H1 TAN-PEARL verde oscuro: "Gracias por tu interés"
  - Texto: "Hemos recibido tu solicitud. Nuestro equipo te contactará en menos de 24 horas para agendar tu visita en Alicante, Madrid u Online."
  - CTA "Volver al inicio" con estilo `btn-primary` + shimmer.
- SEO: `noindex` (vía Helmet) — no queremos indexar la página de gracias.
- Envía un `dataLayer.push({ event: 'form_submitted', form_source: <origen> })` al montar, además del Page View que GTM ya capta por la ruta.
- Soporta query param `?from=contacto|contacto-embed|landing` para distinguir el origen en GTM.

### 2. Registrar ruta en `src/App.tsx`
- `<Route path="/gracias" element={<Gracias />} />`

### 3. Redirección en los 3 formularios
En cada `handleSubmit` tras el `await fetch(...)` con éxito:
- Sustituir el `toast` de éxito + reset por `navigate('/gracias?from=<origen>')`.
- Mantener el `toast` de error en el catch.
- Orígenes:
  - `src/components/ContactSection.tsx` → `from=contacto`
  - `src/components/ContactFormEmbed.tsx` → `from=contacto-embed`
  - `src/pages/Landing.tsx` → `from=landing`
- Añadir `useNavigate` donde falte.

### 4. GTM
No hay que tocar el contenedor desde el código. La página `/gracias` quedará disponible para que configures en GTM:
- Trigger: Page View donde Page Path = `/gracias`
- (Opcional) Trigger por `event = form_submitted` con variable `form_source`.

## Detalles técnicos
- React Router v6: `useNavigate()` ya se usa en otras vistas.
- Helmet ya está disponible (`react-helmet-async`).
- No se cambia la lógica de Zapier (sigue `no-cors` + `x-www-form-urlencoded`); la redirección ocurre tras resolverse el `fetch`.
- El widget de ElevenLabs sigue oculto en Landing; en `/gracias` se mostrará con normalidad salvo que llegues desde `from=landing` (en cuyo caso lo ocultamos también para mantener coherencia visual).
