"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";
import { DICTIONARY } from "@/config/translations";
import { Language } from "@/types";
import { ChevronUp } from "lucide-react";

interface ClosingSceneProps {
  lang: Language;
}

export const ClosingScene: React.FC<ClosingSceneProps> = ({ lang }) => {
  const t = DICTIONARY[lang].closing;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative min-h-[90vh] w-full overflow-hidden bg-[#0D0C0A] flex flex-col items-center justify-center text-center px-6 py-20">
      {/* Background Image with Dark Tint */}
      <div className="absolute inset-0">
        <Image
          src={WEDDING_CONFIG.closingImage}
          alt="Closing celebration atmosphere"
          fill
          className="object-cover object-center filter brightness-[0.45] contrast-105 saturate-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A] via-[#0D0C0A]/60 to-[#0D0C0A]/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-champagne/40 bg-champagne/5"
        >
          <span className="font-serif text-2xl font-light text-champagne">
            {WEDDING_CONFIG.monogram}
          </span>
        </motion.div>

        {/* Emotion Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light max-w-2xl leading-tight mb-8"
        >
          {t.title}
        </motion.h2>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-2 mb-6"
        >
          <h3 className="font-serif text-4xl sm:text-6xl font-light text-champagne-light tracking-widest uppercase">
            {lang === "en" ? WEDDING_CONFIG.groom.nameEn : WEDDING_CONFIG.groom.nameAr}
          </h3>
          <div className="font-serif text-2xl sm:text-3xl text-champagne italic">
            {DICTIONARY[lang].hero.ampersand}
          </div>
          <h3 className="font-serif text-4xl sm:text-6xl font-light text-champagne-light tracking-widest uppercase">
            {lang === "en" ? WEDDING_CONFIG.bride.nameEn : WEDDING_CONFIG.bride.nameAr}
          </h3>
        </motion.div>

        {/* Date Stamp */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xs sm:text-sm font-sans tracking-widest text-taupe-light mb-12"
        >
          {lang === "en" ? WEDDING_CONFIG.date.displayEn : WEDDING_CONFIG.date.displayAr}
        </motion.span>

        {/* Back to Top */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="group flex flex-col items-center gap-2 text-ivory/50 hover:text-champagne transition-colors"
          aria-label={t.backToTop}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne/30 bg-[#161411] transition-transform group-hover:-translate-y-1">
            <ChevronUp className="h-4 w-4 text-champagne" />
          </div>
          <span className="text-[10px] font-sans tracking-ultra uppercase">
            {t.backToTop}
          </span>
        </motion.button>
      </div>
    </footer>
  );
};
