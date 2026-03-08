import { motion } from "framer-motion";
import { MapPin, Clock, Mountain, Palmtree } from "lucide-react";
import { useTranslation } from "react-i18next";
import MapboxMap from "./MapboxMap";

const highlightIcons = [MapPin, Clock, Mountain, Palmtree];

const LocationSection = () => {
  const { t } = useTranslation();
  const highlights = t("location.highlights", { returnObjects: true }) as string[];

  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">{t("location.tag")}</p>
            <h2 className="font-display text-3xl md:text-5xl mb-6 leading-tight">
              {t("location.title1")}<br /><span className="italic">{t("location.title2")}</span>
            </h2>
            <p className="font-body text-primary-foreground/70 leading-relaxed mb-10 max-w-lg">{t("location.description")}</p>

            <div className="grid grid-cols-2 gap-6">
              {highlights.map((text, i) => {
                const Icon = highlightIcons[i];
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="font-body text-sm text-primary-foreground/80">{text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="rounded-lg overflow-hidden">
            <MapboxMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
