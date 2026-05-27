## Objetivo
En la landing, en la vista móvil, la primera pantalla (sin scroll) debe mostrar únicamente los textos del hero y un indicador de scroll en la parte inferior. El formulario queda debajo del fold y aparece al hacer scroll.

## Cambios en `src/pages/Landing.tsx`

1. **Layout del hero en móvil**
   - Cambiar el grid de la sección hero para que en móvil ocupe dos "pantallas" verticales: bloque de textos con `min-h-screen` (centrado verticalmente) y formulario en una segunda sección con altura natural.
   - En desktop (`md:`) mantener el grid actual de 2 columnas y altura única.

2. **Indicador de scroll (solo móvil)**
   - Añadir al final del bloque de textos, posicionado en la parte inferior del viewport en móvil, un pequeño indicador animado:
     - Texto corto en mayúsculas tipo "Descubre más" (con i18n simple en español) con tracking amplio.
     - Icono `ChevronDown` de lucide-react con animación `animate-bounce` suave.
   - Oculto en `md:hidden`.
   - Color blanco/dorado coherente con el resto de la landing.

3. **Espaciados**
   - Eliminar el `gap-40` grande entre textos y form en móvil (ya no es necesario porque el form pasa a otra "pantalla").
   - Mantener el comportamiento desktop sin cambios visuales.

4. **Degradado del video**
   - Mantener el degradado vertical actual en móvil y horizontal en desktop. Sin cambios.

## Lo que NO cambia
- Contenido del hero ni del formulario.
- Resto de secciones de la landing (Ubicación, Viviendas, Galería, Contacto).
- Comportamiento en desktop/tablet.