'use client';

/*
 * ProjectsRegistry — Stana Interior flagship projects gallery
 *
 * Grid layout:
 *  • Asymmetric masonry-style 4-card grid on desktop (2 large + 2 standard)
 *  • Cards display project thumbnail with project codename overlay
 *  • On hover: full metadata panel slides up from the bottom:
 *      — Project code, full name, location sub-sector, scope, delivery year
 *  • Framer Motion: smooth overlay reveal on card hover (whileHover variant)
 *  • "Load More" placeholder — signals depth of portfolio without overwhelm
 *
 * Image sourcing: Unsplash high-res luxury interior photography.
 */

import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    code: 'Project METH',
    name: 'Warm Minimalist Haven',
    location: 'Maitama, Abuja',
    scope: 'Full-Home Remodeling · 5-Bedroom Duplex',
    year: '2024',
    category: 'Residential',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85',
    large: true,
  },
  {
    code: 'Intentional Luxury Kitchens',
    name: 'Bespoke Intentional Kitchen',
    location: 'Ikoyi, Lagos',
    scope: 'Kitchen Renovation · Custom Joinery',
    year: '2024',
    category: 'Kitchen',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85',
    large: false,
  },
  {
    code: 'Project VISTA',
    name: 'Executive Suite — Asokoro',
    location: 'Asokoro, Abuja',
    scope: 'Master Suite · Custom Furniture · Lighting',
    year: '2023',
    category: 'Suite',
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=85',
    large: false,
  },
  {
    code: 'Project NOVA',
    name: 'Coastal Contemporary Residence',
    location: 'Victoria Island, Lagos',
    scope: 'Full-Home Remodeling · 4-Bedroom Penthouse',
    year: '2023',
    category: 'Residential',
    img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=85',
    large: true,
  },
];

/*
 * ProjectCard hover strategy — pure CSS group-hover
 *
 * Root cause of the previous bug: mixing object-based scroll animation
 * (initial/whileInView) with variant-based hover (whileHover="hover") on the
 * same motion.div caused Framer Motion to never apply the overlay's "rest"
 * variant on first render, so the overlay appeared visible immediately.
 *
 * Fix: Framer Motion handles scroll entrance only (on the outer wrapper).
 * All hover effects — image zoom, label fade-out, overlay slide-up — are
 * driven by Tailwind group-hover CSS, which has no render-timing ambiguity.
 */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden group cursor-pointer ${
        project.large ? 'row-span-2' : 'row-span-1'
      }`}
      style={{ aspectRatio: project.large ? '3/4' : '4/3' }}
    >
      {/* Project image — slow Ken Burns zoom on hover */}
      <img
        src={project.img}
        alt={`${project.code} — ${project.name}`}
        className="absolute inset-0 w-full h-full object-cover
                   transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                   group-hover:scale-105"
        draggable={false}
      />

      {/* Persistent bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Default bottom label — fades out when overlay appears */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transition-opacity duration-300 group-hover:opacity-0">
        <p className="text-[9px] tracking-[0.3em] uppercase text-white/50 mb-1">
          {project.category} · {project.year}
        </p>
        <p className="font-serif font-medium text-[clamp(1.1rem,2vw,1.5rem)] text-white leading-snug">
          {project.code}
        </p>
      </div>

      {/* Hover overlay — hidden by default (opacity-0 + translate-y-4), revealed on hover.
          Single-line className is required so Tailwind JIT can statically extract every token. */}
      <div className="absolute inset-0 z-20 bg-[#0B2564]/92 p-6 lg:p-8 flex flex-col justify-end opacity-0 translate-y-4 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">

        {/* Category pill */}
        <span className="inline-block w-fit px-3 py-1 border border-white/20 text-[9px] tracking-[0.28em] uppercase text-white/60 mb-4">
          {project.category}
        </span>

        {/* Project headline */}
        <h3 className="font-serif font-medium text-[clamp(1.5rem,2.8vw,2.2rem)] text-white leading-snug mb-1">
          {project.code}
        </h3>
        <p className="font-serif italic text-[16px] text-[#6A92E0] mb-5">
          {project.name}
        </p>

        {/* Metadata rows */}
        <div className="space-y-2.5 border-t border-white/[0.12] pt-5 mb-6">
          <div className="flex items-center gap-2.5">
            <MapPin size={10} strokeWidth={1.75} className="text-white/40 flex-shrink-0" />
            <span className="text-[12px] text-white/70 font-light">{project.location}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 w-2.5 h-px bg-white/30 flex-shrink-0" />
            <span className="text-[12px] text-white/60 font-light leading-relaxed">{project.scope}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-px bg-white/30 flex-shrink-0" />
            <span className="text-[11px] text-white/40 font-light tracking-wider">Delivered {project.year}</span>
          </div>
        </div>

        {/* CTA link */}
        <a href="#consult" className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors group/link">
          Enquire About This Space
          <ArrowUpRight size={12} strokeWidth={1.75} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  );
}

export default function ProjectsRegistry() {
  return (
    <section className="bg-[#F2F0EC] py-24 lg:py-36" id="portfolio">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16"
        >
          <div>
            <p className="label-overline text-[#0B2564]/50 mb-5">
              Projects Registry
            </p>
            <h2 className="font-serif font-medium text-[clamp(2.2rem,4.5vw,4rem)] text-[#1C1C1C] leading-tight">
              Selected<br />
              <span className="italic text-[#0B2564]">Works</span>
            </h2>
          </div>
          <div className="lg:text-right">
            <p className="text-charcoal-400 text-[13px] leading-relaxed max-w-xs font-light mb-4">
              A curated registry of flagship residential and hospitality projects
              across Abuja and Lagos — each delivered to white-glove completion.
            </p>
            <div className="flex items-center gap-4 lg:justify-end">
              <span className="label-overline text-charcoal-200 text-[9px]">Abuja</span>
              <span className="w-px h-3 bg-charcoal-100" />
              <span className="label-overline text-charcoal-200 text-[9px]">Lagos</span>
            </div>
          </div>
        </motion.div>

        {/*
          Asymmetric grid:
          — Desktop 4-col: col-span-2 for large cards, col-span-2 for standard pairs
          — Each large card spans 2 rows visually (tall portrait format)
          — Layout: [METH large | BS, VISTA stacked] [NOVA large | ...]
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Large card 1 — spans 2 cols and 2 rows */}
          <div className="sm:col-span-1 lg:col-span-2 lg:row-span-2">
            <div className="h-full min-h-[460px] lg:min-h-[600px] relative overflow-hidden group" style={{ aspectRatio: undefined }}>
              <ProjectCard project={PROJECTS[0]} index={0} />
            </div>
          </div>

          {/* Standard card — Project BS */}
          <div className="relative overflow-hidden min-h-[300px]">
            <ProjectCard project={PROJECTS[1]} index={1} />
          </div>

          {/* Standard card — Project VISTA */}
          <div className="relative overflow-hidden min-h-[300px]">
            <ProjectCard project={PROJECTS[2]} index={2} />
          </div>

          {/* Large card 2 — spans 2 cols */}
          <div className="sm:col-span-2 relative overflow-hidden min-h-[320px]">
            <ProjectCard project={PROJECTS[3]} index={3} />
          </div>
        </div>

        {/* Load more / view all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <button className="flex items-center gap-3 px-10 py-3.5 border border-[#0B2564]/25 text-[10px] tracking-[0.22em] uppercase text-[#0B2564] hover:bg-[#0B2564] hover:text-[#F8F7F4] transition-all duration-300 font-medium">
            View Full Registry
            <ArrowUpRight size={12} strokeWidth={1.75} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
