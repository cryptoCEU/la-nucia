import { motion } from "framer-motion";
import { Phone, Mail, MapPin, FileText, Bot } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import buildingImage from "@/assets/building-render.jpg";

const Contacto = () => {
  const { t } = useTranslation();

  const handleJuliaClick = () => {
    const widget = document.querySelector('elevenlabs-convai');
    if (widget?.shadowRoot) {
      const button = widget.shadowRoot.querySelector('button');
      button?.click();
    } else if (widget) {
      (widget as HTMLElement).click();
    }
  };

  return (
    <>
      <SEO
        title="Contacto"
        description="Contacta con nosotros para más información sobre La Nucía One. Llámanos, envíanos un email o rellena el formulario."
        path="/contacto"
      />
      <Navbar />
      <main>
        <section className="relative h-[60vh] min-h-[400px] flex items-end">
          <div className="absolute inset-0">
            <img src={buildingImage} alt="La Nucía One - Contacto" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/95 via-ocean-dark/70 to-ocean-dark/40" />
          </div>
          <div className="relative z-10 container max-w-7xl mx-auto px-6 pb-16 pt-20">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-2">
              {t("contactoPage.tag")}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="font-body text-sm tracking-[0.15em] uppercase text-primary-foreground/60 mb-6">
              {t("contactoPage.locationTag")}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] mb-6 max-w-3xl" dangerouslySetInnerHTML={{ __html: t("contactoPage.heroTitle") }} />
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="font-body text-primary-foreground/60 text-lg max-w-xl">
              {t("contactoPage.heroSubtitle")}
            </motion.p>
          </div>
        </section>

        <section className="bg-sand py-20 md:py-28">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">{t("contactoPage.infoTag")}</p>
                <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-6" dangerouslySetInnerHTML={{ __html: t("contactoPage.infoTitle") }} />
                <p className="font-body text-muted-foreground leading-relaxed">{t("contactoPage.infoSubtitle")}</p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><Phone className="w-5 h-5 text-primary" /></div>
                  <h3 className="font-display text-xl text-foreground">{t("contactoPage.contactTitle")}</h3>
                  <div className="space-y-2">
                    <a href="tel:+34865662845" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors block">{t("contactoPage.phone")}</a>
                    <a href="mailto:obranueva@activum.es" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors block">{t("contactoPage.mail")}</a>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><MapPin className="w-5 h-5 text-primary" /></div>
                  <h3 className="font-display text-xl text-foreground">{t("contactoPage.officeTitle")}</h3>
                  <div className="space-y-1">
                    <p className="font-body text-sm text-muted-foreground">{t("contactoPage.officeLocation")}</p>
                    <p className="font-body text-sm text-muted-foreground">{t("contactoPage.officeAppointment")}</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><FileText className="w-5 h-5 text-primary" /></div>
                  <h3 className="font-display text-xl text-foreground">{t("contactoPage.formTitle")}</h3>
                  <p className="font-body text-sm text-muted-foreground">{t("contactoPage.formDesc")}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} onClick={handleJuliaClick} className="space-y-4 cursor-pointer rounded-2xl p-4 -m-4 transition-colors hover:bg-primary/5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><Bot className="w-5 h-5 text-primary" /></div>
                  <h3 className="font-display text-xl text-foreground">{t("contactoPage.juliaTitle")}</h3>
                  <p className="font-body text-sm text-muted-foreground">{t("contactoPage.juliaDesc")}</p>
                </motion.div>
              </div>
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
