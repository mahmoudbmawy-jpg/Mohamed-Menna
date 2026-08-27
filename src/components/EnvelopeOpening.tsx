"use client";

import React, { useState } from "react";
import { DICTIONARY } from "@/config/translations";
import { WEDDING_CONFIG } from "@/config/wedding";
import { GuestInfo, Language } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface EnvelopeOpeningProps {
  lang: Language;
  guestInfo?: GuestInfo | null;
  onOpen: () => void;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  lang,
  guestInfo,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const t = DICTIONARY[lang].envelope;

  const handleOpenClick = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);
    // Play opening audio transition & start music
    setTimeout(() => {
      setIsOpened(true);
      onOpen();
    }, 1600);
  };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0C0A] px-4 py-8 overflow-hidden select-none"
        >
          {/* Subtle Ambient Background Light */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne/10 rounded-full blur-[130px]" />
          </div>

          {/* Invitation Envelope Card Container */}
          <div className="relative w-full max-w-[480px] perspective-[1200px]">
            {/* The Envelope Shell */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative rounded-2xl border border-champagne/30 bg-[#161411] p-8 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(200,169,120,0.1)] backdrop-blur-xl"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 0%, rgba(200, 169, 120, 0.12) 0%, transparent 75%)",
              }}
            >
              {/* Corner Gold Flourishes */}
              <div className="absolute top-3 left-3 h-5 w-5 border-t border-l border-champagne/40" />
              <div className="absolute top-3 right-3 h-5 w-5 border-t border-r border-champagne/40" />
              <div className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-champagne/40" />
              <div className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-champagne/40" />

              {/* Inner Double Borderline */}
              <div className="absolute inset-3.5 rounded-xl border border-champagne/15 pointer-events-none" />

              <div className="flex flex-col items-center text-center">
                {/* Monogram Crest */}
                <div className="mb-4 flex items-center justify-center">
                  <span className="font-serif text-2xl tracking-widest text-champagne">
                    {WEDDING_CONFIG.monogram}
                  </span>
                </div>

                {/* Subtitle / Eyebrow */}
                <span className="mb-4 text-[10px] sm:text-[11px] font-sans uppercase tracking-ultra text-taupe-light">
                  {DICTIONARY[lang].loading.invitation}
                </span>

                {/* Personalized Guest Greeting */}
                {guestInfo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-5 rounded-md border border-champagne/20 bg-champagne/5 px-4 py-1.5"
                  >
                    <span className="text-[11px] font-medium tracking-widest text-champagne-light uppercase">
                      {t.dear}{" "}
                      {lang === "ar" && guestInfo.nameAr
                        ? guestInfo.nameAr
                        : guestInfo.name}
                    </span>
                  </motion.div>
                )}

                {/* Couple Names */}
                <h1 className="mb-2 font-serif text-3xl sm:text-4xl tracking-widest text-ivory font-light">
                  {lang === "en" ? WEDDING_CONFIG.groom.nameEn : WEDDING_CONFIG.groom.nameAr}
                </h1>
                <span className="mb-2 font-serif text-xl sm:text-2xl text-champagne italic">
                  {DICTIONARY[lang].hero.ampersand}
                </span>
                <h1 className="mb-6 font-serif text-3xl sm:text-4xl tracking-widest text-ivory font-light">
                  {lang === "en" ? WEDDING_CONFIG.bride.nameEn : WEDDING_CONFIG.bride.nameAr}
                </h1>

                {/* Date Highlight */}
                <div className="mb-8 flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-champagne/60" />
                  <span className="text-xs sm:text-sm font-sans tracking-widest text-ivory/80">
                    {lang === "en"
                      ? WEDDING_CONFIG.date.displayEn
                      : WEDDING_CONFIG.date.displayAr}
                  </span>
                  <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-champagne/60" />
                </div>

                {/* Interactive Wax Seal */}
                <div className="relative mb-6">
                  <motion.button
                    onClick={handleOpenClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 35%, #D8BC8A 0%, #B5935E 40%, #83673B 85%, #594424 100%)",
                      border: "2px solid rgba(244, 239, 231, 0.25)",
                    }}
                    aria-label={t.openBtn}
                  >
                    {/* Seal Stamp Inner Ring */}
                    <div className="absolute inset-2 rounded-full border border-champagne-light/40 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-[#2D2111] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                          M
                        </span>
                        <span className="text-[10px] text-[#4A381F] font-bold -my-1">
                          &
                        </span>
                        <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-[#2D2111] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                          M
                        </span>
                      </div>
                    </div>

                    {/* Seal Glow */}
                    <div className="absolute inset-0 rounded-full animate-wax-glow pointer-events-none" />
                  </motion.button>

                  {/* Pulsing Particle Shimmer */}
                  {isOpening && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full bg-champagne/40 blur-md pointer-events-none"
                    />
                  )}
                </div>

                {/* Open Invitation Action Button */}
                <motion.button
                  onClick={handleOpenClick}
                  disabled={isOpening}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex items-center gap-2.5 overflow-hidden rounded-full border border-champagne/50 bg-[#1F1B15] px-8 py-3.5 text-xs font-medium tracking-ultra text-ivory shadow-[0_0_20px_rgba(200,169,120,0.15)] transition-all duration-500 hover:border-champagne hover:bg-champagne/15 hover:shadow-[0_0_30px_rgba(200,169,120,0.3)]"
                >
                  <Sparkles className="h-3.5 w-3.5 text-champagne transition-transform group-hover:rotate-12" />
                  <span className="text-champagne-light uppercase">
                    {isOpening ? "..." : t.openBtn}
                  </span>
                </motion.button>

                <p className="mt-3 text-[10px] tracking-widest text-taupe">
                  {t.tapPrompt}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
