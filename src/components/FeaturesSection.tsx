import { motion } from "framer-motion";
import { Home, Waves, TreePine, Sun, Car, Shield } from "lucide-react";

const features = [
  {
    icon: Home,
    title: "2, 3 y 4 dormitorios",
    description: "Amplias viviendas diseñadas para el confort familiar con acabados de primera calidad.",
  },
  {
    icon: Waves,
    title: "Piscina comunitaria",
    description: "Disfruta de una gran zona de piscina con solárium y áreas de descanso.",
  },
  {
    icon: TreePine,
    title: "Zonas ajardinadas",
    description: "Amplios espacios verdes con vegetación mediterránea para tu tranquilidad.",
  },
  {
    icon: Sun,
    title: "Amplias terrazas",
    description: "Terrazas generosas para disfrutar del clima mediterráneo durante todo el año.",
  },
  {
    icon: Car,
    title: "Plaza de garaje",
    description: "Plazas de aparcamiento privado y trasteros incluidos en la promoción.",
  },
  {
    icon: Shield,
    title: "Eficiencia energética",
    description: "Materiales de última generación y calificación energética de alto nivel.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
            Características
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            Tu hogar en la <span className="italic">Costa Blanca</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
