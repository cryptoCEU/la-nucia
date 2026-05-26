import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-nucia.webp";

const HeroHome = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen overflow-hidden flex flex-col">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Promoción de obra nueva en La Nucía, Alicante" className="w-full h-full object-cover" style={{ objectPosition: "center 90%" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark/85 via-ocean-dark/60 to-ocean-dark/40" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-end pt-24 pb-16 md:pb-24">
        <div className="container max-w-[1600px] mx-auto px-4 md:px-8">
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary-foreground/60 mb-4">
            {t("hero.subtitle")}
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-primary-foreground leading-[1.9] mb-8">
            {t("hero.title1")}<br /><span className="italic">{t("hero.title2")}</span><br />{t("hero.title3")}
          </h1>
          <div className="flex flex-wrap gap-4">
            <Link to="/caracteristicas" className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 px-6 py-3 text-primary-foreground font-body text-sm tracking-wider uppercase hover:bg-primary-foreground/20 transition-colors">
              {t("hero.discoverMore")} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contacto" className="inline-flex items-center gap-2 border border-primary-foreground/20 px-6 py-3 text-primary-foreground font-body text-sm tracking-wider uppercase hover:border-gold hover:text-gold transition-colors">
              {t("hero.contact")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
