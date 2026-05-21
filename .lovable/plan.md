## Conectar el formulario de contacto con Monday.com

Monday.com no está disponible como connector nativo de Lovable, así que la integración se hará usando la **API GraphQL de Monday** desde una edge function segura (Lovable Cloud). El token de Monday se guarda como secreto, nunca expuesto en el frontend.

### Cómo funcionará

```
Formulario (ContactFormEmbed)
        │  POST con { nombre, telefono, email, tipologia }
        ▼
Edge Function `submit-to-monday`
        │  GraphQL mutation create_item
        ▼
Tablero de Monday.com → nuevo lead como item
```

Se mantendrá también el webhook actual (`form-la-nucia-lovable.vercel.app`) en paralelo, o se sustituye — a confirmar.

### Lo que necesitas preparar en Monday

1. **API Token personal**: Monday → avatar → Developers → My Access Tokens → copiar token v2.
2. **Board ID**: abre el tablero, la URL contiene `/boards/1234567890` → ese número.
3. **Columnas del tablero** que recibirán los datos (recomendado):
   - Nombre (columna por defecto del item)
   - Teléfono (tipo Phone)
   - Email (tipo Email)
   - Tipología (tipo Text o Status con opciones "2 dormitorios", "3 dormitorios", "4 dormitorios")
   - Idioma (opcional, Text)
   - Fecha (opcional, Date — se rellena automática)
   
   Necesitaré los **IDs internos** de cada columna (Monday → columna → ⋮ → Edit column → el ID aparece). Si prefieres, puedo añadir una llamada inicial que liste las columnas del board y te las muestre para mapearlas.

### Pasos de implementación

1. **Activar Lovable Cloud** en el proyecto (necesario para edge functions y secretos).
2. **Añadir el secreto** `MONDAY_API_TOKEN` (vía la herramienta segura — tú pegas el valor en un formulario).
3. **Crear edge function** `supabase/functions/submit-to-monday/index.ts`:
   - Recibe POST con `{ nombre, telefono, email, tipologia, idioma }`.
   - Valida con Zod (campos requeridos, email válido, teléfono presente).
   - Hace GraphQL POST a `https://api.monday.com/v2` con `mutation { create_item(...) }` mapeando a las columnas del board.
   - CORS habilitado, devuelve `{ ok: true }` o error.
4. **Actualizar `ContactFormEmbed.tsx`** para llamar `supabase.functions.invoke('submit-to-monday', ...)` en vez del webhook actual (o además).
5. **Probar** enviando un lead de prueba y verificando que aparece como item en el tablero.

### Preguntas antes de implementar

- ¿Tienes ya el API token y el board ID de Monday a mano?
- ¿Quieres **sustituir** el webhook actual de Vercel, o que los leads se envíen a **ambos** sitios?
- ¿La columna "Tipología" en tu board es de tipo **Status** (con opciones predefinidas) o **Text** libre?

Confirma y procedo con la implementación.