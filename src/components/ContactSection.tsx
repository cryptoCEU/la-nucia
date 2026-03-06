import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const dormitoriosOptions = ["2 Dormitorios", "3 Dormitorios", "4 Dormitorios"];

const zonasOptions = [
  "Piscina Infinity",
  "Coworking",
  "Gimnasio",
  "Salas polivalentes",
  "Zonas ajardinadas",
  "Zona Infantil",
  "Barbacoa",
  "Pet Care",
  "Solárium",
];

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    destinoVivienda: "",
    codigoPostal: "",
    edad: "",
    dormitorios: [] as string[],
    idioma: "",
    presupuesto: "",
    telefono: "",
    zonasComunes: [] as string[],
    email: "",
    privacidad: false,
  });

  const toggleMultiSelect = (field: "dormitorios" | "zonasComunes", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacidad) {
      toast({ title: "Error", description: "Debes aceptar la política de privacidad.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "¡Solicitud enviada!", description: "Nos pondremos en contacto contigo lo antes posible." });
      setFormData({
        nombre: "", destinoVivienda: "", codigoPostal: "", edad: "",
        dormitorios: [], idioma: "", presupuesto: "", telefono: "",
        zonasComunes: [], email: "", privacidad: false,
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const selectClass = "w-full h-10 rounded-md border border-border bg-background px-3 font-body text-sm text-foreground";

  return (
    <section id="contacto" className="py-24 md:py-32 bg-background">
      <div className="container max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold font-body text-sm tracking-[0.2em] uppercase mb-4">La Nucía te espera</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            Conoce todos los <span className="italic">detalles</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Cuéntanos cómo sería tu casa ideal y te contactaremos sin compromiso.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-sm space-y-6"
        >
          {/* Nombre */}
          <div>
            <label className="font-body text-sm text-muted-foreground mb-2 block">Nombre y Apellidos *</label>
            <Input required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Tu nombre completo" className="bg-background border-border font-body" />
          </div>

          {/* Teléfono + Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">Teléfono *</label>
              <Input required type="tel" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} placeholder="+34 600 000 000" className="bg-background border-border font-body" />
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">Correo electrónico *</label>
              <Input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="tu@email.com" className="bg-background border-border font-body" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">Destino de Vivienda</label>
              <select value={formData.destinoVivienda} onChange={(e) => setFormData({ ...formData, destinoVivienda: e.target.value })} className={selectClass}>
                <option value="">Selecciona...</option>
                <option value="primera">Primera vivienda</option>
                <option value="segunda">Segunda vivienda</option>
                <option value="inversion">Inversión</option>
                <option value="reposicion">Reposición</option>
              </select>
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">Código Postal</label>
              <Input value={formData.codigoPostal} onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })} placeholder="03530" className="bg-background border-border font-body" />
            </div>
          </div>

          {/* Edad + Idioma */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">Edad</label>
              <select value={formData.edad} onChange={(e) => setFormData({ ...formData, edad: e.target.value })} className={selectClass}>
                <option value="">Selecciona...</option>
                <option value="<30">&gt; 30</option>
                <option value="31-45">31 - 45</option>
                <option value="46-55">46 - 55</option>
                <option value="56-65">56 - 65</option>
                <option value=">65">&lt; 65</option>
              </select>
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">Idioma de Contacto</label>
              <select value={formData.idioma} onChange={(e) => setFormData({ ...formData, idioma: e.target.value })} className={selectClass}>
                <option value="">Selecciona...</option>
                {["Castellano", "Alemán", "Catalán", "Croata", "Francés", "Inglés", "Polaco", "Ruso", "Sueco", "Ucraniano", "Otros"].map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Nº Dormitorios - Multi select */}
          <div>
            <label className="font-body text-sm text-muted-foreground mb-3 block">Nº de Dormitorios</label>
            <div className="flex flex-wrap gap-3">
              {dormitoriosOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleMultiSelect("dormitorios", opt)}
                  className={`px-4 py-2 rounded-md border text-sm font-body transition-colors duration-200 ${
                    formData.dormitorios.includes(opt)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Presupuesto */}
          <div>
            <label className="font-body text-sm text-muted-foreground mb-2 block">Presupuesto estimado</label>
            <select value={formData.presupuesto} onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })} className={selectClass}>
              <option value="">Selecciona...</option>
              {["200K - 250K", "250K - 300K", "300K - 350K", "350K - 400K", "400K - 450K", "450K - 500K", "500K - 550K", "550K - 600K"].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>


          {/* Zonas comunes soñadas - Multi select */}
          <div>
            <label className="font-body text-sm text-muted-foreground mb-3 block">Tus zonas comunes soñadas</label>
            <div className="flex flex-wrap gap-3">
              {zonasOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleMultiSelect("zonasComunes", opt)}
                  className={`px-4 py-2 rounded-md border text-sm font-body transition-colors duration-200 ${
                    formData.zonasComunes.includes(opt)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Privacidad */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="privacidad"
              checked={formData.privacidad}
              onCheckedChange={(checked) => setFormData({ ...formData, privacidad: checked === true })}
              className="mt-0.5"
            />
            <label htmlFor="privacidad" className="font-body text-sm text-muted-foreground leading-relaxed cursor-pointer">
              Acepto la{" "}
              <a href="#" className="text-primary underline hover:text-ocean-light">
                política de privacidad
              </a>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-ocean-light font-body text-sm tracking-widest uppercase py-6 transition-colors duration-300"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
