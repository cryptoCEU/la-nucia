import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-nucia.jpg";


const HeroHome = () => {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Promoción de obra nueva en La Nucía, Alicante"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark/85 via-ocean-dark/60 to-ocean-dark/40" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-24 pb-8">
        <div className="container max-w-7xl mx-auto px-6">
          <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-body text-sm tracking-[0.2em] uppercase text-primary-foreground/60 mb-4"
              >
                La Nucía One
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-primary-foreground leading-[1.05] mb-8"
              >
                Designed for
                <br />
                <span className="italic">Mediterranean</span>
                <br />
                Living
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/caracteristicas"
                  className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 px-6 py-3 text-primary-foreground font-body text-sm tracking-wider uppercase hover:bg-primary-foreground/20 transition-colors"
                >
                  Descubre más <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 border border-primary-foreground/20 px-6 py-3 text-primary-foreground font-body text-sm tracking-wider uppercase hover:border-gold hover:text-gold transition-colors"
                >
                  Contacto <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
        </div>
      </div>

    </section>
  );
};

export default HeroHome;
