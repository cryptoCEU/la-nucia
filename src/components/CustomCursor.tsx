import { useEffect, useRef, useCallback } from "react";

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const visible = useRef(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    // Smooth follow for ring
    ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.15);
    ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.15);

    const ringSize = hovering.current ? 48 : 32;
    const ringOffset = ringSize / 2;

    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${ringPos.current.x - ringOffset}px, ${ringPos.current.y - ringOffset}px, 0)`;
      ringRef.current.style.width = `${ringSize}px`;
      ringRef.current.style.height = `${ringSize}px`;
      ringRef.current.style.opacity = visible.current ? "1" : "0";
    }

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${pos.current.x - 3}px, ${pos.current.y - 3}px, 0)`;
      dotRef.current.style.opacity = visible.current && !hovering.current ? "1" : "0";
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Add cursor:none style
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        // Snap ring to position on first move
        ringPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      hovering.current = !!target.closest("a, button, input, textarea, select, [role='button']");
    };

    const onMouseLeave = () => { visible.current = false; };
    const onMouseEnter = () => { visible.current = true; };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId.current);
      document.head.removeChild(style);
    };
  }, [animate]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Outer ring - mix-blend-difference ensures contrast on any background */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform"
        style={{ opacity: 0, transition: "width 0.3s ease, height 0.3s ease, opacity 0.2s ease" }}
      >
        <div className="w-full h-full rounded-full border-2 border-primary/70" />
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform"
        style={{ opacity: 0, transition: "opacity 0.15s ease" }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
      </div>
    </>
  );
};

export default CustomCursor;
