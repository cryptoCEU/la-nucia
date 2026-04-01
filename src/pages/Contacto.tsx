import { motion } from "framer-motion";
import { Phone, Mail, MapPin, FileText, Bot } from "lucide-react";
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

  const handleJuliaClick = () => {
    const widget = document.querySelector('elevenlabs-convai');
    if (widget?.shadowRoot) {
      const button = widget.shadowRoot.querySelector('button');
      button?.click();
    } else if (widget) {
      (widget as HTMLElement).click();
    }
  };

  const contactCards = [
    {
      icon: Phone,
      title: t("contactoPage.contactTitle"),
      content: (
        <div className="space-y-2">
          <a href="tel:+34865662845" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-500 block">{t("contactoPage.phone")}</a>
          <a href="mailto:obranueva@activum.es" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-500 block">{t("contactoPage.mail")}</a>
        </div>
      ),
    },
    {
      icon: MapPin,
      title: t("contactoPage.officeTitle"),
      content: (
        <div className="space-y-1">
          <p className="font-body text-sm text-muted-foreground">{t("contactoPage.officeLocation")}</p>
          <p className="font-body text-sm text-muted-foreground">{t("contactoPage.officeAppointment")}</p>
        </div>
      ),
    },
    {
      icon: FileText,
      title: t("contactoPage.formTitle"),
      content: <p className="font-body text-sm text-muted-foreground">{t("contactoPage.formDesc")}</p>,
    },
    {
      icon: Bot,
      title: t("contactoPage.juliaTitle"),
      content: <p className="font-body text-sm text-muted-foreground">{t("contactoPage.juliaDesc")}</p>,
      onClick: handleJuliaClick,
    },
  ];

  return (
    <>
      <SEO title="Contacto" description="Contacta con nosotros para más información sobre La Nucía One." path="/contacto" />
      <Navbar />
      <main>
        <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <motion.img
              src={buildingImage}
              alt="La Nucía One - Contacto"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/95 via-ocean-dark/70 to-ocean-dark/40" />
          </div>
          <div className="relative z-10 container max-w-7xl mx-auto px-6 pb-16 pt-20">
            <motion.div variants={staggerContainer(0.12, 0.3)} initial="hidden" animate="visible">
              <motion.p variants={heroText()} className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-2">
                {t("contactoPage.tag")}
              </motion.p>
              <motion.p variants={heroText()} className="font-body text-sm tracking-[0.15em] uppercase text-primary-foreground/60 mb-6">
                {t("contactoPage.locationTag")}
              </motion.p>
              <motion.h1 variants={heroText()} className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] mb-6 max-w-3xl" dangerouslySetInnerHTML={{ __html: t("contactoPage.heroTitle") }} />
              <motion.p variants={heroText()} className="font-body text-primary-foreground/60 text-lg max-w-xl">
                {t("contactoPage.heroSubtitle")}
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="bg-sand py-20 md:py-28">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
              <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
                <motion.p variants={staggerItem} className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">{t("contactoPage.infoTag")}</motion.p>
                <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-6" dangerouslySetInnerHTML={{ __html: t("contactoPage.infoTitle") }} />
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
                    onClick={card.onClick}
                    className={`space-y-4 ${card.onClick ? "cursor-pointer rounded-2xl p-4 -m-4 transition-colors duration-500 hover:bg-primary/5" : ""}`}
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
