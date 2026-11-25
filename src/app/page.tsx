"use client";

import React, { useRef, useState } from "react";
import { CONTENT, type Locale } from "@/data/content";
import { Navbar } from "@/components/Navbar";
import { ScrollytellingStage } from "@/components/ScrollytellingStage";
import { SpecsSection } from "@/components/SpecsSection";
import { ExperienceModal } from "@/components/ExperienceModal";

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [modalOpen, setModalOpen] = useState(false);
  const stageRef = useRef<HTMLElement | null>(null);

  const copy = CONTENT[locale];

  const handleNavigate = (target: string, progress?: number) => {
    if (target === "stage" && stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const stageTop = window.scrollY + rect.top;
      const scrollable = stageRef.current.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: stageTop + scrollable * (progress ?? 0),
        behavior: "smooth",
      });
      return;
    }

    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#070707] text-white/90">
      <Navbar
        copy={copy}
        locale={locale}
        onToggleLocale={setLocale}
        onNavigate={handleNavigate}
        onOpenExperience={() => setModalOpen(true)}
      />

      <ScrollytellingStage
        copy={copy}
        stageRef={stageRef}
        onOpenExperience={() => setModalOpen(true)}
        onScrollToSpecs={() => handleNavigate("specs")}
      />

      <SpecsSection
        copy={copy}
        onOpenExperience={() => setModalOpen(true)}
      />

      <ExperienceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        copy={copy}
      />
    </main>
  );
}
