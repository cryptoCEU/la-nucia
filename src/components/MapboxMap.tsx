import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Mapbox public token (publishable, safe for client-side)
mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZS1tYXBzIiwiYSI6ImNtOGltcnFhZzAyc3gycXM4a3lvN2xzZjMifQ.qKeUodJDq-VMMm3BVXP6SQ";

const MapboxMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        name: "Activum Custom",
        sources: {
          "osm-tiles": {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
              "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
            ],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
          },
        },
        layers: [
          {
            id: "osm-tiles-layer",
            type: "raster",
            source: "osm-tiles",
            minzoom: 0,
            maxzoom: 19,
            paint: {
              "raster-saturation": -0.3,
              "raster-brightness-min": 0.05,
              "raster-brightness-max": 0.7,
              "raster-contrast": 0.1,
              "raster-hue-rotate": 10,
            },
          },
        ],
      },
      center: [-0.13, 38.61],
      zoom: 13,
      interactive: true,
      attributionControl: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left");

    // Custom marker with brand color
    const markerEl = document.createElement("div");
    markerEl.innerHTML = `
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.06 27.94 0 18 0z" fill="hsl(35, 60%, 55%)"/>
        <circle cx="18" cy="18" r="8" fill="hsl(205, 70%, 18%)"/>
      </svg>
    `;
    markerEl.style.cursor = "pointer";

    new mapboxgl.Marker({ element: markerEl, anchor: "bottom" })
      .setLngLat([-0.13, 38.61])
      .setPopup(
        new mapboxgl.Popup({ offset: 25, className: "activum-popup" }).setHTML(
          `<div style="font-family: 'DM Sans', sans-serif; padding: 4px;">
            <strong style="color: hsl(205, 65%, 28%);">Residencial La Nucía</strong><br/>
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

export default MapboxMap;
