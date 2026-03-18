import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Landing = () => {
  return (
    <>
      <SEO
        title="Descubre La Nucía One"
        description="Viviendas de obra nueva en La Nucía con 2, 3 y 4 dormitorios. Piscina, zonas comunes y vistas al Mediterráneo en la Costa Blanca."
        path="/landing"
      />
      <main>
        <HeroSection />
        <FeaturesSection />
        <GallerySection />
        <LocationSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Landing;
