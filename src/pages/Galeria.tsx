import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import GallerySection from "@/components/GallerySection";
import FooterSection from "@/components/FooterSection";
import buildingImage from "@/assets/building-render.jpg";
import interiorImg from "@/assets/interior.jpg";
import heroImg from "@/assets/hero-nucia.jpg";

const Galeria = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title="Galería de Imágenes"
        description="Galería de imágenes de La Nucía One. Fachadas, interiores, zonas comunes y vistas de la promoción de obra nueva."
        path="/galeria"
      />
      <Navbar />
      <main>
        {/* Hero with mosaic preview */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-3">
            <div className="overflow-hidden">
              <img src={buildingImage} alt="" className="w-full h-full object-cover opacity-40" />
            </div>
            <div className="overflow-hidden">
              <img src={interiorImg} alt="" className="w-full h-full object-cover opacity-30" />
            </div>
            <div className="overflow-hidden">
              <img src={heroImg} alt="" className="w-full h-full object-cover opacity-40" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/60" />
          <div className="relative z-10 container max-w-7xl mx-auto px-6 pb-20 pt-32">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-3">
              {t("galeriaPage.tag")}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] max-w-2xl">
              {t("galeriaPage.title1")}<br /><span className="italic">{t("galeriaPage.title2")}</span>
            </motion.h1>
          </div>
        </section>
        <GallerySection />
      </main>
      <FooterSection />
    </>
  );
};

export default Galeria;
