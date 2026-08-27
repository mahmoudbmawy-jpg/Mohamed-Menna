"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { WEDDING_CONFIG } from "@/config/wedding";
import { audioEngine } from "@/services/audioService";
import { GuestInfo, Language } from "@/types";

// Components
import { EnvelopeOpening } from "@/components/EnvelopeOpening";
import { Hero } from "@/components/Hero";
import { StorySection } from "@/components/StorySection";
import { DateSection } from "@/components/DateSection";
import { Countdown } from "@/components/Countdown";
import { EditorialGallery } from "@/components/EditorialGallery";
import { WeddingDetails } from "@/components/WeddingDetails";
import { EventTimeline } from "@/components/EventTimeline";
import { VenueSection } from "@/components/VenueSection";
import { RSVP } from "@/components/RSVP";
import { ClosingScene } from "@/components/ClosingScene";
import { Navigation } from "@/components/Navigation";
import { MusicPlayer } from "@/components/MusicPlayer";
import { LanguageToggle } from "@/components/LanguageToggle";
import { CustomCursor } from "@/components/CustomCursor";
import { GrainOverlay } from "@/components/GrainOverlay";

function WeddingExperience() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<Language>("en");
  const [isOpened, setIsOpened] = useState(false);
  const [hasStartedPlayback, setHasStartedPlayback] = useState(false);
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);

  // Parse personalized guest query params
  useEffect(() => {
    const guestParam =
      searchParams.get("guest") ||
      searchParams.get("to") ||
      searchParams.get("name");
    const langParam = searchParams.get("lang");
    const seatsParam = searchParams.get("seats");

    if (langParam === "ar" || langParam === "en") {
      setLang(langParam);
    }

    if (guestParam) {
      setGuestInfo({
        name: guestParam,
        nameAr: guestParam,
        seats: seatsParam ? parseInt(seatsParam, 10) : 2,
        plusOneAllowed: true,
      });
    }
  }, [searchParams]);

  // Adjust document direction when language toggles
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  // Initialize audio engine with configuration
  useEffect(() => {
    if (WEDDING_CONFIG.music.enabled) {
      audioEngine.init(
        WEDDING_CONFIG.music.customAudioUrl,
        WEDDING_CONFIG.music.defaultVolume
      );
    }
  }, []);

  const handleEnvelopeOpen = () => {
    setIsOpened(true);
    setHasStartedPlayback(true);
    if (WEDDING_CONFIG.music.enabled) {
      audioEngine.play();
    }
  };

  return (
    <main
      className={`min-h-screen w-full bg-[#11100E] text-[#F4EFE7] selection:bg-champagne selection:text-[#11100E] ${
        lang === "ar" ? "font-arabic" : "font-sans"
      }`}
    >
      {/* Background Cinematic Texture & Lighting */}
      <GrainOverlay />
      <CustomCursor />

      {/* Persistent Floating Controls */}
      <LanguageToggle currentLang={lang} onToggle={setLang} />
      <MusicPlayer lang={lang} hasStartedPlayback={hasStartedPlayback} />
      <Navigation lang={lang} />

      {/* Step 1: Photorealistic Wax Seal Envelope Reveal */}
      {!isOpened && (
        <EnvelopeOpening
          lang={lang}
          guestInfo={guestInfo}
          onOpen={handleEnvelopeOpen}
        />
      )}

      {/* Main Continuous Cinematic Wedding Experience */}
      <div
        className={`transition-opacity duration-1000 ${
          isOpened ? "opacity-100" : "opacity-0"
        }`}
      >
        <Hero lang={lang} />
        <StorySection lang={lang} />
        <DateSection lang={lang} />
        <Countdown lang={lang} />
        <EditorialGallery lang={lang} />
        <WeddingDetails lang={lang} />
        <EventTimeline lang={lang} />
        <VenueSection lang={lang} />
        <RSVP lang={lang} guestInfo={guestInfo} />
        <ClosingScene lang={lang} />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-[#11100E] text-champagne">
          <span className="font-serif text-2xl tracking-widest animate-pulse">
            M × M
          </span>
        </div>
      }
    >
      <WeddingExperience />
    </Suspense>
  );
}
