import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

const Gracias = () => {
  const [params] = useSearchParams();
  const from = params.get("from") || "unknown";
  const isLanding = from === "landing";

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "form_submitted",
      form_source: from,
    });
  }, [from]);

  // En contexto landing ocultamos el widget de ElevenLabs igual que en /landing
  useEffect(() => {
    if (!isLanding) return;
    const style = document.createElement("style");
    style.setAttribute("data-hide-convai", "true");
    style.textContent = "elevenlabs-convai{display:none !important;}";
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, [isLanding]);

  return (
    <>
      <SEO
        title="Gracias por tu interés — La Nucía One"
        description="Hemos recibido tu solicitud. Nuestro equipo te contactará en menos de 24 horas."
        noindex
      />
      {!isLanding && <Navbar />}
      <main className="min-h-screen bg-background flex items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
            Solicitud recibida
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-primary leading-[1.35] mb-6">
            Gracias por tu interés
          </h1>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            Hemos recibido tu solicitud correctamente. Nuestro equipo se pondrá en
            contacto contigo en menos de 24 horas para agendar tu visita en{" "}
            <span className="text-foreground">Alicante</span>,{" "}
            <span className="text-foreground">Madrid</span> u{" "}
            <span className="text-foreground">Online</span>.
          </p>
          <Link
            to="/"
            className="btn-primary btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-md hover:bg-ocean-light transition-all duration-700"
          >
            Volver al inicio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </main>
      {!isLanding && <FooterSection />}
    </>
  );
};

export default Gracias;
