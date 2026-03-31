import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import buildingImg from "@/assets/building-render.jpg";
import interiorImg from "@/assets/interior.jpg";
import heroImg from "@/assets/hero-nucia.jpg";

const srcs = [buildingImg, interiorImg, heroImg, buildingImg, interiorImg, heroImg];

// Masonry layout patterns - varied sizes
const layoutClasses = [
  "col-span-2 row-span-2",    // Large
  "col-span-1 row-span-1",    // Small
  "col-span-1 row-span-2",    // Tall
  "col-span-1 row-span-1",    // Small
  "col-span-2 row-span-1",    // Wide
  "col-span-1 row-span-1",    // Small
];

const aspectClasses = [
  "aspect-square",
  "aspect-[4/3]",
  "aspect-[2/3]",
  "aspect-[4/3]",
  "aspect-[2/1]",
  "aspect-square",
];

const GallerySection = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);
  const images = t("gallery.images", { returnObjects: true }) as { alt: string; label: string }[];

  const navigate = (dir: number) => {
    if (selected === null) return;
    const next = (selected + dir + images.length) % images.length;
    setSelected(next);
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-sand">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-3 md:gap-4">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`${layoutClasses[i]} cursor-pointer group relative overflow-hidden`}
                onClick={() => setSelected(i)}
              >
                <img
                  src={srcs[i]}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="font-display text-lg md:text-xl text-primary-foreground">{img.label}</p>
                  <p className="font-body text-xs text-primary-foreground/60 mt-1">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox with navigation */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <button onClick={() => setSelected(null)} className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors z-10">
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={srcs[selected]}
                alt={images[selected].alt}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="text-center mt-4">
                <p className="font-display text-xl text-primary-foreground">{images[selected].label}</p>
                <p className="font-body text-sm text-primary-foreground/50 mt-1">{selected + 1} / {images.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
