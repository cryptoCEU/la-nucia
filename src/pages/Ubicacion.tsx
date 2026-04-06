import { motion } from "framer-motion";
import { MapPin, Sun, Mountain, Palmtree, HeartPulse, ShoppingBag, Waves } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FooterSection from "@/components/FooterSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroImage from "@/assets/hero-nucia.jpg";
import NeighbourhoodMapSection from "@/components/NeighbourhoodMapSection";
import {
  staggerContainer, staggerItem, heroText, viewportOnce
} from "@/lib/animations";
import { useHeroParallax } from "@/hooks/use-parallax";

const Ubicacion = () => {
  const { t } = useTranslation();
  const hero = useHeroParallax();

  const advantages = t("ubicacionPage.advantages", { returnObjects: true }) as { title: string; description: string }[];
  const advantageIcons = [Sun, Mountain, ShoppingBag, Waves, Palmtree, HeartPulse];

  const stats = [
    { number: "10", label: t("ubicacionPage.statBenidorm") },
    { number: "45", label: t("ubicacionPage.statAirport") },
    { number: "8", label: t("ubicacionPage.statBeach") },
    { number: "300+", label: t("ubicacionPage.statSun") },
  ];

  return (
    <>
      <SEO title="Ubicación Privilegiada" description="La Nucía One se encuentra en una ubicación privilegiada en la Costa Blanca." path="/ubicacion" />
      <Navbar />
      <main>
        {/* Hero */}
        <section ref={hero.ref} className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: hero.bgY }}>
            <motion.img
              src={heroImage}
              alt="La Nucía, Costa Blanca"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
          </motion.div>
          <motion.div className="relative z-10 container max-w-7xl mx-auto px-6 pb-20 pt-20" style={{ y: hero.textY, opacity: hero.opacity }}>
            <motion.div variants={staggerContainer(0.13, 0.3)} initial="hidden" animate="visible">
              <motion.p variants={heroText()} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-4">
                {t("ubicacionPage.tag")}
              </motion.p>
              <motion.h1 variants={heroText()} className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05]" dangerouslySetInnerHTML={{ __html: t("ubicacionPage.title") }} />
            </motion.div>
          </motion.div>
        </section>

        {/* Stats bar */}
        <section className="bg-primary border-t border-primary-foreground/10">
          <div className="container max-w-7xl mx-auto px-6">
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/10"
            >
              {stats.map((stat, i) => (
                <motion.div key={i} variants={staggerItem} className="py-10 px-6 text-center">
                  <AnimatedCounter value={stat.number} className="font-display text-3xl md:text-4xl text-gold block mb-1" />
                  <p className="font-body text-xs text-primary-foreground/50 tracking-wide uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About the area */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <motion.div variants={staggerContainer(0.12)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">{t("ubicacionPage.aboutTag")}</motion.p>
                <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-8" dangerouslySetInnerHTML={{ __html: t("ubicacionPage.aboutTitle") }} />
                <motion.p variants={staggerItem} className="font-body text-muted-foreground leading-relaxed mb-4">{t("ubicacionPage.aboutText1")}</motion.p>
                <motion.p variants={staggerItem} className="font-body text-muted-foreground leading-relaxed">{t("ubicacionPage.aboutText2")}</motion.p>
              </motion.div>
              <motion.div
                variants={staggerContainer(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid grid-cols-2 gap-6"
              >
                {advantages.map((adv, i) => {
                  const Icon = advantageIcons[i] || MapPin;
                  return (
                    <motion.div key={i} variants={staggerItem} className="border border-border p-6 hover:border-gold/30 card-hover transition-all duration-700">
                      <Icon className="w-5 h-5 text-gold mb-3" />
                      <h3 className="font-display text-lg text-foreground mb-2">{adv.title}</h3>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{adv.description}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Map */}
        <section className="bg-background">
          <div className="container max-w-7xl mx-auto px-6 pt-16 pb-8">
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mb-10"
            >
              <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-3">
                {t("ubicacionPage.mapTag")}
              </motion.p>
              <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground mb-8">
                {t("ubicacionPage.mapTitle")}
              </motion.h2>

              {/* Filter pills */}
              <motion.div variants={staggerItem} className="flex flex-wrap gap-2.5">
                {categories.map(cat => {
                  const isResidential = cat.id === "residential";
                  const active = isResidential || activeCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => !isResidential && toggleCategory(cat.id)}
                      disabled={isResidential}
                      className={`
                        group flex items-center gap-2 px-4 py-2.5 rounded-full font-body text-xs tracking-wider uppercase
                        border transition-all duration-400 select-none
                        ${isResidential
                          ? "border-accent bg-accent/15 text-accent cursor-default"
                          : active
                            ? "border-foreground/20 bg-foreground/5 text-foreground hover:bg-foreground/10 hover:shadow-sm"
                            : "border-border text-muted-foreground/50 hover:border-foreground/20 hover:text-muted-foreground"
                        }
                      `}
                      style={active && !isResidential ? { borderColor: `${cat.color}40`, backgroundColor: `${cat.color}10` } : undefined}
                    >
                      <cat.icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" style={active ? { color: cat.color } : undefined} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>

          {/* Map container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-7xl px-6 pb-20"
          >
            <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-border h-[520px] md:h-[520px] sm:h-[380px]">
              <MapboxMapInteractive activeCategories={activeCategories} />
            </div>
          </motion.div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Ubicacion;
