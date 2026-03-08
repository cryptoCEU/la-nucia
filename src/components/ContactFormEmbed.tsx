import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const ContactFormEmbed = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    tipologia: "",
    privacidad: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacidad) {
      toast({ title: "Error", description: "Debes aceptar la política de privacidad.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { privacidad, ...payload } = formData;
      const res = await fetch("https://form-la-nucia-lovable.vercel.app/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error");
      toast({ title: "¡Solicitud enviada!", description: "Nos pondremos en contacto contigo." });
      setFormData({ nombre: "", telefono: "", email: "", tipologia: "", privacidad: false });
    } catch {
      toast({ title: "Error", description: "No se pudo enviar. Inténtalo de nuevo.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card/95 backdrop-blur-sm rounded-lg p-8 shadow-2xl">
      <h3 className="font-display text-2xl text-foreground text-center mb-6">
        Formulario de contacto
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-body text-sm text-muted-foreground mb-1.5 block">Nombre y apellidos *</label>
          <Input
            required
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="Tu nombre completo"
            className="bg-background border-border font-body"
          />
        </div>
        <div>
          <label className="font-body text-sm text-muted-foreground mb-1.5 block">Teléfono *</label>
          <Input
            required
            type="tel"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            placeholder="+34 600 000 000"
            className="bg-background border-border font-body"
          />
        </div>
        <div>
          <label className="font-body text-sm text-muted-foreground mb-1.5 block">E-mail *</label>
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="tu@email.com"
            className="bg-background border-border font-body"
          />
        </div>
        <div>
          <label className="font-body text-sm text-muted-foreground mb-1.5 block">Tipología vivienda *</label>
          <select
            required
            value={formData.tipologia}
            onChange={(e) => setFormData({ ...formData, tipologia: e.target.value })}
            className="w-full h-10 rounded-md border border-border bg-background px-3 font-body text-sm text-foreground"
          >
            <option value="">Selecciona...</option>
            <option value="2 dormitorios">2 Dormitorios</option>
            <option value="3 dormitorios">3 Dormitorios</option>
            <option value="4 dormitorios">4 Dormitorios</option>
          </select>
        </div>
        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="privacidad-embed"
            checked={formData.privacidad}
            onCheckedChange={(checked) => setFormData({ ...formData, privacidad: checked === true })}
            className="mt-0.5"
          />
          <label htmlFor="privacidad-embed" className="font-body text-xs text-muted-foreground leading-relaxed cursor-pointer">
            Acepto la{" "}
            <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-ocean-light">
              política de privacidad
            </a>
          </label>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:bg-ocean-light font-body text-sm tracking-widest uppercase py-5 transition-colors"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </div>
  );
};

export default ContactFormEmbed;
