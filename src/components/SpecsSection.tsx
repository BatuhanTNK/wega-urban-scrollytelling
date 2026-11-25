"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ContentDictionary } from "@/data/content";

interface SpecsSectionProps {
  copy: ContentDictionary;
  onOpenExperience: () => void;
}

export function SpecsSection({ copy, onOpenExperience }: SpecsSectionProps) {
  return (
    <section
      id="specs"
      className="relative z-30 bg-[#070707] border-t border-white/[0.06]"
    >
      {/* Subtle Secondary Obsidian Depth Layer */}
      <div className="relative bg-gradient-to-b from-[#070707] via-[#0D0D10] to-[#070707] py-28 sm:py-36 px-6 sm:px-10">
        {/* Ultra-subtle top ambient hairline glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[540px] h-px bg-gradient-to-r from-transparent via-[#C88A55]/55 to-transparent"
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#C88A55]">
              {copy.specs.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] heading-gradient">
              {copy.specs.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed">
              {copy.specs.subtitle}
            </p>
          </motion.div>

          {/* 3 Engineering Pillars */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.specs.pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 hover:border-[#C88A55]/35 transition-colors duration-500"
              >
                <span className="font-mono text-xs text-[#C88A55]/85">
                  {pillar.index}
                </span>
                <h3 className="mt-4 text-lg font-medium tracking-tight text-white/95">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/55">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Precision Technical Specification Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 rounded-3xl border border-white/[0.08] bg-[#0A0A0C]/80 overflow-hidden"
          >
            <div className="px-6 sm:px-10 py-6 border-b border-white/[0.07] flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-medium tracking-tight text-white/90">
                {copy.specs.tableTitle}
              </h3>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#C88A55]">
                SPEC SHEET
              </span>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {copy.specs.rows.map((row) => (
                <div
                  key={row.label}
                  className="px-6 sm:px-10 py-4.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 items-baseline hover:bg-white/[0.015] transition-colors"
                >
                  <div className="sm:col-span-4 text-xs sm:text-sm text-white/45 tracking-wide">
                    {row.label}
                  </div>
                  <div className="sm:col-span-8 text-sm sm:text-[15px] text-white/88 font-normal">
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Flagship Closing Consultation Banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#12100E] via-[#0B0B0D] to-[#070707] px-7 sm:px-12 py-12 sm:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(200,138,85,0.18)_0%,transparent_70%)] blur-2xl"
              aria-hidden="true"
            />
            <div className="relative max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] heading-gradient">
                {copy.specs.closingBanner.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-white/60 leading-relaxed">
                {copy.specs.closingBanner.desc}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenExperience}
              className="relative cta-gradient-border group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white shrink-0 cursor-pointer"
            >
              <span>{copy.specs.closingBanner.cta}</span>
              <ArrowUpRight className="w-4 h-4 text-[#F2D2A9] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>

          {/* Ultra-minimal Footer */}
          <footer className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <div className="flex items-center gap-2.5">
              <span className="font-semibold tracking-[0.22em] text-white/75">
                WEGA
              </span>
              <span className="text-white/20">•</span>
              <span>{copy.specs.footerNote}</span>
            </div>
            <div className="text-white/35">Urban EVD 3GR Flagship Experience</div>
          </footer>
        </div>
      </div>
    </section>
  );
}
