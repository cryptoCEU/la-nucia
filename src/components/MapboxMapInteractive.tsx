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

const categoryColors: Record<string, string> = {
  health: "#ef4444",
  education: "#3b82f6",
  parks: "#22c55e",
  shopping: "#f59e0b",
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
      attributionControl: false,
    });

    map.current.on("load", () => {
      if (!map.current) return;
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
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Main marker
    const mainEl = document.createElement("div");
    mainEl.innerHTML = `
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z" fill="hsl(35, 60%, 55%)"/>
        <circle cx="18" cy="18" r="8" fill="hsl(158, 70%, 8%)"/>
      </svg>
    `;
    mainEl.style.cursor = "pointer";

    new mapboxgl.Marker({ element: mainEl, anchor: "bottom" })
      .setLngLat([-0.13, 38.61])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="font-family:'Montserrat',sans-serif;padding:4px;">
            <strong style="color:hsl(158,61%,14%);">La Nucía One</strong><br/>
            <span style="font-size:13px;color:#666;">La Nucía, Alicante</span>
          </div>`
        )
      )
      .addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update POI markers when categories change
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    markers.current.forEach(m => m.remove());
    markers.current = [];

    const filteredPois = pois.filter(p => activeCategories.includes(p.category));

    filteredPois.forEach(poi => {
      const color = categoryColors[poi.category] || "#ccc";
      const el = document.createElement("div");
      el.style.width = "12px";
      el.style.height = "12px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = color;
      el.style.border = "2px solid white";
      el.style.cursor = "pointer";
      el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([poi.lng, poi.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 10 }).setHTML(
            `<div style="font-family:'Montserrat',sans-serif;padding:2px;">
              <strong style="font-size:12px;">${poi.name}</strong>
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
