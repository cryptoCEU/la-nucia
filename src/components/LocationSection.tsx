import { motion } from "framer-motion";
import { MapPin, Clock, Mountain, Palmtree } from "lucide-react";
import { useTranslation } from "react-i18next";
import MapboxMap from "./MapboxMap";
import { staggerContainer, staggerItem, clipReveal, viewportOnce } from "@/lib/animations";

const highlightIcons = [MapPin, Clock, Mountain, Palmtree];

const LocationSection = () => {
  const { t } = useTranslation();
  const highlights = t("location.highlights", { returnObjects: true }) as string[];

  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p variants={staggerItem} className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">{t("location.tag")}</motion.p>
            <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl mb-6 leading-tight">
              {t("location.title1")}<br /><span className="italic">{t("location.title2")}</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="font-body text-primary-foreground/70 leading-relaxed mb-10 max-w-lg">{t("location.description")}</motion.p>

            <motion.div
              variants={staggerContainer(0.08, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-6"
            >
              {highlights.map((text, i) => {
                const Icon = highlightIcons[i];
                return (
                  <motion.div key={i} variants={staggerItem} className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="font-body text-sm text-primary-foreground/80">{text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={clipReveal(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="rounded-lg overflow-hidden"
          >
            <MapboxMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
