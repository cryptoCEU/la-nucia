

## Plan: Add AI Agent "Julia" Card to Contact Page

Add a fourth info card in the "¿Quieres más información?" grid for the AI assistant Julia, referencing the ElevenLabs conversational widget already embedded in the site.

### Changes

**`src/pages/Contacto.tsx`**:
- Import a suitable icon (e.g., `Bot` or `MessageCircle` from lucide-react)
- Change the grid from `md:grid-cols-3` to `md:grid-cols-4` (or keep 3 cols with 4 items wrapping nicely)
- Add a fourth `motion.div` card after "Formulario" with:
  - Bot/AI icon in the circular container
  - Title: "Julia, Asistente IA"
  - Description: something like "Habla con Julia, nuestra asistente virtual, en la esquina inferior derecha"
  - Optionally make it clickable to trigger/highlight the ElevenLabs widget

### Layout consideration
With 4 cards, switching to `md:grid-cols-2 lg:grid-cols-4` would maintain balance across breakpoints.

