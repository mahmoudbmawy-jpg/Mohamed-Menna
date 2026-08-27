"use client";

import React from "react";
import { Language } from "@/types";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLang,
  onToggle,
}) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-1.5 rounded-full border border-champagne/30 bg-[#11100E]/80 px-3 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-champagne">
      <Globe className="h-3.5 w-3.5 text-champagne/80" />
      <button
        onClick={() => onToggle("en")}
        className={`px-1.5 py-0.5 text-[11px] font-medium tracking-widest transition-colors ${
          currentLang === "en"
            ? "text-champagne font-semibold"
            : "text-ivory/50 hover:text-ivory"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-[10px] text-champagne/30">|</span>
      <button
        onClick={() => onToggle("ar")}
        className={`px-1.5 py-0.5 text-[11px] font-medium transition-colors ${
          currentLang === "ar"
            ? "text-champagne font-semibold font-arabic"
            : "text-ivory/50 hover:text-ivory font-arabic"
        }`}
        aria-label="التبديل إلى العربية"
      >
        عربي
      </button>
    </div>
  );
};
