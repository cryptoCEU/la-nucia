import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import HeroHome from "@/components/HeroHome";
import StatsSection from "@/components/StatsSection";
import DescriptionSection from "@/components/DescriptionSection";
import FeaturesSection from "@/components/FeaturesSection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <>
      <SEO
        title="La Nucía One | Obra Nueva en La Nucía, Alicante"
        description="Promoción de 107 viviendas de obra nueva en La Nucía, Alicante. Pisos de 2, 3 y 4 dormitorios con piscina, terrazas y vistas al Mediterráneo."
        path="/"
      />
      <Navbar />
      <main>
        <HeroHome />
        <StatsSection />
        <DescriptionSection />
        <FeaturesSection />
        <LocationSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Index;
