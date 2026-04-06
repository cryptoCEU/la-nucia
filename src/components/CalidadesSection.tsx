import { motion } from "framer-motion";
import { Building2, Layers, Wind, Utensils, Leaf, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [Building2, Layers, Wind, Utensils, Leaf, ShieldCheck];

const CalidadesSection = () => {
  const { t } = useTranslation();
  const items = t("calidades.items", { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section className="py-24 md:py-32 bg-sand">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">{t("calidades.tag")}</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground" dangerouslySetInnerHTML={{ __html: t("calidades.title") }} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-card p-8 rounded-lg border border-border">
                <Icon className="w-8 h-8 text-gold mb-5" />
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
