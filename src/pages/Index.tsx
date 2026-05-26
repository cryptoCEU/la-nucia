import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Waves, Dumbbell, Briefcase, UtensilsCrossed, Baby } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FooterSection from "@/components/FooterSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import FixedImageWindow from "@/components/FixedImageWindow";
import heroImage from "@/assets/hero-nucia.jpg";
import buildingImg from "@/assets/sections/terraza-piscina.webp";
import interiorImg from "@/assets/sections/sala-gente.webp";
import aboutGallery1 from "@/assets/sections/amigos-terraza.webp";
import aboutGallery2 from "@/assets/sections/gente-leyendo-terraza.webp";
import aboutGallery3 from "@/assets/sections/chica-leyendo-cama.webp";
import habitacionPeopleImg from "@/assets/carousel/habitacion-people.webp";
import cocinaPeopleImg from "@/assets/carousel/cocina-people.webp";
import salonPeopleImg from "@/assets/carousel/salon-people.webp";
import {
  fadeUp, fadeIn, scaleIn, slideRight, staggerContainer, staggerItem,
  heroText, viewportOnce, viewportOnceNear, slowTransition, clipReveal
} from "@/lib/animations";
import { useParallax } from "@/hooks/use-parallax";

const Index = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Phase 1 (0 → 0.4): logo animates (handled by Navbar). Image static.
  // Phase 2 (0.4 → 1): image Ken Burns + text fades in and stays still.
  // Drone-orbit effect: scale + subtle rotation + pan across the building
  const heroImgScale = useTransform(heroProgress, [0, 0.4, 0.7, 1], [1, 1.05, 1.12, 1.18]);
  const heroImgRotate = useTransform(heroProgress, [0, 0.4, 0.7, 1], [-2, 0, 1.5, 3]);
  const heroImgX = useTransform(heroProgress, [0, 0.4, 0.7, 1], ["-2%", "0%", "2%", "-1%"]);
  const heroImgY = useTransform(heroProgress, [0, 0.4, 0.7, 1], ["2%", "0%", "-2%", "-3%"]);
  const heroTextOpacity = useTransform(heroProgress, [0.4, 0.5], [0, 1]);
  const locationParallax = useParallax({ speed: 0.25 });

  const amenities = [
    { icon: Waves, label: "Piscina infinity" },
    { icon: Dumbbell, label: "Gimnasio equipado" },
    { icon: Briefcase, label: "Sala de coworking" },
    { icon: UtensilsCrossed, label: "Gastrobar" },
    { icon: Baby, label: "Área infantil" },
  ];

  return (
    <>
      <SEO
        title="La Nucía One | Obra Nueva en La Nucía, Alicante"
        description="Promoción de 107 viviendas de obra nueva en La Nucía, Alicante. Pisos de 2, 3 y 4 dormitorios con piscina, terrazas y vistas al Mediterráneo."
        path="/"
      />
      <Navbar />
      <main className="home-main">
        <style>{`
          /* Every direct section masks the fixed image behind FixedImageWindow.
             The band itself opts out via .fiw-band. */
          .home-main > section { position: relative; z-index: 10; }
          .home-main > .fiw-band { z-index: 5; }
        `}</style>
        {/* ═══ HERO FULLSCREEN ═══ */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            {/* Layer 1: image */}
            <div className="absolute inset-0 z-0">
              <img
                src={heroImage}
                alt="Promoción de obra nueva en La Nucía"
                className="w-full h-full object-cover object-bottom"
              />
            </div>
            {/* Layer 2: overlay gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary via-primary/50 to-primary/10 pointer-events-none" />
            {/* Layer 3: text */}
            <div
              className="absolute inset-0 z-20 flex flex-col justify-end pb-24 md:pb-32"
            >
              <div className="container max-w-[1600px] mx-auto px-4 md:px-8">
                <div className="max-w-3xl">
                  <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground mb-4">
                    {t("home.heroTag")}
                  </p>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-[1.9] mb-6">
                    {t("home.heroTitle1")}{" "}
                    <span className="italic">{t("home.heroTitle2")}</span>
                  </h1>
                  <p className="font-body text-primary-foreground/60 text-base md:text-lg max-w-xl mb-8">
                    {t("home.heroSubtitle")}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/viviendas"
                      className="btn-primary btn-shimmer inline-flex items-center gap-3 bg-gold/20 border border-gold/40 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:bg-gold/30 hover:border-gold/60 transition-all duration-700"
                    >
                      {t("home.discoverHomes")} <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/contacto"
                      className="inline-flex items-center gap-3 border border-primary-foreground/20 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all duration-700"
                    >
                      {t("home.contactUs")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ═══ AMENITIES BAR ═══ */}
        <section className="bg-primary border-t border-primary-foreground/10">
          <div className="container max-w-[1600px] mx-auto px-4 md:px-8">
            <motion.div
              variants={staggerContainer(0.1, 0)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnceNear}
              className="grid grid-cols-2 md:grid-cols-5 divide-x divide-primary-foreground/10"
            >
              {amenities.map(({ icon: Icon, label }, i) => (
                <motion.div key={i} variants={staggerItem} className="py-12 md:py-16 px-6 text-center flex flex-col items-center">
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-gold mb-4" strokeWidth={1.2} />
                  <p className="font-body text-xs md:text-sm text-primary-foreground/70 tracking-[0.15em] uppercase">{label}</p>
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
                <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-primary leading-[1.9] mb-8">
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
                variants={clipReveal(0.2)}
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

        {/* ═══ FIXED IMAGE WINDOW (scroll-reveal band) ═══ */}
        <FixedImageWindow phrase={t("fixedImage.phrase")} />

        {/* ═══ PREVIEW: UBICACIÓN ═══ */}
        <section className="relative py-32 md:py-44 bg-primary overflow-hidden">
          <motion.div
            ref={locationParallax.ref}
            className="absolute inset-0 opacity-20"
            style={{ y: locationParallax.y }}
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
                <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-primary-foreground leading-[1.9] mb-8">
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
          <div className="container max-w-[1600px] mx-auto px-4 md:px-8">
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
              <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground leading-[1.9] mb-6">
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
                { img: habitacionPeopleImg, title: t("home.type2bed"), desc: t("home.type2desc") },
                { img: cocinaPeopleImg, title: t("home.type3bed"), desc: t("home.type3desc") },
                { img: salonPeopleImg, title: t("home.type4bed"), desc: t("home.type4desc") },
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
                className="btn-primary btn-shimmer inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-700 group"
              >
                {t("home.homesCta")}
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══ PREVIEW: GALERÍA ═══ */}
        <section className="py-28 md:py-40 bg-[#f4faf0]">
          <div className="container max-w-[1600px] mx-auto px-4 md:px-8">
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
                <motion.h2 variants={staggerItem} className="font-display text-2xl md:text-4xl text-foreground leading-[1.9] mb-8">
                  {t("home.galleryTitle1")}<br />
                  <span className="italic">{t("home.galleryTitle2")}</span>
                </motion.h2>
                <motion.p variants={staggerItem} className="font-body text-muted-foreground leading-relaxed mb-10">
                  {t("home.galleryText")}
                </motion.p>
                <motion.div variants={staggerItem}>
                  <Link
                    to="/galeria"
                    className="btn-primary btn-shimmer inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-700 group"
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
                    <img src={aboutGallery1} alt="" className="w-full aspect-[4/5] object-cover" />
                  </motion.div>
                  <motion.div variants={scaleIn()} className="overflow-hidden">
                    <img src={aboutGallery2} alt="" className="w-full aspect-square object-cover" />
                  </motion.div>
                </div>
                <div className="space-y-4 pt-8">
                  <motion.div variants={scaleIn()} className="overflow-hidden">
                    <img src={interiorImg} alt="" className="w-full aspect-square object-cover" />
                  </motion.div>
                  <motion.div variants={scaleIn()} className="overflow-hidden">
                    <img src={aboutGallery3} alt="" className="w-full aspect-[4/5] object-cover" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ PREVIEW: CONTACTO ═══ */}
        <section className="py-28 md:py-40 bg-primary">
          <div className="container max-w-4xl mx-auto px-6 text-center">
            <motion.div
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                {t("home.contactTag")}
              </motion.p>
              <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-primary-foreground leading-[1.9] mb-8">
                {t("home.contactTitle1")}{" "}
                <span className="italic">{t("home.contactTitle2")}</span>
              </motion.h2>
              <motion.p variants={staggerItem} className="font-body text-primary-foreground/60 leading-relaxed mb-10 max-w-xl mx-auto">
                {t("home.contactText")}
              </motion.p>
              <motion.div variants={staggerItem} className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/contacto"
                  className="btn-primary btn-shimmer inline-flex items-center gap-3 bg-gold/20 border border-gold/40 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:bg-gold/30 hover:border-gold/60 transition-all duration-700"
                >
                  {t("home.contactCta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+34865662845"
                  className="inline-flex items-center gap-3 border border-primary-foreground/20 px-8 py-4 text-primary-foreground font-body text-sm tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all duration-700"
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
