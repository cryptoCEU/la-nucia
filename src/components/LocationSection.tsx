import { motion } from "framer-motion";
import { MapPin, Clock, Mountain, Palmtree } from "lucide-react";
import MapboxMap from "./MapboxMap";

const highlights = [
  { icon: MapPin, text: "A 10 min de Benidorm" },
  { icon: Clock, text: "A 45 min del aeropuerto de Alicante" },
  { icon: Mountain, text: "Sierra de Aitana como telón de fondo" },
  { icon: Palmtree, text: "Playas a menos de 8 km" },
];

const LocationSection = () => {
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
              Ubicación privilegiada
            </p>
            <h2 className="font-display text-3xl md:text-5xl mb-6 leading-tight">
              La Nucía,
              <br />
              <span className="italic">Alicante</span>
            </h2>
            <p className="font-body text-primary-foreground/70 leading-relaxed mb-10 max-w-lg">
              La Nucía es uno de los municipios con mayor calidad de vida de la Costa Blanca.
              Con un clima excepcional de más de 300 días de sol al año, excelentes
              infraestructuras deportivas y culturales, y una ubicación estratégica entre la
              montaña y el mar.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <item.icon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="font-body text-sm text-primary-foreground/80">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-lg overflow-hidden"
          >
            <MapboxMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
