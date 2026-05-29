import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useLocalePath } from "@/hooks/use-locale-path";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

const SITE_URL = "https://lanuciaone.com";
const OG_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/Jp480xi4dGVjAsdbkQd6qztuOUW2/social-images/social-1779802174835-Screenshot_2026-05-26_at_15.29.26.webp";

const SEO = ({ title, description, path, noindex = false, jsonLd }: SEOProps) => {
  const { i18n } = useTranslation();
  const { isEn, stripLocale } = useLocalePath();
  const location = useLocation();

  // Path neutro (sin /en) para construir alternates
  const neutralPath = stripLocale(path || location.pathname);
  const esUrl = `${SITE_URL}${neutralPath === "/" ? "/" : neutralPath}`;
  const enUrl = `${SITE_URL}${neutralPath === "/" ? "/en" : "/en" + neutralPath}`;
  const canonical = isEn ? enUrl : esUrl;

  const fullTitle = neutralPath === "/" ? title : `${title} | La Nucía One`;
  const lang = isEn ? "en" : "es";
  const ogLocale = isEn ? "en_GB" : "es_ES";
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {!noindex && <link rel="alternate" hrefLang="es" href={esUrl} />}
      {!noindex && <link rel="alternate" hrefLang="en" href={enUrl} />}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={esUrl} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content="La Nucía One" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
