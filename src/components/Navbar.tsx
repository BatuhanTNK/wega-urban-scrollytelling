"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ContentDictionary, Locale } from "@/data/content";

interface NavbarProps {
  copy: ContentDictionary;
  locale: Locale;
  onToggleLocale: (next: Locale) => void;
  onNavigate: (target: string, progress?: number) => void;
  onOpenExperience: () => void;
}

export function Navbar({
  copy,
  locale,
  onToggleLocale,
  onNavigate,
  onOpenExperience,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#070707]/75 backdrop-blur-xl border-b border-white/[0.07] opacity-100"
          : "bg-transparent border-b border-transparent opacity-65 hover:opacity-100"
      }`}
    >
      <div className="max-w-7xl mx-auto h-14 px-5 sm:px-8 flex items-center justify-between gap-4">
        {/* Left: Clean Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate("stage", 0)}
          className="flex items-baseline gap-2 cursor-pointer group"
        >
          <span className="text-[15px] font-semibold tracking-[0.22em] text-white/95 group-hover:text-white transition-colors">
            WEGA
          </span>
          <span className="text-[11px] font-normal tracking-[0.18em] text-[#C88A55]/90 uppercase">
            Urban
          </span>
        </button>

        {/* Center: Minimalist Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {copy.nav.links.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => onNavigate(link.target, link.progress)}
              className="text-xs font-normal tracking-wide text-white/60 hover:text-white/95 transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Locale Switcher + Primary Gradient-Border CTA */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center rounded-full border border-white/10 bg-[#0D0D10]/70 p-0.5 text-[10px] font-medium tracking-wider"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              onClick={() => onToggleLocale("tr")}
              className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                locale === "tr"
                  ? "bg-white/15 text-white"
                  : "text-white/45 hover:text-white/80"
              }`}
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => onToggleLocale("en")}
              className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                locale === "en"
                  ? "bg-white/15 text-white"
                  : "text-white/45 hover:text-white/80"
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenExperience}
            className="cta-gradient-border rounded-full px-4 py-1.5 text-xs font-medium text-white/95 cursor-pointer"
          >
            {copy.nav.cta}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
