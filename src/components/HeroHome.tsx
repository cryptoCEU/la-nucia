import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-nucia.jpg";

const stats = [
  { number: "107", label: "Viviendas de 2, 3 y 4 dormitorios. Espacio, luz y cuidada distribución." },
  { number: "9", label: "Disfruta de las zonas comunes: piscina, coworking, gimnasio y mucho más." },
];

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

      {/* Stats bar at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10"
      >
        <div className="container max-w-7xl mx-auto px-6 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex items-start gap-5 p-6 ${
                  i === 0
                    ? "bg-gold/90 text-foreground"
                    : "bg-primary/80 text-primary-foreground"
                }`}
              >
                <span className="font-display text-4xl md:text-5xl font-semibold leading-none">
                  {stat.number}
                </span>
                <p className="font-body text-sm leading-relaxed opacity-90 pt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroHome;
