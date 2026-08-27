"use client";

import React from "react";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";
import { DICTIONARY } from "@/config/translations";
import { Language } from "@/types";

interface EventTimelineProps {
  lang: Language;
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ lang }) => {
  const t = DICTIONARY[lang].timeline;
  const items = WEDDING_CONFIG.timeline;

  return (
    <section id="timeline" className="relative py-24 sm:py-36 bg-[#11100E]/50 backdrop-blur-[6px] px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-24 flex flex-col items-center">
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

        {/* Timeline Items */}
        <div className="relative">
          {/* Vertical Center Golden Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-champagne/40 to-transparent" />

          <div className="space-y-12 sm:space-y-16">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-champagne bg-[#11100E] shadow-[0_0_12px_rgba(200,169,120,0.6)] z-10">
                    <div className="h-2 w-2 rounded-full bg-champagne" />
                  </div>

                  {/* Content Box */}
                  <div
                    className={`pl-12 sm:pl-0 w-full sm:w-[45%] ${
                      isEven ? "sm:text-left sm:pr-10" : "sm:text-right sm:pl-10"
                    }`}
                  >
                    <div className="rounded-xl border border-champagne/20 bg-[#161411]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-champagne/40 hover:bg-[#1C1A16]">
                      <span className="font-serif text-lg font-light text-champagne tracking-widest block mb-1">
                        {lang === "en" ? item.time : item.timeAr}
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl text-ivory font-light mb-2">
                        {lang === "en" ? item.titleEn : item.titleAr}
                      </h4>
                      <p className="text-xs sm:text-sm text-taupe-light font-sans leading-relaxed">
                        {lang === "en" ? item.descriptionEn : item.descriptionAr}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
