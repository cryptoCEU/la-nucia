import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalePath } from "@/hooks/use-locale-path";

const LanguageSelector = ({ className = "" }: { className?: string }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const { stripLocale, isEn } = useLocalePath();
  const currentLang = isEn ? "en" : "es";

  const switchTo = (lang: "es" | "en") => {
    if (lang === currentLang) return;
    const neutral = stripLocale(pathname);
    const next = lang === "en" ? (neutral === "/" ? "/en" : "/en" + neutral) : neutral;
    i18n.changeLanguage(lang);
    navigate(next + search + hash);
  };

  return (
    <div className={`flex items-center gap-1.5 font-body text-sm tracking-wider uppercase ${className}`}>
      <button onClick={() => switchTo("es")} className={currentLang === "es" ? "text-gold" : "text-primary-foreground/60 hover:text-primary-foreground transition-colors"}>ES</button>
      <span className="text-primary-foreground/30">/</span>
      <button onClick={() => switchTo("en")} className={currentLang === "en" ? "text-gold" : "text-primary-foreground/60 hover:text-primary-foreground transition-colors"}>EN</button>
    </div>
  );
};

export default LanguageSelector;
