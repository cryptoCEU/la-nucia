import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import LocationSection from "@/components/LocationSection";
import FooterSection from "@/components/FooterSection";

const Ubicacion = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title="Ubicación Privilegiada"
        description="La Nucía One se encuentra en una ubicación privilegiada en la Costa Blanca. A 10 min de Benidorm, 45 min del aeropuerto de Alicante y cerca de las playas."
        path="/ubicacion"
      />
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
