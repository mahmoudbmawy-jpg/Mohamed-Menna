"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";
import { DICTIONARY } from "@/config/translations";
import { Language } from "@/types";
import { Calendar, Check } from "lucide-react";

interface DateSectionProps {
  lang: Language;
}

export const DateSection: React.FC<DateSectionProps> = ({ lang }) => {
  const [added, setAdded] = useState(false);
  const t = DICTIONARY[lang].dateSection;
  const dateConf = WEDDING_CONFIG.date;

  const handleAddToCalendar = () => {
    // Generate .ics download or Google Calendar link
    const title = `Wedding of Mohamed & Menna`;
    const details = `Celebrating the wedding of Mohamed & Menna in Cairo, Egypt.`;
    const location = `${WEDDING_CONFIG.venue.nameEn}, ${WEDDING_CONFIG.city.en}`;
    const startTime = "20260910T170000Z";
    const endTime = "20260911T020000Z";

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(location)}`;

    window.open(gcalUrl, "_blank");
    setAdded(true);
    setTimeout(() => setAdded(false), 4000);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#14120F] text-center px-6 overflow-hidden">
      {/* Background Decorative Monogram Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[180px] sm:text-[320px] font-thin text-champagne/[0.03] select-none pointer-events-none">
        {WEDDING_CONFIG.monogram}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Save The Date Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="h-[1px] w-10 sm:w-16 bg-champagne/40" />
          <span className="text-xs sm:text-sm font-sans tracking-monumental text-champagne uppercase font-light">
            {t.saveTheDate}
          </span>
          <div className="h-[1px] w-10 sm:w-16 bg-champagne/40" />
        </motion.div>

        {/* Editorial Date Block */}
        <div className="my-4 flex flex-col items-center">
          {/* Day */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-7xl sm:text-9xl md:text-[140px] font-light leading-none text-ivory tracking-tight"
          >
            {lang === "en" ? dateConf.day : "١٠"}
          </motion.div>

          {/* Month */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-widest text-champagne my-2"
          >
            {lang === "en" ? dateConf.monthEn : dateConf.monthAr}
          </motion.div>

          {/* Year */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-sans text-xl sm:text-3xl font-extralight tracking-ultra text-ivory/80"
          >
            {lang === "en" ? dateConf.year : "٢٠٢٦"}
          </motion.div>
        </div>

        {/* Champagne Line Reveal */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "180px" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="h-[1.5px] bg-gradient-to-r from-transparent via-champagne to-transparent my-8"
        />

        {/* City & Add to Calendar Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <span className="text-xs sm:text-sm tracking-widest text-taupe-light font-sans">
            {t.cityInfo}
          </span>
          <button
            onClick={handleAddToCalendar}
            className="group flex items-center gap-2 rounded-full border border-champagne/30 bg-[#1A1815] px-5 py-2 text-xs tracking-widest text-champagne transition-all duration-300 hover:border-champagne hover:bg-champagne/10 hover:shadow-[0_0_20px_rgba(200,169,120,0.2)]"
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5 text-champagne" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <Calendar className="h-3.5 w-3.5 text-champagne transition-transform group-hover:scale-110" />
                <span>{t.calendarAdd}</span>
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
