import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const ContactFormEmbed = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "", telefono: "", email: "", tipologia: "", privacidad: false,
  });
  const f = "contactFormEmbed";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacidad) {
      toast({ title: t(`${f}.errorTitle`), description: t(`${f}.errorPrivacy`), variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { privacidad, ...payload } = formData;
      const res = await fetch("https://form-la-nucia-lovable.vercel.app/api/webhook", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error");
      toast({ title: t(`${f}.successTitle`), description: t(`${f}.successDesc`) });
      setFormData({ nombre: "", telefono: "", email: "", tipologia: "", privacidad: false });
    } catch {
      toast({ title: t(`${f}.errorTitle`), description: t(`${f}.errorSubmit`), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card/95 backdrop-blur-sm rounded-lg p-8 shadow-2xl">
      <h3 className="font-display text-2xl text-foreground text-center mb-6">{t(`${f}.title`)}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-body text-sm text-muted-foreground mb-1.5 block">{t(`${f}.name`)}</label>
          <Input required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder={t(`${f}.namePlaceholder`)} className="bg-background border-border font-body" />
        </div>
        <div>
          <label className="font-body text-sm text-muted-foreground mb-1.5 block">{t(`${f}.phone`)}</label>
          <Input required type="tel" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} placeholder={t(`${f}.phonePlaceholder`)} className="bg-background border-border font-body" />
        </div>
        <div>
          <label className="font-body text-sm text-muted-foreground mb-1.5 block">{t(`${f}.email`)}</label>
          <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={t(`${f}.emailPlaceholder`)} className="bg-background border-border font-body" />
        </div>
        <div>
          <label className="font-body text-sm text-muted-foreground mb-1.5 block">{t(`${f}.typology`)}</label>
          <select required value={formData.tipologia} onChange={(e) => setFormData({ ...formData, tipologia: e.target.value })} className="w-full h-10 rounded-md border border-border bg-background px-3 font-body text-sm text-foreground">
            <option value="">{t(`${f}.selectPlaceholder`)}</option>
            <option value="2 dormitorios">{t(`${f}.bed2`)}</option>
            <option value="3 dormitorios">{t(`${f}.bed3`)}</option>
            <option value="4 dormitorios">{t(`${f}.bed4`)}</option>
          </select>
        </div>
        <div className="flex items-start gap-3 pt-2">
          <Checkbox id="privacidad-embed" checked={formData.privacidad} onCheckedChange={(checked) => setFormData({ ...formData, privacidad: checked === true })} className="mt-0.5" />
          <label htmlFor="privacidad-embed" className="font-body text-xs text-muted-foreground leading-relaxed cursor-pointer">
            {t(`${f}.privacy`)}{" "}
            <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-ocean-light">{t(`${f}.privacyLink`)}</a>
          </label>
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-ocean-light font-body text-sm tracking-widest uppercase py-5 transition-colors">
          {isSubmitting ? t(`${f}.submitting`) : t(`${f}.submit`)}
        </Button>
      </form>
    </div>
  );
};

export default ContactFormEmbed;
