import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import GallerySection from "@/components/GallerySection";
import FooterSection from "@/components/FooterSection";
import buildingImage from "@/assets/building-render.jpg";
import interiorImg from "@/assets/interior.jpg";
import heroImg from "@/assets/hero-nucia.jpg";
import { staggerContainer, heroText } from "@/lib/animations";
import { useHeroParallax } from "@/hooks/use-parallax";

const Galeria = () => {
  const { t } = useTranslation();
  const hero = useHeroParallax();

  return (
    <>
      <SEO title="Galería de Imágenes" description="Galería de imágenes de La Nucía One." path="/galeria" />
      <Navbar />
      <main>
        <section ref={hero.ref} className="relative min-h-[60vh] flex items-end overflow-hidden">
          <motion.div className="absolute inset-0 grid grid-cols-3" style={{ y: hero.bgY }}>
            {[buildingImage, interiorImg, heroImg].map((src, i) => (
              <motion.div
                key={i}
                className="overflow-hidden"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={src} alt="" className={`w-full h-full object-cover ${i === 1 ? "opacity-30" : "opacity-40"}`} />
              </motion.div>
            ))}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/60" />
          <motion.div className="relative z-10 container max-w-7xl mx-auto px-6 pb-20 pt-32" style={{ y: hero.textY, opacity: hero.opacity }}>
            <motion.div variants={staggerContainer(0.13, 0.4)} initial="hidden" animate="visible">
              <motion.p variants={heroText()} className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-3">
                {t("galeriaPage.tag")}
              </motion.p>
              <motion.h1 variants={heroText()} className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] max-w-2xl">
                {t("galeriaPage.title1")}<br /><span className="italic">{t("galeriaPage.title2")}</span>
              </motion.h1>
            </motion.div>
          </div>
        </section>
        <GallerySection />
      </main>
      <FooterSection />
    </>
  );
};

export default Galeria;
