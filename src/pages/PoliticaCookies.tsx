import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

const PoliticaCookies = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container max-w-3xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-ocean-light font-body text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <h1 className="font-display text-3xl md:text-5xl text-foreground mb-10">Política de cookies</h1>

        <div className="prose prose-sm md:prose-base max-w-none font-body text-muted-foreground space-y-6 [&_strong]:text-foreground [&_a]:text-primary [&_a:hover]:text-ocean-light">
          <p>
            El objetivo de esta política es informar a los interesados acerca de las cookies que emplea esta página web de conformidad con lo establecido en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, y el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">1. USO DE COOKIES. ¿QUÉ SON LAS COOKIES?</h2>
          <p>
            Las cookies son ficheros que se descargan en su Ordenador, Smartphone o Tablet al acceder a determinadas páginas web. La utilización de cookies ofrece numerosas ventajas en la prestación de servicios de la Sociedad de la Información, puesto que, entre otras: (a) facilita la navegación del usuario en el Sitio Web; (b) facilita al usuario el acceso a los diferentes servicios que ofrece el Sitio Web; (c) evita al usuario volver a configurar características generales predefinidas cada vez que accede al Sitio Web; (d) favorece la mejora del funcionamiento y de los servicios prestados a través del Sitio Web, tras el correspondiente análisis de la información obtenida a través de las cookies instaladas; (e) permiten a un Sitio Web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.
          </p>
          <p>
            La mayoría de los navegadores aceptan como estándar a las cookies y, con independencia de las mismas, permiten o impiden en los ajustes de seguridad las cookies temporales o memorizadas.
          </p>
          <p>
            Ten en cuenta que para poder utilizar y contar con una mejor experiencia de navegación, es necesario que tengas habilitadas las cookies, especialmente aquellas de carácter técnico que resultan necesarias para que pueda identificarte como usuario registrado cada vez que accedas a la presente web.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">2. ¿QUÉ TIPOS DE COOKIES UTILIZA ESTA PÁGINA WEB?</h2>
          <p>
            Siguiendo las directrices de la Agencia Española de Protección de Datos, procedemos a detallar el uso de las cookies que esta página web emplea, con el fin de proporcionarle la máxima información posible.
          </p>

          <h3 className="font-display text-lg text-foreground mt-6">Cookies Propias:</h3>
          <p>
            Son aquellas que se envían al equipo terminal del usuario desde un equipo o dominio gestionado por el propio editor y desde el que se presta el servicio solicitado por el usuario.
          </p>

          <h3 className="font-display text-lg text-foreground mt-6">Cookies de Terceros:</h3>
          <p>
            Son aquellas que se envían al equipo terminal del usuario desde un equipo o dominio que no es gestionado por el editor, sino por otra entidad que trata los datos obtenidos a través de las cookies.
          </p>
          <p>A continuación la lista de las que utilizamos:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google Analytics:</strong> Almacena cookies para poder elaborar estadísticas sobre el tráfico y volumen de visitas de esta web. Al utilizar este sitio web está consintiendo el tratamiento de información acerca de usted por Google. Por tanto, el ejercicio de cualquier derecho en este sentido deberá hacerlo comunicando directamente con Google.</li>
            <li><strong>Redes sociales:</strong> Cada red social utiliza sus propias cookies para que usted pueda pinchar en botones del tipo Me gusta o Compartir.</li>
          </ul>
          <p>
            ACTIVUM GESTION DE PROYECTOS INMOBILIARIOS, S.L. no se hace responsable, en ningún caso ni del contenido ni de la veracidad de las políticas y/o condiciones de uso y privacidad de los terceros, incluidos, a través de los enlaces, en esta política.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">3. CONSENTIMIENTO</h2>
          <p>
            En relación con la utilización de cookies de este sitio web, el usuario autoriza y consiente su uso de la siguiente forma:
          </p>
          <p>
            Cuando el usuario accede a cualquier página de la web, verá un aviso donde se indica que la página web de La Nucía One utiliza cookies, pudiendo el usuario aceptar o rechazar el uso de las mismas a través de la configuración de su navegador. Al hacer click en aceptar, usted acepta el uso de nuestras cookies y en su caso las de los terceros. El panel de configuración/privacidad le permite la posibilidad de aceptarlas por tipología.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">4. PLAZOS O CRITERIOS DE CONSERVACIÓN DE LOS DATOS</h2>
          <p>
            Los datos personales proporcionados se conservarán durante el tiempo necesario para cumplir con las finalidades para los que fueron recopilados inicialmente.
          </p>
          <p>
            Una vez que los datos dejen de ser necesarios para el tratamiento en cuestión, estos se mantendrán debidamente bloqueados para, en su caso, ponerlos a disposición de las Administraciones y Organismos Públicos competentes, Jueces y Tribunales o el Ministerio Fiscal, durante el plazo de prescripción de las acciones que pudieran derivarse de la relación mantenida con el cliente y/o los plazos de conservación previstos legalmente.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">5. CÓMO BLOQUEAR, REVOCAR O ELIMINAR LAS COOKIES INSTALADAS</h2>
          <p>
            Puede usted permitir, bloquear, revocar o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones de su navegador. Puede encontrar información sobre cómo hacerlo en los links que se incluyen a continuación:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Explorer:</strong> <a href="https://support.microsoft.com/es-es/kb/278835" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/es-es/kb/278835</a></li>
            <li><strong>Microsoft Edge:</strong> <a href="https://privacy.microsoft.com/es-es/windows-10-microsoft-edge-and-privacy" target="_blank" rel="noopener noreferrer">https://privacy.microsoft.com/es-es/windows-10-microsoft-edge-and-privacy</a></li>
            <li><strong>Chrome:</strong> <a href="http://support.google.com/chrome/bin/answer.py?hl=es&answer=95647" target="_blank" rel="noopener noreferrer">http://support.google.com/chrome/bin/answer.py?hl=es&answer=95647</a></li>
            <li><strong>Firefox:</strong> <a href="http://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer">http://support.mozilla.org/es/kb/Borrar%20cookies</a></li>
            <li><strong>Safari:</strong> <a href="http://support.apple.com/kb/ph5042" target="_blank" rel="noopener noreferrer">http://support.apple.com/kb/ph5042</a></li>
            <li><strong>Opera:</strong> <a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer">https://help.opera.com/en/latest/web-preferences/#cookies</a></li>
          </ul>
          <p>
            Le informamos, no obstante, de la posibilidad de que la desactivación de alguna cookie impida o dificulte la navegación o la prestación de los servicios ofrecidos en la página web.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">6. DESTINATARIOS DE LA INFORMACIÓN</h2>
          <p>
            Tendrán acceso a la información obtenida a través de las cookies del sitio web las empresas colaboradoras detalladas en el Panel de Configuración, donde podrás asimismo consultar las finalidades con las que la utilizan y sus respectivas políticas de privacidad.
          </p>
          <p>
            Asimismo, te informamos de que algunos de nuestros proveedores así como empresas colaboradoras pueden realizar transferencias a terceros países. Puedes informarte de las transferencias a terceros países que, en su caso, realizan en sus correspondientes políticas de privacidad.
          </p>

          <h2 className="font-display text-xl md:text-2xl text-foreground mt-10">7. MODIFICACIONES / ACTUALIZACIÓN</h2>
          <p>
            La presente política de cookies puede verse modificada/actualizada en función de las exigencias legales establecidas o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos o cambios en nuestro sitio web.
          </p>
          <p>
            Por esta razón, aconsejamos a los usuarios que visiten periódicamente nuestra política de cookies.
          </p>
          <p>
            Si tiene dudas acerca de esta política de cookies, puede contactar con ACTIVUM GESTION DE PROYECTOS INMOBILIARIOS S.L. a través del siguiente correo electrónico: <a href="mailto:protecciondedatos@activum.es">protecciondedatos@activum.es</a>
          </p>
          <p>
            Puede acudir a la <Link to="/politica-de-privacidad">Política de Privacidad</Link> para obtener más información sobre el tratamiento de sus datos personales mediante el uso de cookies.
          </p>

          <p className="text-xs text-muted-foreground/60 mt-8">Última revisión: 11 de noviembre de 2021</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default PoliticaCookies;
