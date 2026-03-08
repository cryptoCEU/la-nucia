import Navbar from "@/components/Navbar";
import HeroHome from "@/components/HeroHome";
import StatsSection from "@/components/StatsSection";
import DescriptionSection from "@/components/DescriptionSection";
import FeaturesSection from "@/components/FeaturesSection";
import GallerySection from "@/components/GallerySection";
import CalidadesSection from "@/components/CalidadesSection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroHome />
        <StatsSection />
        <DescriptionSection />
        <FeaturesSection />
        <GallerySection />
        <CalidadesSection />
        <LocationSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Index;
