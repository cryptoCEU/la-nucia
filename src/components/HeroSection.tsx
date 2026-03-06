import { motion } from "framer-motion";
import heroImage from "@/assets/hero-nucia.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Promoción de obra nueva en La Nucía, Alicante - Costa Mediterránea"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark/60 via-ocean-dark/40 to-ocean-dark/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold font-body text-sm md:text-base tracking-[0.3em] uppercase mb-6"
        >
          Próximamente en La Nucía
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-primary-foreground leading-tight mb-6"
        >
          Designed for
          <br />
          <span className="italic">Mediterranean Living</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
        >
          Pisos de 2, 3 y 4 dormitorios con amplias terrazas, zonas comunes y
          vistas al Mediterráneo en una de las mejores ubicaciones de la Costa Blanca.
        </motion.p>

        <motion.a
          href="#contacto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="inline-block bg-primary px-10 py-4 text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-ocean-light transition-colors duration-300"
        >
          ¡Quiero conocer más detalles!
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-primary-foreground/30 relative">
          <motion.div
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-gold absolute -left-[2.5px] top-0"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
