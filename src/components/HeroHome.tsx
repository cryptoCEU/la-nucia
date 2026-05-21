import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-nucia.jpg";

const HeroHome = () => {
  const { t } = useTranslation();
  const wrapperRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  // Logo animation occupies first ~50% of the pinned scroll
  // Image zoom progresses across the full pinned scroll
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.18]);
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.35, 0.55], [40, 0]);

  return (
    <section ref={wrapperRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
          <img src={heroImage} alt="Promoción de obra nueva en La Nucía, Alicante" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark/85 via-ocean-dark/60 to-ocean-dark/40" />
        </motion.div>

        <div className="relative z-10 flex-1 flex flex-col justify-end pt-24 pb-16 md:pb-24">
          <div className="container max-w-[1600px] mx-auto px-4 md:px-8">
            <motion.div style={{ opacity: textOpacity, y: textY }}>
              <p className="font-body text-sm tracking-[0.2em] uppercase text-primary-foreground/60 mb-4">
                {t("hero.subtitle")}
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-primary-foreground leading-[1.2] mb-8">
                {t("hero.title1")}<br /><span className="italic">{t("hero.title2")}</span><br />{t("hero.title3")}
              </h1>
              <div className="flex flex-wrap gap-4">
                <Link to="/caracteristicas" className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 px-6 py-3 text-primary-foreground font-body text-sm tracking-wider uppercase hover:bg-primary-foreground/20 transition-colors">
                  {t("hero.discoverMore")} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contacto" className="inline-flex items-center gap-2 border border-primary-foreground/20 px-6 py-3 text-primary-foreground font-body text-sm tracking-wider uppercase hover:border-gold hover:text-gold transition-colors">
                  {t("hero.contact")} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
