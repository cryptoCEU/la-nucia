import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    dormitorios: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      toast({
        title: "¡Solicitud enviada!",
        description: "Nos pondremos en contacto contigo lo antes posible.",
      });
      setFormData({ nombre: "", email: "", telefono: "", dormitorios: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contacto" className="py-24 md:py-32 bg-background">
      <div className="container max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
            Contacto
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            ¿Quieres más <span className="italic">información</span>?
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Déjanos tus datos y nuestro equipo comercial te contactará sin compromiso
            para resolver todas tus dudas.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">
                Nombre completo *
              </label>
              <Input
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Tu nombre"
                className="bg-background border-border font-body"
              />
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">
                Email *
              </label>
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
              <label className="font-body text-sm text-muted-foreground mb-2 block">
                Teléfono *
              </label>
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
              <label className="font-body text-sm text-muted-foreground mb-2 block">
                Dormitorios de interés
              </label>
              <select
                value={formData.dormitorios}
                onChange={(e) => setFormData({ ...formData, dormitorios: e.target.value })}
                className="w-full h-10 rounded-md border border-border bg-background px-3 font-body text-sm text-foreground"
              >
                <option value="">Selecciona...</option>
                <option value="2">2 dormitorios</option>
                <option value="3">3 dormitorios</option>
                <option value="4">4 dormitorios</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-ocean-light font-body text-sm tracking-widest uppercase py-6 transition-colors duration-300"
          >
            {isSubmitting ? "Enviando..." : "Solicitar información"}
          </Button>

          <p className="font-body text-xs text-muted-foreground text-center mt-4">
            Al enviar este formulario aceptas nuestra política de privacidad.
            Tus datos serán tratados de forma confidencial.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
