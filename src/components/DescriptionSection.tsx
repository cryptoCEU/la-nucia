import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import buildingImg from "@/assets/building-render.jpg";

const DescriptionSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">{t("description.tag")}</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-6">
              {t("description.title1")}<br /><span className="italic">{t("description.title2")}</span>
            </h2>
            <p className="font-body text-lg text-primary mb-2">{t("description.locationText")}</p>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">{t("description.paragraph1")}</p>
            <p className="font-body text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: t("description.paragraph2") }} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="overflow-hidden rounded-lg">
              <img src={buildingImg} alt={t("description.buildingAlt")} className="w-full h-[500px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gold p-6 rounded-lg hidden md:block">
              <p className="font-display text-3xl font-semibold text-foreground">{t("description.sunDays")}</p>
              <p className="font-body text-sm text-foreground/80">{t("description.sunLabel")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
