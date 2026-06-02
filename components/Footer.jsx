'use client';

/*
 * Footer — Stana Interior
 *
 * Layout: deep navy background (#071844) — a natural terminus after the light
 * gallery-white sections. Three-column grid on desktop, stacked on mobile.
 *
 * Columns:
 *  1. Brand column — logo lock-up, brief positioning statement, social icons
 *  2. Navigation — quick links to all sections
 *  3. Contact — office addresses for both cities + email/phone
 *
 * Bottom bar: copyright + legal line + "Design Training" CTA pill
 */

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';
import StanaLogo from './StanaLogo';

const NAV_COLS = [
  {
    heading: 'The Firm',
    links: [
      { label: 'About Stana',       href: '#studio'    },
      { label: 'Our Process',       href: '#studio'    },
      { label: 'Projects Registry', href: '#portfolio' },
      { label: 'Design Training',   href: '#training'  },
      { label: 'Press & Awards',    href: '#'          },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Full-Home Remodeling',   href: '#consult' },
      { label: 'Bespoke Furniture',      href: '#consult' },
      { label: 'Structural Renovation',  href: '#consult' },
      { label: 'Interior Consulting',    href: '#consult' },
      { label: 'Design Academy',         href: '#consult' },
    ],
  },
];

const OFFICES = [
  {
    city: 'Abuja',
    address: '14 Aguiyi Ironsi Street,\nMaitama, FCT — Abuja',
    phone: '+234 803 100 0000',
    email: 'abuja@stana.ng',
  },
  {
    city: 'Lagos',
    address: '6B Glover Road,\nIkoyi, Lagos Island — Lagos',
    phone: '+234 808 200 0000',
    email: 'lagos@stana.ng',
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#071844] text-[#F8F7F4]">

      {/* Training CTA band — navy-on-navy with a light border separation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-b border-white/[0.06] py-8"
        id="training"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="label-overline text-[#6A92E0]/50 mb-1">Stana Design Academy</p>
            <p className="font-serif font-medium text-[20px] text-[#F8F7F4]">
              Train with Nigeria's leading interior design firm.
            </p>
          </div>
          <a
            href="#consult"
            className="inline-flex items-center gap-2 px-7 py-3 border border-white/20 text-[10px] tracking-[0.22em] uppercase text-white/80 hover:bg-white hover:text-[#0B2564] transition-all duration-300 whitespace-nowrap self-start sm:self-auto"
          >
            Explore the Programme
          </a>
        </div>
      </motion.div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <StanaLogo size={38} variant="default" />
              <span className="font-serif font-normal text-[14px] tracking-[0.2em] uppercase text-[#F8F7F4]">
                Stana Interior
              </span>
            </div>
            <p className="text-[#6A92E0]/70 text-[13px] leading-[1.85] font-light max-w-[240px] mb-8">
              Award-winning interior design and structural renovation across
              Abuja and Lagos — delivering intentional, enduring spaces for
              Nigeria's most discerning clients.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Facebook,  label: 'Facebook',  href: '#' },
                { Icon: Linkedin,  label: 'LinkedIn',  href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Stana Interior on ${label}`}
                  className="w-8 h-8 rounded-full border border-white/[0.12] flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                >
                  <Icon size={13} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Columns 2 & 3 — Navigation */}
          {NAV_COLS.map((col) => (
            <div key={col.heading} className="lg:col-span-1">
              <p className="label-overline text-[9px] text-[#6A92E0]/40 mb-6">
                {col.heading}
              </p>
              <ul className="space-y-3.5">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[#6A92E0]/70 text-[13px] font-light hover:text-white transition-colors duration-300"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4 — Contact / Offices */}
          <div className="lg:col-span-1">
            <p className="label-overline text-[9px] text-[#6A92E0]/40 mb-6">
              Our Offices
            </p>
            <div className="space-y-8">
              {OFFICES.map((office) => (
                <div key={office.city}>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                    {office.city}
                  </p>
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin size={11} strokeWidth={1.5} className="text-[#6A92E0]/40 mt-0.5 flex-shrink-0" />
                    <p className="text-[13px] text-[#6A92E0]/65 font-light leading-[1.7] whitespace-pre-line">
                      {office.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Phone size={10} strokeWidth={1.5} className="text-[#6A92E0]/40" />
                    <a
                      href={`tel:${office.phone.replace(/\s/g, '')}`}
                      className="text-[12px] text-[#6A92E0]/65 font-light hover:text-white transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={10} strokeWidth={1.5} className="text-[#6A92E0]/40" />
                    <a
                      href={`mailto:${office.email}`}
                      className="text-[12px] text-[#6A92E0]/65 font-light hover:text-white transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] text-white/25 font-light">
            © {new Date().getFullYear()} Stana Interior Ltd. All rights reserved. Abuja · Lagos · Nigeria.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[10px] text-white/25 hover:text-white/50 transition-colors tracking-wide">
              Privacy Policy
            </a>
            <a href="#" className="text-[10px] text-white/25 hover:text-white/50 transition-colors tracking-wide">
              Terms of Engagement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
