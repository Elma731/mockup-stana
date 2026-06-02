'use client';

/*
 * Navbar — Stana Interior sticky navigation
 *
 * UX decisions:
 *  • Starts transparent so the hero image bleeds to the very top
 *  • On scroll >60px → activates glass-light (frosted white), matching BoConcept's
 *    clean, editorial nav style on white-canvas backgrounds
 *  • Logo: circular Stana SVG + wordmark side by side — intentional brand pairing
 *  • CTA button: solid royal navy fill — the single high-contrast target on the bar
 *  • Mobile: slide-in drawer with full-height background, soft border separators
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import StanaLogo from './StanaLogo';

const NAV_LINKS = [
  { label: 'The Studio',       href: '#studio'    },
  { label: 'Portfolio',        href: '#portfolio' },
  { label: 'Design Training',  href: '#training'  },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      {/* Main bar */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? 'bg-[#F8F7F4]/90 backdrop-blur-2xl border-b border-[#0B2564]/[0.08] shadow-[0_1px_20px_rgba(0,0,0,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16 lg:h-20">

          {/* Brand lock-up — circular logo + wordmark */}
          <a href="#" className="flex items-center gap-3 group" aria-label="Stana Interior homepage">
            <span className="transition-transform duration-300 group-hover:scale-105">
              <StanaLogo size={36} variant="default" />
            </span>
            <span
              className={`hidden sm:block font-serif font-normal text-[15px] tracking-[0.18em] uppercase transition-colors duration-300 ${
                scrolled ? 'text-[#0B2564]' : 'text-[#0B2564]'
              }`}
            >
              Stana Interior
            </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="label-overline text-charcoal-400 hover:text-[#0B2564] transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA — solid navy pill, the single primary action on the bar */}
          <a
            href="#consult"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-[#0B2564] text-[#F8F7F4] text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#143591] active:bg-[#000C33] transition-colors duration-300"
          >
            Begin Your Consultation
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-[#0B2564] hover:text-[#143591] transition-colors p-1"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen
              ? <X size={20} strokeWidth={1.5} />
              : <Menu size={20} strokeWidth={1.5} />
            }
          </button>
        </div>
      </div>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-[#F8F7F4] border-b border-[#E8E5DF] px-6 pb-8 pt-2 space-y-1"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 border-b border-[#E8E5DF] label-overline text-charcoal-400 hover:text-[#0B2564] transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="pt-5">
              <a
                href="#consult"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center px-7 py-3 bg-[#0B2564] text-[#F8F7F4] text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#143591] transition-colors"
              >
                Begin Your Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
