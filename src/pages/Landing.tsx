import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import AnimatedCounter from "@/components/AnimatedCounter";
import { staggerContainer, heroText, fadeUp, staggerItem, viewportOnce, scaleIn } from "@/lib/animations";
import { useParallax } from "@/hooks/use-parallax";
import { GalleryGrid, zonasImages, GALLERY_STYLES } from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import { useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import logo from "@/assets/isotipo-nucia.svg";
import heroImage from "@/assets/hero-nucia.jpg";
import habitacionPeopleImg from "@/assets/carousel/habitacion-people.webp";
import cocinaPeopleImg from "@/assets/carousel/cocina-people.webp";
import salonPeopleImg from "@/assets/carousel/salon-people.webp";

const Landing = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    destino: "",
    dormitorios: "",
    privacidad: false,
  });
  const locationParallax = useParallax({ speed: 0.25 });
  const [lightbox, setLightbox] = useState<{ list: typeof zonasImages; idx: number } | null>(null);
  const openLb = useCallback((list: typeof zonasImages, idx: number) => setLightbox({ list, idx }), []);
  const closeLb = useCallback(() => setLightbox(null), []);
  const navLb = useCallback((dir: number) => {
    setLightbox((lb) => (lb ? { ...lb, idx: (lb.idx + dir + lb.list.length) % lb.list.length } : lb));
  }, []);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowRight") navLb(1);
      if (e.key === "ArrowLeft") navLb(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLb, navLb]);

  const f = "contactSection.form";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacidad) {
      toast({ title: t(`${f}.errorTitle`), description: t(`${f}.errorPrivacy`), variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/21916100/4oflejc/", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          telefono: formData.telefono,
          email: formData.email,
          destino_vivienda: formData.destino,
          dormitorios: formData.dormitorios,
          origen: "landing-campañas",
        }).toString(),
      });
    } catch (err) {
      console.error(err);
    }
    toast({ title: t(`${f}.successTitle`), description: t(`${f}.successDesc`) });
    setFormData({ nombre: "", apellidos: "", telefono: "", email: "", destino: "", dormitorios: "", privacidad: false });
    setIsSubmitting(false);
  };

  const selectClass = "w-full h-11 rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-3 font-body text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-gold transition-colors";
  const inputClass = "bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-gold h-11";

  return (
    <>
      <SEO
        title="La Nucía One — Solicita información"
        description="Viviendas de obra nueva en La Nucía con 2, 3 y 4 dormitorios. Solicita información sin compromiso."
        path="/landing"
      />
      <main className="relative w-full overflow-hidden bg-primary">
        {/* ═══ HERO + FORM ═══ */}
        <section className="relative min-h-screen w-full overflow-hidden">
          {/* Video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/lanuciaone.mp4" type="video/mp4" />
          </video>

          {/* Top bar with logo */}
          <div className="relative z-10 container max-w-[1600px] mx-auto px-4 md:px-8 pt-6 md:pt-8">
            <img src={logo} alt="La Nucía One" className="h-10 md:h-12 w-auto" />
          </div>

          {/* Content grid */}
          <div className="relative z-10 container max-w-[1600px] mx-auto px-4 md:px-8 py-10 md:py-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-6rem)]">
            {/* Hero text */}
            <motion.div
              variants={staggerContainer(0.13, 0.2)}
              initial="hidden"
              animate="visible"
              className="text-primary-foreground"
            >
              <motion.p variants={heroText()} className="font-body text-xs md:text-sm tracking-[0.2em] uppercase text-primary-foreground mb-4">
                Viviendas de obra nueva
              </motion.p>
              <motion.h1 variants={heroText()} className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.9] mb-6 text-primary">
                A 10 minutos<br />de <span className="italic">Benidorm</span>.
              </motion.h1>
              <motion.p variants={heroText()} className="font-body text-base md:text-lg text-primary-foreground/80 max-w-md leading-relaxed">
                107 viviendas de 2, 3 y 4 dormitorios con amplias terrazas, áticos y dúplex.
              </motion.p>
            </motion.div>

            {/* Contact form */}
            <motion.form
              variants={fadeUp(0.4)}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              className="bg-ocean-dark/40 backdrop-blur-md border border-white/15 rounded-xl p-6 md:p-8 shadow-2xl space-y-4 w-full max-w-xl lg:ml-auto"
            >
              <div className="mb-2">
                <h2 className="font-display text-2xl md:text-3xl text-primary-foreground leading-[1.4]">Conoce todos<br/>los detalles</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <Input required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder={t(`${f}.firstNamePlaceholder`)} className={inputClass} />
                <Input required value={formData.apellidos} onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })} placeholder={t(`${f}.lastNamePlaceholder`)} className={inputClass} />
              </div>

              <Input required type="tel" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} placeholder={t(`${f}.phonePlaceholder`)} className={inputClass} />
              <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={t(`${f}.emailPlaceholder`)} className={inputClass} />

              <div className="grid md:grid-cols-2 gap-3">
                <select value={formData.destino} onChange={(e) => setFormData({ ...formData, destino: e.target.value })} className={selectClass}>
                  <option value="" className="text-foreground">{t(`${f}.purpose`)}</option>
                  {(t(`${f}.purposeOptions`, { returnObjects: true }) as string[]).map((opt) => (
                    <option key={opt} value={opt} className="text-foreground">{opt}</option>
                  ))}
                </select>
                <select value={formData.dormitorios} onChange={(e) => setFormData({ ...formData, dormitorios: e.target.value })} className={selectClass}>
                  <option value="" className="text-foreground">{t(`${f}.bedrooms`)}</option>
                  {(t(`${f}.bedroomsOptions`, { returnObjects: true }) as string[]).map((opt) => (
                    <option key={opt} value={opt} className="text-foreground">{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Checkbox id="privacidad-landing" checked={formData.privacidad} onCheckedChange={(checked) => setFormData({ ...formData, privacidad: checked === true })} className="mt-0.5 border-white/40 data-[state=checked]:bg-gold data-[state=checked]:border-gold" />
                <label htmlFor="privacidad-landing" className="font-body text-xs text-primary-foreground/80 leading-relaxed cursor-pointer">
                  {t(`${f}.privacy`)}{" "}
                  <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="text-gold underline hover:text-gold/80 transition-colors">{t(`${f}.privacyLink`)}</a>
                </label>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body text-sm tracking-widest uppercase py-6 transition-all duration-500">
                {isSubmitting ? t(`${f}.submitting`) : t(`${f}.submit`)}
              </Button>
            </motion.form>
          </div>
        </section>

        {/* ═══ UBICACIÓN ═══ */}
        <section className="relative py-32 md:py-44 bg-primary overflow-hidden">
          <motion.div
            ref={locationParallax.ref}
            className="absolute inset-0 opacity-20"
            style={{ y: locationParallax.y }}
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={heroImage} alt="" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative z-10 container max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={staggerContainer(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                  {t("home.locationTag")}
                </motion.p>
                <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-primary-foreground leading-[1.9] mb-8">
                  {t("home.locationTitle1")}<br />
                  <span className="italic">{t("home.locationTitle2")}</span>
                </motion.h2>
                <motion.p variants={staggerItem} className="font-body text-primary-foreground/60 leading-relaxed mb-10">
                  {t("home.locationText")}
                </motion.p>
              </motion.div>
              <motion.div
                variants={staggerContainer(0.08, 0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid grid-cols-2 gap-4"
              >
                {(t("home.locationHighlights", { returnObjects: true }) as string[]).map((item, i) => (
                  <motion.div key={i} variants={staggerItem} className="border border-primary-foreground/10 p-6 backdrop-blur-sm">
                    <AnimatedCounter
                      value={(t("home.locationNumbers", { returnObjects: true }) as string[])[i]}
                      className="font-display text-2xl text-gold block mb-2"
                    />
                    <p className="font-body text-sm text-primary-foreground/60">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ VIVIENDAS ═══ */}
        <section className="py-28 md:py-40 bg-background">
          <div className="container max-w-[1600px] mx-auto px-4 md:px-8">
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-16"
            >
              <motion.p variants={staggerItem} className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-6">
                {t("home.homesTag")}
              </motion.p>
              <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground leading-[1.9] mb-6">
                {t("home.homesTitle1")}<br />
                <span className="italic">{t("home.homesTitle2")}</span>
              </motion.h2>
              <motion.p variants={staggerItem} className="font-body text-muted-foreground max-w-xl mx-auto">
                {t("home.homesText")}
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.15, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid md:grid-cols-3 gap-6"
            >
              {([
                { img: habitacionPeopleImg, title: t("home.type2bed"), desc: t("home.type2desc") },
                { img: cocinaPeopleImg, title: t("home.type3bed"), desc: t("home.type3desc") },
                { img: salonPeopleImg, title: t("home.type4bed"), desc: t("home.type4desc") },
              ]).map((item, i) => (
                <motion.div key={i} variants={staggerItem} className="group relative overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title as string}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl text-primary-foreground mb-2">{item.title}</h3>
                    <p className="font-body text-sm text-primary-foreground/60">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>



        {/* ═══ ZONAS COMUNES ═══ */}
        <section className="w-full py-16 md:py-24 bg-background">
          <style>{GALLERY_STYLES}</style>
          <GalleryGrid title="Zonas Comunes" images={zonasImages} onOpen={openLb} cols={3} rows={1} />
        </section>

        {/* ═══ CONTACTO ═══ */}
        <ContactSection />

        {lightbox && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLb}
          >
            <button onClick={closeLb} aria-label="Cerrar" className="absolute top-6 right-6 text-white p-2 hover:opacity-70">
              <X className="w-6 h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navLb(-1); }} aria-label="Anterior" className="absolute left-6 text-white p-2 hover:opacity-70">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <img
              src={lightbox.list[lightbox.idx].src}
              alt={lightbox.list[lightbox.idx].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); navLb(1); }} aria-label="Siguiente" className="absolute right-6 text-white p-2 hover:opacity-70">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default Landing;
