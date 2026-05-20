import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImage = { src: string; alt: string; area: string };

const exterioresImages: GalleryImage[] = [
  { src: "https://picsum.photos/seed/ext1/1200/1400", alt: "Exteriores 01", area: "a" },
  { src: "https://picsum.photos/seed/ext2/900/600", alt: "Exteriores 02", area: "b" },
  { src: "https://picsum.photos/seed/ext3/900/600", alt: "Exteriores 03", area: "c" },
  { src: "https://picsum.photos/seed/ext4/800/600", alt: "Exteriores 04", area: "d" },
  { src: "https://picsum.photos/seed/ext5/800/600", alt: "Exteriores 05", area: "e" },
  { src: "https://picsum.photos/seed/ext6/800/600", alt: "Exteriores 06", area: "f" },
  { src: "https://picsum.photos/seed/ext7/900/600", alt: "Exteriores 07", area: "g" },
  { src: "https://picsum.photos/seed/ext8/1400/600", alt: "Exteriores 08", area: "h" },
];

const zonasImages: GalleryImage[] = [
  { src: "https://picsum.photos/seed/zc1/1200/1400", alt: "Zonas Comunes 01", area: "a" },
  { src: "https://picsum.photos/seed/zc2/900/600", alt: "Zonas Comunes 02", area: "b" },
  { src: "https://picsum.photos/seed/zc3/900/600", alt: "Zonas Comunes 03", area: "c" },
  { src: "https://picsum.photos/seed/zc4/800/600", alt: "Zonas Comunes 04", area: "d" },
  { src: "https://picsum.photos/seed/zc5/800/600", alt: "Zonas Comunes 05", area: "e" },
  { src: "https://picsum.photos/seed/zc6/800/600", alt: "Zonas Comunes 06", area: "f" },
  { src: "https://picsum.photos/seed/zc7/900/600", alt: "Zonas Comunes 07", area: "g" },
  { src: "https://picsum.photos/seed/zc8/1400/600", alt: "Zonas Comunes 08", area: "h" },
];

const GRID_STYLES = `
  .lng-gallery {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(4, 18vw);
    grid-template-areas:
      "a a a b b"
      "a a a c c"
      "d d e e f"
      "g g g h h";
    gap: 2px;
    width: 100%;
  }
  .lng-gallery > .cell { position: relative; overflow: hidden; cursor: pointer; }
  .lng-gallery > .cell img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform: translateX(-8%) scale(1.08);
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }
  .lng-gallery > .cell:hover img,
  .lng-gallery > .cell:focus-visible img {
    transform: translateX(0%) scale(1);
  }
  .lng-gallery > .cell.a { grid-area: a; }
  .lng-gallery > .cell.b { grid-area: b; }
  .lng-gallery > .cell.c { grid-area: c; }
  .lng-gallery > .cell.d { grid-area: d; }
  .lng-gallery > .cell.e { grid-area: e; }
  .lng-gallery > .cell.f { grid-area: f; }
  .lng-gallery > .cell.g { grid-area: g; }
  .lng-gallery > .cell.h { grid-area: h; }

  @media (max-width: 1024px) {
    .lng-gallery {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 32vw);
      grid-template-areas:
        "a b"
        "c d"
        "e f"
        "g h";
    }
  }
  @media (max-width: 768px) {
    .lng-gallery {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(8, 65vw);
      grid-template-areas: "a" "b" "c" "d" "e" "f" "g" "h";
    }
    .lng-gallery > .cell img {
      transform: translateX(0) scale(1);
    }
    .lng-gallery > .cell:active img {
      transform: scale(1.02);
    }
  }
`;

interface GalleryGridProps {
  title: string;
  images: GalleryImage[];
  onOpen: (images: GalleryImage[], idx: number) => void;
}

const GalleryGrid = ({ title, images, onOpen }: GalleryGridProps) => (
  <section className="w-full">
    <h2
      className="px-6 md:px-12 mb-10 md:mb-14"
      style={{
        fontFamily: "'Roboto Serif', Georgia, serif",
        fontWeight: 300,
        fontSize: "clamp(36px, 5vw, 64px)",
        lineHeight: 1.1,
        color: "#1F1D1A",
        letterSpacing: "-0.01em",
      }}
    >
      {title}
    </h2>
    <div className="lng-gallery">
      {images.map((img, i) => (
        <button
          key={i}
          type="button"
          className={`cell ${img.area}`}
          onClick={() => onOpen(images, i)}
          aria-label={`Abrir ${img.alt}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading={i < 3 ? "eager" : "lazy"}
            draggable={false}
          />
        </button>
      ))}
    </div>
  </section>
);

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<{ list: GalleryImage[]; idx: number } | null>(null);

  const open = useCallback((list: GalleryImage[], idx: number) => {
    setLightbox({ list, idx });
  }, []);
  const close = useCallback(() => setLightbox(null), []);
  const nav = useCallback(
    (dir: number) => {
      setLightbox((lb) =>
        lb ? { ...lb, idx: (lb.idx + dir + lb.list.length) % lb.list.length } : lb,
      );
    },
    [],
  );

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
      <style>{GRID_STYLES}</style>
      <GalleryGrid title="Exteriores" images={exterioresImages} onOpen={open} />
      <div style={{ height: "clamp(80px, 10vw, 120px)" }} />
      <GalleryGrid title="Zonas Comunes" images={zonasImages} onOpen={open} />

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
