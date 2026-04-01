import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1Ijoiam9zZWdsIiwiYSI6ImNseDBrcHJhNzAyMzEyaXFzbDhrMWRqbXMifQ.4I6tkdFj7pZ5qDXnUHJ4iQ";

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
  { name: "Farmacia La Nucía", lng: -0.1295, lat: 38.6095, category: "health" },
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
];

const categoryConfig: Record<string, { color: string; icon: string }> = {
  health: { color: "#ef4444", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h2v-2h-2v2zm0-4h2V7h-2v8z" },
  education: { color: "#3b82f6", icon: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z" },
  parks: { color: "#22c55e", icon: "M17 8c.7 0 1.38.1 2 .29V5l-7-3-7 3v5.6c0 5.1 3.4 9.8 7 10.9 1-.3 2-1 2.8-1.8-.5.1-1 .2-1.5.2C8.8 20 5 16.4 5 12V6.3l7-3 5 2.1V8zm-5 4l-4 2v-3l4-2 4 2v3l-4-2z" },
  shopping: { color: "#f59e0b", icon: "M18 6h-2c0-2.2-1.8-4-4-4S8 3.8 8 6H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 14H6V8h2v2h2V8h4v2h2V8h2v10z" },
};

interface Props {
  activeCategories: string[];
}

const MapboxMapInteractive = ({ activeCategories }: Props) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-0.13, 38.61],
      zoom: 13,
      pitch: 45,
      bearing: -10,
      attributionControl: false,
      antialias: true,
    });

    map.current.on("load", () => {
      if (!map.current) return;

      // Add 3D terrain
      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.3 });

      // Add sky layer
      map.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 0.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });

      // Brand-matching map colors
      map.current.setPaintProperty("water", "fill-color", "hsl(158, 70%, 8%)");
      map.current.setPaintProperty("land", "background-color", "hsl(158, 61%, 6%)");
      const style = map.current.getStyle();
      if (style?.layers) {
        style.layers.forEach((layer) => {
          if (layer.id.includes("road") && layer.type === "line") {
            try { map.current!.setPaintProperty(layer.id, "line-color", "hsl(158, 40%, 20%)"); } catch (_) {}
          }
          if (layer.type === "symbol") {
            try {
              map.current!.setPaintProperty(layer.id, "text-color", "hsl(35, 60%, 55%)");
              map.current!.setPaintProperty(layer.id, "text-halo-color", "hsl(158, 70%, 6%)");
              map.current!.setPaintProperty(layer.id, "text-halo-width", 1.5);
            } catch (_) {}
          }
        });
      }

      // Add 3D buildings
      map.current.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 12,
        paint: {
          "fill-extrusion-color": "hsl(158, 40%, 15%)",
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-base": ["get", "min_height"],
          "fill-extrusion-opacity": 0.5,
        },
      });
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Main branded marker
    const mainEl = document.createElement("div");
    mainEl.className = "main-marker";
    mainEl.innerHTML = `
      <div style="
        position: relative;
        cursor: pointer;
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
      " onmouseenter="this.style.transform='scale(1.2) translateY(-4px)'; this.style.filter='drop-shadow(0 8px 20px rgba(0,0,0,0.5)) drop-shadow(0 0 12px hsla(151,23%,50%,0.4))'"
         onmouseleave="this.style.transform='scale(1) translateY(0)'; this.style.filter='drop-shadow(0 4px 12px rgba(0,0,0,0.4))'">
        <svg width="44" height="58" viewBox="0 0 44 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 0C9.85 0 0 9.85 0 22c0 16.5 22 36 22 36s22-19.5 22-36C44 9.85 34.15 0 22 0z" fill="hsl(151, 23%, 50%)"/>
          <circle cx="22" cy="22" r="10" fill="hsl(158, 65%, 15%)"/>
          <text x="22" y="26" text-anchor="middle" fill="hsl(151, 23%, 50%)" font-family="Montserrat, sans-serif" font-weight="700" font-size="10">N1</text>
        </svg>
        <div style="
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: 8px;
          border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
          border: 2px solid hsla(151, 23%, 50%, 0.3);
          animation: mainPulse 2.5s ease-in-out infinite;
        "></div>
      </div>
    `;

    const styleTag = document.createElement("style");
    styleTag.textContent = `
      @keyframes mainPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.15); opacity: 0.4; }
      }
      .poi-marker {
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
        cursor: pointer;
      }
      .poi-marker:hover {
        transform: scale(1.35) translateY(-3px);
        filter: drop-shadow(0 4px 10px rgba(0,0,0,0.4));
      }
      .mapboxgl-popup-content {
        background: hsl(158, 65%, 12%) !important;
        border: 1px solid hsla(151, 23%, 50%, 0.2) !important;
        border-radius: 8px !important;
        padding: 10px 14px !important;
        box-shadow: 0 8px 24px rgba(0,0,0,0.4) !important;
      }
      .mapboxgl-popup-tip {
        border-top-color: hsl(158, 65%, 12%) !important;
      }
      .mapboxgl-popup-close-button {
        color: hsla(151, 23%, 50%, 0.6) !important;
        font-size: 16px !important;
      }
    `;
    document.head.appendChild(styleTag);

    new mapboxgl.Marker({ element: mainEl, anchor: "bottom" })
      .setLngLat([-0.13, 38.61])
      .setPopup(
        new mapboxgl.Popup({ offset: 30, closeButton: true }).setHTML(
          `<div style="font-family:'Montserrat',sans-serif;">
            <strong style="color:hsl(151,23%,50%); font-size:14px; letter-spacing:0.05em;">LA NUCÍA ONE</strong><br/>
            <span style="font-size:12px;color:hsla(90,43%,97%,0.6);">Residencial · La Nucía, Alicante</span>
          </div>`
        )
      )
      .addTo(map.current);

    return () => {
      styleTag.remove();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update POI markers with animations
  useEffect(() => {
    if (!map.current) return;

    markers.current.forEach(m => m.remove());
    markers.current = [];

    const filteredPois = pois.filter(p => activeCategories.includes(p.category));

    filteredPois.forEach((poi, index) => {
      const config = categoryConfig[poi.category];
      const el = document.createElement("div");
      el.className = "poi-marker";
      el.style.opacity = "0";
      el.style.transform = "scale(0.5) translateY(8px)";
      el.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="13" fill="${config.color}" fill-opacity="0.15" stroke="${config.color}" stroke-width="1.5"/>
          <circle cx="14" cy="14" r="5" fill="${config.color}"/>
        </svg>
      `;

      // Animate in with stagger
      setTimeout(() => {
        el.style.transition = "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "scale(1) translateY(0)";
      }, 60 + index * 80);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([poi.lng, poi.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 16, closeButton: false }).setHTML(
            `<div style="font-family:'Montserrat',sans-serif;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
                <span style="width:8px;height:8px;border-radius:50%;background:${config.color};display:inline-block;"></span>
                <strong style="font-size:12px;color:hsl(90,43%,97%);letter-spacing:0.02em;">${poi.name}</strong>
              </div>
              <span style="font-size:10px;color:hsla(90,43%,97%,0.5);text-transform:uppercase;letter-spacing:0.1em;">${poi.category}</span>
            </div>`
          )
        )
        .addTo(map.current!);

      markers.current.push(marker);
    });
  }, [activeCategories]);

  return (
    <div ref={mapContainer} className="w-full h-full" />
  );
};

export default MapboxMapInteractive;
