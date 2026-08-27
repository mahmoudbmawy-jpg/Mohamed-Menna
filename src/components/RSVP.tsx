"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { submitRSVP, getStoredRSVP } from "@/services/rsvpService";
import { DICTIONARY } from "@/config/translations";
import { GuestInfo, Language, RSVPFormData } from "@/types";
import { CheckCircle2, Heart, Send, Sparkles, UserCheck, XCircle } from "lucide-react";

interface RSVPProps {
  lang: Language;
  guestInfo?: GuestInfo | null;
}

export const RSVP: React.FC<RSVPProps> = ({ lang, guestInfo }) => {
  const t = DICTIONARY[lang].rsvp;

  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedChoice, setSubmittedChoice] = useState<boolean>(true);

  // Initialize with guest data if available or previous submission
  useEffect(() => {
    const existing = getStoredRSVP();
    if (existing) {
      setAttending(existing.attending);
      setGuestName(existing.guestName);
      setGuestCount(existing.guestCount);
      setNotes(existing.dietaryOrNotes || "");
      setIsSubmitted(true);
      setSubmittedChoice(existing.attending);
    } else if (guestInfo) {
      setGuestName(lang === "ar" && guestInfo.nameAr ? guestInfo.nameAr : guestInfo.name);
      setGuestCount(guestInfo.seats || 1);
    }
  }, [guestInfo, lang]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C8A978", "#F4EFE7", "#E3CAA5", "#8E6D3B"],
      });
    } catch {
      // Confetti optional
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === null) return;
    if (!guestName.trim()) return;

    setIsSubmitting(true);

    const payload: RSVPFormData = {
      guestName: guestName.trim(),
      attending,
      guestCount: attending ? guestCount : 0,
      dietaryOrNotes: notes.trim(),
      phoneNumber: phone.trim(),
      submittedAt: new Date().toISOString(),
    };

    const res = await submitRSVP(payload);
    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
      setSubmittedChoice(attending);
      if (attending) {
        triggerConfetti();
      }
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <section id="rsvp" className="relative py-24 sm:py-36 bg-[#11100E]/60 backdrop-blur-[6px] px-6 overflow-hidden">
      {/* Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-champagne/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs sm:text-sm font-sans tracking-monumental text-champagne uppercase font-light mb-3"
          >
            {t.tag}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory font-light mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-sm text-taupe-light max-w-md leading-relaxed font-sans"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="rounded-2xl border border-champagne/30 bg-[#161411]/90 p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              /* Success State */
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-6 flex flex-col items-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-champagne/40 bg-champagne/10 text-champagne">
                  {submittedChoice ? (
                    <Sparkles className="h-8 w-8 animate-pulse" />
                  ) : (
                    <Heart className="h-8 w-8 text-champagne/80" />
                  )}
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-light mb-3">
                  {submittedChoice ? t.successTitle : t.declinedTitle}
                </h3>

                <p className="text-sm sm:text-base text-taupe-light max-w-md mb-8 leading-relaxed font-sans">
                  {submittedChoice ? t.successMsg : t.declinedMsg}
                </p>

                <button
                  onClick={handleReset}
                  className="text-xs tracking-widest text-champagne underline underline-offset-4 hover:text-champagne-light transition-colors"
                >
                  {t.changeResponse}
                </button>
              </motion.div>
            ) : (
              /* Form State */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Attendance Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`flex items-center justify-center gap-2.5 rounded-xl border p-4 text-xs font-sans tracking-widest transition-all duration-300 ${
                      attending === true
                        ? "border-champagne bg-champagne/20 text-champagne-light shadow-[0_0_20px_rgba(200,169,120,0.25)] font-semibold"
                        : "border-champagne/20 bg-[#1A1815] text-ivory/70 hover:border-champagne/50 hover:text-ivory"
                    }`}
                  >
                    <UserCheck className="h-4 w-4 text-champagne" />
                    <span>{t.accept}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`flex items-center justify-center gap-2.5 rounded-xl border p-4 text-xs font-sans tracking-widest transition-all duration-300 ${
                      attending === false
                        ? "border-taupe bg-taupe/20 text-ivory shadow-[0_0_20px_rgba(142,131,118,0.25)] font-semibold"
                        : "border-champagne/20 bg-[#1A1815] text-ivory/70 hover:border-champagne/50 hover:text-ivory"
                    }`}
                  >
                    <XCircle className="h-4 w-4 text-taupe-light" />
                    <span>{t.decline}</span>
                  </button>
                </div>

                {attending !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Guest Name Input */}
                    <div>
                      <label className="block text-[11px] font-sans tracking-widest text-champagne uppercase mb-2">
                        {t.yourName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="w-full rounded-xl border border-champagne/30 bg-[#11100E] px-4 py-3.5 text-sm text-ivory placeholder:text-taupe-dark focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne transition-all"
                      />
                    </div>

                    {/* Guest Count (if attending) */}
                    {attending && (
                      <div>
                        <label className="block text-[11px] font-sans tracking-widest text-champagne uppercase mb-2">
                          {t.guestCount}
                        </label>
                        <div className="flex items-center gap-4">
                          {[1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setGuestCount(num)}
                              className={`h-11 w-12 rounded-xl border text-sm font-serif transition-all ${
                                guestCount === num
                                  ? "border-champagne bg-champagne text-[#11100E] font-bold shadow-[0_0_15px_rgba(200,169,120,0.3)]"
                                  : "border-champagne/20 bg-[#11100E] text-ivory/80 hover:border-champagne/50"
                              }`}
                            >
                              {lang === "en" ? num : ["١", "٢", "٣", "٤"][num - 1]}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes / Special Wishes */}
                    <div>
                      <label className="block text-[11px] font-sans tracking-widest text-champagne uppercase mb-2">
                        {t.notes}
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={t.notesPlaceholder}
                        className="w-full rounded-xl border border-champagne/30 bg-[#11100E] px-4 py-3 text-sm text-ivory placeholder:text-taupe-dark focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !guestName.trim()}
                      className="group relative w-full flex items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-champagne bg-champagne py-4 text-xs font-sans font-semibold tracking-ultra text-[#11100E] shadow-[0_0_25px_rgba(200,169,120,0.3)] transition-all duration-300 hover:bg-champagne-light hover:shadow-[0_0_35px_rgba(200,169,120,0.5)] disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <span>{t.submitting}</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          <span className="uppercase">{t.submit}</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
