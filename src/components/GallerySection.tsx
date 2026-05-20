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
  { src: "https://picsum.photos/seed/ext1/1600/1100", alt: "Fachada principal", eyebrow: "EXTERIORES", title: "Fachada principal", description: "Acabados en piedra natural y carpintería de aluminio lacado en blanco roto. La orientación sur garantiza luz directa durante todo el día." },
  { src: "https://picsum.photos/seed/ext2/1600/1100", alt: "Acceso privado", eyebrow: "EXTERIORES", title: "Acceso privado", description: "Entrada rodada con pavimento de hormigón lavado y ajardinamiento de bajo mantenimiento a ambos lados del vial." },
  { src: "https://picsum.photos/seed/ext3/1600/1100", alt: "Jardines privados", eyebrow: "EXTERIORES", title: "Jardines privados", description: "Especies autóctonas mediterráneas seleccionadas para mínimo consumo hídrico. Riego por goteo automatizado en toda la parcela." },
  { src: "https://picsum.photos/seed/ext4/1600/1100", alt: "Terraza superior", eyebrow: "EXTERIORES", title: "Terraza superior", description: "Solárium privado con vistas abiertas al mar y a la sierra. Pavimento de gres porcelánico antideslizante apto para uso exterior." },
  { src: "https://picsum.photos/seed/ext5/1600/1100", alt: "Iluminación nocturna", eyebrow: "EXTERIORES", title: "Iluminación nocturna", description: "Esquema de iluminación arquitectónica con luminarias empotradas de bajo consumo que realzan los volúmenes del edificio al anochecer." },
  { src: "https://picsum.photos/seed/ext6/1600/1100", alt: "Volumetría sur", eyebrow: "EXTERIORES", title: "Volumetría sur", description: "Composición de volúmenes en cascada que adapta el edificio a la pendiente natural del terreno y maximiza las vistas." },
];

const zonasImages: GalleryImage[] = [
  { src: "https://picsum.photos/seed/zc1/1600/1100", alt: "Piscina comunitaria", eyebrow: "ZONAS COMUNES", title: "Piscina comunitaria", description: "Lámina de agua de 18 metros con zona de bañadores y solárium perimetral en tarima de composite." },
  { src: "https://picsum.photos/seed/zc2/1600/1100", alt: "Zona de descanso", eyebrow: "ZONAS COMUNES", title: "Zona de descanso", description: "Pérgolas con estructura de acero corten y vegetación trepadora que crean espacios de sombra natural durante todo el día." },
  { src: "https://picsum.photos/seed/zc3/1600/1100", alt: "Gimnasio equipado", eyebrow: "ZONAS COMUNES", title: "Gimnasio equipado", description: "Sala fitness con maquinaria cardiovascular y de fuerza de alta gama. Iluminación natural y ventilación cruzada." },
  { src: "https://picsum.photos/seed/zc4/1600/1100", alt: "Sala social", eyebrow: "ZONAS COMUNES", title: "Sala social", description: "Espacio polivalente para reuniones y eventos privados, con office completo y mobiliario diseñado a medida." },
  { src: "https://picsum.photos/seed/zc5/1600/1100", alt: "Spa interior", eyebrow: "ZONAS COMUNES", title: "Spa interior", description: "Zona de aguas con piscina climatizada, jacuzzi, sauna y baño turco. Acabados en piedra natural y madera tratada." },
  { src: "https://picsum.photos/seed/zc6/1600/1100", alt: "Coworking", eyebrow: "ZONAS COMUNES", title: "Coworking", description: "Espacio de trabajo compartido con cabinas insonorizadas para videollamadas, conexión de fibra dedicada y mobiliario ergonómico." },
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
    z-index: 30;
  }
  .lng-cell-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.25s ease;
  }
  .lng-expanded {
    position: absolute;
    inset: 0;
    z-index: 20;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
  }
  .lng-grid-lines {
    position: absolute;
    inset: 0;
    z-index: 25;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 2px;
    background: #F5F3F2;
  }
  .lng-grid-lines > span {
    background: #1F1D1A;
    /* item itself transparent to image; we use dark fill but rely on mix? */
  }
  .lng-expanded-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .lng-expanded-img.is-active {
    opacity: 1;
  }
  .lng-overlay {
    position: absolute;
    inset: 0;
    z-index: 25;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.1s ease;
  }
  .lng-overlay.is-visible {
    opacity: 1;
    transition: opacity 0.3s ease 0.2s;
  }
  .lng-overlay-box {
    background: rgba(31, 29, 26, 0.62);
    border-radius: 4px;
    padding: 24px 32px;
    max-width: 480px;
    text-align: left;
    backdrop-filter: blur(2px);
  }
  .lng-overlay-eyebrow {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 11px;
    letter-spacing: 0.18em;
    color: rgba(245,243,242,0.6);
    text-transform: uppercase;
    margin: 0;
  }
  .lng-overlay-title {
    font-family: 'Roboto Serif', Georgia, serif;
    font-weight: 300;
    font-size: 28px;
    color: #F5F3F2;
    margin: 8px 0 0 0;
    line-height: 1.2;
  }
  .lng-overlay-desc {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 1.7;
    color: rgba(245,243,242,0.82);
    margin: 12px 0 0 0;
  }

  /* Desktop: hover takeover */
  @media (min-width: 768px) {
    .lng-gallery:hover .lng-expanded {
      opacity: 1;
    }
    .lng-gallery:hover .lng-cell {
      background: transparent;
    }
    .lng-gallery:hover .lng-cell .lng-cell-img {
      opacity: 0;
    }
  }

  /* Mobile: no takeover */
  @media (max-width: 767px) {
    .lng-gallery {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(6, 70vw);
    }
    .lng-expanded { display: none; }
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
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [tappedIdx, setTappedIdx] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const handleClick = (i: number) => {
    if (isMobile) {
      if (tappedIdx === i) {
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
        className="lng-gallery"
        onMouseLeave={() => setHoverIdx(null)}
      >
        {/* Expanded preview layer (under the cells) */}
        <div className="lng-expanded" aria-hidden="true">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt=""
              className={`lng-expanded-img ${hoverIdx === i ? "is-active" : ""}`}
              loading={i < 1 ? "eager" : "lazy"}
              draggable={false}
            />
          ))}
        </div>

        {/* Overlay text for the currently hovered cell */}
        {hoverIdx !== null && (
          <div className={`lng-overlay is-visible`} aria-hidden="true">
            <div className="lng-overlay-box">
              <p className="lng-overlay-eyebrow">{images[hoverIdx].eyebrow}</p>
              <h3 className="lng-overlay-title">{images[hoverIdx].title}</h3>
              <p className="lng-overlay-desc">{images[hoverIdx].description}</p>
            </div>
          </div>
        )}

        {/* Hotspot cells (always present as a static grid) */}
        {images.map((img, i) => (
          <div
            key={i}
            className={`lng-cell ${tappedIdx === i ? "lng-tapped" : ""}`}
            onMouseEnter={() => !isMobile && setHoverIdx(i)}
            onClick={() => handleClick(i)}
            role="button"
            tabIndex={0}
            aria-label={`Abrir ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="lng-cell-img"
              loading={i < 3 ? "eager" : "lazy"}
              draggable={false}
            />
            {/* Mobile-only overlay text per cell */}
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
