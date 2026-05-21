import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import buildingImage from "@/assets/building-render.jpg";
import {
  staggerContainer, staggerItem, heroText, viewportOnce
} from "@/lib/animations";
import { useHeroParallax } from "@/hooks/use-parallax";

const Contacto = () => {
  const { t } = useTranslation();
  const hero = useHeroParallax();

  const locations = t("contactoPage.locations", { returnObjects: true }) as { title: string; desc: string }[];
  const contactCards = locations.map((loc) => ({
    icon: MapPin,
    title: loc.title,
    content: <p className="font-body text-sm text-muted-foreground">{loc.desc}</p>,
  }));

  return (
    <>
      <SEO title="Contacto" description="Contacta con nosotros para más información sobre La Nucía One." path="/contacto" />
      <Navbar />
      <main>
        <section ref={hero.ref} className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y: hero.bgY }}>
            <motion.img
              src={buildingImage}
              alt="La Nucía One - Contacto"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/95 via-ocean-dark/70 to-ocean-dark/40" />
          </motion.div>
          <motion.div className="relative z-10 container max-w-[1600px] mx-auto px-4 md:px-8 pb-16 pt-20" style={{ y: hero.textY, opacity: hero.opacity }}>
            <motion.div variants={staggerContainer(0.12, 0.3)} initial="hidden" animate="visible">
              <motion.p variants={heroText()} className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-2">
                {t("contactoPage.tag")}
              </motion.p>
              <motion.p variants={heroText()} className="font-body text-sm tracking-[0.15em] uppercase text-primary-foreground/60 mb-6">
                {t("contactoPage.locationTag")}
              </motion.p>
              <motion.h1 variants={heroText()} className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.4] mb-6 max-w-3xl" dangerouslySetInnerHTML={{ __html: t("contactoPage.heroTitle") }} />
              <motion.p variants={heroText()} className="font-body text-primary-foreground/60 text-lg max-w-xl">
                {t("contactoPage.heroSubtitle")}
              </motion.p>
            </motion.div>
          </motion.div>
        </section>

        <section className="bg-[#f4faf0] py-20 md:py-28">
          <div className="container max-w-[1600px] mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
              <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                <motion.p variants={staggerItem} className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">{t("contactoPage.infoTag")}</motion.p>
                <motion.h2 variants={staggerItem} className="font-display text-2xl md:text-3xl text-foreground leading-[1.35] mb-6" dangerouslySetInnerHTML={{ __html: t("contactoPage.infoTitle") }} />
                <motion.p variants={staggerItem} className="font-body text-muted-foreground leading-relaxed">{t("contactoPage.infoSubtitle")}</motion.p>
              </motion.div>

              <motion.div
                variants={staggerContainer(0.1, 0.15)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {contactCards.map((card, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <card.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-xl text-foreground">{card.title}</h3>
                    {card.content}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Contacto;
