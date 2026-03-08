import { motion } from "framer-motion";
import { Building2, Layers, Wind, Utensils, Leaf, ShieldCheck } from "lucide-react";

const calidades = [
  {
    icon: Building2,
    title: "Estructura",
    description:
      "Cimentación y estructura calculada según normativa vigente, con forjados de losa maciza y pilares de hormigón armado, dotando de mayor solidez y aislamiento acústico.",
  },
  {
    icon: Layers,
    title: "Fachada",
    description:
      "Fachada compuesta por cerramiento cerámico con aislamiento térmico exterior SATE, mejorando el confort térmico eliminando puentes térmicos y reduciendo el consumo.",
  },
  {
    icon: Wind,
    title: "Climatización",
    description:
      "Sistema de aerotermia de gran eficiencia energética para climatización y ACS. Distribución de aire por conductos integrados en falso techo.",
  },
  {
    icon: Utensils,
    title: "Cocinas",
    description:
      "Cocina amueblada y equipada con electrodomésticos de primera marca. Encimera de cuarzo compacto y diseño actual de gran capacidad.",
  },
  {
    icon: Leaf,
    title: "Carpintería",
    description:
      "Carpintería exterior de PVC con vidrios tipo Climalit. Puertas interiores lacadas en blanco con herrajes de acero. Armarios empotrados modulares.",
  },
  {
    icon: ShieldCheck,
    title: "Eficiencia Energética",
    description:
      "Alta calificación energética gracias a materiales de calidad y sistemas de aerotermia que contribuyen a un menor consumo y al cuidado del medio ambiente.",
  },
];

const CalidadesSection = () => {
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
            Calidades
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            Distinción e <span className="italic">innovación</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calidades.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card p-8 rounded-lg border border-border"
            >
              <item.icon className="w-8 h-8 text-gold mb-5" />
              <h3 className="font-display text-xl text-foreground mb-3">
                {item.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalidadesSection;
