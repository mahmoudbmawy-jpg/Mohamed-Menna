"use client";

import React, { useEffect, useState } from "react";
import { audioEngine } from "@/services/audioService";
import { WEDDING_CONFIG } from "@/config/wedding";
import { DICTIONARY } from "@/config/translations";
import { Language } from "@/types";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  lang: Language;
  hasStartedPlayback: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  lang,
  hasStartedPlayback,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const t = DICTIONARY[lang].music;
  const config = WEDDING_CONFIG.music;

  useEffect(() => {
    if (hasStartedPlayback) {
      setIsPlaying(audioEngine.getIsPlaying());
      setIsMuted(audioEngine.getIsMuted());
    }
  }, [hasStartedPlayback]);

  const handleToggle = () => {
    const active = audioEngine.toggleMute();
    setIsMuted(!active);
    setIsPlaying(active);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Title preview badge on hover */}
      <div
        className={`pointer-events-none hidden sm:flex items-center gap-2 rounded-full border border-champagne/20 bg-[#11100E]/90 px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 ${
          showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        <Music className="h-3 w-3 text-champagne animate-pulse" />
        <div className="flex flex-col">
          <span className="text-[10px] tracking-wider text-champagne font-medium">
            {lang === "en" ? config.titleEn : config.titleAr}
          </span>
          <span className="text-[8px] tracking-widest text-ivory/50">
            {config.artist}
          </span>
        </div>
      </div>

      {/* Floating Circular Controller */}
      <button
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isPlaying ? t.playing : t.muted}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-champagne/40 bg-[#11100E]/85 shadow-[0_0_20px_rgba(200,169,120,0.15)] backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-champagne hover:shadow-[0_0_25px_rgba(200,169,120,0.35)]"
      >
        {/* Orbit Ring */}
        <div
          className={`absolute inset-0 rounded-full border border-dashed border-champagne/30 transition-transform duration-1000 ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ animationDuration: "12s" }}
        />

        {isPlaying ? (
          <div className="flex items-end justify-center gap-0.5 h-4 w-4">
            <span className="w-[2px] bg-champagne rounded-full animate-[equalizer_0.8s_ease-in-out_infinite]" />
            <span className="w-[2px] bg-champagne rounded-full animate-[equalizer_1.1s_ease-in-out_infinite_0.2s]" />
            <span className="w-[2px] bg-champagne rounded-full animate-[equalizer_0.9s_ease-in-out_infinite_0.4s]" />
            <span className="w-[2px] bg-champagne rounded-full animate-[equalizer_1.3s_ease-in-out_infinite_0.1s]" />
          </div>
        ) : isMuted ? (
          <VolumeX className="h-4 w-4 text-champagne/60 transition-colors group-hover:text-champagne" />
        ) : (
          <Volume2 className="h-4 w-4 text-champagne/80 transition-colors group-hover:text-champagne" />
        )}
      </button>
    </div>
  );
};
