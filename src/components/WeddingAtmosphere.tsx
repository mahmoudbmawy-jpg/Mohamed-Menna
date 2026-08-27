"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  twinkleSpeed: number;
  angle: number;
}

export const WeddingAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Rose & Floral petal colors (ivory, soft champagne, blush peach)
    const petalColors = [
      "rgba(255, 245, 235, 0.65)",
      "rgba(250, 230, 215, 0.55)",
      "rgba(235, 205, 175, 0.5)",
      "rgba(255, 235, 230, 0.6)",
      "rgba(240, 215, 185, 0.45)",
    ];

    // Create Petals
    const petalCount = width < 768 ? 16 : 28;
    const petals: Petal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.7 + 0.35,
      speedX: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.3,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    // Create Golden Sparkles / Bokeh Dust
    const sparkleCount = width < 768 ? 20 : 35;
    const sparkles: Sparkle[] = Array.from({ length: sparkleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.3 + 0.1),
      opacity: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.015,
      angle: Math.random() * Math.PI * 2,
    }));

    // Draw single stylized petal
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        -p.size / 2,
        -p.size * 0.8,
        -p.size,
        p.size * 0.4,
        0,
        p.size
      );
      ctx.bezierCurveTo(
        p.size,
        p.size * 0.4,
        p.size / 2,
        -p.size * 0.8,
        0,
        0
      );
      ctx.fill();
      ctx.restore();
    };

    // Draw single golden sparkle
    const drawSparkle = (s: Sparkle) => {
      ctx.save();
      ctx.beginPath();
      const currentOpacity =
        s.opacity * (0.5 + 0.5 * Math.sin(s.angle));
      ctx.fillStyle = `rgba(225, 195, 140, ${Math.max(0.1, currentOpacity)})`;
      ctx.shadowColor = "rgba(235, 200, 140, 0.8)";
      ctx.shadowBlur = 6;
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & Draw Sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.y += s.speedY;
        s.angle += s.twinkleSpeed;
        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        drawSparkle(s);
      }

      // Update & Draw Petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.4;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* 1. Global High-End Wedding Backdrop Image (Fixed) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative h-full w-full scale-105 animate-subtle-zoom">
          <Image
            src="/images/wedding_luxury_bg.jpg"
            alt="Wedding Atmosphere Background"
            fill
            priority
            className="object-cover object-center filter brightness-[0.45] contrast-[1.1] saturate-[1.15]"
          />
        </div>

        {/* Rich Warm Wedding Lighting Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#11100E]/85 via-[#11100E]/70 to-[#11100E]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#11100E_90%)] opacity-80" />

        {/* Warm Champagne & Rose Gold Ambient Light Orbs */}
        <div className="absolute -top-32 left-1/4 h-[600px] w-[600px] rounded-full bg-[#D4AF37]/15 blur-[160px]" />
        <div className="absolute top-1/2 -right-32 h-[550px] w-[550px] rounded-full bg-[#E8C5A0]/12 blur-[170px]" />
        <div className="absolute -bottom-40 left-1/3 h-[700px] w-[700px] rounded-full bg-[#C8A978]/15 blur-[180px]" />
      </div>

      {/* 2. Floating Animated Rose Petals & Golden Bokeh Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[5] h-full w-full opacity-85"
        aria-hidden="true"
      />
    </>
  );
};
