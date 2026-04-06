import { useEffect, useRef, useCallback } from "react";

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const clicking = useRef(false);
  const visible = useRef(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    // Ring follows with smooth lag
    const speed = hovering.current ? 0.12 : 0.1;
    ringPos.current.x = lerp(ringPos.current.x, pos.current.x, speed);
    ringPos.current.y = lerp(ringPos.current.y, pos.current.y, speed);

    const ringSize = clicking.current ? 28 : hovering.current ? 56 : 36;
    const ringOffset = ringSize / 2;

    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${ringPos.current.x - ringOffset}px, ${ringPos.current.y - ringOffset}px, 0)`;
      ringRef.current.style.width = `${ringSize}px`;
      ringRef.current.style.height = `${ringSize}px`;
      ringRef.current.style.opacity = visible.current ? "1" : "0";
      ringRef.current.style.borderColor = hovering.current
        ? "rgba(201, 169, 110, 0.8)"
        : "rgba(255, 255, 255, 0.6)";
    }

    // Dot follows instantly
    if (dotRef.current) {
      const dotSize = clicking.current ? 6 : hovering.current ? 4 : 5;
      dotRef.current.style.transform = `translate3d(${pos.current.x - dotSize / 2}px, ${pos.current.y - dotSize / 2}px, 0)`;
      dotRef.current.style.width = `${dotSize}px`;
      dotRef.current.style.height = `${dotSize}px`;
      dotRef.current.style.opacity = visible.current ? "1" : "0";
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        ringPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      hovering.current = !!target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer, .card-hover, .hover-scale");
    };

    const onMouseDown = () => { clicking.current = true; };
    const onMouseUp = () => { clicking.current = false; };
    const onMouseLeave = () => { visible.current = false; };
    const onMouseEnter = () => { visible.current = true; };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId.current);
      document.head.removeChild(style);
    };
  }, [animate]);

  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Outer ring — thin, elegant, trails the dot */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform mix-blend-difference"
        style={{
          opacity: 0,
          transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease, border-color 0.4s ease",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ border: "1.5px solid rgba(255,255,255,0.6)" }}
        />
      </div>

      {/* Center dot — crisp, instant position */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform mix-blend-difference"
        style={{
          opacity: 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.15s ease",
        }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </div>
    </>
  );
};

export default CustomCursor;
