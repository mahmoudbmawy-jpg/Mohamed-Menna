"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING_CONFIG } from "@/config/wedding";
import { DICTIONARY } from "@/config/translations";
import { Language } from "@/types";
import { X, ZoomIn } from "lucide-react";

interface EditorialGalleryProps {
  lang: Language;
}

export const EditorialGallery: React.FC<EditorialGalleryProps> = ({ lang }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const t = DICTIONARY[lang].gallery;
  const images = WEDDING_CONFIG.galleryImages;

  return (
    <section className="relative py-24 sm:py-36 bg-[#11100E] px-4 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
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
            className="font-serif italic text-lg sm:text-2xl text-ivory/70 max-w-xl"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Item 1: Tall Vertical Portrait (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:col-span-5 relative group overflow-hidden rounded-xl border border-champagne/20 bg-[#161411] aspect-[3/4] cursor-pointer"
            onClick={() => setSelectedImage(images[0]?.src || null)}
          >
            {images[0] && (
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-90 contrast-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <span className="text-xs text-champagne font-sans tracking-widest uppercase">
                {lang === "en" ? images[0]?.captionEn : images[0]?.captionAr}
              </span>
            </div>
            <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ZoomIn className="h-4 w-4" />
            </div>
          </motion.div>

          {/* Item 2 & 3 Right Column Stack (7 cols) */}
          <div className="md:col-span-7 space-y-6 sm:space-y-8">
            {/* Item 2: Wide Landscape */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative group overflow-hidden rounded-xl border border-champagne/20 bg-[#161411] aspect-[16/9] cursor-pointer"
              onClick={() => setSelectedImage(images[2]?.src || null)}
            >
              {images[2] && (
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-90 contrast-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-xs text-champagne font-sans tracking-widest uppercase">
                  {lang === "en" ? images[2]?.captionEn : images[2]?.captionAr}
                </span>
              </div>
              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="h-4 w-4" />
              </div>
            </motion.div>

            {/* Split 2 Smaller Square/Portrait Cards */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {/* Item 3: Rings Detail */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative group overflow-hidden rounded-xl border border-champagne/20 bg-[#161411] aspect-square cursor-pointer"
                onClick={() => setSelectedImage(images[1]?.src || null)}
              >
                {images[1] && (
                  <Image
                    src={images[1].src}
                    alt={images[1].alt}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-90 contrast-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                  <span className="text-[10px] text-champagne font-sans tracking-widest uppercase">
                    {lang === "en" ? images[1]?.captionEn : images[1]?.captionAr}
                  </span>
                </div>
              </motion.div>

              {/* Item 4: Couture lace */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative group overflow-hidden rounded-xl border border-champagne/20 bg-[#161411] aspect-square cursor-pointer"
                onClick={() => setSelectedImage(images[3]?.src || null)}
              >
                {images[3] && (
                  <Image
                    src={images[3].src}
                    alt={images[3].alt}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-90 contrast-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                  <span className="text-[10px] text-champagne font-sans tracking-widest uppercase">
                    {lang === "en" ? images[3]?.captionEn : images[3]?.captionAr}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Item 5: Full-width Editorial Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="md:col-span-12 relative group overflow-hidden rounded-xl border border-champagne/20 bg-[#161411] h-72 sm:h-96 cursor-pointer mt-2"
            onClick={() => setSelectedImage(images[4]?.src || null)}
          >
            {images[4] && (
              <Image
                src={images[4].src}
                alt={images[4].alt}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-85 contrast-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              <span className="font-serif text-xl sm:text-2xl text-ivory font-light">
                {lang === "en" ? images[4]?.captionEn : images[4]?.captionAr}
              </span>
              <span className="text-xs text-champagne font-sans tracking-ultra uppercase mt-1">
                {WEDDING_CONFIG.city.en} · {WEDDING_CONFIG.country.en}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-champagne/40 bg-[#11100E] text-champagne hover:scale-110 transition-transform"
              aria-label="Close image preview"
            >
              <X className="h-6 w-6" />
            </button>
            <div
              className="relative max-w-4xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged gallery view"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
