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

const Ubicacion = () => {
  const { t } = useTranslation();
  const [activeCategories, setActiveCategories] = useState<string[]>(["health", "education", "parks"]);

  const toggleCategory = (cat: string) => {
    setActiveCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const advantages = t("ubicacionPage.advantages", { returnObjects: true }) as { title: string; description: string }[];
  const advantageIcons = [Sun, Mountain, ShoppingBag, Waves, Palmtree, HeartPulse];

  const categories = [
    { id: "health", label: t("ubicacionPage.catHealth"), icon: HeartPulse },
    { id: "education", label: t("ubicacionPage.catEducation"), icon: GraduationCap },
    { id: "parks", label: t("ubicacionPage.catParks"), icon: TreePine },
    { id: "shopping", label: t("ubicacionPage.catShopping"), icon: ShoppingBag },
  ];

  const stats = [
    { number: "10", label: t("ubicacionPage.statBenidorm") },
    { number: "45", label: t("ubicacionPage.statAirport") },
    { number: "8", label: t("ubicacionPage.statBeach") },
    { number: "300+", label: t("ubicacionPage.statSun") },
  ];

  return (
    <>
      <SEO
        title="Ubicación Privilegiada"
        description="La Nucía One se encuentra en una ubicación privilegiada en la Costa Blanca. A 10 min de Benidorm, 45 min del aeropuerto de Alicante."
        path="/ubicacion"
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end">
          <div className="absolute inset-0">
            <img src={heroImage} alt="La Nucía, Costa Blanca" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
          </div>
          <div className="relative z-10 container max-w-7xl mx-auto px-6 pb-20 pt-20">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-4">
              {t("ubicacionPage.tag")}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05]" dangerouslySetInnerHTML={{ __html: t("ubicacionPage.title") }} />
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-primary border-t border-primary-foreground/10">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/10">
              {stats.map((stat, i) => (
                <div key={i} className="py-10 px-6 text-center">
                  <AnimatedCounter value={stat.number} className="font-display text-3xl md:text-4xl text-gold block mb-1" />
                  <p className="font-body text-xs text-primary-foreground/50 tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About the area */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">{t("ubicacionPage.aboutTag")}</p>
                <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-8" dangerouslySetInnerHTML={{ __html: t("ubicacionPage.aboutTitle") }} />
                <p className="font-body text-muted-foreground leading-relaxed mb-4">{t("ubicacionPage.aboutText1")}</p>
                <p className="font-body text-muted-foreground leading-relaxed">{t("ubicacionPage.aboutText2")}</p>
              </motion.div>
              <div className="grid grid-cols-2 gap-6">
                {advantages.map((adv, i) => {
                  const Icon = advantageIcons[i] || MapPin;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="border border-border p-6"
                    >
                      <Icon className="w-5 h-5 text-gold mb-3" />
                      <h3 className="font-display text-lg text-foreground mb-2">{adv.title}</h3>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{adv.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map */}
        <section className="bg-primary">
          <div className="container max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <p className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-2">{t("ubicacionPage.mapTag")}</p>
                <h2 className="font-display text-2xl md:text-4xl text-primary-foreground">{t("ubicacionPage.mapTitle")}</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map(cat => {
                  const active = activeCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2 font-body text-xs tracking-wider uppercase border transition-all duration-300 ${
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
              </div>
            </div>
          </div>
          <div className="w-full h-[70vh] min-h-[500px]">
            <MapboxMapInteractive activeCategories={activeCategories} />
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Ubicacion;
