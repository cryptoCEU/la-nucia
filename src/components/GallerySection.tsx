import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type GalleryImage = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
};

const exterioresImages: GalleryImage[] = [
  {
    src: "https://picsum.photos/seed/ext1/1200/900",
    alt: "Fachada principal",
    eyebrow: "EXTERIORES",
    title: "Fachada principal",
    description:
      "Acabados en piedra natural y carpintería de aluminio lacado en blanco roto. La orientación sur garantiza luz directa durante todo el día.",
  },
  {
    src: "https://picsum.photos/seed/ext2/1200/900",
    alt: "Acceso privado",
    eyebrow: "EXTERIORES",
    title: "Acceso privado",
    description:
      "Entrada rodada con pavimento de hormigón lavado y ajardinamiento de bajo mantenimiento a ambos lados del vial.",
  },
  {
    src: "https://picsum.photos/seed/ext3/1200/900",
    alt: "Jardines privados",
    eyebrow: "EXTERIORES",
    title: "Jardines privados",
    description:
      "Especies autóctonas mediterráneas seleccionadas para mínimo consumo hídrico. Riego por goteo automatizado en toda la parcela.",
  },
  {
    src: "https://picsum.photos/seed/ext4/1200/900",
    alt: "Terraza superior",
    eyebrow: "EXTERIORES",
    title: "Terraza superior",
    description:
      "Solárium privado con vistas abiertas al mar y a la sierra. Pavimento de gres porcelánico antideslizante apto para uso exterior.",
  },
  {
    src: "https://picsum.photos/seed/ext5/1200/900",
    alt: "Iluminación nocturna",
    eyebrow: "EXTERIORES",
    title: "Iluminación nocturna",
    description:
      "Esquema de iluminación arquitectónica con luminarias empotradas de bajo consumo que realzan los volúmenes del edificio al anochecer.",
  },
  {
    src: "https://picsum.photos/seed/ext6/1200/900",
    alt: "Volumetría sur",
    eyebrow: "EXTERIORES",
    title: "Volumetría sur",
    description:
      "Composición de volúmenes en cascada que adapta el edificio a la pendiente natural del terreno y maximiza las vistas.",
  },
];

const zonasImages: GalleryImage[] = [
  {
    src: "https://picsum.photos/seed/zc1/1200/900",
    alt: "Piscina comunitaria",
    eyebrow: "ZONAS COMUNES",
    title: "Piscina comunitaria",
    description:
      "Lámina de agua de 18 metros con zona de bañadores y solárium perimetral en tarima de composite.",
  },
  {
    src: "https://picsum.photos/seed/zc2/1200/900",
    alt: "Zona de descanso",
    eyebrow: "ZONAS COMUNES",
    title: "Zona de descanso",
    description:
      "Pérgolas con estructura de acero corten y vegetación trepadora que crean espacios de sombra natural durante todo el día.",
  },
  {
    src: "https://picsum.photos/seed/zc3/1200/900",
    alt: "Gimnasio equipado",
    eyebrow: "ZONAS COMUNES",
    title: "Gimnasio equipado",
    description:
      "Sala fitness con maquinaria cardiovascular y de fuerza de alta gama. Iluminación natural y ventilación cruzada.",
  },
  {
    src: "https://picsum.photos/seed/zc4/1200/900",
    alt: "Sala social",
    eyebrow: "ZONAS COMUNES",
    title: "Sala social",
    description:
      "Espacio polivalente para reuniones y eventos privados, con office completo y mobiliario diseñado a medida.",
  },
  {
    src: "https://picsum.photos/seed/zc5/1200/900",
    alt: "Spa interior",
    eyebrow: "ZONAS COMUNES",
    title: "Spa interior",
    description:
      "Zona de aguas con piscina climatizada, jacuzzi, sauna y baño turco. Acabados en piedra natural y madera tratada.",
  },
  {
    src: "https://picsum.photos/seed/zc6/1200/900",
    alt: "Coworking",
    eyebrow: "ZONAS COMUNES",
    title: "Coworking",
    description:
      "Espacio de trabajo compartido con cabinas insonorizadas para videollamadas, conexión de fibra dedicada y mobiliario ergonómico.",
  },
];

const STYLES = `
  .lng-gallery {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, clamp(220px, 26vw, 320px));
    gap: 2px;
    width: 100%;
  }
  .lng-cell {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: #1F1D1A;
    transition: opacity 0.25s ease;
  }
  .lng-cell img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.25s ease;
  }
  .lng-cell .lng-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.1s ease;
    padding: 24px;
  }
...
  /* Desktop: full-section takeover with invisible hotspot siblings */
  @media (min-width: 768px) {
    .lng-gallery.has-active .lng-cell:not(.lng-active) {
      opacity: 0;
      background: transparent;
      z-index: 30;
      pointer-events: auto;
      cursor: pointer;
    }
    .lng-gallery.has-active .lng-cell:not(.lng-active) img {
      opacity: 0;
    }
    .lng-cell.lng-active {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 20;
      transition: opacity 0.4s ease;
    }
    .lng-cell.lng-active .lng-overlay {
      opacity: 1;
      transition: opacity 0.3s ease 0.2s;
    }
  }

  /* Mobile: no takeover, tap shows overlay */
  @media (max-width: 767px) {
    .lng-gallery {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(6, 70vw);
    }
    .lng-cell.lng-tapped .lng-overlay {
      opacity: 1;
    }
  }
`;

interface GalleryGridProps {
  title: string;
  images: GalleryImage[];
  onOpen: (images: GalleryImage[], idx: number) => void;
}

const GalleryGrid = ({ title, images, onOpen }: GalleryGridProps) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [tappedIdx, setTappedIdx] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const handleClick = (i: number) => {
    if (isMobile) {
      if (tappedIdx === i) {
        // second tap → open lightbox
        onOpen(images, i);
        setTappedIdx(null);
      } else {
        setTappedIdx(i);
      }
    } else {
      onOpen(images, i);
    }
  };

  return (
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
      <div
        className={`lng-gallery ${activeIdx !== null ? "has-active" : ""}`}
        onMouseLeave={() => !isMobile && setActiveIdx(null)}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={`lng-cell ${activeIdx === i ? "lng-active" : ""} ${tappedIdx === i ? "lng-tapped" : ""}`}
            onMouseEnter={() => !isMobile && setActiveIdx(i)}
            onClick={() => handleClick(i)}
            role="button"
            tabIndex={0}
            aria-label={`Abrir ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={i < 3 ? "eager" : "lazy"}
              draggable={false}
            />
            <div className="lng-overlay">
              <div className="lng-overlay-box">
                <p className="lng-overlay-eyebrow">{img.eyebrow}</p>
                <h3 className="lng-overlay-title">{img.title}</h3>
                <p className="lng-overlay-desc">{img.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const GallerySection = () => {
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
