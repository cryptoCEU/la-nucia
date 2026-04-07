import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import AnimatedCounter from "@/components/AnimatedCounter";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

const StatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    { number: t("stats.number1"), label: t("stats.label1"), description: t("stats.desc1") },
    { number: t("stats.number2"), label: t("stats.label2"), description: t("stats.desc2") },
  ];

  return (
    <section className="bg-primary py-20 md:py-28">
      <div className="container max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="flex flex-col gap-4"
            >
              <AnimatedCounter value={stat.number} className="font-display text-7xl md:text-8xl text-gold block leading-none" />
              <h3 className="font-display text-xl md:text-2xl text-primary-foreground font-medium">{stat.label}</h3>
              <p className="font-body text-sm text-primary-foreground/70 leading-relaxed max-w-md">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
