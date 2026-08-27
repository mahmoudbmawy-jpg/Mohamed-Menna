"use client";

import React, { useEffect, useRef } from "react";

export const GrainOverlay: React.FC = () => {
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

    // Generate lightweight noise
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = 120;
    patternCanvas.height = 120;
    const patternCtx = patternCanvas.getContext("2d");
    if (!patternCtx) return;

    const renderNoise = () => {
      const imgData = patternCtx.createImageData(120, 120);
      const buffer32 = new Uint32Array(imgData.data.buffer);
      const len = buffer32.length;
      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.12) {
          buffer32[i] = 0x0cffffff; // ultra subtle noise
        }
      }
      patternCtx.putImageData(imgData, 0, 0);

      ctx.clearRect(0, 0, width, height);
      const pattern = ctx.createPattern(patternCanvas, "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }
    };

    let count = 0;
    const loop = () => {
      count++;
      // Only refresh noise every few frames to conserve CPU
      if (count % 4 === 0) {
        renderNoise();
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[999] h-full w-full opacity-40 mix-blend-overlay"
        aria-hidden="true"
      />
      {/* Subtle warm champagne light leak */}
      <div 
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-champagne/10 rounded-full blur-[140px] z-0"
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none fixed -bottom-40 right-10 w-[500px] h-[500px] bg-champagne/5 rounded-full blur-[160px] z-0"
        aria-hidden="true" 
      />
    </>
  );
};
