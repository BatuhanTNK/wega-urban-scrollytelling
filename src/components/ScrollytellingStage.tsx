"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import type { ContentDictionary } from "@/data/content";

const TOTAL_FRAMES = 120;

function getFramePath(index: number): string {
  const frameNumber = String(Math.min(TOTAL_FRAMES, Math.max(1, index + 1))).padStart(3, "0");
  return `/frames/ezgif-frame-${frameNumber}.jpg`;
}

interface ScrollytellingStageProps {
  copy: ContentDictionary;
  onOpenExperience: () => void;
  onScrollToSpecs: () => void;
  stageRef: React.RefObject<HTMLElement | null>;
}

const CHAPTER_PROGRESS = [0.02, 0.27, 0.53, 0.75, 0.96];

export function ScrollytellingStage({
  copy,
  onOpenExperience,
  onScrollToSpecs,
  stageRef,
}: ScrollytellingStageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const loadedFlagsRef = useRef<boolean[]>(Array(TOTAL_FRAMES).fill(false));
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [activeBeat, setActiveBeat] = useState(0);
  const [ctaInteractive, setCtaInteractive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // Track target frame & active chapter state cleanly
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    targetFrameRef.current = latest * (TOTAL_FRAMES - 1);

    if (latest < 0.16) setActiveBeat(0);
    else if (latest < 0.41) setActiveBeat(1);
    else if (latest < 0.66) setActiveBeat(2);
    else if (latest < 0.86) setActiveBeat(3);
    else setActiveBeat(4);

    setCtaInteractive(latest >= 0.85);
  });

  // Find closest available loaded image so there is never a blank flicker
  const getBestLoadedImage = useCallback((desiredIndex: number): HTMLImageElement | null => {
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, desiredIndex));
    if (loadedFlagsRef.current[clamped] && imagesRef.current[clamped]) {
      return imagesRef.current[clamped];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = clamped - offset;
      if (prev >= 0 && loadedFlagsRef.current[prev] && imagesRef.current[prev]) {
        return imagesRef.current[prev];
      }
      const next = clamped + offset;
      if (next < TOTAL_FRAMES && loadedFlagsRef.current[next] && imagesRef.current[next]) {
        return imagesRef.current[next];
      }
    }
    return null;
  }, []);

  // High-DPI responsive canvas drawing with seamless dark studio framing
  const drawFrame = useCallback(
    (frameIndex: number, force = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const rounded = Math.round(frameIndex);
      if (!force && rounded === lastDrawnFrameRef.current) return;

      const img = getBestLoadedImage(rounded);
      if (!img) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetWidth = Math.max(1, Math.floor(rect.width * dpr));
      const targetHeight = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      ctx.save();
      ctx.fillStyle = "#070707";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const imgW = img.naturalWidth || 1280;
      const imgH = img.naturalHeight || 720;
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = imgW / imgH;

      let drawW: number;
      let drawH: number;

      if (canvasRatio >= 1.35) {
        // Landscape desktop: subtle bleed while preserving the entire machine silhouette
        if (canvasRatio > imgRatio) {
          drawH = canvas.height * 1.03;
          drawW = drawH * imgRatio;
        } else {
          drawW = canvas.width * 1.02;
          drawH = drawW / imgRatio;
        }
      } else {
        // Tablet / portrait mobile: preserve full horizontal machine silhouette
        drawW = canvas.width * 1.04;
        drawH = drawW / imgRatio;
      }

      const dx = (canvas.width - drawW) / 2;
      // Slightly offset downwards by 2% so top hero typography breathes effortlessly
      const dy = (canvas.height - drawH) / 2 + canvas.height * 0.015;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, dx, dy, drawW, drawH);

      // Soft canvas-level feather around the image boundary for 100% invisible edges
      const edgePadX = drawW * 0.09;
      const edgePadY = drawH * 0.11;

      const leftGrad = ctx.createLinearGradient(dx, 0, dx + edgePadX, 0);
      leftGrad.addColorStop(0, "#070707");
      leftGrad.addColorStop(1, "rgba(7,7,7,0)");
      ctx.fillStyle = leftGrad;
      ctx.fillRect(dx - 2, dy - 2, edgePadX + 4, drawH + 4);

      const rightGrad = ctx.createLinearGradient(dx + drawW, 0, dx + drawW - edgePadX, 0);
      rightGrad.addColorStop(0, "#070707");
      rightGrad.addColorStop(1, "rgba(7,7,7,0)");
      ctx.fillStyle = rightGrad;
      ctx.fillRect(dx + drawW - edgePadX - 2, dy - 2, edgePadX + 4, drawH + 4);

      const topGrad = ctx.createLinearGradient(0, dy, 0, dy + edgePadY);
      topGrad.addColorStop(0, "#070707");
      topGrad.addColorStop(1, "rgba(7,7,7,0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(dx - 2, dy - 2, drawW + 4, edgePadY + 4);

      const bottomGrad = ctx.createLinearGradient(0, dy + drawH, 0, dy + drawH - edgePadY);
      bottomGrad.addColorStop(0, "#070707");
      bottomGrad.addColorStop(1, "rgba(7,7,7,0)");
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(dx - 2, dy + drawH - edgePadY - 2, drawW + 4, edgePadY + 4);

      ctx.restore();
      lastDrawnFrameRef.current = rounded;
    },
    [getBestLoadedImage]
  );

  // Two-wave intelligent preloading: frame 0 + keyframes first, then complete 120 frames
  useEffect(() => {
    let cancelled = false;
    let count = 0;

    const loadSingleFrame = (idx: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = getFramePath(idx);
        img.onload = () => {
          if (cancelled) return;
          imagesRef.current[idx] = img;
          loadedFlagsRef.current[idx] = true;
          count += 1;
          setLoadedCount(count);
          if (idx === 0) {
            setFirstFrameReady(true);
            drawFrame(0, true);
          } else if (Math.round(currentFrameRef.current) === idx) {
            drawFrame(idx, true);
          }
          resolve();
        };
        img.onerror = () => resolve();
      });

    const runPreload = async () => {
      // Immediate first frame
      await loadSingleFrame(0);

      // Wave 1: every 4th frame for instant scrub responsiveness
      const wave1: number[] = [];
      const wave2: number[] = [];
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        if (i % 4 === 0 || i === TOTAL_FRAMES - 1) wave1.push(i);
        else wave2.push(i);
      }

      await Promise.all(wave1.map(loadSingleFrame));

      // Wave 2: remaining frames in smooth batches of 12
      const batchSize = 12;
      for (let i = 0; i < wave2.length; i += batchSize) {
        if (cancelled) break;
        const slice = wave2.slice(i, i + batchSize);
        await Promise.all(slice.map(loadSingleFrame));
      }
    };

    runPreload();

    return () => {
      cancelled = true;
    };
  }, [drawFrame]);

  // 60fps damped lerp animation loop
  useEffect(() => {
    const tick = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.14;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      drawFrame(currentFrameRef.current);
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    const handleResize = () => {
      drawFrame(currentFrameRef.current, true);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrame]);

  // Jump cleanly to any chapter progress
  const scrollToProgress = (progress: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const stageTop = window.scrollY + rect.top;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: stageTop + scrollable * progress,
      behavior: "smooth",
    });
  };

  // --- FRAMER MOTION 5-BEAT SYNCHRONIZED TRANSFORMS ---

  // Subtle cinematic ambient glow breathing with progress
  const ambientGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.85, 1],
    [0.24, 0.34, 0.22, 0.38, 0.3]
  );

  // Beat 1: Hero / Intro (0% - 15%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.16], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.16], [0, -30]);
  const heroBottomOpacity = useTransform(scrollYProgress, [0, 0.08, 0.14], [1, 0.8, 0]);

  // Beat 2: Craftsmanship & Core Architecture (15% - 40%)
  const beat1Opacity = useTransform(scrollYProgress, [0.16, 0.22, 0.34, 0.40], [0, 1, 1, 0]);
  const beat1X = useTransform(scrollYProgress, [0.16, 0.23, 0.34, 0.40], [-36, 0, 0, -18]);

  // Beat 3: Signature Innovation (40% - 65%)
  const beat2Opacity = useTransform(scrollYProgress, [0.41, 0.47, 0.59, 0.65], [0, 1, 1, 0]);
  const beat2X = useTransform(scrollYProgress, [0.41, 0.48, 0.59, 0.65], [36, 0, 0, 18]);

  // Beat 4: Performance & Sensory Extraction (65% - 85%)
  const beat3Opacity = useTransform(scrollYProgress, [0.66, 0.72, 0.80, 0.85], [0, 1, 1, 0]);
  const beat3X = useTransform(scrollYProgress, [0.66, 0.73, 0.80, 0.85], [-36, 0, 0, -18]);

  // Beat 5: Resolution & CTA (85% - 100%)
  const resOpacity = useTransform(scrollYProgress, [0.85, 0.91, 1], [0, 1, 1]);
  const resY = useTransform(scrollYProgress, [0.85, 0.93], [28, 0]);

  // Progress bar height
  const progressScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <section
      id="stage"
      ref={stageRef}
      className="relative w-full h-[460vh] bg-[#070707]"
      aria-label="WEGA Urban Interactive Product Sequence"
    >
      {/* Sticky Full-Viewport Cinematic Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#070707]">
        {/* Subtle Warm Copper Studio Ambient Glow */}
        <motion.div
          style={{ opacity: ambientGlowOpacity }}
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          <div className="absolute -top-32 -right-24 w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle,rgba(200,138,85,0.16)_0%,rgba(200,138,85,0.04)_45%,transparent_72%)] blur-3xl" />
          <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-[radial-gradient(ellipse,rgba(242,210,169,0.07)_0%,transparent_70%)] blur-3xl" />
        </motion.div>

        {/* Hardware-Accelerated 60fps HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className={`relative z-10 w-full h-full block transition-opacity duration-700 ${
            firstFrameReady ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Seamless Edge-Blending Vignette Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 canvas-edge-vignette"
          aria-hidden="true"
        />

        {/* Subtle Directional Contrast Scrims for Active Side Beats */}
        <motion.div
          style={{ opacity: beat1Opacity }}
          className="pointer-events-none absolute inset-y-0 left-0 w-full md:w-[52%] z-20 bg-gradient-to-r from-[#070707]/85 via-[#070707]/45 to-transparent"
          aria-hidden="true"
        />
        <motion.div
          style={{ opacity: beat2Opacity }}
          className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[52%] z-20 bg-gradient-to-l from-[#070707]/88 via-[#070707]/50 to-transparent"
          aria-hidden="true"
        />
        <motion.div
          style={{ opacity: beat3Opacity }}
          className="pointer-events-none absolute inset-y-0 left-0 w-full md:w-[52%] z-20 bg-gradient-to-r from-[#070707]/85 via-[#070707]/45 to-transparent"
          aria-hidden="true"
        />
        <motion.div
          style={{ opacity: resOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(7,7,7,0.48)_0%,rgba(7,7,7,0.78)_100%)]"
          aria-hidden="true"
        />

        {/* Subtle Non-Intrusive Frame Loader Pill */}
        {loadPercent < 100 && (
          <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2.5 rounded-full bg-[#0D0D10]/80 border border-white/10 backdrop-blur-md px-3.5 py-1.5 text-[11px] tracking-wide text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C88A55] animate-pulse" />
            <span>{copy.loader.label}</span>
            <span className="font-mono text-[#F2D2A9]">{loadPercent}%</span>
          </div>
        )}

        {/* ============================================================
            BEAT 1 — HERO / INTRO (0–15% scroll)
        ============================================================ */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between items-center text-center px-6 pt-20 pb-8 md:pt-24 md:pb-10"
        >
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#C88A55]" />
              <span className="text-[10px] md:text-[11px] font-medium tracking-[0.32em] uppercase text-[#F2D2A9]/80">
                {copy.beats.hero.eyebrow}
              </span>
              <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#C88A55]" />
            </div>

            <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.04em] leading-[1.02] heading-gradient drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
                {copy.beats.hero.headline}
              </h1>
              <span className="text-xs sm:text-sm font-medium tracking-[0.22em] uppercase text-[#C88A55] border border-[#C88A55]/35 bg-[#070707]/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {copy.beats.hero.modelTag}
              </span>
            </div>

            <p className="mt-3 md:mt-4 text-base sm:text-xl md:text-2xl font-light tracking-[-0.015em] text-white/85 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              {copy.beats.hero.tagline}
            </p>
          </div>

          <motion.div
            style={{ opacity: heroBottomOpacity }}
            className="max-w-xl mx-auto flex flex-col items-center gap-4"
          >
            <p className="text-xs sm:text-sm md:text-[15px] leading-relaxed text-white/60 max-w-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              {copy.beats.hero.supporting}
            </p>
            <div className="flex flex-col items-center gap-1.5 text-white/45">
              <span className="text-[10px] tracking-[0.26em] uppercase">
                {copy.beats.hero.scrollHint}
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-3.5 h-3.5 text-[#C88A55]" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ============================================================
            BEAT 2 — CRAFTSMANSHIP & CORE ARCHITECTURE (15–40% scroll)
        ============================================================ */}
        <motion.div
          style={{ opacity: beat1Opacity, x: beat1X }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center px-6 sm:px-10 md:px-16 lg:px-24"
        >
          <div className="max-w-md space-y-5">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C88A55] shadow-[0_0_10px_#C88A55]" />
              <span className="text-[11px] font-medium tracking-[0.26em] uppercase text-[#F2D2A9]/80">
                {copy.beats.beat1.eyebrow}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-semibold tracking-[-0.03em] leading-[1.08] heading-gradient">
              {copy.beats.beat1.headline}
            </h2>

            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-white/65">
              <p>{copy.beats.beat1.line1}</p>
              <p className="text-white/50">{copy.beats.beat1.line2}</p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-white/10">
              {copy.beats.beat1.metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-xl sm:text-2xl font-semibold tracking-tight accent-text-gradient">
                    {m.value}
                  </div>
                  <div className="mt-0.5 text-[11px] sm:text-xs text-white/50 tracking-wide">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            BEAT 3 — SIGNATURE INNOVATION (40–65% scroll)
        ============================================================ */}
        <motion.div
          style={{ opacity: beat2Opacity, x: beat2X }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-end px-6 sm:px-10 md:px-16 lg:px-24"
        >
          <div className="max-w-md space-y-5 text-left md:text-right">
            <div className="inline-flex items-center gap-2.5 md:flex-row-reverse">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F2D2A9] shadow-[0_0_10px_#F2D2A9]" />
              <span className="text-[11px] font-medium tracking-[0.26em] uppercase text-[#F2D2A9]/80">
                {copy.beats.beat2.eyebrow}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-semibold tracking-[-0.03em] leading-[1.08] heading-gradient">
              {copy.beats.beat2.headline}
            </h2>

            <ul className="space-y-4 pt-2">
              {copy.beats.beat2.points.map((point, idx) => (
                <li
                  key={point.title}
                  className="border-t border-white/[0.08] pt-3.5 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-center gap-2 md:justify-end">
                    <span className="text-[10px] font-mono text-[#C88A55]">
                      0{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-[15px] font-medium text-white/90 tracking-tight">
                      {point.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-white/55">
                    {point.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ============================================================
            BEAT 4 — PERFORMANCE & SENSORY EXTRACTION (65–85% scroll)
        ============================================================ */}
        <motion.div
          style={{ opacity: beat3Opacity, x: beat3X }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center px-6 sm:px-10 md:px-16 lg:px-24"
        >
          <div className="max-w-md space-y-5">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C88A55] shadow-[0_0_12px_#C88A55]" />
              <span className="text-[11px] font-medium tracking-[0.26em] uppercase text-[#F2D2A9]/80">
                {copy.beats.beat3.eyebrow}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-semibold tracking-[-0.03em] leading-[1.08] heading-gradient">
              {copy.beats.beat3.headline}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-white/65">
              {copy.beats.beat3.subcopy}
            </p>

            {/* Telemetry Micro-Pill */}
            <div className="inline-flex items-center gap-3.5 rounded-full border border-white/10 bg-[#0D0D10]/75 backdrop-blur-md px-4 py-2 text-xs">
              <span className="flex items-center gap-1.5 font-mono text-[#F2D2A9]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C88A55] animate-pulse" />
                {copy.beats.beat3.telemetry.pressure}
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span className="font-mono text-white/85">
                {copy.beats.beat3.telemetry.temp}
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/15" />
              <span className="hidden sm:inline text-[10px] tracking-[0.18em] uppercase text-white/50">
                {copy.beats.beat3.telemetry.status}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            BEAT 5 — RESOLUTION & CTA (85–100% scroll)
        ============================================================ */}
        <motion.div
          style={{ opacity: resOpacity, y: resY }}
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 ${
            ctaInteractive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C88A55]/30 bg-[#070707]/60 backdrop-blur-md px-3.5 py-1 text-[10px] font-medium tracking-[0.28em] uppercase text-[#F2D2A9]">
              <Sparkles className="w-3 h-3 text-[#C88A55]" />
              {copy.beats.resolution.eyebrow}
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.04] heading-gradient drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
              {copy.beats.resolution.headline}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              {copy.beats.resolution.subheadline}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenExperience}
                className="cta-gradient-border group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium text-white cursor-pointer"
              >
                <span>{copy.beats.resolution.primaryCta}</span>
                <ArrowRight className="w-4 h-4 text-[#F2D2A9] transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onScrollToSpecs}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <span>{copy.beats.resolution.secondaryCta}</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#C88A55]" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            RIGHT-EDGE EDITORIAL CHAPTER PROGRESS RAIL (Desktop)
        ============================================================ */}
        <aside
          className="hidden lg:flex flex-col items-end gap-3 absolute right-6 top-1/2 -translate-y-1/2 z-40"
          aria-label="Story chapters"
        >
          <div className="relative flex flex-col items-end gap-3.5 pr-4">
            {/* Continuous vertical hairline track */}
            <div className="absolute right-0 top-1 bottom-1 w-px bg-white/10 overflow-hidden rounded-full">
              <motion.div
                style={{ scaleY: progressScaleY }}
                className="w-full h-full origin-top bg-gradient-to-b from-[#C88A55] to-[#F2D2A9]"
              />
            </div>

            {copy.chapters.map((label, index) => {
              const isActive = activeBeat === index;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => scrollToProgress(CHAPTER_PROGRESS[index])}
                  className="group flex items-center gap-2.5 cursor-pointer py-0.5"
                >
                  <span
                    className={`text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                      isActive
                        ? "text-[#F2D2A9] opacity-100 translate-x-0"
                        : "text-white/40 opacity-0 group-hover:opacity-80 translate-x-1 group-hover:translate-x-0"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-4 bg-[#F2D2A9] shadow-[0_0_8px_rgba(242,210,169,0.7)]"
                        : "w-1.5 bg-white/25 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}
