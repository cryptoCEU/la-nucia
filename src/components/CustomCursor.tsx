import { useEffect, useRef, useCallback, useState } from "react";

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const hoverType = useRef<"default" | "pointer" | "image">("default");
  const visible = useRef(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12);
    ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12);

    const isPointer = hoverType.current === "pointer";
    const isImage = hoverType.current === "image";
    const scale = isImage ? 2.5 : isPointer ? 1.8 : 1;
    const baseSize = 36;
    const ringSize = baseSize * scale;
    const ringOffset = ringSize / 2;

    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${ringPos.current.x - ringOffset}px, ${ringPos.current.y - ringOffset}px, 0)`;
      ringRef.current.style.width = `${ringSize}px`;
      ringRef.current.style.height = `${ringSize}px`;
      ringRef.current.style.opacity = visible.current ? "1" : "0";
      ringRef.current.style.backgroundColor = (isPointer || isImage) ? "rgba(201,169,110,0.08)" : "transparent";
    }

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${pos.current.x - 3}px, ${pos.current.y - 3}px, 0)`;
      dotRef.current.style.opacity = visible.current ? "1" : "0";
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const checkDesktop = () => {
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsDesktop(!isTouchDevice && window.innerWidth > 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const style = document.createElement("style");
    style.textContent = "@media (hover: hover) { *, *::before, *::after { cursor: none !important; } }";
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
      if (target.closest("a, button, input, textarea, select, [role='button'], [data-cursor='pointer']")) {
        hoverType.current = "pointer";
        hovering.current = true;
      } else if (target.closest("img, [data-cursor='image']")) {
        hoverType.current = "image";
        hovering.current = true;
      } else {
        hoverType.current = "default";
        hovering.current = false;
      }
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
  }, [isDesktop, animate]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform"
        style={{
          opacity: 0,
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.2s ease, background-color 0.3s ease",
          borderRadius: "50%",
          border: "1.5px solid rgba(201,169,110,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          color: "rgba(201,169,110,0.8)",
          fontWeight: 300,
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform"
        style={{ opacity: 0, transition: "opacity 0.15s ease" }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "hsl(var(--accent))",
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
