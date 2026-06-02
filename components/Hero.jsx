'use client';

/*
 * Hero — Stana Interior editorial split-layout
 *
 * Layout logic (BoConcept-inspired):
 *  • Full-viewport-height, two-column asymmetric split
 *  • LEFT (44%): editorial headline typography + location switcher + CTAs
 *  • RIGHT (56%): dual stacked image frames showing the luxury portfolio
 *
 * Location switcher:
 *  • Two pill tabs — [Abuja Portfolio] [Lagos Portfolio]
 *  • Active tab drives which image pair is displayed (animated swap via Framer Motion)
 *  • Abuja → warm minimalist interiors; Lagos → coastal contemporary
 *
 * Entrance animation: staggered fade-up on text, fade-in on image — simulating
 * a premium editorial reveal (not a page load "pop").
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';

const PORTFOLIOS = {
  abuja: {
    label: 'Abuja Portfolio',
    city: 'Abuja, FCT',
    tagline: 'Maitama · Asokoro · Wuse II',
    imgPrimary: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=88',
    imgSecondary: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=700&q=85',
    captionPrimary: 'Project METH — Warm Minimalist Haven · Maitama, Abuja',
    captionSecondary: 'Project VISTA — Executive Suite · Asokoro, Abuja',
  },
  lagos: {
    label: 'Lagos Portfolio',
    city: 'Lagos Island',
    tagline: 'Ikoyi · Victoria Island · Lekki Phase 1',
    imgPrimary: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=88',
    imgSecondary: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=700&q=85',
    captionPrimary: 'Project BS — Bespoke Intentional Kitchen · Ikoyi, Lagos',
    captionSecondary: 'Project NOVA — Coastal Contemporary Suite · Victoria Island',
  },
};

export default function Hero() {
  const [activeCity, setActiveCity] = useState('abuja');
  const portfolio = PORTFOLIOS[activeCity];

  return (
    <section
      id="studio"
      className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row bg-[#F8F7F4] overflow-hidden"
    >
      {/* ─── LEFT — Editorial text column ─────────────────────────────────── */}
      <div className="relative z-10 w-full lg:w-[44%] flex flex-col px-6 lg:pl-16 xl:pl-24 lg:pr-10 pt-32 lg:pt-36 pb-12">

        {/* Overline label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="label-overline text-[#0B2564]/60 mb-10"
        >
          Award-Winning Interior Design · Nigeria
        </motion.p>

        {/* Main editorial headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="font-serif font-medium text-[clamp(3rem,5.2vw,5.5rem)] leading-[1.02] text-[#1C1C1C] mb-8"
        >
          Intentional<br />
          Spaces,<br />
          <span className="italic text-[#0B2564]">Structural</span><br />
          Elegance.
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.5 }}
          className="text-charcoal-400 text-[14px] leading-[1.9] max-w-[340px] mb-10 font-light"
        >
          We design and build Nigeria's most distinguished residences —
          from structural renovation to bespoke joinery, textured wall
          plasters, and complete space-styling across Abuja and Lagos.
        </motion.p>

        {/* ── Location Switcher ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex items-center gap-1 mb-10 p-1 border border-[#E8E5DF] bg-white/60 w-fit"
        >
          {Object.entries(PORTFOLIOS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActiveCity(key)}
              className={`flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-[0.18em] uppercase font-medium transition-all duration-300 ${
                activeCity === key
                  ? 'bg-[#0B2564] text-[#F8F7F4]'
                  : 'text-charcoal-400 hover:text-[#0B2564]'
              }`}
            >
              <MapPin size={9} strokeWidth={2} />
              {key === 'abuja' ? 'Abuja' : 'Lagos'}
            </button>
          ))}
        </motion.div>

        {/* Active location sub-label */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeCity}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="label-overline text-charcoal-200 mb-10"
          >
            {portfolio.tagline}
          </motion.p>
        </AnimatePresence>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-8"
        >
          <a
            href="#consult"
            className="px-7 py-3.5 bg-[#0B2564] text-[#F8F7F4] text-[10px] tracking-[0.22em] uppercase font-medium hover:bg-[#143591] transition-colors duration-300"
          >
            Begin Your Consultation
          </a>
          <a
            href="#portfolio"
            className="text-[10px] tracking-[0.2em] uppercase text-charcoal-300 hover:text-[#0B2564] transition-colors duration-300 border-b border-charcoal-100 hover:border-[#0B2564] pb-0.5"
          >
            View Portfolio
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-auto flex items-center gap-2 text-charcoal-200 pt-10"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            <ArrowDown size={12} strokeWidth={1.5} />
          </motion.div>
          <span className="label-overline text-[9px]">Explore the Studio</span>
        </motion.div>
      </div>

      {/* ─── RIGHT — Dual image frame grid ────────────────────────────────── */}
      <div className="relative z-10 w-full lg:flex-1 grid grid-rows-[60%_40%] lg:grid-rows-[65%_35%] overflow-hidden">

        {/* Primary image — large top frame */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={`${activeCity}-primary`}
              src={portfolio.imgPrimary}
              alt={portfolio.captionPrimary}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </AnimatePresence>

          {/* Image caption */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`${activeCity}-cap-primary`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-4 left-4 text-[9px] tracking-[0.28em] uppercase text-white/60"
            >
              {portfolio.captionPrimary}
            </motion.p>
          </AnimatePresence>

          {/* City badge — top-right overlay */}
          <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-[#0B2564]/80 backdrop-blur-sm px-3 py-1.5">
            <MapPin size={9} strokeWidth={2} className="text-white/70" />
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/80">{portfolio.city}</span>
          </div>
        </div>

        {/* Secondary image — smaller bottom frame */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={`${activeCity}-secondary`}
              src={portfolio.imgSecondary}
              alt={portfolio.captionSecondary}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`${activeCity}-cap-secondary`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-4 left-4 text-[9px] tracking-[0.28em] uppercase text-white/55"
            >
              {portfolio.captionSecondary}
            </motion.p>
          </AnimatePresence>

          {/* Subtle navy overlay accent on bottom frame */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2564]/30 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Mobile image strip (shows below text on small screens) */}
      <div className="lg:hidden h-72 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${activeCity}-mobile`}
            src={portfolio.imgPrimary}
            alt={portfolio.captionPrimary}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
