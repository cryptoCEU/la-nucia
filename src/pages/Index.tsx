import { Helmet } from "react-helmet-async";
import logo from "@/assets/logo-nucia-one.png";

const Index = () => (
  <main className="min-h-screen flex items-center justify-center bg-primary text-primary-foreground px-6 py-20">
    <Helmet>
      <title>La Nucía ONE · Una actualización sobre el proyecto</title>
      <meta name="description" content="La promoción La Nucía ONE finalmente no se desarrollará. Si sigues buscando vivienda en la Costa Blanca, escríbenos a obranueva@activum.es." />
    </Helmet>
    <section className="max-w-2xl text-center">
      <img src={logo} alt="La Nucía ONE" className="h-16 mx-auto mb-12 object-contain" />
      <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/70 mb-6">LA NUCÍA ONE</p>
      <h1 className="font-display text-4xl md:text-5xl text-primary-foreground leading-[1.4] mb-8">
        Una actualización sobre el proyecto
      </h1>
      <p className="font-body text-base md:text-lg text-primary-foreground/85 leading-relaxed mb-6">
        Te informamos de que la promoción La Nucía ONE finalmente no se desarrollará. Gracias por el interés que has mostrado en el proyecto durante estos meses.
      </p>
      <p className="font-body text-base md:text-lg text-primary-foreground/85 leading-relaxed">
        Si sigues buscando vivienda en la Costa Blanca, podemos ayudarte a encontrar otras opciones:{" "}
        <a href="mailto:obranueva@activum.es" className="text-primary-foreground font-semibold underline underline-offset-4">
          obranueva@activum.es
        </a>
      </p>
    </section>
  </main>
);

export default Index;
