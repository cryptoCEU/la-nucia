import Navbar from "@/components/Navbar";
import GallerySection from "@/components/GallerySection";
import FooterSection from "@/components/FooterSection";

const Galeria = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="h-20" />
        <section className="py-16 md:py-24 bg-primary">
          <div className="container max-w-6xl mx-auto px-6 text-center">
            <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
              Residencial La Nucía
            </p>
            <h1 className="font-display text-4xl md:text-6xl text-primary-foreground leading-tight">
              Galería de <span className="italic">imágenes</span>
            </h1>
          </div>
        </section>
        <GallerySection />
      </main>
      <FooterSection />
    </>
  );
};

export default Galeria;
