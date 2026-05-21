import { useEffect, useRef, useState } from "react";
import atardecerImg from "@/assets/ext02-atardecer.webp";

const IMAGE_URL = atardecerImg;
const MASK_COLOR = "#F5F3F2";

/**
 * Scroll-driven "fixed image window" section.
 * The image stays fixed to the viewport while the page masks scroll over it,
 * revealing the image only through the transparent band.
 */
const FixedImageWindow = ({
  phrase = "Donde el Mediterráneo define el estilo de vida",
}: {
  phrase?: string;
}) => {
  const bandRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [isIOS, setIsIOS] = useState(false);

  // iOS Safari fallback: position:fixed inside some scroll contexts can break.
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent;
    const iOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (ua.includes("Mac") && "ontouchend" in document);
    setIsIOS(iOS);
  }, []);

  useEffect(() => {
    if (!isIOS || !imgRef.current) return;
    let raf = 0;
    const update = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(0, ${window.scrollY}px, 0)`;
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isIOS]);

  return (
    <>
      {/* Fixed image layer (sits behind masked sections) */}
      <div
        ref={imgRef}
        aria-hidden
        style={{
          position: isIOS ? "absolute" : "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
          backgroundImage: `url(${IMAGE_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          pointerEvents: "none",
        }}
      />

      {/* Transparent band — the "window" */}
      <section
        ref={bandRef}
        className="fiw-band"
        style={{
          position: "relative",
          zIndex: 5,
          background: "transparent",
          width: "100%",
          height: "50vh",
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <style>{`
          .fiw-band::before,
          .fiw-band::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            height: 40px;
            pointer-events: none;
            z-index: 1;
          }
          .fiw-band::before {
            top: 0;
            background: linear-gradient(to bottom, ${MASK_COLOR}, rgba(245,243,242,0));
          }
          .fiw-band::after {
            bottom: 0;
            background: linear-gradient(to top, ${MASK_COLOR}, rgba(245,243,242,0));
          }
          @media (max-width: 768px) {
            .fiw-band { height: 40vh !important; }
          }
        `}</style>
        <h2
          style={{
            position: "relative",
            zIndex: 2,
            margin: 0,
            padding: "0 1.5rem",
            textAlign: "center",
            fontFamily: "'TAN - PEARL', 'TAN Pearl', serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 3.6vw, 48px)",
            lineHeight: 1.15,
            color: "#F5F3F2",
            textShadow: "0 2px 24px rgba(0,0,0,0.45)",
            maxWidth: "18ch",
          }}
        >
          {phrase}
        </h2>
      </section>
    </>
  );
};

export default FixedImageWindow;
