import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Sun, Mountain, Palmtree, GraduationCap, HeartPulse, TreePine, ShoppingBag, Waves } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FooterSection from "@/components/FooterSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroImage from "@/assets/hero-nucia.jpg";
import MapboxMapInteractive from "@/components/MapboxMapInteractive";
import {
  staggerContainer, staggerItem, heroText, viewportOnce
} from "@/lib/animations";
import { useHeroParallax } from "@/hooks/use-parallax";

const Ubicacion = () => {
  const { t } = useTranslation();
  const [activeCategories, setActiveCategories] = useState<string[]>(["health", "education", "parks", "shopping"]);

  const toggleCategory = (cat: string) => {
    setActiveCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const advantages = t("ubicacionPage.advantages", { returnObjects: true }) as { title: string; description: string }[];
  const advantageIcons = [Sun, Mountain, ShoppingBag, Waves, Palmtree, HeartPulse];

  const categories = [
    { id: "health", label: t("ubicacionPage.catHealth"), icon: HeartPulse, color: "#ef4444" },
    { id: "education", label: t("ubicacionPage.catEducation"), icon: GraduationCap, color: "#3b82f6" },
    { id: "parks", label: t("ubicacionPage.catParks"), icon: TreePine, color: "#22c55e" },
    { id: "shopping", label: t("ubicacionPage.catShopping"), icon: ShoppingBag, color: "#f59e0b" },
  ];

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
        <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <motion.img
              src={heroImage}
              alt="La Nucía, Costa Blanca"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
          </div>
          <div className="relative z-10 container max-w-7xl mx-auto px-6 pb-20 pt-20">
            <motion.div variants={staggerContainer(0.13, 0.3)} initial="hidden" animate="visible">
              <motion.p variants={heroText()} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-4">
                {t("ubicacionPage.tag")}
              </motion.p>
              <motion.h1 variants={heroText()} className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05]" dangerouslySetInnerHTML={{ __html: t("ubicacionPage.title") }} />
            </motion.div>
          </div>
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
                    <motion.div key={i} variants={staggerItem} className="border border-border p-6 hover:border-gold/30 transition-all duration-700">
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
        <section className="bg-primary">
          <div className="container max-w-7xl mx-auto px-6 py-12">
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8"
            >
              <motion.div variants={staggerItem}>
                <p className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-2">{t("ubicacionPage.mapTag")}</p>
                <h2 className="font-display text-2xl md:text-4xl text-primary-foreground">{t("ubicacionPage.mapTitle")}</h2>
              </motion.div>
              <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
                {categories.map(cat => {
                  const active = activeCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2 font-body text-xs tracking-wider uppercase border transition-all duration-500 ${
                        active
                          ? "border-gold bg-gold/20 text-gold"
                          : "border-primary-foreground/20 text-primary-foreground/50 hover:border-primary-foreground/40"
                      }`}
                    >
                      <cat.icon className="w-3.5 h-3.5" />
                      {cat.label}
                    </button>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[70vh] min-h-[500px]"
          >
            <MapboxMapInteractive activeCategories={activeCategories} />
          </motion.div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Ubicacion;
