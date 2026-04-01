import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Skeleton } from "@/components/ui/skeleton";

mapboxgl.accessToken = "pk.eyJ1Ijoiam9zZWdsIiwiYSI6ImNseDBrcHJhNzAyMzEyaXFzbDhrMWRqbXMifQ.4I6tkdFj7pZ5qDXnUHJ4iQ";

/* ── POI data ── */
interface POI {
  name: string;
  lng: number;
  lat: number;
  category: string;
}

const pois: POI[] = [
  // Health
  { name: "Centro de Salud La Nucía", lng: -0.1268, lat: 38.6115, category: "health" },
  { name: "Hospital Marina Baixa", lng: -0.0750, lat: 38.5690, category: "health" },
  { name: "Farmacia Central La Nucía", lng: -0.1295, lat: 38.6095, category: "health" },
  // Education
  { name: "CEIP Sant Rafel", lng: -0.1310, lat: 38.6080, category: "education" },
  { name: "IES La Nucía", lng: -0.1240, lat: 38.6130, category: "education" },
  { name: "Escuela Infantil Municipal", lng: -0.1285, lat: 38.6102, category: "education" },
  // Parks
  { name: "Parc Natural Serra Gelada", lng: -0.0820, lat: 38.5460, category: "parks" },
  { name: "Ciudad Deportiva Camilo Cano", lng: -0.1230, lat: 38.6060, category: "parks" },
  { name: "Parque de La Nucía", lng: -0.1280, lat: 38.6090, category: "parks" },
  // Shopping
  { name: "Mercadona La Nucía", lng: -0.1260, lat: 38.6070, category: "shopping" },
  { name: "Centro Comercial La Marina", lng: -0.1070, lat: 38.5530, category: "shopping" },
  { name: "Lidl La Nucía", lng: -0.1220, lat: 38.6050, category: "shopping" },
  // Restaurants
  { name: "Restaurante El Xato", lng: -0.1305, lat: 38.6088, category: "restaurants" },
  { name: "Restaurante Casa Pepe", lng: -0.1275, lat: 38.6110, category: "restaurants" },
  { name: "Pizzería La Piazza", lng: -0.1250, lat: 38.6098, category: "restaurants" },
  // Gas
  { name: "Repsol La Nucía", lng: -0.1190, lat: 38.6045, category: "gas" },
  { name: "Cepsa Av. Marina Baixa", lng: -0.1150, lat: 38.6020, category: "gas" },
];

/* ── Category visual config ── */
const categoryConfig: Record<string, { color: string; iconPath: string }> = {
  health: {
    color: "#E54D4D",
    iconPath: "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-1 10h-4v4h-4v-4H6v-2h4V7h4v4h4v2z",
  },
  education: {
    color: "#4A90D9",
    iconPath: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 14.5L5 14v-2.5l7 3.5 7-3.5V14l-7 3.5z",
  },
  parks: {
    color: "#4CAF50",
    iconPath: "M17 12c0-2.76-2.24-5-5-5s-5 2.24-5 5c0 2.28 1.53 4.19 3.62 4.78C10.24 17.6 10 18.27 10 19v2h4v-2c0-.73-.24-1.4-.62-2.22C15.47 16.19 17 14.28 17 12zM7 12c0-2.76 2.24-5 5-5s5 2.24 5 5H7z",
  },
  shopping: {
    color: "#F5A623",
    iconPath: "M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.16 6.26l.54 2h9.96l.94-2H7.16zM0 1h3.27l3.17 6.65L4.25 11c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H6.31l.26-.54L8 9h7.02c.75 0 1.41-.41 1.75-1.03L20.7 1H0z",
  },
  restaurants: {
    color: "#9B59B6",
    iconPath: "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z",
  },
  gas: {
    color: "#E67E22",
    iconPath: "M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33a2.5 2.5 0 002.5 2.5c.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14a2 2 0 00-2-2h-1V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 005 0V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5z",
  },
};

/* ── SVG icon builder for markers ── */
function createMarkerSVG(iconPath: string, color: string, size: number = 36): string {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 1}" fill="white" stroke="${color}" stroke-width="1.5"/>
      <g transform="translate(${(size - 20) / 2}, ${(size - 20) / 2}) scale(0.833)">
        <path d="${iconPath}" fill="${color}"/>
      </g>
    </svg>
  `;
}

/* ── Styles injected once ── */
const MAP_STYLES_ID = "mapbox-premium-styles";
function injectStyles() {
  if (document.getElementById(MAP_STYLES_ID)) return;
  const style = document.createElement("style");
  style.id = MAP_STYLES_ID;
  style.textContent = `
    @keyframes sonarPing {
      0% { transform: scale(1); opacity: 0.7; }
      70% { transform: scale(2.2); opacity: 0; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    @keyframes poiGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); }
      50% { box-shadow: 0 0 0 6px rgba(0,0,0,0.08); }
    }
    .main-marker-wrap {
      cursor: pointer;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
    }
    .main-marker-wrap:hover {
      transform: scale(1.15) translateY(-3px);
      filter: drop-shadow(0 6px 18px rgba(0,0,0,0.22));
    }
    .main-marker-ping {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid hsl(151, 23%, 50%);
      animation: sonarPing 2.5s ease-out infinite;
      pointer-events: none;
    }
    .poi-badge {
      cursor: pointer;
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.35s ease;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,0.1));
      border-radius: 50%;
    }
    .poi-badge:hover {
      transform: scale(1.2) translateY(-2px);
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.18));
      animation: poiGlow 0.6s ease-in-out infinite;
    }
    .mapboxgl-popup-content {
      background: white !important;
      border: 1px solid hsl(0 0% 90%) !important;
      border-radius: 12px !important;
      padding: 12px 16px !important;
      box-shadow: 0 8px 30px rgba(0,0,0,0.1) !important;
      font-family: 'Montserrat', sans-serif !important;
    }
    .mapboxgl-popup-tip {
      border-top-color: white !important;
    }
    .mapboxgl-popup-close-button {
      color: hsl(0 0% 60%) !important;
      font-size: 18px !important;
      padding: 4px 8px !important;
    }
    .mapboxgl-ctrl-group { border-radius: 12px !important; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08) !important; }
    .mapboxgl-ctrl-group button { width: 36px !important; height: 36px !important; }
  `;
  document.head.appendChild(style);
}

/* ── Component ── */
interface Props {
  activeCategories: string[];
}

const MapboxMapInteractive = ({ activeCategories }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  // Lazy-load: only init map when section is in viewport
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Init map
  useEffect(() => {
    if (!inView || !containerRef.current || mapRef.current) return;
    injectStyles();

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-0.1270, 38.6100],
      zoom: 14,
      pitch: 45,
      bearing: -20,
      attributionControl: false,
      antialias: true,
    });

    mapRef.current = map;

    map.on("load", () => {
      // 3D terrain
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.2 });

      // Sky
      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 45.0],
          "sky-atmosphere-sun-intensity": 10,
        },
      });

      // 3D buildings – warm cream
      map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 12,
        paint: {
          "fill-extrusion-color": "#F5F0E8",
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-base": ["get", "min_height"],
          "fill-extrusion-opacity": 0.4,
        },
      });

      // Subtle ambient rotation on load
      const startBearing = map.getBearing();
      map.easeTo({
        bearing: startBearing + 5,
        duration: 3000,
        easing: (t: number) => t * (2 - t), // ease-out quad
      });

      // Main residential marker
      const mainEl = document.createElement("div");
      mainEl.className = "main-marker-wrap";
      mainEl.style.position = "relative";
      mainEl.innerHTML = `
        <div class="main-marker-ping"></div>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="23" fill="hsl(158, 65%, 15%)" stroke="hsl(151, 23%, 50%)" stroke-width="2"/>
          <text x="24" y="20" text-anchor="middle" fill="hsl(151, 23%, 50%)" font-family="Montserrat, sans-serif" font-weight="700" font-size="9" letter-spacing="0.5">LaNucía</text>
          <text x="24" y="33" text-anchor="middle" fill="hsl(151, 23%, 50%)" font-family="'TAN - PEARL', serif" font-weight="700" font-size="13">ONE</text>
        </svg>
      `;

      new mapboxgl.Marker({ element: mainEl, anchor: "center" })
        .setLngLat([-0.1270, 38.6100])
        .setPopup(
          new mapboxgl.Popup({ offset: 30, closeButton: true }).setHTML(
            `<div>
              <strong style="color:hsl(158,65%,15%); font-size:14px; letter-spacing:0.05em;">LA NUCÍA ONE</strong><br/>
              <span style="font-size:12px;color:hsl(0,0%,50%);">Residencial · La Nucía, Alicante</span>
            </div>`
          )
        )
        .addTo(map);

      setIsLoaded(true);
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [inView]);

  // Update POI markers when categories change
  const syncMarkers = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const filtered = pois.filter(p => activeCategories.includes(p.category));

    filtered.forEach((poi, idx) => {
      const cfg = categoryConfig[poi.category];
      if (!cfg) return;

      const el = document.createElement("div");
      el.className = "poi-badge";
      el.style.opacity = "0";
      el.style.transform = "scale(0.4) translateY(6px)";
      el.innerHTML = createMarkerSVG(cfg.iconPath, cfg.color, 32);

      // Staggered entrance
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.transition = "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.34,1.56,0.64,1)";
          el.style.opacity = "1";
          el.style.transform = "scale(1) translateY(0)";
        }, 40 + idx * 60);
      });

      const categoryLabel = poi.category.charAt(0).toUpperCase() + poi.category.slice(1);
      const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
        .setLngLat([poi.lng, poi.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 20, closeButton: false }).setHTML(
            `<div>
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
                <span style="width:8px;height:8px;border-radius:50%;background:${cfg.color};display:inline-block;flex-shrink:0;"></span>
                <strong style="font-size:13px;color:hsl(158,65%,15%);">${poi.name}</strong>
              </div>
              <span style="font-size:10px;color:hsl(0,0%,55%);text-transform:uppercase;letter-spacing:0.1em;">${categoryLabel}</span>
            </div>`
          )
        )
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [activeCategories]);

  useEffect(() => {
    if (isLoaded) syncMarkers();
  }, [isLoaded, syncMarkers]);

  return (
    <div className="relative w-full h-full">
      {/* Skeleton while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="w-full h-full rounded-none bg-muted/40" />
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default MapboxMapInteractive;
