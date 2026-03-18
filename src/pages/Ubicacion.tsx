import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import LocationSection from "@/components/LocationSection";
import FooterSection from "@/components/FooterSection";

const Ubicacion = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main>
        <div className="h-20" />
        <section className="py-16 md:py-24 bg-sand">
          <div className="container max-w-6xl mx-auto px-6 text-center">
            <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">{t("ubicacionPage.tag")}</p>
            <h1 className="font-display text-4xl md:text-6xl text-foreground leading-tight" dangerouslySetInnerHTML={{ __html: t("ubicacionPage.title") }} />
          </div>
        </section>
        <LocationSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Ubicacion;
