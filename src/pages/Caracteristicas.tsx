import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FeaturesSection from "@/components/FeaturesSection";
import CalidadesSection from "@/components/CalidadesSection";
import FooterSection from "@/components/FooterSection";

const Caracteristicas = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title="Características y Calidades"
        description="Descubre las características y calidades de La Nucía One: estructura, fachada, climatización, cocinas, carpintería y eficiencia energética."
        path="/caracteristicas"
      />
      <Navbar />
      <main>
        <div className="h-20" />
        <section className="py-16 md:py-24 bg-primary">
          <div className="container max-w-6xl mx-auto px-6 text-center">
            <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">{t("caracteristicasPage.tag")}</p>
            <h1 className="font-display text-4xl md:text-6xl text-primary-foreground leading-tight" dangerouslySetInnerHTML={{ __html: t("caracteristicasPage.title") }} />
          </div>
        </section>
        <FeaturesSection />
        <CalidadesSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Caracteristicas;
