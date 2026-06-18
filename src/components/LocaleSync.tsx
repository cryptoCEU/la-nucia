import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { captureUtms } from "@/lib/utm";

/**
 * Sincroniza el idioma de i18n con el prefijo de la URL.
 * - /en o /en/...  → English
 * - cualquier otra → Español
 */
const LocaleSync = () => {
  const { i18n } = useTranslation();
  const { pathname, search } = useLocation();

  useEffect(() => {
    captureUtms();
  }, [search]);

  useEffect(() => {
    const isEn = pathname === "/en" || pathname.startsWith("/en/");
    const target = isEn ? "en" : "es";
    if (i18n.language !== target) {
      i18n.changeLanguage(target);
    }
    document.documentElement.lang = target;
  }, [pathname, i18n]);

  return null;
};

export default LocaleSync;
