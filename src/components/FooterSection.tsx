import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logoActivum from "@/assets/logo-activum.png";

const FooterSection = () => {
  return (
    <footer className="bg-ocean-dark py-16">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Contact */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/40 mb-4">
              Contacto
            </p>
            <div className="space-y-3">
              <a
                href="mailto:obranueva@activum.es"
                className="flex items-center gap-3 font-body text-primary-foreground/80 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold" />
                obranueva@activum.es
              </a>
              <a
                href="tel:+34865662845"
                className="flex items-center gap-3 font-body text-primary-foreground/80 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" />
                865 662 845
              </a>
            </div>
          </div>

          {/* Office */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/40 mb-4">
              Oficina Comercial
            </p>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
              La Nucía, Alicante
              <br />
              (con cita previa)
            </p>
          </div>

          {/* Activum logo */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <span className="font-body text-[10px] tracking-[0.25em] uppercase text-primary-foreground/40">
              Gestiona y Comercializa
            </span>
            <img
              src={logoActivum}
              alt="Activum - Residential Management"
              className="h-12 opacity-70"
            />
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Activum Real Estate. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/politica-de-privacidad"
              className="font-body text-xs text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors"
            >
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
