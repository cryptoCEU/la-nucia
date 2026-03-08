import { motion } from "framer-motion";
import { Phone, Mail, MapPin, FileText, Bot } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import buildingImage from "@/assets/building-render.jpg";

const Contacto = () => {
  const handleJuliaClick = () => {
    const widget = document.querySelector('elevenlabs-convai');
    if (widget?.shadowRoot) {
      const button = widget.shadowRoot.querySelector('button');
      button?.click();
    } else if (widget) {
      (widget as HTMLElement).click();
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero - dark with building blueprint style */}
        <section className="relative h-[60vh] min-h-[400px] flex items-end">
          <div className="absolute inset-0">
            <img
              src={buildingImage}
              alt="La Nucía One - Contacto"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/95 via-ocean-dark/70 to-ocean-dark/40" />
          </div>
          <div className="relative z-10 container max-w-7xl mx-auto px-6 pb-16 pt-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-2"
            >
              Promoción Obra Nueva
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-body text-sm tracking-[0.15em] uppercase text-primary-foreground/60 mb-6"
            >
              La Nucía, Alicante
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] mb-6 max-w-3xl"
            >
              107 viviendas diseñadas para el
              <span className="italic"> Mediterráneo</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body text-primary-foreground/60 text-lg max-w-xl"
            >
              Contacta con nosotros para obtener más información sobre la promoción La Nucía One.
            </motion.p>
          </div>
        </section>

        {/* Info section - like alonsocano68 */}
        <section className="bg-sand py-20 md:py-28">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
              {/* Left - Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  La Nucía One
                </p>
                <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-6">
                  ¿Quieres más
                  <br />
                  <span className="italic">información?</span>
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Llámenos, envíenos un mail, complete el formulario, o concierte una visita.
                </p>
              </motion.div>

              {/* Right - Info cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground">Contacto</h3>
                  <div className="space-y-2">
                    <a
                      href="tel:+34865662845"
                      className="font-body text-sm text-muted-foreground hover:text-primary transition-colors block"
                    >
                      Teléfono: +34 865 662 845
                    </a>
                    <a
                      href="mailto:obranueva@activum.es"
                      className="font-body text-sm text-muted-foreground hover:text-primary transition-colors block"
                    >
                      Mail: obranueva@activum.es
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground">Oficina Comercial</h3>
                  <div className="space-y-1">
                    <p className="font-body text-sm text-muted-foreground">La Nucía, Alicante</p>
                    <p className="font-body text-sm text-muted-foreground">Con cita previa</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground">Formulario</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Nos pondremos en contacto lo antes posible
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground">Julia, Asistente IA</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Habla con Julia, nuestra asistente virtual, en la esquina inferior derecha
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Contacto;
