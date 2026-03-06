import { motion } from "framer-motion";
import buildingImg from "@/assets/building-render.jpg";
import interiorImg from "@/assets/interior.jpg";

const GallerySection = () => {
  return (
    <section className="py-24 md:py-32 bg-sand">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
            La Promoción
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            Diseño <span className="italic">mediterráneo</span> contemporáneo
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-lg aspect-square"
          >
            <img
              src={buildingImg}
              alt="Edificio de obra nueva en La Nucía con piscina comunitaria"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ocean-dark/80 to-transparent p-6">
              <p className="font-display text-xl text-primary-foreground">Exteriores</p>
              <p className="font-body text-sm text-primary-foreground/70">Arquitectura contemporánea con piscina</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative overflow-hidden rounded-lg aspect-square"
          >
            <img
              src={interiorImg}
              alt="Interior moderno de vivienda con vistas al mar en La Nucía"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ocean-dark/80 to-transparent p-6">
              <p className="font-display text-xl text-primary-foreground">Interiores</p>
              <p className="font-body text-sm text-primary-foreground/70">Espacios luminosos con vistas al mar</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
