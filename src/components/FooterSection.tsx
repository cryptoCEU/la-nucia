import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoActivum from "@/assets/logo-activum.png";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

const FooterSection = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-ocean-dark py-16">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-3 gap-12 mb-12"
        >
          <motion.div variants={staggerItem}>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/40 mb-4">{t("footer.contact")}</p>
            <div className="space-y-3">
              <a href="mailto:obranueva@activum.es" className="flex items-center gap-3 font-body text-primary-foreground/80 hover:text-gold transition-colors duration-500">
                <Mail className="w-4 h-4 text-gold" /> obranueva@activum.es
              </a>
              <a href="tel:+34865662845" className="flex items-center gap-3 font-body text-primary-foreground/80 hover:text-gold transition-colors duration-500">
                <Phone className="w-4 h-4 text-gold" /> 865 662 845
              </a>
            </div>
          </motion.div>
          <motion.div variants={staggerItem}>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/40 mb-4">{t("footer.salesOffice")}</p>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
              {t("footer.location")}<br />{t("footer.byAppointment")}
            </p>
          </motion.div>
          <motion.div variants={staggerItem} className="flex flex-col items-start md:items-end gap-3">
            <span className="font-body text-[10px] tracking-[0.25em] uppercase text-primary-foreground/40">{t("footer.managedBy")}</span>
            <img src={logoActivum} alt="Activum - Residential Management" className="h-12 opacity-70" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="font-body text-xs text-primary-foreground/30">
            {t("footer.rights", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/aviso-legal" className="font-body text-xs text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors duration-500">{t("footer.legalNotice")}</Link>
            <Link to="/politica-de-privacidad" className="font-body text-xs text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors duration-500">{t("footer.privacyPolicy")}</Link>
            <Link to="/politica-de-cookies" className="font-body text-xs text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors duration-500">{t("footer.cookiePolicy")}</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
