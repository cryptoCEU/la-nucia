import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { staggerContainer, heroText, fadeUp } from "@/lib/animations";
import logo from "@/assets/isotipo-nucia.svg";

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
      <main className="relative min-h-screen w-full overflow-hidden bg-primary">
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
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark/90 via-ocean-dark/70 to-ocean-dark/50 z-[1]" />

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
            <motion.p variants={heroText()} className="font-body text-xs md:text-sm tracking-[0.2em] uppercase text-gold mb-4">
              Viviendas de obra nueva
            </motion.p>
            <motion.h1 variants={heroText()} className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.9] mb-6">
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
              <p className="text-gold font-body text-xs tracking-[0.2em] uppercase mb-2">{t("contactSection.tag")}</p>
              <h2 className="font-display text-2xl md:text-3xl text-primary-foreground leading-[1.4]">Deja tu contacto<br/>y te llamamos</h2>
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

            <Button type="submit" disabled={isSubmitting} className="w-full bg-gold text-ocean-dark hover:bg-gold/90 font-body text-sm tracking-widest uppercase py-6 transition-all duration-500">
              {isSubmitting ? t(`${f}.submitting`) : t(`${f}.submit`)}
            </Button>
          </motion.form>
        </div>
      </main>
    </>
  );
};

export default Landing;
