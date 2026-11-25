"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { ContentDictionary } from "@/data/content";

interface ExperienceModalProps {
  open: boolean;
  onClose: () => void;
  copy: ContentDictionary;
}

export function ExperienceModal({ open, onClose, copy }: ExperienceModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setVenue("");
      setEmail("");
    }, 280);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/75 backdrop-blur-md"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0D0D10]/95 backdrop-blur-2xl p-7 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label={copy.modal.close}
              className="absolute top-5 right-5 rounded-full p-2 text-white/45 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full border border-[#C88A55]/45 bg-[#C88A55]/15 flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#F2D2A9]" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight heading-gradient">
                  {copy.modal.successTitle}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {copy.modal.successDesc}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="cta-gradient-border rounded-full px-6 py-2.5 text-sm font-medium text-white cursor-pointer"
                  >
                    {copy.modal.close}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-medium tracking-[0.28em] uppercase text-[#C88A55]">
                  {copy.modal.eyebrow}
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight heading-gradient">
                  {copy.modal.title}
                </h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">
                  {copy.modal.subtitle}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs text-white/55 mb-1.5">
                      {copy.modal.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={copy.modal.namePlaceholder}
                      className="w-full rounded-xl border border-white/10 bg-[#070707]/85 px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#C88A55]/70 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/55 mb-1.5">
                      {copy.modal.venueLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder={copy.modal.venuePlaceholder}
                      className="w-full rounded-xl border border-white/10 bg-[#070707]/85 px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#C88A55]/70 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/55 mb-1.5">
                      {copy.modal.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={copy.modal.emailPlaceholder}
                      className="w-full rounded-xl border border-white/10 bg-[#070707]/85 px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#C88A55]/70 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full cta-gradient-border rounded-full py-3 text-sm font-medium text-white cursor-pointer"
                  >
                    {copy.modal.submit}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
