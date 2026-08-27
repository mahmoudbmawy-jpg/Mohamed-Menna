"use client";

import React from "react";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";
import { DICTIONARY } from "@/config/translations";
import { Language } from "@/types";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

interface WeddingDetailsProps {
  lang: Language;
}

export const WeddingDetails: React.FC<WeddingDetailsProps> = ({ lang }) => {
  const t = DICTIONARY[lang].details;
  const config = WEDDING_CONFIG;

  return (
    <section id="details" className="relative py-24 sm:py-36 bg-[#0D0C0A]/60 backdrop-blur-[6px] px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs sm:text-sm font-sans tracking-monumental text-champagne uppercase font-light mb-3"
          >
            {t.title}
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif italic text-lg sm:text-xl text-ivory/70 max-w-md"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Date */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group rounded-2xl border border-champagne/20 bg-[#161411]/90 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-champagne/50 hover:bg-[#1B1915] hover:shadow-[0_10px_30px_rgba(200,169,120,0.08)]"
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/30 bg-champagne/5 text-champagne transition-transform group-hover:scale-110">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-[10px] font-sans tracking-ultra text-champagne uppercase font-medium">
              {t.dateLabel}
            </h3>
            <p className="font-serif text-xl sm:text-2xl text-ivory font-light">
              {lang === "en" ? config.date.displayEn : config.date.displayAr}
            </p>
            <span className="text-[11px] text-taupe-light block mt-1">
              Thursday / الخميس
            </span>
          </motion.div>

          {/* Card 2: Time */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group rounded-2xl border border-champagne/20 bg-[#161411]/90 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-champagne/50 hover:bg-[#1B1915] hover:shadow-[0_10px_30px_rgba(200,169,120,0.08)]"
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/30 bg-champagne/5 text-champagne transition-transform group-hover:scale-110">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-[10px] font-sans tracking-ultra text-champagne uppercase font-medium">
              {t.timeLabel}
            </h3>
            <p className="font-serif text-xl sm:text-2xl text-ivory font-light">
              {config.eventTime.isConfirmed
                ? lang === "en"
                  ? config.eventTime.displayEn
                  : config.eventTime.displayAr
                : t.comingSoon}
            </p>
            <span className="text-[11px] text-taupe-light block mt-1">
              {config.eventTime.isConfirmed ? "Evening" : "To be revealed"}
            </span>
          </motion.div>

          {/* Card 3: Venue */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group rounded-2xl border border-champagne/20 bg-[#161411]/90 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-champagne/50 hover:bg-[#1B1915] hover:shadow-[0_10px_30px_rgba(200,169,120,0.08)]"
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/30 bg-champagne/5 text-champagne transition-transform group-hover:scale-110">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-[10px] font-sans tracking-ultra text-champagne uppercase font-medium">
              {t.venueLabel}
            </h3>
            <p className="font-serif text-xl sm:text-2xl text-ivory font-light line-clamp-1">
              {lang === "en" ? config.city.en : config.city.ar}
            </p>
            <span className="text-[11px] text-taupe-light block mt-1">
              {lang === "en" ? config.country.en : config.country.ar}
            </span>
          </motion.div>

          {/* Card 4: Dress Code */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group rounded-2xl border border-champagne/20 bg-[#161411]/90 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-champagne/50 hover:bg-[#1B1915] hover:shadow-[0_10px_30px_rgba(200,169,120,0.08)]"
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-champagne/30 bg-champagne/5 text-champagne transition-transform group-hover:scale-110">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-[10px] font-sans tracking-ultra text-champagne uppercase font-medium">
              {t.attireLabel}
            </h3>
            <p className="font-serif text-lg sm:text-xl text-ivory font-light">
              {t.attireValue}
            </p>
            <span className="text-[11px] text-taupe-light block mt-1">
              Midnight Champagne
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
