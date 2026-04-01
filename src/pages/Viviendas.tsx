import { motion } from "framer-motion";
import { ArrowRight, BedDouble, Bath, Maximize, Shield, Thermometer, ChefHat, DoorOpen, Cpu, Leaf, Download, FileText, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FooterSection from "@/components/FooterSection";
import buildingImage from "@/assets/building-render.jpg";
import interiorImg from "@/assets/interior.jpg";
import heroImg from "@/assets/hero-nucia.jpg";
import {
  staggerContainer, staggerItem, heroText, scaleIn, fadeUp, clipReveal,
  viewportOnce
} from "@/lib/animations";
import { useHeroParallax } from "@/hooks/use-parallax";

const typeImages = [buildingImage, interiorImg, heroImg];
const featureIcons = [Thermometer, DoorOpen, ChefHat, Shield, Cpu, Leaf];

const Viviendas = () => {
  const { t } = useTranslation();
  const hero = useHeroParallax();
  const types = t("viviendasPage.types", { returnObjects: true }) as { title: string; description: string; areaFrom: string; bathrooms: string }[];
  const features = t("viviendasPage.featuresList", { returnObjects: true }) as { title: string; description: string }[];
  const v = "viviendasPage";

  return (
    <>
      <SEO title="Viviendas" description="Descubre las viviendas de 2, 3 y 4 dormitorios en La Nucía One." path="/viviendas" />
      <Navbar />
      <main>
        {/* Hero */}
        <section ref={hero.ref} className="relative h-[80vh] min-h-[600px] flex items-end overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: hero.bgY }}>
            <motion.img
              src={buildingImage}
              alt="Viviendas La Nucía One"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
          </motion.div>
          <motion.div className="relative z-10 container max-w-7xl mx-auto px-6 pb-20 pt-20" style={{ y: hero.textY, opacity: hero.opacity }}>
            <motion.div variants={staggerContainer(0.13, 0.3)} initial="hidden" animate="visible">
              <motion.p variants={heroText()} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-4">
                {t(`${v}.tag`)}
              </motion.p>
              <motion.h1 variants={heroText()} className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] mb-6 max-w-3xl">
                {t(`${v}.heroTitle1`)}<br /><span className="italic">{t(`${v}.heroTitle2`)}</span>
              </motion.h1>
              <motion.p variants={heroText()} className="font-body text-primary-foreground/60 text-lg max-w-xl mb-8" dangerouslySetInnerHTML={{ __html: t(`${v}.heroSubtitle`) }} />
              <motion.div variants={heroText()}>
                <Link to="/contacto" className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:bg-gold/30 hover:border-gold/60 transition-all duration-700">
                  {t(`${v}.requestInfo`)} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Concept */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div variants={staggerContainer(0.12)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">{t(`${v}.conceptTag`)}</motion.p>
                <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-8" dangerouslySetInnerHTML={{ __html: t(`${v}.conceptTitle`) }} />
                <motion.p variants={staggerItem} className="font-body text-muted-foreground leading-relaxed mb-4">{t(`${v}.conceptText1`)}</motion.p>
                <motion.p variants={staggerItem} className="font-body text-muted-foreground leading-relaxed">{t(`${v}.conceptText2`)}</motion.p>
              </motion.div>
              <motion.div variants={clipReveal(0.3)} initial="hidden" whileInView="visible" viewport={viewportOnce} className="overflow-hidden">
                <img src={interiorImg} alt="Interior La Nucía One" className="w-full aspect-[4/3] object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features / Qualities */}
        <section className="bg-primary py-24 md:py-32">
          <div className="container max-w-6xl mx-auto px-6">
            <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-16">
              <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-4">{t(`${v}.featuresTag`)}</motion.p>
              <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-primary-foreground mb-6" dangerouslySetInnerHTML={{ __html: t(`${v}.featuresTitle`) }} />
              <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-4 mt-8">
                <button className="inline-flex items-center gap-2 border border-gold/40 bg-gold/10 px-6 py-3 text-gold font-body text-xs tracking-[0.15em] uppercase hover:bg-gold/20 transition-all duration-500">
                  <Download className="w-4 h-4" /> {t(`${v}.downloadDossier`)}
                </button>
                <button className="inline-flex items-center gap-2 border border-primary-foreground/20 px-6 py-3 text-primary-foreground/70 font-body text-xs tracking-[0.15em] uppercase hover:border-primary-foreground/40 transition-all duration-500">
                  <FileText className="w-4 h-4" /> {t(`${v}.qualityReport`)}
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feat, i) => {
                const Icon = featureIcons[i];
                return (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="border border-primary-foreground/10 p-8 hover:border-gold/30 transition-all duration-700"
                  >
                    <Icon className="w-6 h-6 text-gold mb-4" />
                    <h3 className="font-display text-xl text-primary-foreground mb-3">{feat.title}</h3>
                    <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">{feat.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Typology cards */}
        <section className="bg-background py-24 md:py-32">
          <div className="container max-w-7xl mx-auto px-6">
            <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-16">
              <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-4">{t(`${v}.typologiesTag`)}</motion.p>
              <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground" dangerouslySetInnerHTML={{ __html: t(`${v}.typologiesTitle`) }} />
            </motion.div>

            <motion.div
              variants={staggerContainer(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid md:grid-cols-3 gap-8"
            >
              {types.map((type, i) => (
                <motion.div key={i} variants={staggerItem} className="group border border-border hover:border-gold/30 transition-all duration-700">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={typeImages[i]} alt={type.title} className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" />
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-2xl text-foreground mb-3">{type.title}</h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">{type.description}</p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm font-body">
                        <BedDouble className="w-4 h-4 text-gold" /><span className="text-foreground">{[2, 3, 4][i]} {t(`${v}.bedrooms`)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-body">
                        <Bath className="w-4 h-4 text-gold" /><span className="text-foreground">{type.bathrooms} {t(`${v}.bathrooms`)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-body">
                        <Maximize className="w-4 h-4 text-gold" /><span className="text-foreground">{t(`${v}.fromArea`, { area: type.areaFrom })}</span>
                      </div>
                    </div>
                    <p className="font-body text-xs text-muted-foreground mb-6">{t(`${v}.garageIncluded`)}</p>
                    <button className="inline-flex items-center gap-2 border border-foreground/20 px-5 py-2.5 text-foreground font-body text-xs tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all duration-500">
                      <Eye className="w-3.5 h-3.5" /> {t(`${v}.viewPlan`)}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-24 md:py-32">
          <div className="container max-w-4xl mx-auto px-6 text-center">
            <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-4">{t(`${v}.ctaTag`)}</motion.p>
              <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-primary-foreground mb-4" dangerouslySetInnerHTML={{ __html: t(`${v}.ctaTitle`) }} />
              <motion.p variants={staggerItem} className="font-body text-primary-foreground/60 mb-10 max-w-lg mx-auto">{t(`${v}.ctaSubtitle`)}</motion.p>
              <motion.div variants={staggerItem}>
                <Link to="/contacto" className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:bg-gold/30 hover:border-gold/60 transition-all duration-700">
                  {t(`${v}.requestInfo`)} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
            <motion.p variants={fadeUp(0.5)} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mt-12 font-body text-[11px] text-primary-foreground/30 leading-relaxed italic max-w-2xl mx-auto">
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
