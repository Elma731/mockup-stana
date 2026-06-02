'use client';

/*
 * BeforeAfterSlider — Stana Interior architectural transformation showcase
 *
 * Interaction model:
 *  • User drags (mouse or touch) a central handle horizontally across the frame
 *  • LEFT of handle: "Before" — raw concrete carcass level, bare walls, no fit-out
 *  • RIGHT of handle: "After" — the same space post-Stana: luxury full interior
 *  • clip-path inset technique: the "After" image clips from the right, so dragging
 *    the handle left reveals more "Before" and right reveals more "After".
 *    No image stretching — both images remain at 100% width, only the mask shifts.
 *
 * Accessibility: role="img" + aria-label on the container.
 * Mobile: touch events fully supported; touch-none prevents page scroll during drag.
 */

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

// Before: client-supplied construction site photo (place in public/before.jpg)
// After: completed luxury interior (Unsplash)
const BEFORE_SRC = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85';
const AFTER_SRC  = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85';

export default function BeforeAfterSlider() {
  const containerRef            = useRef(null);
  const [position, setPosition] = useState(38);   // start showing more "Before"
  const [dragging, setDragging] = useState(false);
  const [touched,  setTouched]  = useState(false); // has user interacted?

  // Core position calculator — clamps to 4%–96% to avoid edge bleed
  const calcPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - left) / width) * 100, 4), 96);
    setPosition(pct);
    if (!touched) setTouched(true);
  }, [touched]);

  const onMouseDown  = useCallback((e) => { e.preventDefault(); setDragging(true); calcPosition(e.clientX); }, [calcPosition]);
  const onMouseMove  = useCallback((e) => { if (dragging) calcPosition(e.clientX); }, [dragging, calcPosition]);
  const onMouseUp    = useCallback(() => setDragging(false), []);
  const onTouchStart = useCallback((e) => { setDragging(true); calcPosition(e.touches[0].clientX); }, [calcPosition]);
  const onTouchMove  = useCallback((e) => { e.preventDefault(); if (dragging) calcPosition(e.touches[0].clientX); }, [dragging, calcPosition]);

  // Global mouseup so drag releases even if cursor leaves the container
  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseUp]);

  return (
    <section className="bg-[#0B2564] py-20 lg:py-32" id="transformation">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10"
        >
          <div>
            <p className="label-overline text-[#6A92E0]/70 mb-4">
              The Transformation Chronicle
            </p>
            <h2 className="font-serif font-medium text-[clamp(2.2rem,4.5vw,3.8rem)] text-[#F8F7F4] leading-tight">
              Before & After
            </h2>
          </div>
          <p className="text-[#6A92E0]/80 text-[13px] leading-relaxed max-w-xs lg:text-right font-light">
            Project METH — Full structural renovation & interior transformation.
            Maitama, Abuja. Delivered 2024.
          </p>
        </motion.div>

        {/* Slider container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1 }}
          ref={containerRef}
          role="img"
          aria-label="Before and after transformation — drag to compare"
          className="relative w-full overflow-hidden select-none touch-none"
          style={{
            aspectRatio: '16/9',
            cursor: dragging ? 'col-resize' : 'ew-resize',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
        >
          {/* ── BEFORE image (full-size base layer) ── */}
          <img
            src={BEFORE_SRC}
            alt="Before — raw construction site, structural carcass level"
            className="absolute inset-0 w-full h-full object-cover object-top"
            draggable={false}
          />

          {/* ── AFTER image — clip-path reveals from the LEFT as slider moves right ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src={AFTER_SRC}
              alt="After — completed luxury interior by Stana Interior"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/*
           * ── LABELS — each masked to its own side ──────────────────────────────
           *
           * Technique: two separate absolutely-positioned label layers, each with
           * its own clipPath that is the INVERSE of the other, so they are always
           * confined to the image area they describe:
           *
           *   "After"  layer: clips inset(0 (100-pos)% 0 0) → visible LEFT of handle
           *   "Before" layer: clips inset(0 0 0 pos%)       → visible RIGHT of handle
           *
           * This means neither label ever "bleeds" into the wrong image side.
           */}

          {/* "After" label — visible only in the After (left) region */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/60 inline-block" />
              <p className="text-[9px] tracking-[0.32em] uppercase text-white/80 font-medium">After</p>
            </div>
          </div>

          {/* "Before" label — visible only in the Before (right) region */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          >
            <div className="absolute top-5 right-5 flex items-center gap-2">
              <p className="text-[9px] tracking-[0.32em] uppercase text-white/50 font-medium">Before</p>
              <span className="w-2 h-2 rounded-full bg-white/30 inline-block" />
            </div>
          </div>

          {/* ── Divider hairline ── */}
          <div
            className="absolute inset-y-0 w-px bg-white/50 pointer-events-none"
            style={{ left: `${position}%` }}
          />

          {/* ── Drag handle ── */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
            style={{ left: `${position}%` }}
          >
            {/* Ping ring — pulses until first interaction */}
            {!touched && (
              <span
                className="absolute inset-0 rounded-full bg-white/25 animate-ping"
                style={{ animationDuration: '2.2s' }}
              />
            )}
            {/* Handle circle */}
            <div
              className={`w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-2xl transition-transform duration-100 ${
                dragging ? 'scale-110' : 'scale-100 hover:scale-105'
              }`}
            >
              <MoveHorizontal size={15} strokeWidth={1.75} className="text-[#0B2564]" />
            </div>
          </div>

          {/* Subtle gradient overlay on far edges for depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0B2564]/20 via-transparent to-[#0B2564]/10" />
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-[#6A92E0]/50 text-[10px] tracking-[0.2em] uppercase text-center"
        >
          Drag to compare · Project METH · Maitama Abuja · 4-bedroom full remodel
        </motion.p>
      </div>
    </section>
  );
}
