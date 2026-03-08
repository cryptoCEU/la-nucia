import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Contacto = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="h-20" />
        <section className="py-16 md:py-24 bg-primary">
          <div className="container max-w-6xl mx-auto px-6 text-center">
            <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
              ¿Te interesa?
            </p>
            <h1 className="font-display text-4xl md:text-6xl text-primary-foreground leading-tight">
              Conoce todos los <span className="italic">detalles</span>
            </h1>
          </div>
        </section>
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Contacto;
