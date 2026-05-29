import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LLink } from "@/components/LLink";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import graciasBg from "@/assets/gracias-bg.png";

const Gracias = () => {
  const [params] = useSearchParams();
  const from = params.get("from") || "unknown";
  const isLanding = from === "landing";

  // Ocultar el widget de ElevenLabs en la página de gracias
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-hide-convai", "true");
    style.textContent = "elevenlabs-convai{display:none !important;}";
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  return (
    <>
      <SEO
        title="Gracias por tu interés"
        description="Hemos recibido tu solicitud. Nuestro equipo te contactará en menos de 24 horas."
        path="/gracias"
        noindex
      />
      {!isLanding && <Navbar />}
      <main className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
        <img
          src={graciasBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-primary/80 backdrop-blur-[2px]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-2xl mx-auto text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
            Solicitud recibida
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-white leading-[1.35] mb-6">
            Gracias por tu interés
          </h1>
          <p className="font-body text-base md:text-lg text-white/85 leading-relaxed mb-10 max-w-xl mx-auto">
            Hemos recibido tu solicitud correctamente. Nuestro equipo se pondrá en
            contacto contigo en menos de 24 horas para agendar tu visita en{" "}
            <span className="text-white">Alicante</span>,{" "}
            <span className="text-white">Madrid</span> u{" "}
            <span className="text-white">Online</span>.
          </p>
          <LLink
            to="/"
            className="btn-primary btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-gold text-primary font-body text-sm tracking-widest uppercase rounded-md hover:bg-gold/90 transition-all duration-700"
          >
            Volver al inicio
            <ArrowRight className="w-4 h-4" />
          </LLink>
        </motion.div>
      </main>
      {!isLanding && <FooterSection />}
    </>
  );
};

export default Gracias;
