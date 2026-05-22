import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { staggerContainer, staggerItem, fadeUp, viewportOnce } from "@/lib/animations";

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    codigoPostal: "",
    idioma: "",
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
      const { privacidad, ...payload } = formData;
      const res = await fetch("https://hooks.zapier.com/hooks/catch/21916100/4oflejc/", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error");



      toast({ title: t(`${f}.successTitle`), description: t(`${f}.successDesc`) });
      setFormData({ nombre: "", apellidos: "", telefono: "", email: "", codigoPostal: "", idioma: "", privacidad: false });
    } catch {
      toast({ title: t(`${f}.errorTitle`), description: t(`${f}.errorSubmit`), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectClass = "w-full h-10 rounded-md border border-border bg-background px-3 font-body text-sm text-foreground";

  return (
    <section id="contacto" className="py-24 md:py-32 bg-background">
      <div className="container max-w-3xl mx-auto px-6">
        <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-12">
          <motion.p variants={staggerItem} className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">{t("contactSection.tag")}</motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-3xl md:text-5xl text-foreground leading-[1.9] mb-4" dangerouslySetInnerHTML={{ __html: t("contactSection.title") }} />
          <motion.p variants={staggerItem} className="font-body text-muted-foreground max-w-xl mx-auto">{t("contactSection.subtitle")}</motion.p>
        </motion.div>

        <motion.form
          variants={fadeUp(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-sm space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">{t(`${f}.firstName`)}</label>
              <Input required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder={t(`${f}.firstNamePlaceholder`)} className="bg-background border-border font-body" />
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">{t(`${f}.lastName`)}</label>
              <Input required value={formData.apellidos} onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })} placeholder={t(`${f}.lastNamePlaceholder`)} className="bg-background border-border font-body" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">{t(`${f}.phone`)}</label>
              <Input required type="tel" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} placeholder={t(`${f}.phonePlaceholder`)} className="bg-background border-border font-body" />
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">{t(`${f}.email`)}</label>
              <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={t(`${f}.emailPlaceholder`)} className="bg-background border-border font-body" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">{t(`${f}.postalCode`)}</label>
              <Input value={formData.codigoPostal} onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })} placeholder="03530" className="bg-background border-border font-body" />
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">{t(`${f}.contactLanguage`)}</label>
              <select value={formData.idioma} onChange={(e) => setFormData({ ...formData, idioma: e.target.value })} className={selectClass}>
                <option value="">{t(`${f}.selectPlaceholder`)}</option>
                {["Castellano", "Alemán", "Catalán", "Croata", "Francés", "Inglés", "Polaco", "Ruso", "Sueco", "Ucraniano", "Otros"].map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox id="privacidad" checked={formData.privacidad} onCheckedChange={(checked) => setFormData({ ...formData, privacidad: checked === true })} className="mt-0.5" />
            <label htmlFor="privacidad" className="font-body text-sm text-muted-foreground leading-relaxed cursor-pointer">
              {t(`${f}.privacy`)}{" "}
              <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-ocean-light transition-colors duration-500">{t(`${f}.privacyLink`)}</a>
            </label>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-ocean-light font-body text-sm tracking-widest uppercase py-6 transition-all duration-700">
            {isSubmitting ? t(`${f}.submitting`) : t(`${f}.submit`)}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
