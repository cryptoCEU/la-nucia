import { motion } from "framer-motion";
import { ArrowRight, Home, BedDouble, Bath, Maximize, Shield, Thermometer, ChefHat, DoorOpen, Cpu, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FooterSection from "@/components/FooterSection";
import buildingImage from "@/assets/building-render.jpg";
import interiorImg from "@/assets/interior.jpg";
import heroImg from "@/assets/hero-nucia.jpg";

const typeImages = [buildingImage, interiorImg, heroImg];
const featureIcons = [Thermometer, DoorOpen, ChefHat, Shield, Cpu, Leaf];

const Viviendas = () => {
  const { t } = useTranslation();
  const types = t("viviendasPage.types", { returnObjects: true }) as { title: string; description: string; areaFrom: string; bathrooms: string }[];
  const features = t("viviendasPage.featuresList", { returnObjects: true }) as { title: string; description: string }[];
  const v = "viviendasPage";

  return (
    <>
      <SEO
        title="Viviendas"
        description="Descubre las viviendas de 2, 3 y 4 dormitorios en La Nucía One. Amplias terrazas, garaje y trastero incluido."
        path="/viviendas"
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end">
          <div className="absolute inset-0">
            <img src={buildingImage} alt="Viviendas La Nucía One" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
          </div>
          <div className="relative z-10 container max-w-7xl mx-auto px-6 pb-20 pt-20">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-4">
              {t(`${v}.tag`)}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] mb-6">
              {t(`${v}.heroTitle1`)}<br /><span className="italic">{t(`${v}.heroTitle2`)}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="font-body text-primary-foreground/60 text-lg max-w-xl mb-8" dangerouslySetInnerHTML={{ __html: t(`${v}.heroSubtitle`) }} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap gap-4">
              <Link to="/contacto" className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:bg-gold/30 transition-all duration-500">
                {t(`${v}.requestInfo`)} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Typology cards — no prices */}
        <section className="bg-background py-24 md:py-32">
          <div className="container max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <p className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-4">{t(`${v}.typologiesTag`)}</p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground" dangerouslySetInnerHTML={{ __html: t(`${v}.typologiesTitle`) }} />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {types.map((type, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="group">
                  <div className="aspect-[4/3] overflow-hidden mb-6">
                    <img src={typeImages[i]} alt={type.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-3">{type.title}</h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">{type.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm font-body">
                      <BedDouble className="w-4 h-4 text-gold" />
                      <span className="text-foreground">{[2, 3, 4][i]} {t(`${v}.bedrooms`)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-body">
                      <Bath className="w-4 h-4 text-gold" />
                      <span className="text-foreground">{type.bathrooms} {t(`${v}.bathrooms`)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-body">
                      <Maximize className="w-4 h-4 text-gold" />
                      <span className="text-foreground">{t(`${v}.fromArea`, { area: type.areaFrom })}</span>
                    </div>
                  </div>
                  <p className="font-body text-xs text-muted-foreground">{t(`${v}.garageIncluded`)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Qualities */}
        <section className="bg-primary py-24 md:py-32">
          <div className="container max-w-6xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <p className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-4">{t(`${v}.featuresTag`)}</p>
              <h2 className="font-display text-3xl md:text-5xl text-primary-foreground" dangerouslySetInnerHTML={{ __html: t(`${v}.featuresTitle`) }} />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feat, i) => {
                const Icon = featureIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border border-primary-foreground/10 p-8 hover:border-gold/30 transition-colors duration-500"
                  >
                    <Icon className="w-6 h-6 text-gold mb-4" />
                    <h3 className="font-display text-xl text-primary-foreground mb-3">{feat.title}</h3>
                    <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">{feat.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery strip */}
        <section className="py-0">
          <div className="grid grid-cols-3 md:grid-cols-3">
            {[buildingImage, interiorImg, heroImg].map((src, i) => (
              <div key={i} className="aspect-[16/9] overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-background py-24 md:py-32">
          <div className="container max-w-4xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-4">{t(`${v}.ctaTag`)}</p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4" dangerouslySetInnerHTML={{ __html: t(`${v}.ctaTitle`) }} />
              <p className="font-body text-muted-foreground mb-10 max-w-lg mx-auto">{t(`${v}.ctaSubtitle`)}</p>
              <Link to="/contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-500">
                {t(`${v}.requestInfo`)} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 font-body text-[11px] text-muted-foreground/50 leading-relaxed italic max-w-2xl mx-auto">
              {t(`${v}.disclaimer`)}
            </motion.p>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Viviendas;
