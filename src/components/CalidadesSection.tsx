import { motion } from "framer-motion";
import { Building2, Layers, Wind, Utensils, Leaf, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { staggerContainer, staggerItem, fadeUp, scaleIn, rotateIn, viewportOnce } from "@/lib/animations";

const icons = [Building2, Layers, Wind, Utensils, Leaf, ShieldCheck];

const CalidadesSection = () => {
  const { t } = useTranslation();
  const items = t("calidades.items", { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section className="py-24 md:py-32 bg-sand">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer(0.12, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
            {t("calidades.tag")}
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground" dangerouslySetInnerHTML={{ __html: t("calidades.title") }} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                variants={scaleIn(0.15 + i * 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="bg-card p-8 rounded-lg border border-border hover:border-gold/20 hover:shadow-md transition-all duration-500 group"
              >
                <motion.div
                  variants={rotateIn(0.3 + i * 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  <Icon className="w-8 h-8 text-gold mb-5 group-hover:scale-110 transition-transform duration-500" />
                </motion.div>
                <h3 className="font-display text-xl text-foreground mb-3">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CalidadesSection;
