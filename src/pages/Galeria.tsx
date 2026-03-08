import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import GallerySection from "@/components/GallerySection";
import FooterSection from "@/components/FooterSection";
import buildingImage from "@/assets/building-render.jpg";

const Galeria = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main>
        <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={buildingImage} alt="La Nucía One - Gallery" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/50" />
          </div>
          <motion.p initial={{ opacity: 0, x: 60 }} animate={{ opacity: 0.08, x: 0 }} transition={{ duration: 1.2, delay: 0.3 }} className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-display text-[12vw] leading-none text-primary-foreground pointer-events-none select-none hidden lg:block">
            {t("galeriaPage.decorative")}
          </motion.p>
          <div className="relative z-10 container max-w-7xl mx-auto px-6 pb-20 pt-20">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-2">
              {t("galeriaPage.tag")}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] max-w-2xl">
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
