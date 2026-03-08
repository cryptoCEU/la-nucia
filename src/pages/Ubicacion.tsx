import Navbar from "@/components/Navbar";
import LocationSection from "@/components/LocationSection";
import FooterSection from "@/components/FooterSection";

const Ubicacion = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="h-20" />
        <section className="py-16 md:py-24 bg-sand">
          <div className="container max-w-6xl mx-auto px-6 text-center">
            <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
              Costa Blanca, Alicante
            </p>
            <h1 className="font-display text-4xl md:text-6xl text-foreground leading-tight">
              Ubicación <span className="italic">privilegiada</span>
            </h1>
          </div>
        </section>
        <LocationSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Ubicacion;
