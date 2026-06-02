'use client';

/*
 * DesignJourney — Stana Interior three-step service pillar breakdown
 *
 * Layout (BoConcept-inspired block-based structure):
 *  • Section header: overline label + bold serif headline, left-anchored
 *  • Three-column pillar grid — each column is a numbered service stage
 *  • Alternating accent border on card tops signals visual progression (01→02→03)
 *  • On mobile: single column scroll; on tablet: 2-col; on desktop: 3-col
 *
 * Staggered scroll-triggered entrance: each pillar animates in with a slight
 * delay offset to create a cascading reveal that signals depth and attention to detail.
 */

import { motion } from 'framer-motion';
import { Compass, PenTool, CheckSquare } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Compass,
    title: 'Context Discovery',
    subtitle: 'Understanding Your World',
    description:
      'We begin by listening — deeply. Your lifestyle rhythms, spatial aspirations, architectural constraints, and family dynamics are the true brief. Through structured consultations and site walkthroughs, our principal designers map your environment before a single line is drawn.',
    highlights: [
      'One-on-one principal designer briefing',
      'Spatial flow & lifestyle mapping',
      'Structural audit & feasibility review',
      'Aesthetic direction board co-creation',
    ],
    accent: '#0B2564',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Material & Spatial Co-creation',
    subtitle: 'Where Vision Becomes Architecture',
    description:
      'This is where precision meets imagination. We develop full joinery blueprints, select premium fabric swatches, specify multi-layered lighting arrays, and curate texturized wall plasters — all calibrated to your approved aesthetic direction and budget envelope.',
    highlights: [
      'Custom joinery & millwork blueprints',
      'Premium material sourcing (local & imported)',
      'Lighting design & electrical specification',
      'Bespoke furniture fabrication drawings',
    ],
    accent: '#143591',
  },
  {
    number: '03',
    icon: CheckSquare,
    title: 'Handover & Turnkey Realization',
    subtitle: 'End-to-End Project Delivery',
    description:
      'We manage every phase through to physical completion — overseeing structural masonry, coordinating certified trades, supervising custom furniture installation, and conducting multi-point quality inspections before your formal white-glove handover.',
    highlights: [
      'Site coordination & trade supervision',
      'Furniture installation & placement',
      'Art curation & space-styling',
      'Defects liability & after-care protocol',
    ],
    accent: '#2552C0',
  },
];

export default function DesignJourney() {
  return (
    <section className="bg-[#F8F7F4] py-24 lg:py-36" id="studio">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20"
        >
          <div>
            <p className="label-overline text-[#0B2564]/50 mb-5">
              Our Process
            </p>
            <h2 className="font-serif font-medium text-[clamp(2.2rem,4.5vw,4rem)] text-[#1C1C1C] leading-tight max-w-lg">
              The Stana Design<br />
              <span className="italic text-[#0B2564]">Journey</span>
            </h2>
          </div>
          <p className="text-charcoal-400 text-[13px] leading-relaxed max-w-sm font-light lg:text-right">
            A structured, three-stage turnkey process — from your first brief to the
            moment you walk through a fully realised space.
          </p>
        </motion.div>

        {/* Three-column pillar grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8E5DF]">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#F8F7F4] p-8 lg:p-10 flex flex-col group"
              >
                {/* Top accent bar — colour-coded per stage */}
                <div
                  className="h-0.5 w-10 mb-8 transition-all duration-500 group-hover:w-16"
                  style={{ backgroundColor: step.accent }}
                />

                {/* Step number + icon row */}
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="font-serif font-normal text-[clamp(3.5rem,5vw,5rem)] leading-none"
                    style={{ color: `${step.accent}14` }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <Icon
                    size={20}
                    strokeWidth={1.25}
                    className="mt-2 transition-colors duration-300"
                    style={{ color: step.accent }}
                  />
                </div>

                {/* Title + subtitle */}
                <p className="label-overline text-[#0B2564]/40 mb-2">
                  Stage {step.number}
                </p>
                <h3 className="font-serif font-medium text-[clamp(1.5rem,2.2vw,2rem)] text-[#1C1C1C] leading-snug mb-2">
                  {step.title}
                </h3>
                <p className="text-[12px] tracking-[0.1em] text-charcoal-300 uppercase mb-5 font-light">
                  {step.subtitle}
                </p>

                {/* Description */}
                <p className="text-charcoal-400 text-[14px] leading-[1.85] font-light mb-8 flex-1">
                  {step.description}
                </p>

                {/* Deliverable bullets */}
                <ul className="space-y-2.5 border-t border-[#E8E5DF] pt-6">
                  {step.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: step.accent }}
                      />
                      <span className="text-charcoal-400 text-[12px] leading-[1.7] font-light">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA band */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#E8E5DF] pt-10"
        >
          <div>
            <p className="font-serif font-normal text-[18px] text-[#1C1C1C]">
              Ready to begin your project?
            </p>
            <p className="text-charcoal-400 text-[13px] font-light mt-1">
              Consultations are by appointment — Abuja & Lagos offices.
            </p>
          </div>
          <a
            href="#consult"
            className="flex items-center gap-3 px-8 py-3.5 bg-[#0B2564] text-[#F8F7F4] text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#143591] transition-colors duration-300 whitespace-nowrap"
          >
            Request a Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
