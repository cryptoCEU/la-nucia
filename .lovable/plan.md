

## Plan: Make Julia Card Click Open ElevenLabs Widget

The ElevenLabs widget (`elevenlabs-convai`) is embedded in `index.html` as a custom element. When clicking the Julia card, we'll programmatically find and click the widget's trigger button to open it, plus add a visual pulse animation to draw attention.

### Changes

**`src/pages/Contacto.tsx`**:
- Make the Julia `motion.div` clickable with `cursor-pointer` and an `onClick` handler
- The handler queries the DOM for the `elevenlabs-convai` element and simulates a click on its shadow DOM button, or falls back to scrolling to it and adding a highlight animation
- Add a subtle hover state to indicate it's interactive (e.g., `hover:bg-primary/5 rounded-2xl p-4 -m-4 transition-colors`)

### Implementation detail
```typescript
const handleJuliaClick = () => {
  const widget = document.querySelector('elevenlabs-convai');
  if (widget?.shadowRoot) {
    const button = widget.shadowRoot.querySelector('button');
    button?.click();
  } else if (widget) {
    (widget as HTMLElement).click();
  }
};
```

