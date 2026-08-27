"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";
import { DICTIONARY } from "@/config/translations";
import { Language } from "@/types";

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = DICTIONARY[lang].hero;

  const scrollToStory = () => {
    const el = document.getElementById("story");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#11100E] flex items-center justify-center">
      {/* Background Image with Dark Vignette & Slow Cinematic Ken-Burns */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.55 }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          className="relative h-full w-full"
        >
          <Image
            src={WEDDING_CONFIG.heroImage}
            alt="Mohamed & Menna Wedding Atmosphere"
            fill
            priority
            className="object-cover object-center filter brightness-[0.7] contrast-[1.05]"
          />
        </motion.div>

        {/* Cinematic Multi-layer Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11100E] via-[#11100E]/40 to-[#11100E]/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#11100E]/30 to-[#11100E]/90" />
      </div>

      {/* Main Editorial Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-4 text-xs sm:text-sm font-sans tracking-monumental text-champagne uppercase font-light"
        >
          {t.eyebrow}
        </motion.span>

        {/* Groom Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-widest text-ivory drop-shadow-2xl"
        >
          {lang === "en" ? WEDDING_CONFIG.groom.nameEn : WEDDING_CONFIG.groom.nameAr}
        </motion.h1>

        {/* Ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="my-1 sm:my-3 font-serif text-3xl sm:text-4xl md:text-5xl italic text-champagne"
        >
          {t.ampersand}
        </motion.div>

        {/* Bride Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-widest text-ivory drop-shadow-2xl"
        >
          {lang === "en" ? WEDDING_CONFIG.bride.nameEn : WEDDING_CONFIG.bride.nameAr}
        </motion.h1>

        {/* Date & City Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs sm:text-sm tracking-widest text-ivory/80 font-sans"
        >
          <span>
            {lang === "en"
              ? WEDDING_CONFIG.date.displayEn
              : WEDDING_CONFIG.date.displayAr}
          </span>
          <span className="hidden sm:inline text-champagne/40">·</span>
          <span className="text-champagne font-medium tracking-ultra">
            {lang === "en" ? WEDDING_CONFIG.city.en : WEDDING_CONFIG.city.ar}
          </span>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.button
        onClick={scrollToStory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-ivory/60 hover:text-champagne transition-colors"
        aria-label={t.scrollPrompt}
      >
        <span className="text-[9px] uppercase tracking-ultra font-sans">
          {t.scrollPrompt}
        </span>
        <div className="h-9 w-[1px] bg-gradient-to-b from-champagne/80 via-champagne/30 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 36, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-3 w-full bg-champagne"
          />
        </div>
      </motion.button>
    </section>
  );
};
