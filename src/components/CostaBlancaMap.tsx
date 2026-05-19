import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from "react-leaflet";
import L, { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import logoIsotipo from "@/assets/logo-nucia-one.png";

type Pin = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  description: string;
  driveMin: number;
  driveKm: number;
  primary?: boolean;
};

const LA_NUCIA: [number, number] = [38.6133, -0.1267];

const BOUNDS: LatLngBoundsExpression = [
  [38.330, -0.520], // SW (Alicante)
  [38.620, -0.020], // NE (Altea)
];

const PINS: Pin[] = [
  // Primary cities (label only)
  { id: "finestrat", name: "Finestrat", lat: 38.545, lng: -0.213, category: "Municipio", description: "Pueblo mediterráneo a los pies del Puig Campana.", driveMin: 15, driveKm: 12, primary: true },
  { id: "polop", name: "Polop", lat: 38.622, lng: -0.155, category: "Municipio", description: "Pueblo histórico del interior de la Marina Baixa.", driveMin: 6, driveKm: 3, primary: true },
  { id: "altea", name: "Altea", lat: 38.599, lng: -0.048, category: "Municipio", description: "Casco antiguo blanco y puerto deportivo.", driveMin: 14, driveKm: 11, primary: true },
  { id: "benidorm", name: "Benidorm", lat: 38.541, lng: -0.132, category: "Municipio", description: "Capital turística de la Costa Blanca.", driveMin: 12, driveKm: 9, primary: true },
  { id: "villajoyosa", name: "Villajoyosa", lat: 38.503, lng: -0.234, category: "Municipio", description: "Casas de colores y tradición chocolatera.", driveMin: 22, driveKm: 19, primary: true },
  { id: "alicante", name: "Alicante", lat: 38.345, lng: -0.483, category: "Capital", description: "Capital mediterránea con puerto y casco antiguo.", driveMin: 45, driveKm: 55, primary: true },
  { id: "aeropuerto", name: "Aeropuerto ALC", lat: 38.281, lng: -0.558, category: "Aeropuerto", description: "Conexión internacional Alicante-Elche.", driveMin: 50, driveKm: 65, primary: true },

  // POIs near La Nucía
  { id: "auditorio", name: "Auditorio La Nucía", lat: 38.6075, lng: -0.1185, category: "Cultural", description: "Auditorio de referencia en la Marina Baixa.", driveMin: 3, driveKm: 1.5 },
  { id: "deportiva", name: "Ciudad Deportiva", lat: 38.6045, lng: -0.1095, category: "Deporte", description: "Complejo deportivo de referencia europea.", driveMin: 5, driveKm: 2 },
  { id: "comercial", name: "C.C. La Nucía", lat: 38.6195, lng: -0.1335, category: "Comercial", description: "Comercio y servicios de la Marina Baixa.", driveMin: 4, driveKm: 2 },
  { id: "museo", name: "Museo Etnológico", lat: 38.6155, lng: -0.1245, category: "Cultural", description: "Patrimonio y tradición de La Nucía.", driveMin: 2, driveKm: 0.8 },
  { id: "captivador", name: "Captivador Golf", lat: 38.6035, lng: -0.1485, category: "Golf", description: "Campo de golf entre montañas y mar.", driveMin: 7, driveKm: 4 },
  { id: "mercadolanucia", name: "Mercado La Nucía", lat: 38.6118, lng: -0.1295, category: "Gastronomía", description: "Mercado dominical de productos locales.", driveMin: 2, driveKm: 0.6 },
  { id: "polopcastillo", name: "Castillo de Polop", lat: 38.6235, lng: -0.1535, category: "Cultural", description: "Mirador histórico sobre la Marina Baixa.", driveMin: 8, driveKm: 4 },

  // Coast / leisure
  { id: "poniente", name: "Playa de Poniente", lat: 38.537, lng: -0.159, category: "Playa", description: "Arena fina y paseo marítimo de Benidorm.", driveMin: 14, driveKm: 11 },
  { id: "levante", name: "Playa de Levante", lat: 38.542, lng: -0.110, category: "Playa", description: "La playa más icónica de Benidorm.", driveMin: 13, driveKm: 10 },
  { id: "terra", name: "Terra Mítica", lat: 38.556, lng: -0.160, category: "Ocio", description: "Parque temático junto a Benidorm.", driveMin: 12, driveKm: 10 },
  { id: "puertoaltea", name: "Puerto de Altea", lat: 38.591, lng: -0.040, category: "Puerto", description: "Puerto deportivo con paseo marítimo.", driveMin: 16, driveKm: 12 },
  { id: "cascoaltea", name: "Casco Antiguo Altea", lat: 38.602, lng: -0.055, category: "Cultural", description: "Calles empedradas y la cúpula azul.", driveMin: 15, driveKm: 12 },
  { id: "torres", name: "Playa del Torres", lat: 38.506, lng: -0.228, category: "Playa", description: "Playa tranquila en Villajoyosa.", driveMin: 20, driveKm: 17 },
  { id: "castillo", name: "Castillo Sta. Bárbara", lat: 38.354, lng: -0.478, category: "Cultural", description: "Fortaleza con vistas a Alicante.", driveMin: 45, driveKm: 53 },
  { id: "puertoben", name: "Puerto de Benidorm", lat: 38.534, lng: -0.125, category: "Puerto", description: "Puerto pesquero y deportivo.", driveMin: 13, driveKm: 10 },
  { id: "islabenidorm", name: "Isla de Benidorm", lat: 38.506, lng: -0.107, category: "Naturaleza", description: "Reserva marina frente a la bahía.", driveMin: 15, driveKm: 12 },
];

// Lollipop-style map pin (circle on stick with oval base) in La Nucía dark green
const POI_PIN_SVG = `
  <svg viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" width="18" height="26" aria-hidden="true">
    <ellipse cx="12" cy="31" rx="7" ry="2.2" fill="none" stroke="#0d3a2a" stroke-width="1.8"/>
    <rect x="11.1" y="13" width="1.8" height="16" fill="#0d3a2a"/>
    <circle cx="12" cy="9" r="8" fill="#0d3a2a"/>
  </svg>
`;

const primaryLabelIcon = (label: string, isMobile: boolean, active: boolean) =>
  L.divIcon({
    className: "cb-label-marker",
    html: `<span class="cb-mk cb-mk-primary ${active ? "cb-mk-active" : ""}" style="font-size:${isMobile ? 11 : 13}px">${label}</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

const poiPinIcon = (active: boolean) =>
  L.divIcon({
    className: "cb-poi-marker",
    html: `
      <div class="cb-poi ${active ? "cb-poi-active" : ""}">
        ${POI_PIN_SVG}
      </div>
    `,
    iconSize: [18, 26],
    iconAnchor: [9, 26],
  });

const nuciaIcon = (isMobile: boolean) => {
  const size = isMobile ? 30 : 36;
  return L.divIcon({
    className: "cb-nucia-marker",
    html: `
      <div class="cb-nucia-wrap">
        <div class="cb-nucia-ring" style="width:${size}px;height:${size}px">
          <img src="${logoIsotipo}" alt="La Nucía One" style="width:${size - 10}px;height:${size - 10}px"/>
        </div>
        <span class="cb-nucia-label">La Nucía One</span>
      </div>
    `,
    iconSize: [120, size + 28],
    iconAnchor: [60, size / 2],
  });
};

const routeDotIcon = (index: number) =>
  L.divIcon({
    className: "cb-route-dot-marker",
    html: `<span class="cb-route-dot" style="animation-delay:${index * 14}ms"></span>`,
    iconSize: [8, 8],
    iconAnchor: [4, 4],
  });

const ScrollEnabler = () => {
  const map = useMap();
  useEffect(() => {
    map.scrollWheelZoom.disable();
    const enable = () => map.scrollWheelZoom.enable();
    const disable = () => map.scrollWheelZoom.disable();
    map.on("click", enable);
    map.on("mouseout", disable);
    return () => {
      map.off("click", enable);
      map.off("mouseout", disable);
    };
  }, [map]);
  return null;
};

const CostaBlancaMap = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);
  const [hovered, setHovered] = useState<string | null>(null);
  const [routeT, setRouteT] = useState(0); // 0..1 progressive draw
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sync carousel scroll with hover
  useEffect(() => {
    if (!hovered || !scrollerRef.current) return;
    const el = cardRefs.current[hovered];
    if (!el) return;
    const scroller = scrollerRef.current;
    const left = el.offsetLeft - scroller.clientWidth / 2 + el.clientWidth / 2;
    scroller.scrollTo({ left, behavior: "smooth" });
  }, [hovered]);

  const activePin = useMemo(() => PINS.find((p) => p.id === hovered && !p.primary) || null, [hovered]);

  // Animate route drawing from La Nucía to active pin
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!activePin) {
      setRouteT(0);
      return;
    }
    const duration = 700;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setRouteT(eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activePin]);

  const routeDotPositions = useMemo<[number, number][]>(() => {
    if (!activePin) return [];
    const visibleSteps = Math.max(0, Math.floor(32 * routeT));
    return Array.from({ length: visibleSteps }, (_, index) => {
      const t = (index + 1) / 32;
      const lat = LA_NUCIA[0] + (activePin.lat - LA_NUCIA[0]) * t;
      const lng = LA_NUCIA[1] + (activePin.lng - LA_NUCIA[1]) * t;
      return [lat, lng] as [number, number];
    });
  }, [activePin, routeT]);

  return (
    <div className="cb-map-bleed">
      <style>{`
        .cb-map-bleed { width: 100%; position: relative; }
        .cb-map-bleed .leaflet-container {
          width: 100%;
          height: 620px;
          background: #F9F6F1;
          font-family: 'Montserrat', system-ui, sans-serif;
        }
        @media (max-width: 768px) { .cb-map-bleed .leaflet-container { height: 460px; } }
        .cb-map-bleed .leaflet-control-attribution { background: transparent; font-size: 9px; color: #8F8D8C; }
        .cb-map-bleed .leaflet-control-attribution a { color: #8F8D8C; }
        .cb-map-bleed .leaflet-control-zoom { border: none; box-shadow: none; }
        .cb-map-bleed .leaflet-control-zoom a {
          background: rgba(255,255,255,0.85); color: #1F1D1A;
          border: 1px solid rgba(31,29,26,0.12); backdrop-filter: blur(4px);
        }
        .cb-map-bleed .leaflet-control-zoom a:hover { background: #fff; }

        /* PRIMARY city labels */
        .cb-label-marker { background: transparent !important; border: none !important; }
        .cb-mk {
          display: inline-block; white-space: nowrap;
          transform: translate(-50%, -50%); padding: 2px 6px;
          font-family: 'Montserrat', sans-serif;
          text-shadow: 0 0 4px #F9F6F1, 0 0 4px #F9F6F1, 0 0 4px #F9F6F1, 0 0 4px #F9F6F1;
          cursor: default; transition: color .25s ease, transform .25s ease;
        }
        .cb-mk-primary { font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #0d3a2a; }
        .cb-mk-active { color: #0d0d0d; }

        /* POI sophisticated black pins with label below */
        .cb-poi-marker { background: transparent !important; border: none !important; }
        .cb-poi {
          position: relative; display: flex; flex-direction: column; align-items: center;
          cursor: pointer;
          transition: transform .25s ease;
        }
        .cb-poi svg {
          filter: drop-shadow(0 2px 3px rgba(0,0,0,0.25));
          transition: transform .25s ease;
          transform-origin: 50% 100%;
        }
        .cb-poi-label {
          margin-top: 2px; white-space: nowrap; color: #1F1D1A; font-weight: 500;
          letter-spacing: 0.02em;
          text-shadow: 0 0 4px #F9F6F1, 0 0 4px #F9F6F1, 0 0 4px #F9F6F1, 0 0 4px #F9F6F1;
          padding: 1px 4px; border-radius: 4px;
          transition: color .25s ease, font-weight .25s ease;
        }
        .cb-poi-active svg { transform: scale(1.25); }
        .cb-poi-active .cb-poi-label { color: #0d0d0d; font-weight: 700; }

        /* La Nucía isotipo (round + small) */
        .cb-nucia-marker { background: transparent !important; border: none !important; }
        .cb-nucia-wrap { width: 120px; display: flex; flex-direction: column; align-items: center; pointer-events: none; }
        .cb-nucia-ring {
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; background: #0d3a2a;
          box-shadow: 0 4px 14px rgba(13,58,42,0.35), 0 0 0 3px rgba(249,246,241,0.95);
        }
        .cb-nucia-ring img { object-fit: contain; filter: brightness(0) invert(1); }
        .cb-nucia-label {
          margin-top: 6px; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 10px; color: #0d3a2a; letter-spacing: 0.16em; text-transform: uppercase;
          background: rgba(249,246,241,0.92); padding: 2px 8px; border-radius: 999px;
          border: 1px solid rgba(13,58,42,0.18);
        }

        /* Progressive dotted route */
        .cb-route-dot-marker { background: transparent !important; border: none !important; pointer-events: none; }
        .cb-route-dot {
          display: block; width: 5px; height: 5px; border-radius: 50%;
          background: #0d3a2a; box-shadow: 0 0 0 2px rgba(249,246,241,0.85);
          animation: cb-route-dot-in .22s ease both;
        }
        @keyframes cb-route-dot-in { from { opacity: 0; transform: scale(0.35); } to { opacity: 1; transform: scale(1); } }

        .cb-cards-wrap { width: 100%; margin-top: 24px; }
        .cb-cards-scroller {
          display: flex; gap: 14px; overflow-x: auto; scroll-behavior: smooth;
          padding: 8px 4px 16px; scrollbar-width: thin;
        }
        .cb-cards-scroller::-webkit-scrollbar { height: 6px; }
        .cb-cards-scroller::-webkit-scrollbar-thumb { background: rgba(13,58,42,0.2); border-radius: 999px; }
        .cb-card {
          flex: 0 0 240px; padding: 16px 18px; border-radius: 14px;
          background: #fff; border: 1px solid rgba(31,29,26,0.1);
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
          cursor: pointer; scroll-snap-align: center;
        }
        .cb-card:hover, .cb-card.cb-card-active {
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(13,13,13,0.18);
          border-color: #0d0d0d;
        }
        .cb-card .cat {
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
          color: #0d3a2a; font-weight: 600;
        }
        .cb-card .name {
          font-family: 'TAN-PEARL', 'Cormorant Garamond', serif;
          font-size: 20px; color: #0d3a2a; margin-top: 4px; line-height: 1.15;
        }
        .cb-card .desc { font-size: 12px; color: #6B6B6B; margin-top: 8px; line-height: 1.5; }
        .cb-card .meta {
          margin-top: 12px; display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: #1F1D1A; font-weight: 600;
        }
        .cb-card .meta svg { width: 14px; height: 14px; color: #0d0d0d; }
        .cb-card .meta .sep { color: rgba(31,29,26,0.25); margin: 0 2px; font-weight: 400; }
      `}</style>

      <MapContainer
        bounds={BOUNDS}
        boundsOptions={{ padding: [20, 20] }}
        minZoom={9}
        maxZoom={16}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
        style={{ width: "100%" }}
      >
        <TileLayer
          attribution=""
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />
        <ScrollEnabler />

        {/* Animated dotted route progressively drawn from La Nucía */}
        {routeDotPositions.map((position, index) => (
          <Marker
            key={`route-${hovered}-${index}`}
            position={position}
            icon={routeDotIcon(index)}
            interactive={false}
          />
        ))}

        {/* La Nucía isotipo */}
        <Marker position={LA_NUCIA} icon={nuciaIcon(isMobile)} interactive={false} />

        {/* Pins */}
        {PINS.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={
              p.primary
                ? primaryLabelIcon(p.name, isMobile, hovered === p.id)
                : poiPinIcon(hovered === p.id)
            }
            eventHandlers={{
              mouseover: () => setHovered(p.id),
              mouseout: () => setHovered((h) => (h === p.id ? null : h)),
              click: () => setHovered(p.id),
            }}
          />
        ))}
      </MapContainer>

      <div className="cb-cards-wrap">
        <div ref={scrollerRef} className="cb-cards-scroller">
          {PINS.map((p) => (
            <div
              key={p.id}
              ref={(el) => (cardRefs.current[p.id] = el)}
              className={`cb-card ${hovered === p.id ? "cb-card-active" : ""}`}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered((h) => (h === p.id ? null : h))}
            >
              <div className="cat">{p.category}</div>
              <div className="name">{p.name}</div>
              <div className="desc">{p.description}</div>
              <div className="meta">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm14 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM3 17V9l2-5h12l3 5v8" />
                </svg>
                {p.driveMin} min
                <span className="sep">·</span>
                {p.driveKm} km
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CostaBlancaMap;
