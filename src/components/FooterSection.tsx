const FooterSection = () => {
  return (
    <footer className="bg-ocean-dark py-10">
      <div className="container max-w-6xl mx-auto px-6 text-center">
        <p className="font-display text-xl text-primary-foreground/90 mb-2">
          La Nucía · Alicante
        </p>
        <p className="font-body text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Promoción inmobiliaria. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
