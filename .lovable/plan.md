

## Problem

The Navbar starts transparent and only becomes green (`bg-primary/95`) after scrolling 50px. On the homepage this works because the hero has a dark background, but on sub-pages (Caracteristicas, Galeria, Ubicacion, Contacto) the header area behind the navbar is light-colored (e.g. `bg-sand`, `bg-primary`), and before scrolling the white text on transparent background is hard to read.

## Solution

Make the Navbar aware of whether it's on the homepage or a sub-page. On non-home routes (excluding `/landing`), always apply the solid green background (`bg-primary/95`) regardless of scroll position.

### Changes

**`src/components/Navbar.tsx`**:
- Derive `isHome` from `location.pathname === "/"` or `location.pathname === "/landing"`.
- Change the header className logic: if `!isHome`, always use `bg-primary/95 backdrop-blur-md shadow-lg`. Only apply the transparent-to-solid scroll behavior on the home page.

This is a single-line conditional change — roughly:
```tsx
const isHome = location.pathname === "/" || location.pathname === "/landing";
// ...
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
  scrolled || !isHome
    ? "bg-primary/95 backdrop-blur-md shadow-lg"
    : "bg-transparent"
}`}
```

No other files need changes.

