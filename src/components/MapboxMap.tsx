import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1Ijoiam9zZWdsIiwiYSI6ImNseDBrcHJhNzAyMzEyaXFzbDhrMWRqbXMifQ.4I6tkdFj7pZ5qDXnUHJ4iQ";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-0.13, 38.61],
      zoom: 13,
      attributionControl: false,
    });

    map.current.on("load", () => {
      if (!map.current) return;

      // Adjust map colors to match the landing's ocean/gold palette
      // Darken water to match --ocean-dark
      map.current.setPaintProperty("water", "fill-color", "hsl(158, 70%, 8%)");
      // Land background
      map.current.setPaintProperty("land", "background-color", "hsl(158, 61%, 6%)");
      
      // Attempt road and label color adjustments
      const style = map.current.getStyle();
      if (style?.layers) {
        style.layers.forEach((layer) => {
          // Road layers
          if (layer.id.includes("road") && layer.type === "line") {
            try {
              map.current!.setPaintProperty(layer.id, "line-color", "hsl(158, 40%, 20%)");
            } catch (_) {}
          }
          // Label layers - use gold color
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
    map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left");

    // Custom marker with brand colors (gold pin + ocean-dark center)
    const markerEl = document.createElement("div");
    markerEl.innerHTML = `
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z" fill="hsl(35, 60%, 55%)"/>
        <circle cx="18" cy="18" r="8" fill="hsl(158, 70%, 8%)"/>
      </svg>
    `;
    markerEl.style.cursor = "pointer";

    new mapboxgl.Marker({ element: markerEl, anchor: "bottom" })
      .setLngLat([-0.13, 38.61])
      .setPopup(
        new mapboxgl.Popup({ offset: 25, className: "activum-popup" }).setHTML(
          `<div style="font-family: 'DM Sans', sans-serif; padding: 4px;">
            <strong style="color: hsl(158, 61%, 14%);">Residencial La Nucía</strong><br/>
            <span style="font-size: 13px; color: #666;">La Nucía, Alicante</span>
          </div>`
        )
      )
      .addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[400px] rounded-lg"
      style={{ minHeight: 400 }}
    />
  );
};

export default MapComponent;
