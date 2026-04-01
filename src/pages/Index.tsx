import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FooterSection from "@/components/FooterSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroImage from "@/assets/hero-nucia.jpg";
import buildingImg from "@/assets/building-render.jpg";
import interiorImg from "@/assets/interior.jpg";
import {
  fadeUp, fadeIn, scaleIn, slideRight, staggerContainer, staggerItem,
  heroText, viewportOnce, viewportOnceNear, slowTransition, clipReveal
} from "@/lib/animations";
import { useHeroParallax, useParallax } from "@/hooks/use-parallax";

const Index = () => {
  const { t } = useTranslation();
  const hero = useHeroParallax();
  const locationParallax = useParallax({ speed: 0.25 });

  const stats = [
    { number: "107", label: t("home.stat1Label") },
    { number: "9", label: t("home.stat2Label") },
    { number: "300+", label: t("home.stat3Label") },
    { number: "10", label: t("home.stat4Label") },
  ];

  return (
    <>
      <SEO
        title="La Nucía One | Obra Nueva en La Nucía, Alicante"
        description="Promoción de 107 viviendas de obra nueva en La Nucía, Alicante. Pisos de 2, 3 y 4 dormitorios con piscina, terrazas y vistas al Mediterráneo."
        path="/"
      />
      <Navbar />
      <main>
        {/* ═══ HERO FULLSCREEN ═══ */}
        <section ref={hero.ref} className="relative h-screen flex flex-col justify-end overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: hero.bgY }}>
            <motion.img
              src={heroImage}
              alt="Promoción de obra nueva en La Nucía"
              className="w-full h-full object-cover"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/20" />
          </motion.div>
          <motion.div className="relative z-10 container max-w-7xl mx-auto px-6 pb-24 md:pb-32" style={{ y: hero.textY, opacity: hero.opacity }}>
            <motion.div
              variants={staggerContainer(0.15, 0.4)}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.p variants={heroText(0)} className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">
                {t("home.heroTag")}
              </motion.p>
              <motion.h1 variants={heroText(0)} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-[1.1] mb-6">
                {t("home.heroTitle1")}{" "}
                <span className="italic">{t("home.heroTitle2")}</span>
              </motion.h1>
              <motion.p variants={heroText(0)} className="font-body text-primary-foreground/60 text-base md:text-lg max-w-xl mb-8">
                {t("home.heroSubtitle")}
              </motion.p>
              <motion.div variants={heroText(0)} className="flex flex-wrap gap-4">
                <Link
                  to="/viviendas"
                  className="inline-flex items-center gap-3 bg-gold/20 border border-gold/40 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:bg-gold/30 hover:border-gold/60 transition-all duration-700"
                >
                  {t("home.discoverHomes")} <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-3 border border-primary-foreground/20 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all duration-700"
                >
                  {t("home.contactUs")}
                </Link>
              </motion.div>
            </motion.div>
          </div>
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
          >
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-primary-foreground/40 to-transparent"
            />
          </motion.div>
        </section>

        {/* ═══ STATS BAR ═══ */}
        <section className="bg-primary border-t border-primary-foreground/10">
          <div className="container max-w-7xl mx-auto px-6">
            <motion.div
              variants={staggerContainer(0.1, 0)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnceNear}
              className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/10"
            >
              {stats.map((stat, i) => (
                <motion.div key={i} variants={staggerItem} className="py-12 md:py-16 px-6 text-center">
                  <AnimatedCounter value={stat.number} className="font-display text-4xl md:text-5xl text-gold block mb-2" />
                  <p className="font-body text-xs md:text-sm text-primary-foreground/50 tracking-wide uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ INTRO / ABOUT ═══ */}
        <section className="py-28 md:py-40 bg-background">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                variants={staggerContainer(0.12, 0)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                  {t("home.aboutTag")}
                </motion.p>
                <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-8">
                  {t("home.aboutTitle1")}<br />
                  <span className="italic">{t("home.aboutTitle2")}</span>
                </motion.h2>
                <motion.p variants={staggerItem} className="font-body text-muted-foreground leading-relaxed mb-4">
                  {t("home.aboutText1")}
                </motion.p>
                <motion.p variants={staggerItem} className="font-body text-muted-foreground leading-relaxed">
                  {t("home.aboutText2")}
                </motion.p>
              </motion.div>
              <motion.div
                variants={scaleIn(0.2)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="relative overflow-hidden"
              >
                <img src={buildingImg} alt="Residencial La Nucía One" className="w-full aspect-[3/4] object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ PREVIEW: UBICACIÓN ═══ */}
        <section className="relative py-32 md:py-44 bg-primary overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={heroImage} alt="" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative z-10 container max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={staggerContainer(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                  {t("home.locationTag")}
                </motion.p>
                <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-primary-foreground leading-tight mb-8">
                  {t("home.locationTitle1")}<br />
                  <span className="italic">{t("home.locationTitle2")}</span>
                </motion.h2>
                <motion.p variants={staggerItem} className="font-body text-primary-foreground/60 leading-relaxed mb-10">
                  {t("home.locationText")}
                </motion.p>
                <motion.div variants={staggerItem}>
                  <Link
                    to="/ubicacion"
                    className="inline-flex items-center gap-3 border border-primary-foreground/20 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all duration-700 group"
                  >
                    {t("home.locationCta")}
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                variants={staggerContainer(0.08, 0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid grid-cols-2 gap-4"
              >
                {(t("home.locationHighlights", { returnObjects: true }) as string[]).map((item, i) => (
                  <motion.div key={i} variants={staggerItem} className="border border-primary-foreground/10 p-6 backdrop-blur-sm">
                    <AnimatedCounter
                      value={(t("home.locationNumbers", { returnObjects: true }) as string[])[i]}
                      className="font-display text-2xl text-gold block mb-2"
                    />
                    <p className="font-body text-sm text-primary-foreground/60">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ PREVIEW: VIVIENDAS ═══ */}
        <section className="py-28 md:py-40 bg-background">
          <div className="container max-w-7xl mx-auto px-6">
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-16"
            >
              <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                {t("home.homesTag")}
              </motion.p>
              <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-6">
                {t("home.homesTitle1")}<br />
                <span className="italic">{t("home.homesTitle2")}</span>
              </motion.h2>
              <motion.p variants={staggerItem} className="font-body text-muted-foreground max-w-xl mx-auto">
                {t("home.homesText")}
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.15, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              {([
                { img: buildingImg, title: t("home.type2bed"), desc: t("home.type2desc") },
                { img: interiorImg, title: t("home.type3bed"), desc: t("home.type3desc") },
                { img: heroImage, title: t("home.type4bed"), desc: t("home.type4desc") },
              ]).map((item, i) => (
                <motion.div key={i} variants={staggerItem} className="group relative overflow-hidden cursor-pointer">
                  <Link to="/viviendas">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-display text-2xl text-primary-foreground mb-2">{item.title}</h3>
                      <p className="font-body text-sm text-primary-foreground/60">{item.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp(0.5)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center"
            >
              <Link
                to="/viviendas"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-700 group"
              >
                {t("home.homesCta")}
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══ PREVIEW: GALERÍA ═══ */}
        <section className="py-28 md:py-40 bg-sand">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-center">
              <motion.div
                variants={staggerContainer(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                  {t("home.galleryTag")}
                </motion.p>
                <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-8">
                  {t("home.galleryTitle1")}<br />
                  <span className="italic">{t("home.galleryTitle2")}</span>
                </motion.h2>
                <motion.p variants={staggerItem} className="font-body text-muted-foreground leading-relaxed mb-10">
                  {t("home.galleryText")}
                </motion.p>
                <motion.div variants={staggerItem}>
                  <Link
                    to="/galeria"
                    className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-700 group"
                  >
                    {t("home.galleryCta")}
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                variants={staggerContainer(0.1, 0.2)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <motion.div variants={scaleIn()} className="overflow-hidden">
                    <img src={buildingImg} alt="" className="w-full aspect-[4/5] object-cover" />
                  </motion.div>
                  <motion.div variants={scaleIn()} className="overflow-hidden">
                    <img src={heroImage} alt="" className="w-full aspect-square object-cover" />
                  </motion.div>
                </div>
                <div className="space-y-4 pt-8">
                  <motion.div variants={scaleIn()} className="overflow-hidden">
                    <img src={interiorImg} alt="" className="w-full aspect-square object-cover" />
                  </motion.div>
                  <motion.div variants={scaleIn()} className="overflow-hidden">
                    <img src={buildingImg} alt="" className="w-full aspect-[4/5] object-cover" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ PREVIEW: CONTACTO ═══ */}
        <section className="py-28 md:py-40 bg-primary text-center">
          <div className="container max-w-3xl mx-auto px-6">
            <motion.div
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                {t("home.contactTag")}
              </motion.p>
              <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-primary-foreground leading-tight mb-8">
                {t("home.contactTitle1")}<br />
                <span className="italic">{t("home.contactTitle2")}</span>
              </motion.h2>
              <motion.p variants={staggerItem} className="font-body text-primary-foreground/60 leading-relaxed mb-12 max-w-xl mx-auto">
                {t("home.contactText")}
              </motion.p>
              <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-3 bg-gold/20 border border-gold/40 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:bg-gold/30 hover:border-gold/60 transition-all duration-700 group"
                >
                  {t("home.contactCta")}
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+34865662845"
                  className="inline-flex items-center justify-center gap-3 border border-primary-foreground/20 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all duration-700"
                >
                  865 662 845
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Index;
