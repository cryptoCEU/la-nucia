import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";

const AvisoLegal = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title="Aviso Legal"
        description="Aviso legal de La Nucía One. Información legal y condiciones de uso del sitio web."
        path="/aviso-legal"
        noindex
      />
      <Navbar />
      <div className="min-h-screen bg-background pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container max-w-3xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-ocean-light font-body text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t("legalPages.backHome")}
        </Link>

        <h1 className="font-display text-3xl md:text-5xl text-foreground mb-10">{t("avisoLegal.title")}</h1>

        <div className="prose prose-sm md:prose-base max-w-none font-body text-muted-foreground space-y-6 [&_strong]:text-foreground [&_a]:text-primary [&_a:hover]:text-ocean-light">
          <p>
            De conformidad con lo establecido en la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico, se facilita la siguiente información:
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">DATOS IDENTIFICATIVOS</h2>
          <p>
            Usted está visitando la página web <a href="https://la-nucia.lovable.app">la-nucia.lovable.app</a> titularidad de <strong>ACTIVUM GESTION DE PROYECTOS INMOBILIARIOS, S.L.</strong>, con domicilio social en C/ COLOMBIA 11, 9, OFICINA 83 (03010) ALICANTE, con <strong>N.I.F.</strong> B54591102, inscrita en el Registro Mercantil de Alicante en el tomo 3.560, Folio 26, Sección 8, Hoja A – 127398, en adelante, el <strong>TITULAR</strong>.
          </p>
          <p>Puede contactar con el Titular por cualquiera de los siguientes medios:</p>
          <p><strong>Teléfono</strong>: 965200010</p>
          <p><strong>Correo electrónico de contacto:</strong> <a href="mailto:protecciondedatos@activum.es">protecciondedatos@activum.es</a></p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">USUARIOS</h2>
          <p>
            Mediante este documento ponemos en su conocimiento los términos y condiciones que regulan el acceso y uso de los sitios web y aplicaciones app móviles del Titular, así como de los servicios y contenidos asociados a dichos sitios y aplicaciones (en adelante también el/os sitio/s o los sitios web y app móviles).
          </p>
          <p>
            El acceso o uso de cualquier interesado a un sitio web y/o app del Titular, implica que el interesado adquiere la condición de "usuario" y con dicha condición, una serie de derechos y obligaciones.
          </p>
          <p>
            <strong>Es su responsabilidad acceder a las condiciones legales insertas en la presente web y leerlas detenidamente, así como, las políticas de privacidad, cookies o en su caso, condiciones de venta. Recomendamos:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Que visite las mismas cada vez que pretenda acceder o utilizar los servicios y contenidos del sitio y</strong></li>
            <li><strong>Que imprima o almacene en su sistema una copia.</strong></li>
          </ul>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">USO DEL PORTAL</h2>
          <p>
            Esta web proporciona el acceso a multitud de información, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a el Titular o a sus licenciantes a los que el Usuario puede tener acceso.
          </p>
          <p>
            El Usuario asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos. En dicho registro el Usuario será responsable de aportar información veraz y lícita. Como consecuencia de este registro, al Usuario se le puede proporcionar una contraseña de la que será responsable, comprometiéndose a hacer un uso diligente y confidencial de la misma.
          </p>
          <p>
            <strong>El Usuario se compromete a hacer un uso adecuado de los contenidos y servicios</strong> que el Titular ofrece a través de su portal y con carácter enunciativo pero no limitativo, <strong>a no emplearlos para:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
            <li>Difundir contenidos o propaganda racista, xenófoba, pornográfico-ilegal, de apología del terrorismo o atentatoria contra los derechos humanos.</li>
            <li>Provocar daños en los sistemas físicos y lógicos del Titular, de sus proveedores o de terceras personas, introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados.</li>
            <li>Intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificar o manipular sus mensajes.</li>
            <li>Utilizar el sitio web ni las informaciones que en él se contienen con fines comerciales, políticos, publicitarios y para cualquier uso comercial, sobre todo en el envío de correos electrónicos no solicitados.</li>
          </ul>
          <p>
            El Titular se reserva el derecho a retirar todos aquellos comentarios y aportaciones que vulneren el respeto a la dignidad de la persona, que sean discriminatorios, xenófobos, racistas, pornográficos, que atenten contra la juventud o la infancia, el orden o la seguridad pública o que, a su juicio, no resultarán adecuados para su publicación. <strong>En cualquier caso, el Titular no será responsable de las opiniones vertidas por los usuarios a través de los foros, chats, u otras herramientas de participación.</strong>
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">PROTECCIÓN DE DATOS</h2>
          <p>
            Todo lo relativo al tratamiento de sus datos personales, se encuentra recogido en la <Link to="/politica-de-privacidad" className="text-primary hover:text-ocean-light">política de privacidad</Link>.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">CONTENIDOS. PROPIEDAD INTELECTUAL E INDUSTRIAL</h2>
          <p>
            El Titular es propietario de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo: imágenes, fotografías, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad del Titular o bien de sus licenciantes.
          </p>
          <p>
            <strong>Todos los derechos reservados.</strong> En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad Intelectual, <strong>quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización del Titular.</strong>
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD</h2>
          <p>
            El Usuario reconoce que la utilización de la página web y de sus contenidos y servicios se desarrolla bajo su exclusiva responsabilidad. En concreto, a título meramente enunciativo, el Titular no asume ninguna responsabilidad en los siguientes ámbitos:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>La disponibilidad del funcionamiento de la página web, sus servicios y contenidos y su calidad o interoperabilidad.</li>
            <li>La finalidad para la que la página web sirva a los objetivos del Usuario.</li>
            <li>La infracción de la legislación vigente por parte del Usuario o terceros y, en concreto, de los derechos de propiedad intelectual e industrial que sean titularidad de otras personas o entidades.</li>
            <li>La existencia de códigos maliciosos o cualquier otro elemento informático dañino que pudiera causar el sistema informático del Usuario o de terceros.</li>
            <li>El acceso fraudulento a los contenidos o servicios por terceros no autorizados.</li>
            <li>Los daños producidos a equipos informáticos durante el acceso a la página web y los daños producidos a los Usuarios cuando tengan su origen en fallos o desconexiones en las redes de telecomunicaciones que interrumpan el servicio.</li>
            <li>Los daños o perjuicios que se deriven de circunstancias acaecidas por caso fortuito o fuerza mayor.</li>
          </ul>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">MODIFICACIÓN DE ESTE AVISO LEGAL Y DURACIÓN</h2>
          <p>
            El Titular se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tantos contenidos y servicios que se presten a través de la misma, como la forma en la que éstos aparezcan representados o localizados en su portal.
          </p>
          <p>
            La vigencia de las citadas condiciones irá en función de su exposición y estarán vigentes hasta que sean modificadas por otras debidamente publicadas.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">ENLACES</h2>
          <p>
            En el caso de que en la presente web se incluyesen enlaces o hipervínculos hacia otros sitios de Internet, el Titular no ejercerá ningún tipo de control sobre dichos sitios y contenidos. En ningún caso el Titular asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier materia o información contenida en ninguno de dichos hipervínculos y otros sitios en Internet.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">DERECHOS DE EXCLUSIÓN</h2>
          <p>
            El Titular se reserva el derecho a denegar o retirar el acceso al portal y/o los servicios ofrecidos sin necesidad de advertencia previa, a instancia propia o de un tercero, a aquellos usuarios que incumplan el contenido de este aviso legal.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">GENERALIDADES</h2>
          <p>
            El Titular perseguirá el incumplimiento de las presentes condiciones así como cualquier utilización indebida de su portal ejerciendo todas las acciones civiles y penales que le puedan corresponder en derecho.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">LEGISLACIÓN APLICABLE Y JURISDICCIÓN</h2>
          <p>
            La relación entre el Titular y el Usuario se regirá por la normativa española vigente. Todas las disputas y reclamaciones derivadas de este aviso legal se resolverán por los juzgados y tribunales españoles del consumidor y usuario.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">MENORES DE EDAD</h2>
          <p>
            Esta web dirige sus servicios a usuarios mayores de 18 años. Los menores de esta edad no están autorizados a utilizar nuestros servicios y no deberán, por tanto, enviarnos sus datos personales. Informamos de que si se da tal circunstancia, el Titular no se hace responsable de las posibles consecuencias que pudieran derivarse del incumplimiento del aviso que en esta misma cláusula se establece.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">MEDIDAS DE SEGURIDAD – SSL</h2>
          <p>
            El Titular ha contratado para su sitio web un certificado <strong>SSL</strong> («Secure Sockets Layer»).
          </p>
          <p>
            Un certificado SSL permite proteger toda la información personal y confidencial que se pueda manejar en un sitio web, independientemente de la información que se esté transmitiendo, como por ejemplo, desde cualquiera de los formularios de contacto del sitio web hasta el servidor, o los datos introducidos para la suscripción de boletines de noticias o accesos a las áreas protegidas, etc.
          </p>
          <p>
            La dirección del sitio web aparecerá en color verde, activándose el protocolo "https" que permite conexiones seguras desde un servidor web al navegador del usuario.
          </p>

          <p className="text-xs text-muted-foreground/60 mt-8">Última revisión: 11 de Noviembre de 2021</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AvisoLegal;
