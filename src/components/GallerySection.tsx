import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import buildingImg from "@/assets/building-render.jpg";
import interiorImg from "@/assets/interior.jpg";
import heroImg from "@/assets/hero-nucia.jpg";

const images = [
  { src: buildingImg, alt: "Fachada exterior de La Nucía One", label: "Fachada" },
  { src: interiorImg, alt: "Interior moderno con vistas al mar", label: "Salón" },
  { src: heroImg, alt: "Vista aérea de La Nucía", label: "Entorno" },
  { src: buildingImg, alt: "Piscina comunitaria y zonas comunes", label: "Piscina" },
  { src: interiorImg, alt: "Cocina moderna abierta al salón", label: "Cocina" },
  { src: heroImg, alt: "Vistas panorámicas desde la terraza", label: "Terraza" },
];

const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <section className="py-20 md:py-28 bg-sand">
        <div className="container max-w-7xl mx-auto px-6">
          {/* 2-column masonry-style grid */}
          <div className="columns-1 md:columns-2 gap-5 space-y-5">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm"
                onClick={() => setSelected(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-[3/2]" : "aspect-square"
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="absolute bottom-4 left-5 font-display text-lg text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {img.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-6 cursor-pointer"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              key={selected}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
