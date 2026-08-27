"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";
import { DICTIONARY } from "@/config/translations";
import { Language } from "@/types";

interface CountdownProps {
  lang: Language;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({ lang }) => {
  const t = DICTIONARY[lang].countdown;
  const targetDateStr = WEDDING_CONFIG.date.iso;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const target = new Date(targetDateStr).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const toArabicDigits = (num: number | string) => {
    const s = String(num).padStart(2, "0");
    if (lang === "en") return s;
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return s.replace(/[0-9]/g, (d) => arabicNumbers[parseInt(d, 10)]);
  };

  return (
    <section className="relative py-20 sm:py-28 bg-[#11100E] px-6 text-center overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs sm:text-sm font-sans tracking-monumental text-champagne uppercase font-light mb-3"
        >
          {t.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif italic text-lg sm:text-xl text-ivory/70 max-w-lg mb-14"
        >
          {t.subtitle}
        </motion.p>

        {timeLeft.isPast ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-champagne/30 bg-[#191714] px-10 py-8 shadow-[0_0_40px_rgba(200,169,120,0.1)]"
          >
            <span className="font-serif text-2xl sm:text-3xl text-champagne tracking-widest">
              {t.arrived}
            </span>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl">
            {/* Days */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col items-center justify-center rounded-xl border border-champagne/20 bg-[#171512]/90 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-champagne/50 hover:bg-[#1C1A16]"
            >
              <span className="font-serif text-4xl sm:text-6xl font-light text-ivory tracking-tight mb-2">
                {toArabicDigits(timeLeft.days)}
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-ultra text-champagne uppercase font-medium">
                {t.days}
              </span>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center justify-center rounded-xl border border-champagne/20 bg-[#171512]/90 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-champagne/50 hover:bg-[#1C1A16]"
            >
              <span className="font-serif text-4xl sm:text-6xl font-light text-ivory tracking-tight mb-2">
                {toArabicDigits(timeLeft.hours)}
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-ultra text-champagne uppercase font-medium">
                {t.hours}
              </span>
            </motion.div>

            {/* Minutes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center justify-center rounded-xl border border-champagne/20 bg-[#171512]/90 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-champagne/50 hover:bg-[#1C1A16]"
            >
              <span className="font-serif text-4xl sm:text-6xl font-light text-ivory tracking-tight mb-2">
                {toArabicDigits(timeLeft.minutes)}
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-ultra text-champagne uppercase font-medium">
                {t.minutes}
              </span>
            </motion.div>

            {/* Seconds */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center justify-center rounded-xl border border-champagne/20 bg-[#171512]/90 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-champagne/50 hover:bg-[#1C1A16]"
            >
              <span className="font-serif text-4xl sm:text-6xl font-light text-champagne-light tracking-tight mb-2">
                {toArabicDigits(timeLeft.seconds)}
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-ultra text-champagne uppercase font-medium">
                {t.seconds}
              </span>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
