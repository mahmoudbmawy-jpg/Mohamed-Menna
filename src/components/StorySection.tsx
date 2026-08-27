"use client";

import React from "react";
import { motion } from "framer-motion";
import { DICTIONARY } from "@/config/translations";
import { WEDDING_CONFIG } from "@/config/wedding";
import { Language } from "@/types";

interface StorySectionProps {
  lang: Language;
}

export const StorySection: React.FC<StorySectionProps> = ({ lang }) => {
  const t = DICTIONARY[lang].story;

  return (
    <section
      id="story"
      className="relative py-28 sm:py-36 bg-[#0E0D0B]/60 backdrop-blur-[4px] text-center px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Subtle Tag */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs sm:text-sm font-sans tracking-monumental text-champagne uppercase font-light mb-8"
        >
          {t.tag}
        </motion.span>

        {/* Poetic Stanzas */}
        <div className="space-y-6 sm:space-y-8 my-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory font-light leading-relaxed"
          >
            &ldquo;{t.line1}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-champagne-light font-light leading-relaxed italic"
          >
            {t.line2}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory font-light leading-relaxed"
          >
            {t.line3}&rdquo;
          </motion.p>
        </div>

        {/* Signature Accent Line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-[1px] bg-champagne/50 my-10"
        />

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col items-center"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-widest text-champagne font-light uppercase">
            {lang === "en"
              ? `${WEDDING_CONFIG.groom.nameEn} & ${WEDDING_CONFIG.bride.nameEn}`
              : `${WEDDING_CONFIG.groom.nameAr} و ${WEDDING_CONFIG.bride.nameAr}`}
          </span>
          <p className="mt-4 max-w-md text-xs sm:text-sm font-sans tracking-wider text-taupe-light leading-relaxed">
            {t.subquote}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
