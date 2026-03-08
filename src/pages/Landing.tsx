import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Landing = () => {
  return (
    <>
      <Navbar />
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
