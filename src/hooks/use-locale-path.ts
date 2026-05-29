import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

/**
 * Devuelve helpers para construir/parsear rutas con prefijo de idioma.
 * Español es la versión por defecto (sin prefijo). Inglés usa "/en".
 */
export function useLocalePath() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  const isEn = pathname === "/en" || pathname.startsWith("/en/") || i18n.language === "en";

  const lp = useCallback(
    (path: string) => {
      if (!path.startsWith("/")) path = "/" + path;
      if (isEn) {
        if (path === "/") return "/en";
        return "/en" + path;
      }
      return path;
    },
    [isEn],
  );

  /** Quita el prefijo /en si existe, devolviendo la ruta "neutra". */
  const stripLocale = useCallback((p: string) => {
    if (p === "/en") return "/";
    if (p.startsWith("/en/")) return p.slice(3);
    return p;
  }, []);

  return { lp, isEn, stripLocale, currentLang: isEn ? "en" : "es" };
}
