import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Pin = {
  name: string;
  lat: number;
  lng: number;
  category: string;
  description: string;
};

const PRIMARY: Pin[] = [
  { name: "Finestrat", lat: 38.545, lng: -0.189, category: "Municipio", description: "Pueblo mediterráneo a los pies del Puig Campana." },
  { name: "Polop", lat: 38.614, lng: -0.143, category: "Municipio", description: "Pueblo histórico del interior de la Marina Baixa." },
  { name: "Altea", lat: 38.599, lng: -0.048, category: "Municipio", description: "Casco antiguo blanco y puerto deportivo." },
  { name: "Benidorm", lat: 38.541, lng: -0.132, category: "Municipio", description: "Capital turística de la Costa Blanca." },
  { name: "Villajoyosa", lat: 38.503, lng: -0.234, category: "Municipio", description: "Casas de colores y tradición chocolatera." },
  { name: "Alicante", lat: 38.345, lng: -0.483, category: "Capital de provincia", description: "Capital mediterránea con puerto y casco antiguo." },
  { name: "Aeropuerto Alicante-Elche (ALC)", lat: 38.281, lng: -0.558, category: "Aeropuerto", description: "Conexión internacional a 40 min." },
];

const SECONDARY: Pin[] = [
  { name: "Ciudad Deportiva La Nucía", lat: 38.601, lng: -0.112, category: "Instalación deportiva", description: "Complejo deportivo de referencia europea." },
  { name: "Centro Comercial La Nucía", lat: 38.597, lng: -0.119, category: "Comercial", description: "Comercio y servicios de la Marina Baixa." },
  { name: "Playa de Poniente", lat: 38.537, lng: -0.159, category: "Playa", description: "Arena fina y paseo marítimo de Benidorm." },
  { name: "Playa de Levante", lat: 38.542, lng: -0.110, category: "Playa", description: "La playa más icónica de Benidorm." },
  { name: "Terra Mítica", lat: 38.556, lng: -0.160, category: "Ocio", description: "Parque temático junto a Benidorm." },
  { name: "Puerto de Altea", lat: 38.591, lng: -0.040, category: "Puerto", description: "Puerto deportivo con paseo marítimo." },
  { name: "Casco Antiguo de Altea", lat: 38.600, lng: -0.043, category: "Cultural", description: "Calles empedradas y la cúpula azul." },
  { name: "Playa del Torres", lat: 38.506, lng: -0.228, category: "Playa", description: "Playa tranquila en Villajoyosa." },
  { name: "Castillo de Santa Bárbara", lat: 38.354, lng: -0.478, category: "Cultural", description: "Fortaleza con vistas a Alicante." },
  { name: "Puerto de Benidorm", lat: 38.537, lng: -0.125, category: "Puerto", description: "Puerto pesquero y deportivo." },
  { name: "Isla de Benidorm", lat: 38.506, lng: -0.107, category: "Naturaleza", description: "Reserva marina frente a la bahía." },
];

const primaryIcon = (label: string, isMobile: boolean) =>
  L.divIcon({
    className: "cb-primary-pin",
    html: `
      <div class="cb-pin-wrap">
        <svg width="${isMobile ? 26 : 32}" height="${isMobile ? 34 : 42}" viewBox="0 0 32 42" fill="none">
          <path d="M16 0C7.16 0 0 7.16 0 16c0 11 16 26 16 26s16-15 16-26C32 7.16 24.84 0 16 0z" fill="#8E2D44" filter="url(#sh)"/>
          <circle cx="16" cy="16" r="5" fill="#FFFFFF"/>
          <defs><filter id="sh" x="-4" y="-2" width="40" height="50"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.25"/></filter></defs>
        </svg>
        <span class="cb-label cb-label-primary" style="font-size:${isMobile ? 11 : 13}px">${label}</span>
      </div>`,
    iconSize: [isMobile ? 26 : 32, isMobile ? 34 : 42],
    iconAnchor: [isMobile ? 13 : 16, isMobile ? 34 : 42],
  });

const secondaryIcon = (label: string, isMobile: boolean, showLabel: boolean) =>
  L.divIcon({
    className: "cb-secondary-pin",
    html: `
      <div class="cb-pin-wrap">
        <span class="cb-dot"></span>
        ${showLabel ? `<span class="cb-label cb-label-secondary" style="font-size:${isMobile ? 10 : 12}px">${label}</span>` : ""}
      </div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

const ZoomWatcher = ({ onZoom }: { onZoom: (z: number) => void }) => {
  const map = useMap();
  useEffect(() => {
    onZoom(map.getZoom());
    const handler = () => onZoom(map.getZoom());
    map.on("zoomend", handler);
    return () => {
      map.off("zoomend", handler);
    };
  }, [map, onZoom]);
  return null;
};

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
  const [zoom, setZoom] = useState(11);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const showSecondaryLabels = zoom >= 11;

  return (
    <div className="cb-map-shell">
      <style>{`
        .cb-map-shell {
          width: 100%;
          height: 560px;
          border-radius: 16px;
          border: 1px solid rgba(31,29,26,0.18);
          box-shadow: 0 4px 20px rgba(31,29,26,0.12);
          background: #F5F3F2;
          overflow: hidden;
          position: relative;
        }
        @media (max-width: 768px) { .cb-map-shell { height: 420px; } }
        .cb-map-shell .leaflet-container { background: #F5F3F2; font-family: 'Roboto', system-ui, sans-serif; }
        .cb-map-shell .leaflet-control-attribution { background: rgba(245,243,242,0.8); font-size: 9px; color: #8F8D8C; }
        .cb-map-shell .leaflet-control-attribution a { color: #8F8D8C; }
        .cb-map-shell .leaflet-control-zoom a {
          background: #F5F3F2; color: #1F1D1A; border: 1px solid rgba(31,29,26,0.18);
        }
        .cb-map-shell .leaflet-control-zoom a:hover { background: #fff; }
        .cb-pin-wrap { position: relative; display: flex; flex-direction: column; align-items: center; }
        .cb-label {
          margin-top: 2px; white-space: nowrap; color: #1F1D1A; font-family: 'Roboto', sans-serif;
          text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff;
          pointer-events: none;
        }
        .cb-label-primary { font-weight: 500; }
        .cb-label-secondary { font-weight: 400; }
        .cb-dot {
          display: block; width: 14px; height: 14px; border-radius: 50%;
          background: #D4C3B3; border: 2px solid #8E2D44; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .cb-tooltip {
          background: #fff !important; border: 1px solid rgba(31,29,26,0.12) !important;
          border-radius: 8px !important; padding: 8px 10px !important; color: #1F1D1A !important;
          font-family: 'Roboto', sans-serif !important; box-shadow: 0 4px 14px rgba(31,29,26,0.15) !important;
        }
        .cb-tooltip::before { display: none !important; }
        .cb-tooltip .cb-tt-name { font-weight: 600; font-size: 13px; }
        .cb-tooltip .cb-tt-cat { font-size: 10px; color: #8E2D44; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px; }
        .cb-tooltip .cb-tt-desc { font-size: 12px; color: #555; margin-top: 4px; max-width: 220px; }
        .cb-legend {
          position: absolute; bottom: 12px; left: 12px; z-index: 500;
          background: rgba(245,243,242,0.95); border: 1px solid rgba(31,29,26,0.18);
          border-radius: 10px; padding: 10px 12px; font-family: 'Roboto', sans-serif;
          font-size: 12px; color: #8F8D8C; backdrop-filter: blur(4px);
        }
        .cb-legend .row { display: flex; align-items: center; gap: 8px; margin: 2px 0; }
        .cb-legend .sw-primary { width: 12px; height: 12px; border-radius: 50%; background: #8E2D44; }
        .cb-legend .sw-secondary { width: 12px; height: 12px; border-radius: 50%; background: #D4C3B3; border: 2px solid #8E2D44; box-sizing: border-box; }
      `}</style>

      <MapContainer
        center={[38.47, -0.25]}
        zoom={11}
        minZoom={9}
        maxZoom={16}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="topright" />
        <ScrollEnabler />
        <ZoomWatcher onZoom={setZoom} />

        {PRIMARY.map((p) => (
          <Marker key={p.name} position={[p.lat, p.lng]} icon={primaryIcon(p.name, isMobile)}>
            <Tooltip direction="top" offset={[0, -36]} opacity={1} className="cb-tooltip">
              <div className="cb-tt-name">{p.name}</div>
              <div className="cb-tt-cat">{p.category}</div>
              <div className="cb-tt-desc">{p.description}</div>
            </Tooltip>
          </Marker>
        ))}

        {SECONDARY.map((p) => (
          <Marker
            key={p.name}
            position={[p.lat, p.lng]}
            icon={secondaryIcon(p.name, isMobile, showSecondaryLabels)}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} className="cb-tooltip">
              <div className="cb-tt-name">{p.name}</div>
              <div className="cb-tt-cat">{p.category}</div>
              <div className="cb-tt-desc">{p.description}</div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      <div className="cb-legend">
        <div className="row"><span className="sw-primary" /> Municipios y puntos principales</div>
        <div className="row"><span className="sw-secondary" /> Puntos de interés</div>
      </div>
    </div>
  );
};

export default CostaBlancaMap;
