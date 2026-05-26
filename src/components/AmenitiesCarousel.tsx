import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import salonImg from "@/assets/carousel/salon.webp";
import cocinaImg from "@/assets/carousel/cocina.webp";
import habitacionImg from "@/assets/carousel/habitacion.webp";
import terrazaImg from "@/assets/carousel/terraza.webp";
import banoImg from "@/assets/carousel/bano.webp";
import solariumImg from "@/assets/gallery/zc-chill-out.webp";

type Card = { title: string; src: string };

const cards: Card[] = [
  { title: "Salón", src: salonImg },
  { title: "Cocina", src: cocinaImg },
  { title: "Habitación", src: habitacionImg },
  { title: "Terraza", src: terrazaImg },
  { title: "Baño", src: banoImg },
  { title: "Solárium privado", src: solariumImg },
];

const STYLES = `
.amen-section{background:#f4faf0;padding:80px 0 96px;position:relative;font-family:'Montserrat',sans-serif;}
.amen-header{padding:0 60px;margin-bottom:48px;}
.amen-eyebrow{font-family:'Montserrat',sans-serif;font-weight:500;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8F8D8C;margin:0 0 12px;}
.amen-title{font-family:'TAN - PEARL','TAN Pearl',serif;font-weight:normal;font-size:clamp(32px,4vw,52px);color:#0d3a2a;letter-spacing:.02em;margin:0;line-height:1.1;}
.amen-wrap{position:relative;}
.amen-track{display:flex;gap:24px;overflow-x:scroll;scroll-snap-type:x mandatory;padding:8px 60px;scrollbar-width:none;-ms-overflow-style:none;cursor:grab;scroll-behavior:smooth;}
.amen-track::-webkit-scrollbar{display:none;}
.amen-track::after{content:"";flex:0 0 60px;}
@media (max-width:768px){.amen-track::after{flex-basis:32px;}}
.amen-track.dragging{cursor:grabbing;scroll-behavior:auto;}
.amen-card{flex:0 0 auto;width:420px;height:520px;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(31,29,26,0.10);scroll-snap-align:start;background:#F5F3F2;display:flex;flex-direction:column;}
.amen-img{flex:0 0 78%;width:100%;overflow:hidden;background:#1F1D1A;}
.amen-img img{width:100%;height:100%;object-fit:cover;display:block;user-select:none;-webkit-user-drag:none;pointer-events:none;}
.amen-cap{flex:1;background:#F5F3F2;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;}
.amen-cap-title{font-family:'Montserrat',sans-serif;font-weight:300;font-size:17px;letter-spacing:.01em;color:#1F1D1A;margin:0;}
.amen-plus{width:36px;height:36px;border-radius:50%;border:1.5px solid rgba(31,29,26,0.35);background:transparent;color:#1F1D1A;font-size:20px;font-weight:300;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .3s cubic-bezier(0.22,1,0.36,1);padding:0;flex-shrink:0;}
.amen-plus:hover{background:#0d3a2a;border-color:#0d3a2a;color:#F5F3F2;}
.amen-arrow{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:#F5F3F2;border:1.5px solid rgba(31,29,26,0.18);color:#1F1D1A;box-shadow:0 2px 8px rgba(31,29,26,0.10);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .3s cubic-bezier(0.22,1,0.36,1);z-index:5;}
.amen-arrow:hover{background:#8E2D44;color:#F5F3F2;border-color:#8E2D44;}
.amen-arrow.prev{left:24px;}
.amen-arrow.next{right:24px;}
.amen-arrow:disabled{opacity:.3;pointer-events:none;}
.amen-lb{position:fixed;inset:0;background:rgba(31,29,26,0.96);z-index:9999;display:flex;align-items:center;justify-content:center;}
.amen-lb-img{max-width:90vw;max-height:90vh;border-radius:12px;object-fit:contain;display:block;}
.amen-lb-close{position:absolute;top:24px;right:32px;background:none;border:none;color:#F5F3F2;font-family:'Montserrat',sans-serif;font-size:13px;cursor:pointer;padding:8px;}
.amen-lb-nav{position:absolute;top:50%;transform:translateY(-50%);background:none;border:none;color:#F5F3F2;cursor:pointer;padding:16px;}
.amen-lb-nav.prev{left:24px;} .amen-lb-nav.next{right:24px;}
@media (max-width:1024px){.amen-card{width:320px;height:420px;}}
@media (max-width:768px){
  .amen-section{padding:60px 0 72px;}
  .amen-header{padding:0 32px;margin-bottom:32px;}
  .amen-track{padding:8px 32px;}
  .amen-card{width:300px;height:380px;}
  .amen-arrow{display:none;}
}
`;

const CARD_STEP_DESKTOP = 420 + 24;
const CARD_STEP_TABLET = 320 + 24;
const CARD_STEP_MOBILE = 300 + 24;

export default function AmenitiesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [lbIdx, setLbIdx] = useState<number | null>(null);

  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const getStep = () => {
    const w = window.innerWidth;
    if (w < 768) return CARD_STEP_MOBILE;
    if (w < 1024) return CARD_STEP_TABLET;
    return CARD_STEP_DESKTOP;
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * getStep(), behavior: "smooth" });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.pageX, startScroll: el.scrollLeft, moved: false };
    el.classList.add("dragging");
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.pageX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
    trackRef.current?.classList.remove("dragging");
  };

  useEffect(() => {
    if (lbIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLbIdx(null);
      if (e.key === "ArrowRight") setLbIdx((i) => (i === null ? i : (i + 1) % cards.length));
      if (e.key === "ArrowLeft") setLbIdx((i) => (i === null ? i : (i - 1 + cards.length) % cards.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lbIdx]);

  return (
    <section className="amen-section" aria-label="Amenities">
      <style>{STYLES}</style>
      <div className="amen-header">
        <p className="amen-eyebrow">AMENITIES</p>
        <h2 className="amen-title">Espacios diseñados para vivir</h2>
      </div>
      <div className="amen-wrap">
        <button className="amen-arrow prev" aria-label="Anterior" onClick={() => scrollBy(-1)} disabled={atStart}>
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>
        <div
          ref={trackRef}
          className="amen-track"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
        >
          {cards.map((c, i) => (
            <article key={i} className="amen-card">
              <div className="amen-img">
                <img src={c.src} alt={c.title} loading={i < 2 ? "eager" : "lazy"} draggable={false} />
              </div>
              <div className="amen-cap">
                <p className="amen-cap-title">{c.title}</p>
                <button
                  className="amen-plus"
                  aria-label={`Ampliar ${c.title}`}
                  onClick={(e) => {
                    if (drag.current.moved) { e.preventDefault(); return; }
                    setLbIdx(i);
                  }}
                >+</button>
              </div>
            </article>
          ))}
        </div>
        <button className="amen-arrow next" aria-label="Siguiente" onClick={() => scrollBy(1)} disabled={atEnd}>
          <ChevronRight size={22} strokeWidth={1.5} />
        </button>
      </div>

      {lbIdx !== null && (
        <div className="amen-lb" onClick={() => setLbIdx(null)} role="dialog" aria-modal="true">
          <button className="amen-lb-close" onClick={() => setLbIdx(null)} aria-label="Cerrar">× CERRAR</button>
          <button
            className="amen-lb-nav prev"
            onClick={(e) => { e.stopPropagation(); setLbIdx((i) => (i === null ? i : (i - 1 + cards.length) % cards.length)); }}
            aria-label="Anterior"
          ><ChevronLeft size={36} strokeWidth={1.2} /></button>
          <img
            src={cards[lbIdx].src}
            alt={cards[lbIdx].title}
            className="amen-lb-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="amen-lb-nav next"
            onClick={(e) => { e.stopPropagation(); setLbIdx((i) => (i === null ? i : (i + 1) % cards.length)); }}
            aria-label="Siguiente"
          ><ChevronRight size={36} strokeWidth={1.2} /></button>
        </div>
      )}
    </section>
  );
}
