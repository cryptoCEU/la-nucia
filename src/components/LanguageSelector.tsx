import { useTranslation } from "react-i18next";

const LanguageSelector = ({ className = "" }: { className?: string }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggle = () => {
    i18n.changeLanguage(currentLang === "es" ? "en" : "es");
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 font-body text-sm tracking-wider uppercase transition-colors ${className}`}
    >
      <span className={currentLang === "es" ? "text-gold" : "text-primary-foreground/60"}>ES</span>
      <span className="text-primary-foreground/30">/</span>
      <span className={currentLang === "en" ? "text-gold" : "text-primary-foreground/60"}>EN</span>
    </button>
  );
};

export default LanguageSelector;
