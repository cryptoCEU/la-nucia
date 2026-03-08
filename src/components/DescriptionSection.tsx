import { motion } from "framer-motion";
import buildingImg from "@/assets/building-render.jpg";

const DescriptionSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
              Ubicación
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-6">
              Te invitamos a descubrir
              <br />
              <span className="italic">un nuevo residencial</span>
            </h2>
            <p className="font-body text-lg text-primary mb-2">
              En La Nucía, a un paso de todo.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Situado en uno de los municipios con mayor calidad de vida de la Costa Blanca,
              este residencial te permite disfrutar de la tranquilidad con espacios verdes cercanos,
              mientras todos los servicios que necesitas están a tu alcance: playas, supermercados,
              centros deportivos, colegios y hospitales.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              <strong className="text-foreground">La Nucía One</strong> te ofrece un estilo de vida mediterráneo.
              Espaciosas viviendas de 2, 3 y 4 dormitorios con grandes ventanales y cuidada distribución.
              Un diseño singular, creado para la vida del residencial, con un completo equipamiento
              comunitario pensado para disfrutar: piscina infinity, coworking, gimnasio, zonas
              ajardinadas, zona infantil y mucho más.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={buildingImg}
                alt="Edificio de obra nueva en La Nucía"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gold p-6 rounded-lg hidden md:block">
              <p className="font-display text-3xl font-semibold text-foreground">300+</p>
              <p className="font-body text-sm text-foreground/80">Días de sol al año</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
