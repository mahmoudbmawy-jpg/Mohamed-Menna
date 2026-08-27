"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";
import { DICTIONARY } from "@/config/translations";
import { Language } from "@/types";
import { MapPin, Navigation as NavIcon, Copy, Check } from "lucide-react";

interface VenueSectionProps {
  lang: Language;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const t = DICTIONARY[lang].venue;
  const venue = WEDDING_CONFIG.venue;

  const handleCopy = () => {
    const textToCopy = `${venue.nameEn}, ${WEDDING_CONFIG.city.en}, ${WEDDING_CONFIG.country.en}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="venue" className="relative py-24 sm:py-36 bg-[#0E0D0B]/60 backdrop-blur-[6px] px-6 overflow-hidden">
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

        {/* Venue Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden rounded-2xl border border-champagne/25 bg-[#161411] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          {/* Venue Ambient Image */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden">
            <Image
              src={WEDDING_CONFIG.venueImage}
              alt="Luxury Wedding Venue"
              fill
              className="object-cover object-center filter brightness-[0.7] contrast-105 transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161411] via-[#161411]/40 to-transparent" />
            <div className="absolute top-6 left-6 rounded-full border border-champagne/30 bg-black/60 px-4 py-1.5 backdrop-blur-md">
              <span className="text-[11px] font-sans tracking-widest text-champagne uppercase">
                {WEDDING_CONFIG.city.en} · {WEDDING_CONFIG.country.en}
              </span>
            </div>
          </div>

          {/* Venue Information Body */}
          <div className="p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-full border border-champagne/40 bg-champagne/10 text-champagne">
              <MapPin className="h-6 w-6" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-light mb-3">
              {lang === "en" ? venue.nameEn : venue.nameAr}
            </h3>

            <p className="text-sm sm:text-base text-taupe-light max-w-md mb-8 font-sans">
              {lang === "en" ? venue.addressEn : venue.addressAr}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-full border border-champagne bg-champagne/15 px-8 py-3.5 text-xs font-sans tracking-widest text-champagne-light shadow-[0_0_20px_rgba(200,169,120,0.15)] transition-all duration-300 hover:bg-champagne hover:text-[#11100E] hover:shadow-[0_0_30px_rgba(200,169,120,0.4)]"
              >
                <NavIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                <span className="font-medium uppercase">{t.getDirections}</span>
              </a>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-full border border-champagne/25 bg-[#1B1915] px-6 py-3.5 text-xs font-sans tracking-widest text-ivory/80 transition-all duration-300 hover:border-champagne/60 hover:text-champagne"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-champagne" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-champagne/70" />
                    <span>{t.copyAddress}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
