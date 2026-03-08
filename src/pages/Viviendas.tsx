import { motion } from "framer-motion";
import { ArrowRight, Download, Home, BedDouble, Bath, Maximize } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import buildingImage from "@/assets/building-render.jpg";

const viviendas = [
  {
    categoryKey: "viviendas2dorm",
    subtitleKey: "viviendasSubtitle2",
    units: [
      { planta: "Bloque A — Planta 1ª", area: "65.20 m²", terraza: "12.50 m²", price: "189.000€", detail: "2 dormitorios + 2 baños" },
      { planta: "Bloque A — Planta 2ª", area: "65.20 m²", terraza: "12.50 m²", price: "194.000€", detail: "2 dormitorios + 2 baños" },
      { planta: "Bloque A — Planta 3ª", area: "65.20 m²", terraza: "12.50 m²", price: "199.000€", detail: "2 dormitorios + 2 baños" },
      { planta: "Bloque B — Planta Baja", area: "68.40 m²", terraza: "32.00 m²", price: "195.000€", detail: "2 dormitorios + 2 baños" },
      { planta: "Bloque B — Planta 1ª", area: "66.80 m²", terraza: "14.20 m²", price: "192.000€", detail: "2 dormitorios + 2 baños" },
      { planta: "Bloque B — Planta 2ª", area: "66.80 m²", terraza: "14.20 m²", price: "197.000€", detail: "2 dormitorios + 2 baños" },
    ],
  },
  {
    categoryKey: "viviendas3dorm",
    subtitleKey: "viviendasSubtitle3",
    units: [
      { planta: "Bloque A — Planta 1ª", area: "85.30 m²", terraza: "15.80 m²", price: "229.000€", detail: "3 dormitorios + 2 baños" },
      { planta: "Bloque A — Planta 2ª", area: "85.30 m²", terraza: "15.80 m²", price: "235.000€", detail: "3 dormitorios + 2 baños" },
      { planta: "Bloque A — Planta 3ª", area: "85.30 m²", terraza: "15.80 m²", price: "241.000€", detail: "3 dormitorios + 2 baños" },
      { planta: "Bloque B — Planta 1ª", area: "88.10 m²", terraza: "18.40 m²", price: "237.000€", detail: "3 dormitorios + 2 baños" },
      { planta: "Bloque B — Planta 2ª", area: "88.10 m²", terraza: "18.40 m²", price: "243.000€", detail: "3 dormitorios + 2 baños" },
    ],
  },
  {
    categoryKey: "viviendas4dorm",
    subtitleKey: "viviendasSubtitle4",
    units: [
      { planta: "Bloque A — Planta 1ª", area: "110.50 m²", terraza: "22.30 m²", price: "289.000€", detail: "4 dormitorios + 3 baños" },
      { planta: "Bloque A — Planta 2ª", area: "110.50 m²", terraza: "22.30 m²", price: "297.000€", detail: "4 dormitorios + 3 baños" },
      { planta: "Bloque A — Planta 3ª", area: "112.80 m²", terraza: "45.00 m²", price: "315.000€", detail: "4 dormitorios + 3 baños (ático)" },
      { planta: "Bloque B — Planta 2ª", area: "108.20 m²", terraza: "20.10 m²", price: "292.000€", detail: "4 dormitorios + 3 baños" },
    ],
  },
];

const Viviendas = () => {
  const { t } = useTranslation();
  const types = t("viviendasPage.types", { returnObjects: true }) as { title: string; description: string; priceFrom: string; areaFrom: string; bathrooms: string }[];
  const v = "viviendasPage";

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center">
          <div className="absolute inset-0">
            <img src={buildingImage} alt="Viviendas La Nucía One" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark/80 via-ocean-dark/50 to-transparent" />
          </div>
          <div className="relative z-10 container max-w-7xl mx-auto px-6 pt-20">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
              {t(`${v}.tag`)}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] mb-6">
              {t(`${v}.heroTitle1`)}<br /><span className="italic">{t(`${v}.heroTitle2`)}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="font-body text-primary-foreground/70 text-lg max-w-xl mb-8" dangerouslySetInnerHTML={{ __html: t(`${v}.heroSubtitle`) }} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap gap-4">
              <Link to="/contacto" className="inline-flex items-center gap-2 bg-gold text-foreground px-6 py-3 font-body text-sm tracking-wider uppercase hover:bg-gold/90 transition-colors">
                {t(`${v}.requestInfo`)} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/caracteristicas" className="inline-flex items-center gap-2 border border-primary-foreground/30 px-6 py-3 text-primary-foreground font-body text-sm tracking-wider uppercase hover:border-gold hover:text-gold transition-colors">
                {t(`${v}.qualityReport`)} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Typology cards */}
        <section className="bg-sand py-20">
          <div className="container max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">{t(`${v}.typologiesTag`)}</p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground" dangerouslySetInnerHTML={{ __html: t(`${v}.typologiesTitle`) }} />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {types.map((type, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-background border border-border p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><Home className="w-5 h-5 text-primary" /></div>
                    <h3 className="font-display text-2xl text-foreground">{type.title}</h3>
                  </div>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">{type.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm font-body"><BedDouble className="w-4 h-4 text-gold" /><span className="text-foreground">{[2,3,4][i]} {t(`${v}.bedrooms`)}</span></div>
                    <div className="flex items-center gap-3 text-sm font-body"><Bath className="w-4 h-4 text-gold" /><span className="text-foreground">{type.bathrooms} {t(`${v}.bathrooms`)}</span></div>
                    <div className="flex items-center gap-3 text-sm font-body"><Maximize className="w-4 h-4 text-gold" /><span className="text-foreground">{t(`${v}.fromArea`, { area: type.areaFrom })}</span></div>
                  </div>
                  <div className="border-t border-border pt-6">
                    <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">{t(`${v}.from`)}</p>
                    <p className="font-display text-3xl text-primary">{type.priceFrom}</p>
                    <p className="font-body text-xs text-muted-foreground mt-1">{t(`${v}.garageIncluded`)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed table */}
        <section className="bg-primary py-20">
          <div className="container max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">{t(`${v}.availabilityTag`)}</p>
              <h2 className="font-display text-3xl md:text-5xl text-primary-foreground" dangerouslySetInnerHTML={{ __html: t(`${v}.availabilityTitle`) }} />
            </motion.div>

            {viviendas.map((group, gi) => (
              <motion.div key={group.categoryKey} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.1 }} className="mb-12 last:mb-0">
                <div className="mb-6">
                  <h3 className="font-display text-2xl text-primary-foreground mb-1">{t(group.categoryKey)}</h3>
                  <p className="font-body text-sm text-primary-foreground/50">{t(group.subtitleKey)}</p>
                </div>

                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary-foreground/20">
                        <th className="text-left py-4 pr-6 font-body text-xs tracking-[0.15em] uppercase text-gold">{t(`${v}.floor`)}</th>
                        <th className="text-left py-4 pr-6 font-body text-xs tracking-[0.15em] uppercase text-gold">{t(`${v}.usableArea`)}</th>
                        <th className="text-left py-4 pr-6 font-body text-xs tracking-[0.15em] uppercase text-gold">{t(`${v}.price`)}</th>
                        <th className="text-left py-4 pr-6 font-body text-xs tracking-[0.15em] uppercase text-gold">{t(`${v}.detail`)}</th>
                        <th className="text-left py-4 font-body text-xs tracking-[0.15em] uppercase text-gold">{t(`${v}.plan`)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.units.map((unit, ui) => (
                        <tr key={ui} className="border-b border-primary-foreground/10 hover:bg-primary-foreground/5 transition-colors">
                          <td className="py-5 pr-6"><span className="font-body text-sm text-primary-foreground font-medium">{unit.planta}</span></td>
                          <td className="py-5 pr-6">
                            <span className="font-body text-sm text-primary-foreground">{unit.area}</span>
                            <span className="font-body text-xs text-primary-foreground/50 block">+ {unit.terraza} {t(`${v}.terrace`)}</span>
                          </td>
                          <td className="py-5 pr-6"><span className="font-display text-lg text-gold">{unit.price}</span></td>
                          <td className="py-5 pr-6"><span className="font-body text-sm text-primary-foreground/70">{unit.detail}</span></td>
                          <td className="py-5">
                            <button className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-gold transition-colors font-body text-sm">
                              <Download className="w-4 h-4" /> {t(`${v}.download`)}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-4">
                  {group.units.map((unit, ui) => (
                    <div key={ui} className="border border-primary-foreground/10 p-5">
                      <p className="font-body text-sm text-primary-foreground font-medium mb-3">{unit.planta}</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <p className="font-body text-[10px] tracking-[0.15em] uppercase text-primary-foreground/40">{t(`${v}.usableArea`)}</p>
                          <p className="font-body text-sm text-primary-foreground">{unit.area}</p>
                          <p className="font-body text-xs text-primary-foreground/50">+ {unit.terraza} {t(`${v}.terrace`)}</p>
                        </div>
                        <div>
                          <p className="font-body text-[10px] tracking-[0.15em] uppercase text-primary-foreground/40">{t(`${v}.price`)}</p>
                          <p className="font-display text-lg text-gold">{unit.price}</p>
                        </div>
                      </div>
                      <p className="font-body text-xs text-primary-foreground/60 mb-3">{unit.detail}</p>
                      <button className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-gold transition-colors font-body text-xs">
                        <Download className="w-3 h-3" /> {t(`${v}.downloadPlan`)}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 pt-8 border-t border-primary-foreground/10">
              <p className="font-body text-[11px] text-primary-foreground/30 leading-relaxed italic">{t(`${v}.disclaimer`)}</p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-sand py-20">
          <div className="container max-w-4xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">{t(`${v}.ctaTag`)}</p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4" dangerouslySetInnerHTML={{ __html: t(`${v}.ctaTitle`) }} />
              <p className="font-body text-muted-foreground mb-8 max-w-lg mx-auto">{t(`${v}.ctaSubtitle`)}</p>
              <Link to="/contacto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors">
                {t(`${v}.requestInfo`)} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
};

export default Viviendas;
