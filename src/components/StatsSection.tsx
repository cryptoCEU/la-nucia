import { motion } from "framer-motion";

const stats = [
  {
    number: "107",
    label: "Viviendas de 2, 3 y 4 dormitorios",
    description: "Espacio, luz y cuidada distribución.",
  },
  {
    number: "9",
    label: "Zonas comunes exclusivas",
    description: "Disfruta de piscina, coworking, gimnasio y mucho más.",
  },
];

const StatsSection = () => {
  return (
    <section className="bg-primary py-20 md:py-28">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col gap-4"
            >
              <span className="font-display text-7xl md:text-8xl font-semibold text-gold leading-none">
                {stat.number}
              </span>
              <h3 className="font-display text-xl md:text-2xl text-primary-foreground font-medium">
                {stat.label}
              </h3>
              <p className="font-body text-sm text-primary-foreground/70 leading-relaxed max-w-md">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
