import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { staggerContainer, staggerItem, viewportOnce, fadeUp, slideLeft, slideRight, scaleIn } from "@/lib/animations";

/* ═══════════════════ STREET VIEW HELPER ═══════════════════ */
// Replace YOUR_GOOGLE_API_KEY with your key from console.cloud.google.com
// Enable "Street View Static API" (free tier: 25,000 requests/month)
const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY";

function streetViewUrl(lat: number, lng: number, w = 200, h = 120) {
  return `https://maps.googleapis.com/maps/api/streetview?size=${w}x${h}&location=${lat},${lng}&fov=90&pitch=0&key=${GOOGLE_API_KEY}`;
}

/* ═══════════════════ DATA ═══════════════════ */

interface POI {
  id: string;
  name: string;
  lng: number;
  lat: number;
  category: string;
  walkMin?: number;
  description?: string;
}

interface CategoryDef {
  id: string;
  label: string;
  color: string;
  iconSvg: string;
}

const CATEGORIES: CategoryDef[] = [
  {
    id: "residential",
    label: "Residencial",
    color: "#1B3A2D",
    iconSvg: '<path d="M12 3L3 10h3v9h4v-5h4v5h4v-9h3L12 3z" fill="currentColor"/>',
  },
  {
    id: "health",
    label: "Salud",
    color: "#DC2626",
    iconSvg:
      '<path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-1 10h-4v4h-4v-4H6v-2h4V7h4v4h4v2z" fill="currentColor"/>',
  },
  {
    id: "education",
    label: "Educación",
    color: "#2563EB",
    iconSvg:
      '<path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 14.5L5 14v-2.5l7 3.5 7-3.5V14l-7 3.5z" fill="currentColor"/>',
  },
  {
    id: "shopping",
    label: "Comercios",
    color: "#D97706",
    iconSvg:
      '<path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 14H6V8h2v2h2V8h4v2h2V8h2v10z" fill="currentColor"/>',
  },
  {
    id: "nature",
    label: "Naturaleza",
    color: "#16A34A",
    iconSvg:
      '<path d="M17 12c0-2.76-2.24-5-5-5s-5 2.24-5 5c0 2.28 1.53 4.19 3.62 4.78C10.24 17.6 10 18.27 10 19v2h4v-2c0-.73-.24-1.4-.62-2.22C15.47 16.19 17 14.28 17 12z" fill="currentColor"/><rect x="11" y="19" width="2" height="3" fill="currentColor"/>',
  },
  {
    id: "restaurants",
    label: "Restaurantes",
    color: "#E11D48",
    iconSvg:
      '<path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" fill="currentColor"/>',
  },
  {
    id: "gas",
    label: "Gasolineras",
    color: "#475569",
    iconSvg:
      '<path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33a2.5 2.5 0 002.5 2.5c.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14a2 2 0 00-2-2h-1V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 005 0V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5z" fill="currentColor"/>',
  },
  {
    id: "transport",
    label: "Transporte",
    color: "#4F46E5",
    iconSvg:
      '<path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm9 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18 8H6V5h12v3z" fill="currentColor"/>',
  },
];

const POIS: POI[] = [
  {
    id: "res-1",
    name: "LaNucía ONE",
    lng: -0.12765,
    lat: 38.60001,
    category: "residential",
    description: "Residencial · La Nucía, Alicante",
  },
  { id: "h-1", name: "Centro de Salud La Nucía", lng: -0.1165, lat: 38.6298, category: "health", walkMin: 5 },
  { id: "h-2", name: "Farmacia Central", lng: -0.1195, lat: 38.6325, category: "health", walkMin: 3 },
  { id: "h-3", name: "Clínica Dental Albir", lng: -0.0823, lat: 38.5763, category: "health", walkMin: 25 },
  { id: "e-1", name: "CEIP La Nucía", lng: -0.1148, lat: 38.6342, category: "education", walkMin: 6 },
  { id: "e-2", name: "IES La Nucía", lng: -0.1202, lat: 38.6289, category: "education", walkMin: 8 },
  { id: "e-3", name: "Colegio Internacional", lng: -0.105, lat: 38.61, category: "education", walkMin: 20 },
  { id: "s-1", name: "Mercadona La Nucía", lng: -0.122, lat: 38.6305, category: "shopping", walkMin: 7 },
  { id: "s-2", name: "Centro Comercial Marina", lng: -0.0453, lat: 38.5412, category: "shopping", walkMin: 45 },
  { id: "s-3", name: "Consum Alfaz del Pi", lng: -0.0905, lat: 38.5897, category: "shopping", walkMin: 30 },
  { id: "n-1", name: "Parque Municipal La Nucía", lng: -0.1175, lat: 38.635, category: "nature", walkMin: 4 },
  { id: "n-2", name: "Serra Gelada Natural Park", lng: -0.061, lat: 38.56, category: "nature", walkMin: 50 },
  { id: "n-3", name: "Jardines de El Albir", lng: -0.0811, lat: 38.574, category: "nature", walkMin: 30 },
  { id: "r-1", name: "La Sequieta", lng: -0.1155, lat: 38.633, category: "restaurants", walkMin: 5 },
  { id: "r-2", name: "Restaurante El Altet", lng: -0.121, lat: 38.6315, category: "restaurants", walkMin: 8 },
  { id: "r-3", name: "La Bodega de l'Albir", lng: -0.082, lat: 38.577, category: "restaurants", walkMin: 25 },
  { id: "g-1", name: "BP La Nucía", lng: -0.124, lat: 38.6285, category: "gas", walkMin: 10 },
  { id: "g-2", name: "Repsol Altea", lng: -0.072, lat: 38.599, category: "gas", walkMin: 20 },
  { id: "t-1", name: "Parada Bus La Nucía", lng: -0.127658, lat: 38.631, category: "transport", walkMin: 4 },
  { id: "t-2", name: "Estación TRAM Altea", lng: -0.0612, lat: 38.5981, category: "transport", walkMin: 35 },
];

/* ═══════════════════ MAP STYLES ═══════════════════ */

const STYLES_ID = "neighbourhood-map-styles";
function injectMapStyles() {
  if (document.getElementById(STYLES_ID)) return;
  const s = document.createElement("style");
  s.id = STYLES_ID;
  s.textContent = `
    @keyframes nbSonar {
      0%   { box-shadow: 0 0 0 0    rgba(201,169,110,0.55); }
      70%  { box-shadow: 0 0 0 20px rgba(201,169,110,0);    }
      100% { box-shadow: 0 0 0 0    rgba(201,169,110,0);    }
    }
    .nb-main-marker {
      width:52px; height:52px; border-radius:50%;
      background:#1B3A2D; border:2.5px solid #C9A96E;
      display:flex; align-items:center; justify-content:center;
      animation:nbSonar 2.2s infinite;
      cursor:pointer;
      transition:transform .3s cubic-bezier(.34,1.56,.64,1), filter .3s ease;
      filter:drop-shadow(0 4px 14px rgba(0,0,0,.22));
      position:relative; z-index:10;
    }
    .nb-main-marker:hover { transform:scale(1.2) translateY(-3px); }
    .nb-main-marker img   { width:30px; height:30px; object-fit:contain; border-radius:50%; display:block; }
    .nb-main-marker span  { color:#C9A96E; font-weight:700; font-size:15px; letter-spacing:.05em; }

    .nb-poi-wrapper {
      position:relative;
      display:inline-flex; align-items:center; justify-content:center;
      overflow:visible;
    }
    .nb-poi {
      width:40px; height:40px; border-radius:50%;
      background:#fff;
      display:flex; align-items:center; justify-content:center;
      cursor:pointer;
      transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease;
      filter:drop-shadow(0 3px 10px rgba(0,0,0,.13));
      position:relative; z-index:2;
    }
    .nb-poi:hover { transform:scale(1.25) translateY(-2px); }
    .nb-poi.pulse { animation:nbPoiPulse .6s ease-in-out 3; }
    @keyframes nbPoiPulse {
      0%,100% { transform:scale(1);   }
      50%     { transform:scale(1.3); }
    }

    /* Hover card — appears to the RIGHT of the badge */
    .nb-hover-card {
      position:absolute;
      left: calc(100% + 14px);
      top: 50%;
      transform: translateY(-50%) scale(.9);
      opacity:0;
      pointer-events:none;
      transition:opacity .2s ease, transform .2s ease;
      z-index:100;
      width:210px;
      background:#fff;
      border-radius:12px;
      box-shadow:0 8px 30px rgba(0,0,0,.16);
      overflow:hidden;
    }
    .nb-hover-card::before {
      content:''; position:absolute;
      left:-6px; top:50%;
      transform:translateY(-50%) rotate(45deg);
      width:12px; height:12px;
      background:#fff;
      box-shadow:-2px 2px 4px rgba(0,0,0,.06);
      z-index:-1;
    }
    .nb-hover-card.visible {
      opacity:1;
      transform:translateY(-50%) scale(1);
      pointer-events:auto;
    }
    .nb-hover-card img        { width:100%; height:100px; object-fit:cover; display:block; }
    .nb-hover-card-body       { padding:10px 12px; }
    .nb-hover-card-body h4    { font-size:13px; font-weight:600; color:#1A1A1A; margin:0 0 2px; }
    .nb-hover-card-body .cat  { font-size:10px; color:#C9A96E; text-transform:uppercase; letter-spacing:.08em; }
    .nb-hover-card-body .walk { font-size:11px; color:#6B6B6B; margin-top:4px; }

    /* Critical: allow markers to overflow the clipped map canvas */
    .maplibregl-marker           { overflow:visible !important; }
    .maplibregl-canvas-container { overflow:visible !important; }
    .maplibregl-map              { overflow:visible !important; }

    .maplibregl-popup-content {
      background:#fff !important; border-radius:12px !important;
      padding:14px 16px !important;
      box-shadow:0 8px 30px rgba(0,0,0,.12) !important;
      font-family:'Montserrat',sans-serif !important;
    }
    .maplibregl-popup-tip          { border-top-color:#fff !important; }
    .maplibregl-popup-close-button { font-size:18px !important; color:#6B6B6B !important; padding:4px 8px !important; }
    .maplibregl-ctrl-group {
      border-radius:10px !important; overflow:hidden;
      box-shadow:0 2px 8px rgba(0,0,0,.08) !important;
    }
  `;
  document.head.appendChild(s);
}

/* ═══════════════════ COMPONENT ═══════════════════ */

const NeighbourhoodMapSection = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const hoverCardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const [mapReady, setMapReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [mapLibreLoaded, setMapLibreLoaded] = useState(false);
  // Only controls which list is shown — NEVER affects marker visibility
  const [selectedCategory, setSelectedCategory] = useState<string | null>("health");
  const [hoveredPoi, setHoveredPoi] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  /* ── Lazy load: only init map when section is near viewport ── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Load MapLibre GL JS from CDN ── */
  useEffect(() => {
    if (!inView) return;
    if ((window as any).maplibregl) {
      setMapLibreLoaded(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js";
    script.onload = () => setMapLibreLoaded(true);
    document.head.appendChild(script);
  }, [inView]);

  /* ── Init map — runs ONCE, creates ALL markers permanently ── */
  useEffect(() => {
    if (!mapLibreLoaded || !mapContainer.current || mapRef.current) return;
    injectMapStyles();
    const ml = (window as any).maplibregl;

    const map = new ml.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [-0.12765, 38.60001],
      zoom: 14,
      pitch: isMobile ? 0 : 45,
      bearing: -25,
      antialias: true,
      attributionControl: false,
    });
    mapRef.current = map;
    map.addControl(new ml.NavigationControl({ showCompass: false }), "bottom-right");

    map.on("load", () => {
      /* 3D buildings layer */
      const layers = map.getStyle().layers || [];
      let labelLayerId: string | undefined;
      for (const layer of layers) {
        if (layer.type === "symbol" && (layer as any).layout?.["text-field"]) {
          labelLayerId = layer.id;
          break;
        }
      }
      map.addLayer(
        {
          id: "3d-buildings",
          source: "openmaptiles",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 13,
          paint: {
            "fill-extrusion-color": "#F0EBE1",
            "fill-extrusion-height": ["coalesce", ["get", "render_height"], 10],
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0.5,
          },
        },
        labelLayerId,
      );

      if (!isMobile) {
        map.easeTo({ bearing: -15, duration: 3000, easing: (t: number) => t * (2 - t) });
      }

      /* ── Residential main marker ── */
      const mainEl = document.createElement("div");
      mainEl.className = "nb-main-marker";
      mainEl.innerHTML = `
        <img src="/favicon.png" alt="LaNuciaOne"
          style="width:30px;height:30px;object-fit:contain;border-radius:50%;display:block;"
          onerror="this.style.display='none';this.insertAdjacentHTML('afterend','<span style=\\'color:#C9A96E;font-weight:700;font-size:14px;letter-spacing:.05em\\'>N1</span>')"
        />`;
      new ml.Marker({ element: mainEl, anchor: "center" }).setLngLat([-0.12765, 38.60001]).addTo(map);
      mainEl.addEventListener("click", () => {
        map.flyTo({ center: [-0.12765, 38.60001], zoom: 16, pitch: isMobile ? 0 : 50, duration: 1200 });
        new ml.Popup({ offset: 30, closeButton: true })
          .setLngLat([-0.12765, 38.60001])
          .setHTML(
            `<div><strong style="color:#1B3A2D;font-size:14px;">LA NUCÍA ONE</strong><br/>
            <span style="font-size:12px;color:#6B6B6B">Residencial · La Nucía, Alicante</span></div>`,
          )
          .addTo(map);
      });

      /* ── All POI markers — created once, always on map ── */
      POIS.filter((p) => p.category !== "residential").forEach((poi, idx) => {
        const cat = CATEGORIES.find((c) => c.id === poi.category);
        if (!cat) return;

        const wrapper = document.createElement("div");
        wrapper.className = "nb-poi-wrapper";
        wrapper.style.overflow = "visible";
        wrapper.style.opacity = "0";
        wrapper.style.transform = "scale(0.5)";

        const badge = document.createElement("div");
        badge.className = "nb-poi";
        badge.style.border = `2px solid ${cat.color}`;
        badge.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" style="color:${cat.color}">${cat.iconSvg}</svg>`;

        const card = document.createElement("div");
        card.className = "nb-hover-card";
        card.innerHTML = `
          <img src="${streetViewUrl(poi.lat, poi.lng)}" alt="${poi.name}"
            loading="lazy" onerror="this.style.display='none'" />
          <div class="nb-hover-card-body">
            <h4>${poi.name}</h4>
            <div class="cat">${cat.label}</div>
            ${poi.walkMin ? `<div class="walk">~${poi.walkMin} min a pie</div>` : ""}
          </div>`;

        wrapper.appendChild(card);
        wrapper.appendChild(badge);
        hoverCardRefs.current.set(poi.id, card);

        const showCard = () => {
          card.classList.add("visible");
          setHoveredPoi(poi.id);
        };
        const hideCard = () => {
          card.classList.remove("visible");
          setHoveredPoi(null);
        };

        if (isMobile) {
          badge.addEventListener("click", (e) => {
            e.stopPropagation();
            hoverCardRefs.current.forEach((c) => c.classList.remove("visible"));
            card.classList.toggle("visible");
          });
        } else {
          badge.addEventListener("mouseenter", showCard);
          badge.addEventListener("mouseleave", hideCard);
          card.addEventListener("mouseenter", showCard);
          card.addEventListener("mouseleave", hideCard);
        }

        badge.addEventListener("click", () => {
          map.flyTo({ center: [poi.lng, poi.lat], zoom: 16, pitch: isMobile ? 0 : 50, duration: 1200 });
          new ml.Popup({ offset: 24, closeButton: true })
            .setLngLat([poi.lng, poi.lat])
            .setHTML(
              `<div>
              <strong style="color:#1B3A2D;font-size:13px">${poi.name}</strong><br/>
              <span style="font-size:10px;color:#C9A96E;text-transform:uppercase;letter-spacing:.08em">${cat.label}</span>
              <br/><a href="https://www.google.com/maps/search/?api=1&query=${poi.lat},${poi.lng}"
                target="_blank" rel="noopener"
                style="font-size:11px;color:#2563EB;text-decoration:underline;margin-top:4px;display:inline-block">
                Ver en Google Maps</a></div>`,
            )
            .addTo(map);
        });

        /* Double rAF — guarantees repaint before transition fires */
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(
              () => {
                wrapper.style.transition =
                  "opacity .5s cubic-bezier(.16,1,.3,1), transform .5s cubic-bezier(.34,1.56,.64,1)";
                wrapper.style.opacity = "1";
                wrapper.style.transform = "scale(1)";
              },
              30 + idx * 50,
            );
          });
        });

        const marker = new ml.Marker({ element: wrapper, anchor: "center" }).setLngLat([poi.lng, poi.lat]).addTo(map);
        markersRef.current.set(poi.id, marker);
      });

      setMapReady(true);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mapLibreLoaded]);

  /* ── List: POIs for the selected category ── */
  const placeList = useMemo(
    () =>
      !selectedCategory || selectedCategory === "residential"
        ? []
        : POIS.filter((p) => p.category === selectedCategory),
    [selectedCategory],
  );

  /* ── Fly to a POI when clicked in the list ── */
  const flyToPoi = (poi: POI) => {
    const map = mapRef.current;
    const ml = (window as any).maplibregl;
    if (!map || !ml) return;
    const cat = CATEGORIES.find((c) => c.id === poi.category);
    map.flyTo({ center: [poi.lng, poi.lat], zoom: 16, pitch: isMobile ? 0 : 50, duration: 1200 });
    new ml.Popup({ offset: 24, closeButton: true })
      .setLngLat([poi.lng, poi.lat])
      .setHTML(
        `<div>
        <strong style="color:#1B3A2D;font-size:13px">${poi.name}</strong><br/>
        <span style="font-size:10px;color:#C9A96E;text-transform:uppercase;letter-spacing:.08em">${cat?.label || ""}</span>
        <br/><a href="https://www.google.com/maps/search/?api=1&query=${poi.lat},${poi.lng}"
          target="_blank" rel="noopener"
          style="font-size:11px;color:#2563EB;text-decoration:underline;margin-top:4px;display:inline-block">
          Ver en Google Maps</a></div>`,
      )
      .addTo(map);
  };

  /* ── Pulse a marker when its list item is hovered ── */
  const highlightMarker = (poiId: string | null) => {
    setHoveredPoi(poiId);
    markersRef.current.forEach((m, id) => {
      const el = m.getElement()?.querySelector(".nb-poi") as HTMLElement | null;
      if (!el) return;
      const color = CATEGORIES.find((c) => c.id === POIS.find((p) => p.id === id)?.category)?.color || "#000";
      if (id === poiId) {
        el.classList.add("pulse");
        el.style.boxShadow = `0 0 0 6px ${color}40`;
      } else {
        el.classList.remove("pulse");
        el.style.boxShadow = "";
      }
    });
  };

  /* ══════════════════════ RENDER ══════════════════════ */
  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#F9F6F1]">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12"
        >
          <motion.p variants={staggerItem} className="text-[#C9A96E] font-body text-xs tracking-[0.3em] uppercase mb-3">
            Entorno Privilegiado
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="font-display text-3xl md:text-5xl text-[#1A1A1A] leading-tight mb-4"
          >
            Todo lo que necesitas, a tu alcance
          </motion.h2>
          <motion.p variants={staggerItem} className="font-body text-[#6B6B6B] max-w-2xl leading-relaxed">
            La Nucía ofrece una calidad de vida excepcional, rodeada de servicios, naturaleza y conectividad.
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[35%_1fr] gap-6 lg:gap-8">
          {/* ── Left: category tabs + collapsible list ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category grid — click to select / deselect (toggle list) */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {CATEGORIES.map((cat, catIdx) => {
                const selected = selectedCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    variants={scaleIn(0.05 * catIdx)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedCategory((prev) => (prev === cat.id ? null : cat.id))}
                    className={`
                      flex flex-col items-center gap-1.5 p-3 rounded-xl text-center
                      transition-all duration-300 border
                      ${
                        selected
                          ? "bg-[#1B3A2D] border-[#1B3A2D] shadow-md"
                          : "bg-white border-[#E5E5E5] hover:border-[#C9A96E]/40 hover:shadow-sm"
                      }
                    `}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      style={{ color: selected ? "#C9A96E" : cat.color }}
                      dangerouslySetInnerHTML={{ __html: cat.iconSvg }}
                    />
                    <span
                      className={`text-[10px] font-body font-medium tracking-wide uppercase leading-tight ${selected ? "text-white" : "text-[#1A1A1A]"}`}
                    >
                      {cat.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* List — slides in when a category is selected */}
            <AnimatePresence mode="wait">
              {selectedCategory && selectedCategory !== "residential" && placeList.length > 0 && (
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden shadow-sm"
                >
                  {placeList.map((poi, idx) => (
                    <motion.button
                      key={poi.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => flyToPoi(poi)}
                      onMouseEnter={() => highlightMarker(poi.id)}
                      onMouseLeave={() => highlightMarker(null)}
                      className={`
                        w-full text-left flex items-center gap-3 px-4 py-3.5
                        transition-all duration-200 hover:bg-[#F9F6F1] group
                        ${idx < placeList.length - 1 ? "border-b border-[#F0EBE1]" : ""}
                        ${hoveredPoi === poi.id ? "bg-[#F9F6F1]" : ""}
                      `}
                    >
                      <span className="text-xs font-body font-semibold text-[#C9A96E] min-w-[24px]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-body font-medium text-[#1A1A1A] truncate group-hover:text-[#1B3A2D] transition-colors">
                          {poi.name}
                        </p>
                        {poi.walkMin && (
                          <p className="text-[11px] font-body text-[#6B6B6B]">~{poi.walkMin} min a pie</p>
                        )}
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#C9A96E"
                        strokeWidth="2"
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {selectedCategory === "residential" && (
                <motion.div
                  key="residential"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl border border-[#E5E5E5] px-4 py-5 shadow-sm"
                >
                  <p className="text-sm font-body font-medium text-[#1B3A2D]">LaNucía ONE</p>
                  <p className="text-[11px] font-body text-[#6B6B6B] mt-1">Residencial · La Nucía, Alicante</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right: Map ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl overflow-visible shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-[#E5E5E5] h-[380px] md:h-[520px] relative"
          >
            {/* Inner div clips map tiles to rounded corners without clipping marker cards */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div ref={mapContainer} className="w-full h-full" />
            </div>

            {!mapReady && (
              <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden">
                <Skeleton
                  className="w-full h-full rounded-none"
                  style={{
                    background: "linear-gradient(110deg, #F0EBE1 30%, #F9F6F1 50%, #F0EBE1 70%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </section>
  );
};

export default NeighbourhoodMapSection;
