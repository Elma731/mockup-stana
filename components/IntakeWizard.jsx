'use client';

/*
 * IntakeWizard — Stana Interior high-net-worth client intake form
 *
 * UX philosophy:
 *  Replaces a generic contact form with a beautiful, conversational multi-step
 *  questionnaire. Each step auto-advances after a selection so the experience
 *  feels like a premium concierge conversation, not a form.
 *
 * Step 1 — Project Scope   : 3 large visual choice tiles (Full Remodel, Bespoke Furniture, Design Academy)
 * Step 2 — Location        : Abuja / Lagos / Both / Outside Nigeria
 * Step 3 — Budget Envelope : 5 prestige-tier ranges in Nigerian Naira + USD
 * Step 4 — Your Details    : Name, phone, email, brief — minimal, light inputs
 *
 * Transition: AnimatePresence with directional slide for a carousel-like feel.
 * Confirmation: clean success state with a unique project reference number.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Sofa, GraduationCap,
  MapPin, DollarSign, ArrowLeft, ArrowRight, Check,
} from 'lucide-react';

/* ── Data constants ─────────────────────────────────────────────────────── */

const SCOPES = [
  {
    id: 'full-remodel',
    Icon: Home,
    title: 'Full Home Remodeling',
    desc: 'Complete structural and interior transformation — any build stage.',
    tag: 'Most Requested',
  },
  {
    id: 'bespoke-furniture',
    Icon: Sofa,
    title: 'Bespoke Furniture Fabrication',
    desc: 'Custom joinery, millwork, and upholstered pieces designed for your space.',
    tag: null,
  },
  {
    id: 'design-academy',
    Icon: GraduationCap,
    title: 'Interior Design Professional Academy',
    desc: 'Join Stana\'s structured programme for aspiring interior designers.',
    tag: 'Now Enrolling',
  },
];

const LOCATIONS = [
  { id: 'abuja',    label: 'Abuja (FCT)',           sub: 'Maitama · Asokoro · Wuse II · Jabi' },
  { id: 'lagos',    label: 'Lagos State',           sub: 'Ikoyi · Victoria Island · Lekki Phase 1' },
  { id: 'both',     label: 'Abuja & Lagos',         sub: 'Multi-city project scope' },
  { id: 'diaspora', label: 'Outside Nigeria',       sub: 'International remote consultation available' },
];

const BUDGETS = [
  { value: '30-80m',   label: '₦30M – ₦80M',              sub: 'Renovation & fit-out'  },
  { value: '80-200m',  label: '₦80M – ₦200M',             sub: 'Premium full-home'     },
  { value: '200-500m', label: '₦200M – ₦500M',            sub: 'High-net-worth tier'   },
  { value: '500m+',    label: '₦500M+',                   sub: 'Ultra-luxury & villas'  },
  { value: 'usd',      label: 'USD / GBP (Diaspora)',      sub: 'International billing'  },
];

/* ── Animation variant — directional slide between steps ── */
const slide = {
  enter:  (d) => ({ opacity: 0, x: d > 0 ? 24 : -24  }),
  center:         { opacity: 1, x: 0                  },
  exit:   (d) => ({ opacity: 0, x: d > 0 ? -24 : 24  }),
};

/* ── Reusable choice card ─────────────────────────────────────────────── */
function ChoiceCard({ id, Icon, title, desc, tag, sub, selected, onSelect, layout = 'icon' }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`relative text-left w-full p-5 lg:p-6 border transition-all duration-250 group ${
        selected
          ? 'border-[#0B2564] bg-[#0B2564]/[0.04]'
          : 'border-[#E8E5DF] bg-white hover:border-[#0B2564]/40 hover:bg-white'
      }`}
    >
      {/* Selected check */}
      {selected && (
        <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#0B2564] flex items-center justify-center">
          <Check size={10} strokeWidth={2.5} className="text-white" />
        </span>
      )}

      {/* Tag badge */}
      {tag && !selected && (
        <span className="absolute top-4 right-4 text-[8px] tracking-[0.28em] uppercase text-[#0B2564]/50">
          {tag}
        </span>
      )}

      {/* Icon (only for scope step) */}
      {layout === 'icon' && Icon && (
        <Icon
          size={18}
          strokeWidth={1.25}
          className={`mb-4 transition-colors duration-300 ${
            selected ? 'text-[#0B2564]' : 'text-charcoal-300 group-hover:text-[#0B2564]/60'
          }`}
        />
      )}

      <p className={`font-serif font-medium text-[17px] leading-snug mb-1.5 ${
        selected ? 'text-[#0B2564]' : 'text-[#1C1C1C]'
      }`}>
        {title || id}
      </p>

      {desc && (
        <p className="text-charcoal-400 text-[12px] leading-[1.7] font-light">{desc}</p>
      )}
      {sub && (
        <p className="text-charcoal-200 text-[11px] leading-[1.6] font-light mt-1">{sub}</p>
      )}
    </button>
  );
}

/* ── Progress bar ── */
function StepBar({ step, total = 4 }) {
  return (
    <div className="flex items-center gap-2 mb-12">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-px flex-1 transition-all duration-500 ${
            i < step ? 'bg-[#0B2564]' : 'bg-[#E8E5DF]'
          }`}
        />
      ))}
    </div>
  );
}

/* ── Main wizard ─────────────────────────────────────────────────────── */
export default function IntakeWizard() {
  const [step,      setStep]      = useState(1);
  const [direction, setDirection] = useState(1);
  const [scope,     setScope]     = useState(null);
  const [location,  setLocation]  = useState(null);
  const [budget,    setBudget]    = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', brief: '' });

  const goTo = (n) => { setDirection(n > step ? 1 : -1); setStep(n); };

  const inputCls =
    'w-full bg-white border border-[#E8E5DF] text-[#1C1C1C] px-4 py-3 text-[13px] placeholder:text-charcoal-200 focus:outline-none focus:border-[#0B2564]/50 transition-colors duration-200';

  /* Generate a short project reference on submission */
  const projectRef = `STA-${scope === 'design-academy' ? 'EDU' : location?.toUpperCase().slice(0,3) ?? 'ABJ'}-${new Date().getFullYear()}`;

  return (
    <section id="consult" className="bg-[#F8F7F4] py-24 lg:py-36 border-t border-[#E8E5DF]">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-14"
        >
          <p className="label-overline text-[#0B2564]/50 mb-5">
            Begin Your Consultation
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-serif font-medium text-[clamp(2.2rem,4.5vw,4rem)] text-[#1C1C1C] leading-tight">
              High-Net-Worth<br />
              <span className="italic text-[#0B2564]">Intake Wizard</span>
            </h2>
            <p className="text-charcoal-400 text-[13px] font-light max-w-xs leading-relaxed lg:text-right">
              Our principal designer personally reviews every brief and responds within 24 business hours.
            </p>
          </div>
        </motion.div>

        {/* Progress bar */}
        <StepBar step={step} total={4} />

        {/* Animated step container */}
        <div className="relative overflow-hidden min-h-[420px]">
          <AnimatePresence mode="wait" custom={direction}>

            {/* ── STEP 1: Project Scope ── */}
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal-300 mb-6">
                  Step 1 of 4 — What brings you to Stana?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SCOPES.map((item) => (
                    <ChoiceCard
                      key={item.id}
                      {...item}
                      layout="icon"
                      selected={scope === item.id}
                      onSelect={(id) => { setScope(id); goTo(2); }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Location ── */}
            {step === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal-300 mb-6">
                  Step 2 of 4 — Where is the project located?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {LOCATIONS.map((item) => (
                    <ChoiceCard
                      key={item.id}
                      id={item.id}
                      title={item.label}
                      sub={item.sub}
                      layout="text"
                      selected={location === item.id}
                      onSelect={(id) => { setLocation(id); goTo(3); }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => goTo(1)}
                  className="flex items-center gap-2 text-[11px] tracking-wider text-charcoal-300 hover:text-[#0B2564] transition-colors group"
                >
                  <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                  Back
                </button>
              </motion.div>
            )}

            {/* ── STEP 3: Budget ── */}
            {step === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal-300 mb-6">
                  Step 3 of 4 — What is your investment envelope?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                  {BUDGETS.map((item) => (
                    <ChoiceCard
                      key={item.value}
                      id={item.value}
                      title={item.label}
                      sub={item.sub}
                      Icon={DollarSign}
                      layout="text"
                      selected={budget === item.value}
                      onSelect={(id) => { setBudget(id); goTo(4); }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => goTo(2)}
                  className="flex items-center gap-2 text-[11px] tracking-wider text-charcoal-300 hover:text-[#0B2564] transition-colors group"
                >
                  <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                  Back
                </button>
              </motion.div>
            )}

            {/* ── STEP 4: Your Details ── */}
            {step === 4 && !submitted && (
              <motion.div
                key="step-4"
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[11px] tracking-[0.2em] uppercase text-charcoal-300 mb-6">
                  Step 4 of 4 — How should we reach you?
                </p>

                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="max-w-lg space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block label-overline text-[9px] text-[#0B2564]/50 mb-2">
                        Full Name *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Adaeze Okonkwo"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block label-overline text-[9px] text-[#0B2564]/50 mb-2">
                        Phone Number *
                      </label>
                      <input
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+234 801 000 0000"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block label-overline text-[9px] text-[#0B2564]/50 mb-2">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block label-overline text-[9px] text-[#0B2564]/50 mb-2">
                      Project Brief <span className="text-charcoal-200 normal-case tracking-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={4}
                      value={form.brief}
                      onChange={(e) => setForm({ ...form, brief: e.target.value })}
                      placeholder="Describe your space, aesthetic vision, timeline, and any specific requirements or inspiration…"
                      className={`${inputCls} resize-none leading-relaxed`}
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => goTo(3)}
                      className="flex items-center gap-2 text-[11px] tracking-wider text-charcoal-300 hover:text-[#0B2564] transition-colors group"
                    >
                      <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-3 px-8 py-3.5 bg-[#0B2564] text-[#F8F7F4] text-[10px] tracking-[0.22em] uppercase font-medium hover:bg-[#143591] transition-colors duration-300 group"
                    >
                      Submit Intake
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ── SUCCESS STATE ── */}
            {submitted && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-14"
              >
                {/* Success icon */}
                <div className="w-12 h-12 rounded-full border border-[#0B2564]/30 flex items-center justify-center mb-7">
                  <Check size={18} strokeWidth={1.5} className="text-[#0B2564]" />
                </div>

                <h3 className="font-serif font-medium text-[30px] text-[#1C1C1C] mb-3 leading-snug">
                  Your intake has been received.
                </h3>
                <p className="text-charcoal-400 text-[14px] max-w-sm leading-relaxed font-light mb-8">
                  Our principal designer will personally review your brief and reach
                  out within 24 business hours to schedule your complimentary discovery session.
                </p>

                {/* Summary pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {scope && (
                    <span className="px-3 py-1 border border-[#0B2564]/20 text-[9px] tracking-[0.25em] uppercase text-[#0B2564]/60">
                      {SCOPES.find((s) => s.id === scope)?.title ?? scope}
                    </span>
                  )}
                  {location && (
                    <span className="px-3 py-1 border border-[#0B2564]/20 text-[9px] tracking-[0.25em] uppercase text-[#0B2564]/60 flex items-center gap-1.5">
                      <MapPin size={8} strokeWidth={2} />
                      {LOCATIONS.find((l) => l.id === location)?.label ?? location}
                    </span>
                  )}
                </div>

                <p className="label-overline text-[9px] text-charcoal-200">
                  Project Reference: {projectRef}
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
