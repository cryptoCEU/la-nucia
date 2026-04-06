import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

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

        <motion.h1
          variants={fadeUp(0.35)}
          initial="hidden"
          animate="visible"
          className="font-display text-3xl md:text-5xl text-foreground mb-10"
        >
          {t("politicaPrivacidad.title")}
        </motion.h1>

        <motion.div
          variants={fadeUp(0.5)}
          initial="hidden"
          animate="visible"
          className="prose prose-sm md:prose-base max-w-none font-body text-muted-foreground space-y-6 [&_strong]:text-foreground [&_a]:text-primary [&_a:hover]:text-ocean-light"
        >
