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

const Index = () => {
  const { t } = useTranslation();

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
        <section className="relative h-screen flex flex-col justify-end">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Promoción de obra nueva en La Nucía" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/20" />
          </div>
          <div className="relative z-10 container max-w-7xl mx-auto px-6 pb-24 md:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-3xl"
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">
                {t("home.heroTag")}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-[1.05] mb-4">
                {t("home.heroTitle1")}
              </h1>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-[1.05] italic mb-6">
                {t("home.heroTitle2")}
              </h1>
              <p className="font-body text-primary-foreground/60 text-base md:text-lg max-w-xl mb-8">
                {t("home.heroSubtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/viviendas"
                  className="inline-flex items-center gap-3 bg-gold/20 border border-gold/40 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:bg-gold/30 transition-all duration-500"
                >
                  {t("home.discoverHomes")} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-3 border border-primary-foreground/20 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all duration-500"
                >
                  {t("home.contactUs")}
                </Link>
              </div>
            </motion.div>
          </div>
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
          >
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-primary-foreground/40 to-transparent"
            />
          </motion.div>
        </section>

        {/* ═══ STATS BAR WITH ANIMATED COUNTERS ═══ */}
        <section className="bg-primary border-t border-primary-foreground/10">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/10">
              {stats.map((stat, i) => (
                <div key={i} className="py-12 md:py-16 px-6 text-center">
                  <AnimatedCounter
                    value={stat.number}
                    className="font-display text-4xl md:text-5xl text-gold block mb-2"
                  />
                  <p className="font-body text-xs md:text-sm text-primary-foreground/50 tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ INTRO / ABOUT ═══ */}
        <section className="py-28 md:py-40 bg-background">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                  {t("home.aboutTag")}
                </p>
                <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-8">
                  {t("home.aboutTitle1")}<br />
                  <span className="italic">{t("home.aboutTitle2")}</span>
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  {t("home.aboutText1")}
                </p>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {t("home.aboutText2")}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <img
                  src={buildingImg}
                  alt="Residencial La Nucía One"
                  className="w-full aspect-[3/4] object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ PREVIEW: UBICACIÓN ═══ */}
        <section className="relative py-32 md:py-44 bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={heroImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative z-10 container max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                  {t("home.locationTag")}
                </p>
                <h2 className="font-display text-3xl md:text-5xl text-primary-foreground leading-tight mb-8">
                  {t("home.locationTitle1")}<br />
                  <span className="italic">{t("home.locationTitle2")}</span>
                </h2>
                <p className="font-body text-primary-foreground/60 leading-relaxed mb-10">
                  {t("home.locationText")}
                </p>
                <Link
                  to="/ubicacion"
                  className="inline-flex items-center gap-3 border border-primary-foreground/20 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all duration-500 group"
                >
                  {t("home.locationCta")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {(t("home.locationHighlights", { returnObjects: true }) as string[]).map((item, i) => (
                  <div key={i} className="border border-primary-foreground/10 p-6 backdrop-blur-sm">
                    <AnimatedCounter
                      value={(t("home.locationNumbers", { returnObjects: true }) as string[])[i]}
                      className="font-display text-2xl text-gold block mb-2"
                    />
                    <p className="font-body text-sm text-primary-foreground/60">{item}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ PREVIEW: VIVIENDAS ═══ */}
        <section className="py-28 md:py-40 bg-background">
          <div className="container max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <p className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                {t("home.homesTag")}
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-6">
                {t("home.homesTitle1")}<br />
                <span className="italic">{t("home.homesTitle2")}</span>
              </h2>
              <p className="font-body text-muted-foreground max-w-xl mx-auto">
                {t("home.homesText")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {([
                { img: buildingImg, title: t("home.type2bed"), desc: t("home.type2desc") },
                { img: interiorImg, title: t("home.type3bed"), desc: t("home.type3desc") },
                { img: heroImage, title: t("home.type4bed"), desc: t("home.type4desc") },
              ]).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  className="group relative overflow-hidden cursor-pointer"
                >
                  <Link to="/viviendas">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
            </div>

            <div className="text-center">
              <Link
                to="/viviendas"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-500 group"
              >
                {t("home.homesCta")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ PREVIEW: GALERÍA ═══ */}
        <section className="py-28 md:py-40 bg-sand">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                  {t("home.galleryTag")}
                </p>
                <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-8">
                  {t("home.galleryTitle1")}<br />
                  <span className="italic">{t("home.galleryTitle2")}</span>
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-10">
                  {t("home.galleryText")}
                </p>
                <Link
                  to="/galeria"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-500 group"
                >
                  {t("home.galleryCta")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <img src={buildingImg} alt="" className="w-full aspect-[4/5] object-cover" />
                  <img src={heroImage} alt="" className="w-full aspect-square object-cover" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src={interiorImg} alt="" className="w-full aspect-square object-cover" />
                  <img src={buildingImg} alt="" className="w-full aspect-[4/5] object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ PREVIEW: CONTACTO ═══ */}
        <section className="py-28 md:py-40 bg-primary text-center">
          <div className="container max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                {t("home.contactTag")}
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-primary-foreground leading-tight mb-8">
                {t("home.contactTitle1")}<br />
                <span className="italic">{t("home.contactTitle2")}</span>
              </h2>
              <p className="font-body text-primary-foreground/60 leading-relaxed mb-12 max-w-xl mx-auto">
                {t("home.contactText")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-3 bg-gold/20 border border-gold/40 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:bg-gold/30 transition-all duration-500 group"
                >
                  {t("home.contactCta")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+34865662845"
                  className="inline-flex items-center justify-center gap-3 border border-primary-foreground/20 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all duration-500"
                >
                  865 662 845
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Index;
