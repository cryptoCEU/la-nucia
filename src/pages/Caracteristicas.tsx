import Navbar from "@/components/Navbar";
import FeaturesSection from "@/components/FeaturesSection";
import CalidadesSection from "@/components/CalidadesSection";
import FooterSection from "@/components/FooterSection";

const Caracteristicas = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Spacer for fixed navbar */}
        <div className="h-20" />
        <section className="py-16 md:py-24 bg-primary">
          <div className="container max-w-6xl mx-auto px-6 text-center">
            <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
              La Nucía One
            </p>
            <h1 className="font-display text-4xl md:text-6xl text-primary-foreground leading-tight">
              Características y <span className="italic">calidades</span>
            </h1>
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
