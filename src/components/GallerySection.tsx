import React, { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";

import extFrontal from "@/assets/gallery/ext-frontal.webp";
import extAtardecer from "@/assets/gallery/ext-atardecer.webp";
import zcFitness from "@/assets/gallery/zc-fitness.webp";
import zcComun from "@/assets/gallery/zc-comun.webp";
import zcRecepcion from "@/assets/gallery/ext-entrada-noche.webp";
import zcPiscina from "@/assets/gallery/zc-piscina.webp";

type GalleryImage = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  imgStyle?: React.CSSProperties;
};

const exteriorImageAssets = [extFrontal, zcRecepcion, extAtardecer];
const exteriorStyles: (React.CSSProperties | undefined)[] = [
  { objectPosition: "center 80%" },
  undefined,
  { objectPosition: "center 80%" },
];

const zonasImageAssets = [zcFitness, zcComun, zcPiscina];
const zonasStyles: (React.CSSProperties | undefined)[] = [
  undefined,
  undefined,
  { objectPosition: "center 85%" },
];

const useGalleryImages = () => {
  const { t } = useTranslation();
  const exteriores = (t("gallerySection.exteriores", { returnObjects: true }) as Array<Omit<GalleryImage, "src" | "imgStyle">>).map(
    (item, i) => ({ ...item, src: exteriorImageAssets[i], imgStyle: exteriorStyles[i] }) as GalleryImage,
  );
  const zonas = (t("gallerySection.zonas", { returnObjects: true }) as Array<Omit<GalleryImage, "src" | "imgStyle">>).map(
    (item, i) => ({ ...item, src: zonasImageAssets[i], imgStyle: zonasStyles[i] }) as GalleryImage,
  );
  return { exteriores, zonas };
};

// Backwards compat for Landing.tsx which imports zonasImages directly
export const zonasImages: GalleryImage[] = zonasImageAssets.map((src, i) => ({
  src,
  alt: ["Sala fitness", "Sala común", "Piscina"][i],
  eyebrow: "ZONAS COMUNES",
  title: ["Sala fitness", "Sala común", "Piscina"][i],
  description: "",
  imgStyle: zonasStyles[i],
}));

export { STYLES as GALLERY_STYLES };





const STYLES = `
  .lng-gallery {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, clamp(220px, 26vw, 320px));
    gap: 2px;
    width: 100%;
  }
  .lng-gallery.cols-2 {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, clamp(260px, 32vw, 420px));
  }
  .lng-gallery.cols-2 .lng-grid-lines > .v1 { left: calc(50% - 1px); }
  .lng-gallery.cols-2 .lng-grid-lines > .v2 { display: none; }
  .lng-gallery.rows-1 {
    grid-template-rows: clamp(320px, 38vw, 520px);
  }
  .lng-gallery.rows-1 .lng-grid-lines::before { display: none; }


  .lng-cell {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: #1F1D1A;
    z-index: 30;
  }
  .lng-cell-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.35s ease;
  }
  .lng-cell.is-hidden {
    background: transparent;
  }
  .lng-cell.is-hidden .lng-cell-img {
    opacity: 0;
  }
  .lng-expanded {
    position: absolute;
    inset: 0;
    z-index: 20;
    overflow: hidden;
    pointer-events: none;
  }
  .lng-expanded-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.45s ease;
  }
  .lng-expanded-img.is-active {
    opacity: 1;
  }
  .lng-overlay {
    position: absolute;
    inset: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .lng-cell.is-active .lng-overlay {
    opacity: 1;
  }
  .lng-overlay-box {
    background: rgba(13, 58, 42, 0.55);
    backdrop-filter: blur(4px);
    border-radius: 4px;
    padding: 24px 32px;
    max-width: 480px;
    text-align: left;
  }
  .lng-overlay-eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 11px;
    letter-spacing: 0.18em;
    color: rgba(244,250,240,0.7);
    text-transform: uppercase;
    margin: 0;
  }
  .lng-overlay-title {
    font-family: 'TAN - PEARL', 'TAN Pearl', serif;
    font-weight: normal;
    font-size: 28px;
    color: #f4faf0;
    margin: 10px 0 0 0;
    line-height: 1.3;
    letter-spacing: 0.02em;
  }
  .lng-overlay-desc {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 14px;
    line-height: 1.7;
    color: rgba(244,250,240,0.88);
    margin: 12px 0 0 0;
  }

  /* Mobile: stack cells, overlay on scroll-into-view */
  @media (max-width: 767px) {
    .lng-gallery {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(6, 70vw);
    }
    .lng-overlay { padding: 12px; align-items: flex-end; }
    .lng-overlay-box {
      padding: 14px 16px;
      max-width: 100%;
      max-height: calc(100% - 24px);
      overflow-y: auto;
    }
    .lng-overlay-title { font-size: 20px; margin-top: 4px; }
    .lng-overlay-desc { font-size: 13px; line-height: 1.55; margin-top: 8px; }
    .lng-cell.lng-tapped .lng-overlay {
      opacity: 1;
    }
  }
`;

interface GalleryGridProps {
  title: string;
  images: GalleryImage[];
  onOpen: (images: GalleryImage[], idx: number) => void;
  cols?: 2 | 3;
  rows?: 1 | 2;
}

export const GalleryGrid = ({ title, images, onOpen, cols = 3, rows = 2 }: GalleryGridProps) => {

  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [visibleIdx, setVisibleIdx] = useState<Set<number>>(new Set());
  const cellRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIdx((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (entry.isIntersecting) next.add(idx);
            else next.delete(idx);
          });
          return next;
        });
      },
      { threshold: 0.6 },
    );
    cellRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isMobile, images.length]);

  // Close on outside click
  React.useEffect(() => {
    if (activeIdx === null) return;
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setActiveIdx(null);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [activeIdx]);

  const handleClick = (i: number) => {
    if (isMobile) {
      onOpen(images, i);
      return;
    }
    onOpen(images, i);
  };

  return (
    <section className="w-full">
      <h2
        className="px-6 md:px-12 mb-10 md:mb-14"
        style={{
          fontFamily: "'TAN - PEARL', 'TAN Pearl', serif",
          fontWeight: "normal",
          fontSize: "clamp(32px, 4vw, 52px)",
          lineHeight: 1.15,
          color: "#0d3a2a",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </h2>
      <div
        ref={containerRef}
        className={`lng-gallery ${cols === 2 ? "cols-2" : ""} ${rows === 1 ? "rows-1" : ""}`}
        onMouseLeave={() => !isMobile && setActiveIdx(null)}
      >
        {/* Expanded preview layer (under the cells) */}
        <div className="lng-expanded" aria-hidden="true">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt=""
              className={`lng-expanded-img ${activeIdx === i ? "is-active" : ""}`}
              style={img.imgStyle}
              loading={i < 1 ? "eager" : "lazy"}
              draggable={false}
            />
          ))}
        </div>


        {/* Hotspot cells (always present as a static grid) */}
        {images.map((img, i) => {
          const isActive = activeIdx === i;
          const isHidden = activeIdx !== null;
          return (
            <div
              key={i}
              ref={(el) => (cellRefs.current[i] = el)}
              data-idx={i}
              className={`lng-cell ${visibleIdx.has(i) ? "lng-tapped" : ""} ${isActive ? "is-active" : ""} ${isHidden ? "is-hidden" : ""}`}
              onMouseEnter={() => !isMobile && setActiveIdx(i)}
              onClick={() => handleClick(i)}
              role="button"
              tabIndex={0}
              aria-label={`Abrir ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="lng-cell-img"
                style={img.imgStyle}
                loading={i < 3 ? "eager" : "lazy"}
                draggable={false}
              />
              <div className="lng-overlay">
                <div className="lng-overlay-box">
                  
                  <h3 className="lng-overlay-title">{img.title}</h3>
                  <p className="lng-overlay-desc">{img.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const GallerySection = () => {
  const { t } = useTranslation();
  const { exteriores, zonas } = useGalleryImages();
  const [lightbox, setLightbox] = useState<{ list: GalleryImage[]; idx: number } | null>(null);

  const open = useCallback((list: GalleryImage[], idx: number) => {
    setLightbox({ list, idx });
  }, []);
  const close = useCallback(() => setLightbox(null), []);
  const nav = useCallback((dir: number) => {
    setLightbox((lb) =>
      lb ? { ...lb, idx: (lb.idx + dir + lb.list.length) % lb.list.length } : lb,
    );
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, nav]);

  return (
    <div style={{ background: "#F5F3F2" }} className="w-full py-16 md:py-24">
      <style>{STYLES}</style>
      <GalleryGrid title={t("gallerySection.exterioresTitle")} images={exteriores} onOpen={open} cols={3} rows={1} />
      <div style={{ height: "clamp(80px, 10vw, 120px)" }} />
      <GalleryGrid title={t("gallerySection.zonasTitle")} images={zonas} onOpen={open} cols={3} rows={1} />


      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(31,29,26,0.96)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Cerrar"
            style={{ position: "absolute", top: 24, right: 24, color: "#F5F3F2", background: "transparent", border: 0, cursor: "pointer" }}
          >
            <X className="w-8 h-8" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); nav(-1); }}
            aria-label="Anterior"
            style={{ position: "absolute", left: 24, color: "#F5F3F2", background: "transparent", border: 0, cursor: "pointer" }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); nav(1); }}
            aria-label="Siguiente"
            style={{ position: "absolute", right: 24, color: "#F5F3F2", background: "transparent", border: 0, cursor: "pointer" }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <img
            src={lightbox.list[lightbox.idx].src}
            alt={lightbox.list[lightbox.idx].alt}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "92vw", maxHeight: "88vh", objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
};

export default GallerySection;
