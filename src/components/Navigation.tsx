"use client";

import React, { useEffect, useState } from "react";
import { DICTIONARY } from "@/config/translations";
import { Language } from "@/types";

interface NavigationProps {
  lang: Language;
}

export const Navigation: React.FC<NavigationProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = DICTIONARY[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling down 600px
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-4 sm:gap-6 rounded-full border border-champagne/20 bg-[#11100E]/85 px-6 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <button
          onClick={() => scrollToSection("story")}
          className="text-[11px] sm:text-xs tracking-widest text-ivory/70 hover:text-champagne transition-colors uppercase"
        >
          {t.story}
        </button>
        <span className="h-1 w-1 rounded-full bg-champagne/30" />
        <button
          onClick={() => scrollToSection("details")}
          className="text-[11px] sm:text-xs tracking-widest text-ivory/70 hover:text-champagne transition-colors uppercase"
        >
          {t.details}
        </button>
        <span className="h-1 w-1 rounded-full bg-champagne/30" />
        <button
          onClick={() => scrollToSection("venue")}
          className="text-[11px] sm:text-xs tracking-widest text-ivory/70 hover:text-champagne transition-colors uppercase"
        >
          {t.venue}
        </button>
        <span className="h-1 w-1 rounded-full bg-champagne/30" />
        <button
          onClick={() => scrollToSection("rsvp")}
          className="text-[11px] sm:text-xs font-semibold tracking-widest text-champagne hover:text-champagne-light transition-colors uppercase"
        >
          {t.rsvp}
        </button>
      </div>
    </nav>
  );
};
