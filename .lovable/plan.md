

## Plan: Move stats from Hero to a new standalone section

### Changes

1. **`src/components/HeroHome.tsx`** — Remove the stats bar (lines 6-9 for the data, lines 73-101 for the JSX). The hero becomes cleaner, ending after the CTA buttons.

2. **`src/components/StatsSection.tsx`** (new) — New section with the same two stats (107 viviendas, 9 zonas comunes) displayed in a visually prominent layout. Full-width section with a clean background, large numbers with animated count-in using `framer-motion`, and descriptive text beside each number. Two-column grid on desktop, stacked on mobile.

3. **`src/pages/Index.tsx`** — Import `StatsSection` and place it between `HeroHome` and `DescriptionSection`.

