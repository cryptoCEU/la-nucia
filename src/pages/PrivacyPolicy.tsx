import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { fadeUp } from "@/lib/animations";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title="Política de Privacidad"
        description="Política de privacidad de La Nucía One. Información sobre el tratamiento de datos personales."
        path="/politica-de-privacidad"
        noindex
      />
      <Navbar />
      <div className="min-h-screen bg-background pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container max-w-3xl mx-auto px-6">
        <motion.div variants={fadeUp(0.2)} initial="hidden" animate="visible">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-ocean-light font-body text-sm mb-10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("legalPages.backHome")}
          </Link>
        </motion.div>

        <motion.h1 variants={fadeUp(0.35)} initial="hidden" animate="visible" className="font-display text-3xl md:text-5xl text-foreground mb-10">{t("politicaPrivacidad.title")}</motion.h1>

        <motion.div variants={fadeUp(0.5)} initial="hidden" animate="visible" className="prose prose-sm md:prose-base max-w-none font-body text-muted-foreground space-y-6 [&_strong]:text-foreground [&_a]:text-primary [&_a:hover]:text-ocean-light">
          <p>
            El objetivo de esta política es informar a los interesados acerca de los distintos tratamientos realizados por esta organización mediante la página web y que afecten a sus datos personales de conformidad con lo establecido en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales y el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">1. IDENTIFICACIÓN Y DATOS DE CONTACTO DEL RESPONSABLE</h2>
          <p>
            La organización ACTIVUM GESTION DE PROYECTOS INMOBILIARIOS SL, domiciliada en la CALLE COLOMBIA 11, 9 OFICINA 83 (03010 ALICANTE) ALICANTE, con <strong>N.I.F.</strong> B54591102, teléfono de contacto: 965200010 y correo electrónico{" "}
            <a href="mailto:protecciondedatos@activum.es">protecciondedatos@activum.es</a>.
          </p>
          <p>
            <strong>DELEGADO DE PROTECCIÓN DE DATOS</strong>
          </p>
          <p>
            SEGURIDAD Y PRIVACIDAD DE DATOS S.L., con domicilio en C/ Menorca, 19, planta 17 (ed. Aqua Multiespacio) (46023) de Valencia, teléfono de contacto:{" "}
            <a href="tel:+34963122868">963 122 868</a> y correo electrónico:{" "}
            <a href="mailto:infodpo@forlopd.es">infodpo@forlopd.es</a>.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">2. FINALIDADES DEL TRATAMIENTO DE SUS DATOS PERSONALES</h2>
          <p><strong>USUARIOS/NAVEGANTES DE LA PÁGINA WEB DEL RESPONSABLE</strong></p>
          <p>Trataremos sus datos de carácter personal facilitados a través de nuestros formularios web para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Atender a las solicitudes, quejas e incidencias trasladadas a través de nuestros canales de contacto incorporados en la página web.</li>
            <li>Entender el comportamiento del navegante dentro de la web con el fin de detectar posibles ataques informáticos a nuestra web.</li>
            <li>Cumplir con las obligaciones legales que nos resulten directamente aplicables y regulen nuestra actividad.</li>
            <li>Para proteger y ejercer nuestros derechos o responder ante reclamaciones de cualquier índole.</li>
          </ul>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">3. BASE JURÍDICA DEL TRATAMIENTO</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>USUARIOS/NAVEGANTES EN LA PÁGINA WEB DEL RESPONSABLE</strong> — En el consentimiento que nos has prestado para tratar tus datos con las finalidades indicadas. <em>La negativa a facilitar sus datos personales conllevará la imposibilidad de tratar sus datos con las finalidades mencionadas.</em></li>
            <li>Para cumplir con las obligaciones legales que se nos aplican. <em>En este caso, el interesado no podrá negarse al tratamiento de los datos personales.</em></li>
            <li>En nuestro interés legítimo de proteger nuestra imagen, negocio y trayectoria evitando ataques a nuestra página web. <em>En este caso, el interesado no podrá negarse al tratamiento de los datos personales, aunque podrá ejercer, en su caso, los derechos reconocidos en el apartado octavo de la presente política.</em></li>
          </ul>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">4. PLAZOS O CRITERIOS DE CONSERVACIÓN DE LOS DATOS</h2>
          <p>
            Los datos personales proporcionados se conservarán durante el tiempo necesario para cumplir con las finalidades para los que fueron recopilados inicialmente.
          </p>
          <p>
            Una vez que los datos dejen de ser necesarios para el tratamiento en cuestión, estos se mantendrán debidamente bloqueados para, en su caso, ponerlos a disposición de las Administraciones y Organismos Públicos competentes, Jueces y Tribunales o el Ministerio Fiscal, durante el plazo de prescripción de las acciones que pudieran derivarse de la relación mantenida con el cliente y/o los plazos de conservación previstos legalmente.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">5. DECISIONES AUTOMATIZADAS Y ELABORACIÓN DE PERFILES</h2>
          <p>La página web no toma decisiones automatizadas ni elabora perfiles.</p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">6. DESTINATARIOS DE LOS DATOS</h2>
          <p>Durante el periodo de duración del tratamiento de sus datos personales, la organización podrá ceder sus datos a los siguientes destinatarios:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Jueces y Tribunales.</li>
            <li>Fuerzas y Cuerpos de Seguridad del Estado.</li>
            <li>Otras autoridades u organismos públicos competentes, cuando el responsable tenga la obligación legal de facilitar los datos personales.</li>
          </ul>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">7. TRANSFERENCIAS INTERNACIONALES DE DATOS</h2>
          <p>La organización no realiza Transferencia Internacional de Datos alguna.</p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">8. DERECHOS DE LOS INTERESADOS</h2>
          <p>
            Los interesados podrán ejercer en cualquier momento y de forma totalmente gratuita los derechos de <strong>acceso, rectificación y supresión</strong>, así como solicitar que se limite el tratamiento de sus datos personales, oponerse al mismo, solicitar la portabilidad de estos (siempre que sea técnicamente posible) o retirar el consentimiento prestado, y en su caso, cuando proceda, <strong>a no ser objeto de una decisión basada únicamente en un tratamiento automatizado, incluido la elaboración de perfiles</strong>.
          </p>
          <p>
            Para ello podrá emplear los formularios habilitados por la organización, o bien dirigir un escrito a la dirección postal o correo electrónico arriba indicadas. En cualquier caso, su solicitud deberá acompañarse de una fotocopia de su D.N.I. o documento equivalente, con la finalidad de acreditar su identidad.
          </p>
          <p>
            En caso de que sienta vulnerados sus derechos en lo concerniente a la protección de sus datos personales, especialmente cuando no haya obtenido satisfacción en el ejercicio de sus derechos, puede presentar una reclamación ante la Autoridad de Control en materia de Protección de Datos competente <strong>(Agencia Española de Protección de Datos)</strong>, a través de su sitio web:{" "}
            <a href="http://www.agpd.es" target="_blank" rel="noopener noreferrer">www.agpd.es</a>.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">9. VERACIDAD DE LOS DATOS</h2>
          <p>
            El interesado garantiza que los datos aportados son verdaderos, exactos, completos y se encuentran actualizados; comprometiéndose a informar de cualquier cambio respecto de los datos que aportara, por los canales habilitados al efecto e indicados en el punto uno de la presente política. Será responsable de cualquier daño o perjuicio, tanto directo como indirecto, que pudiera ocasionar como consecuencia del incumplimiento de la presente obligación.
          </p>
          <p>
            En el supuesto de que el usuario facilite datos de terceros, declara que cuenta con el consentimiento de los interesados y se compromete a trasladarle la información contenida en esta cláusula, eximiendo a la organización de cualquier responsabilidad derivada por la falta de cumplimiento de la presente obligación.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">10. REDES SOCIALES</h2>
          <p>
            Las Redes Sociales forman parte del día a día de muchos usuarios de Internet, y para ellos la Entidad ha creado distintos perfiles en algunas de ellas. Todos los usuarios que visitan nuestra página web tienen la oportunidad de unirse a nuestras redes sociales o grupos.
          </p>
          <p>
            Sin embargo, debes tener en cuenta que, salvo que le solicitemos sus datos directamente (por ejemplo, mediante acciones de marketing, concursos, promociones, o cualquier otra forma válida), sus datos pertenecerán a la Red Social correspondiente, por lo que le recomendamos que lea detenidamente sus condiciones de uso y políticas de privacidad, así como, se asegure de configurar sus preferencias en cuanto al tratamiento de los datos.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">11. MODIFICACIONES / ACTUALIZACIÓN</h2>
          <p>
            La presente política de privacidad puede verse modificada/actualizada en función de las exigencias legales establecidas o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos o cambios en nuestro sitio web.
          </p>
          <p>
            Por esta razón, aconsejamos a los usuarios que visiten periódicamente nuestra política de privacidad.
          </p>
          <p>
            Si tiene dudas acerca de esta política, puede contactar con ACTIVUM GESTION DE PROYECTOS INMOBILIARIOS, S.L. a través del siguiente correo electrónico:{" "}
            <a href="mailto:protecciondedatos@activum.es">protecciondedatos@activum.es</a>
          </p>
          <p className="text-xs text-muted-foreground/60 mt-8">Última revisión: 11 de Noviembre de 2021</p>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default PrivacyPolicy;
