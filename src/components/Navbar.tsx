import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoNuciaOne from "@/assets/logo-header.png";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/landing";

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.location"), href: "/ubicacion" },
    { label: t("nav.homes"), href: "/viviendas" },
    { label: t("nav.gallery"), href: "/galeria" },
    { label: t("nav.contact"), href: "/contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-primary/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoNuciaOne} alt="La Nucía One" className="h-16 opacity-90" />
          </Link>

          <div className="flex items-center gap-6">
            <LanguageSelector className="hidden md:flex" />
            <a
              href="tel:+34865662845"
              className="hidden md:flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-colors font-body text-sm"
            >
              <Phone className="w-4 h-4" />
              865 662 845
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 px-5 py-2.5 border border-primary-foreground/20 rounded-full text-primary-foreground hover:border-gold hover:text-gold btn-hover transition-colors"
            >
              <span className="font-body text-sm tracking-wider uppercase">{t("nav.menu")}</span>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-primary flex flex-col"
          >
            <div className="container max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
              <Link to="/" className="flex items-center gap-3">
                <img src={logoNuciaOne} alt="La Nucía One" className="h-16 opacity-90" />
              </Link>
              <div className="flex items-center gap-6">
                <LanguageSelector />
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-5 py-2.5 border border-primary-foreground/20 rounded-full text-primary-foreground hover:border-gold hover:text-gold transition-colors"
                >
                  <span className="font-body text-sm tracking-wider uppercase">{t("nav.close")}</span>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row">
              <div className="flex-1 flex flex-col justify-center px-12 md:px-24">
                <nav className="space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                    >
                      <Link
                        to={link.href}
                        className={`block font-display text-4xl md:text-6xl py-2 transition-colors duration-300 ${
                          location.pathname === link.href
                            ? "text-gold"
                            : "text-primary-foreground/60 hover:text-primary-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="px-12 md:px-24 pb-12 md:pb-0 md:flex md:flex-col md:justify-center md:border-l md:border-primary-foreground/10"
              >
                <div className="space-y-6">
                  <div>
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/40 mb-2">
                      {t("nav.contactLabel")}
                    </p>
                    <a href="mailto:obranueva@activum.es" className="font-body text-primary-foreground/80 hover:text-gold transition-colors block">
                      obranueva@activum.es
                    </a>
                    <a href="tel:+34865662845" className="font-body text-primary-foreground/80 hover:text-gold transition-colors block mt-1">
                      +34 865 662 845
                    </a>
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/40 mb-2">
                      {t("nav.salesOffice")}
                    </p>
                    <p className="font-body text-sm text-primary-foreground/60">
                      La Nucía, Alicante<br />{t("nav.byAppointment")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
