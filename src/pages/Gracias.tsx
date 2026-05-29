import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LLink } from "@/components/LLink";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import graciasBg from "@/assets/gracias-bg.png";

const Gracias = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const from = params.get("from") || "unknown";
  const isLanding = from === "landing";

  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-hide-convai", "true");
    style.textContent = "elevenlabs-convai{display:none !important;}";
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  return (
    <>
      <SEO
        title={t("graciasPage.seoTitle")}
        description={t("graciasPage.seoDescription")}
        path="/gracias"
        noindex
      />
      {!isLanding && <Navbar />}
      <main className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
        <img src={graciasBg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-primary/80 backdrop-blur-[2px]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-2xl mx-auto text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
            {t("graciasPage.eyebrow")}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-white leading-[1.35] mb-6">
            {t("graciasPage.title")}
          </h1>
          <p className="font-body text-base md:text-lg text-white/85 leading-relaxed mb-10 max-w-xl mx-auto">
            {t("graciasPage.body")}
          </p>
          <LLink
            to="/"
            className="btn-primary btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-gold text-primary font-body text-sm tracking-widest uppercase rounded-md hover:bg-gold/90 transition-all duration-700"
          >
            {t("graciasPage.cta")}
            <ArrowRight className="w-4 h-4" />
          </LLink>
        </motion.div>
      </main>
      {!isLanding && <FooterSection />}
    </>
  );
};

export default Gracias;
