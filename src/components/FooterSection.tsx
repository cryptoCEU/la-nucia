import { Phone } from "lucide-react";
import logoActivum from "@/assets/logo-activum.png";

const FooterSection = () => {
  return (
    <footer className="bg-ocean-dark py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Contact */}
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gold" />
            <a
              href="tel:+34865662845"
              className="font-body text-lg text-primary-foreground/90 hover:text-gold transition-colors"
            >
              865 662 845
            </a>
          </div>

          {/* Center info */}
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>

          {/* Activum logo */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-body text-[10px] tracking-[0.25em] uppercase text-primary-foreground/50">
              Residential Management
            </span>
            <img
              src={logoActivum}
              alt="Activum - Residential Management"
              className="h-12 opacity-70"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
