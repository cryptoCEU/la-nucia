import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
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

const PINS: Pin[] = [
  // Primary (labeled cities)
  { id: "finestrat", name: "Finestrat", lat: 38.545, lng: -0.189, category: "Municipio", description: "Pueblo mediterráneo a los pies del Puig Campana.", driveMin: 15, driveKm: 12, primary: true },
  { id: "polop", name: "Polop", lat: 38.614, lng: -0.143, category: "Municipio", description: "Pueblo histórico del interior de la Marina Baixa.", driveMin: 6, driveKm: 3, primary: true },
  { id: "altea", name: "Altea", lat: 38.599, lng: -0.048, category: "Municipio", description: "Casco antiguo blanco y puerto deportivo.", driveMin: 14, driveKm: 11, primary: true },
  { id: "benidorm", name: "Benidorm", lat: 38.541, lng: -0.132, category: "Municipio", description: "Capital turística de la Costa Blanca.", driveMin: 12, driveKm: 9, primary: true },
  { id: "villajoyosa", name: "Villajoyosa", lat: 38.503, lng: -0.234, category: "Municipio", description: "Casas de colores y tradición chocolatera.", driveMin: 22, driveKm: 19, primary: true },
  { id: "alicante", name: "Alicante", lat: 38.345, lng: -0.483, category: "Capital", description: "Capital mediterránea con puerto y casco antiguo.", driveMin: 45, driveKm: 55, primary: true },
  { id: "aeropuerto", name: "Aeropuerto ALC", lat: 38.281, lng: -0.558, category: "Aeropuerto", description: "Conexión internacional Alicante-Elche.", driveMin: 50, driveKm: 65, primary: true },
  // Secondary POIs
  { id: "deportiva", name: "Ciudad Deportiva", lat: 38.601, lng: -0.112, category: "Deporte", description: "Complejo deportivo de referencia europea.", driveMin: 5, driveKm: 2 },
  { id: "comercial", name: "C.C. La Nucía", lat: 38.597, lng: -0.119, category: "Comercial", description: "Comercio y servicios de la Marina Baixa.", driveMin: 4, driveKm: 2 },
  { id: "poniente", name: "Playa de Poniente", lat: 38.537, lng: -0.159, category: "Playa", description: "Arena fina y paseo marítimo de Benidorm.", driveMin: 14, driveKm: 11 },
  { id: "levante", name: "Playa de Levante", lat: 38.542, lng: -0.110, category: "Playa", description: "La playa más icónica de Benidorm.", driveMin: 13, driveKm: 10 },
  { id: "terra", name: "Terra Mítica", lat: 38.556, lng: -0.160, category: "Ocio", description: "Parque temático junto a Benidorm.", driveMin: 12, driveKm: 10 },
  { id: "puertoaltea", name: "Puerto de Altea", lat: 38.591, lng: -0.040, category: "Puerto", description: "Puerto deportivo con paseo marítimo.", driveMin: 16, driveKm: 12 },
  { id: "cascoaltea", name: "Casco Antiguo Altea", lat: 38.600, lng: -0.043, category: "Cultural", description: "Calles empedradas y la cúpula azul.", driveMin: 15, driveKm: 12 },
  { id: "torres", name: "Playa del Torres", lat: 38.506, lng: -0.228, category: "Playa", description: "Playa tranquila en Villajoyosa.", driveMin: 20, driveKm: 17 },
  { id: "castillo", name: "Castillo Sta. Bárbara", lat: 38.354, lng: -0.478, category: "Cultural", description: "Fortaleza con vistas a Alicante.", driveMin: 45, driveKm: 53 },
  { id: "puertoben", name: "Puerto de Benidorm", lat: 38.537, lng: -0.125, category: "Puerto", description: "Puerto pesquero y deportivo.", driveMin: 13, driveKm: 10 },
  { id: "islabenidorm", name: "Isla de Benidorm", lat: 38.506, lng: -0.107, category: "Naturaleza", description: "Reserva marina frente a la bahía.", driveMin: 15, driveKm: 12 },
];

const labelIcon = (label: string, isMobile: boolean, primary: boolean, active: boolean) =>
  L.divIcon({
    className: "cb-label-marker",
    html: `<span class="cb-mk ${primary ? "cb-mk-primary" : "cb-mk-secondary"} ${active ? "cb-mk-active" : ""}" style="font-size:${primary ? (isMobile ? 12 : 14) : isMobile ? 10 : 12}px">${primary ? "" : '<span class="cb-mk-dot"></span>'}${label}</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

const nuciaIcon = (isMobile: boolean) =>
  L.divIcon({
    className: "cb-nucia-marker",
    html: `<div class="cb-nucia-wrap"><img src="${logoIsotipo}" alt="La Nucía One" style="height:${isMobile ? 44 : 56}px"/><span class="cb-nucia-label">La Nucía One</span></div>`,
    iconSize: [isMobile ? 44 : 56, isMobile ? 60 : 76],
    iconAnchor: [isMobile ? 22 : 28, isMobile ? 30 : 38],
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sync: hovering a pin scrolls carousel to the matching card
  useEffect(() => {
    if (!hovered || !scrollerRef.current) return;
    const el = cardRefs.current[hovered];
    if (!el) return;
    const scroller = scrollerRef.current;
    const left = el.offsetLeft - scroller.clientWidth / 2 + el.clientWidth / 2;
    scroller.scrollTo({ left, behavior: "smooth" });
  }, [hovered]);

  const activePin = useMemo(() => PINS.find((p) => p.id === hovered) || null, [hovered]);

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

        .cb-label-marker { background: transparent !important; border: none !important; }
        .cb-mk {
          display: inline-block; white-space: nowrap;
          transform: translate(-50%, -50%); padding: 2px 4px;
          color: #1F1D1A; font-family: 'Montserrat', sans-serif;
          text-shadow: 0 0 4px #F9F6F1, 0 0 4px #F9F6F1, 0 0 4px #F9F6F1, 0 0 4px #F9F6F1;
          cursor: pointer; transition: color .25s ease, transform .25s ease;
        }
        .cb-mk-primary { font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase; color: #0d3a2a; }
        .cb-mk-secondary { font-weight: 500; color: #1F1D1A; display: inline-flex; align-items: center; gap: 6px; }
        .cb-mk-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #D4C3B3; border: 2px solid #8E2D44; box-sizing: content-box;
          transition: transform .25s ease, background .25s ease;
        }
        .cb-mk-active { color: #8E2D44; transform: translate(-50%, -50%) scale(1.08); }
        .cb-mk-active .cb-mk-dot { background: #8E2D44; transform: scale(1.4); }

        .cb-nucia-marker { background: transparent !important; border: none !important; }
        .cb-nucia-wrap { display: flex; flex-direction: column; align-items: center; pointer-events: none; }
        .cb-nucia-wrap img { filter: drop-shadow(0 2px 6px rgba(13,58,42,0.35)); }
        .cb-nucia-label {
          margin-top: 4px; font-family: 'Montserrat', sans-serif; font-weight: 700;
          font-size: 11px; color: #0d3a2a; letter-spacing: 0.12em; text-transform: uppercase;
          background: rgba(249,246,241,0.85); padding: 2px 8px; border-radius: 999px;
          border: 1px solid rgba(13,58,42,0.15);
        }

        .cb-route-path {
          stroke: #8E2D44; stroke-width: 2.5; fill: none;
          stroke-dasharray: 2 8; stroke-linecap: round;
          animation: cb-dash 1.2s linear infinite;
          filter: drop-shadow(0 1px 2px rgba(142,45,68,0.25));
        }
        @keyframes cb-dash { to { stroke-dashoffset: -20; } }

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
          box-shadow: 0 10px 28px rgba(13,58,42,0.18);
          border-color: #8E2D44;
        }
        .cb-card .cat {
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
          color: #8E2D44; font-weight: 600;
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
        .cb-card .meta svg { width: 14px; height: 14px; color: #8E2D44; }
        .cb-card .meta .sep { color: rgba(31,29,26,0.25); margin: 0 2px; font-weight: 400; }
      `}</style>

      <MapContainer
        center={[38.5, -0.22]}
        zoom={11}
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

        {/* Animated dotted route from La Nucía to hovered POI */}
        {activePin && (
          <Polyline
            key={activePin.id}
            positions={[LA_NUCIA, [activePin.lat, activePin.lng]]}
            pathOptions={{ className: "cb-route-path" }}
          />
        )}

        {/* La Nucía isotipo */}
        <Marker position={LA_NUCIA} icon={nuciaIcon(isMobile)} interactive={false} />

        {/* All POIs */}
        {PINS.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={labelIcon(p.name, isMobile, !!p.primary, hovered === p.id)}
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
