import { motion } from "framer-motion";
import { Home, Waves, TreePine, Sun, Car, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { staggerContainer, staggerItem, fadeUp, scaleIn, rotateIn, viewportOnce } from "@/lib/animations";

const icons = [Home, Waves, TreePine, Sun, Car, Shield];

const FeaturesSection = () => {
  const { t } = useTranslation();
  const items = t("features.items", { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer(0.12, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
            {t("features.tag")}
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground" dangerouslySetInnerHTML={{ __html: t("features.title") }} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((feature, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                variants={scaleIn(0.1 + index * 0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="bg-card p-8 rounded-lg border border-border hover:shadow-lg hover:border-gold/20 transition-all duration-500 group"
              >
                <motion.div
                  variants={rotateIn(0.3 + index * 0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500"
                >
                  <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </motion.div>
                <h3 className="font-display text-xl text-foreground mb-3">{feature.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
