/*
 * StanaLogo — Custom SVG placeholder replicating Stana's heraldic brand mark.
 *
 * Geometry breakdown:
 *  • Outer: white circular containment base
 *  • Inner: royal blue (#0B2564) heraldic shield (flat top, tapered to a point)
 *  • Monogram: angular interlocked "S" and "T" rendered in pure white
 *    — The T crossbar spans the full shield width
 *    — The S shares the T crossbar as its top bar; its two voids read clearly
 *      (upper-right void + lower-left void) to distinguish the S from the T stem
 *
 * Props:
 *  size    — diameter in px (default 40)
 *  variant — 'default' | 'white' | 'navy'
 *    'default' → white circle + navy shield (for transparent / light bg navbars)
 *    'white'   → same; alias for 'default'
 *    'navy'    → navy circle + white shield (for dark section hero overlays)
 */
export default function StanaLogo({ size = 40, variant = 'default' }) {
  const isNavy = variant === 'navy';
  const circFill   = isNavy ? '#0B2564' : '#FFFFFF';
  const shieldFill = isNavy ? '#FFFFFF' : '#0B2564';
  const monoFill   = isNavy ? '#0B2564' : '#FFFFFF';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Stana Interior Logo"
    >
      {/* ── White circular containment ── */}
      <circle cx="50" cy="50" r="48" fill={circFill} />

      {/* ── Royal blue heraldic shield ──
          Classic shape: flat rectangular top third, sides taper inward
          in the lower two-thirds, meeting at a sharp bottom point.      */}
      <path
        d="M21 17 H79 V56 C79 70 65 79 50 87 C35 79 21 70 21 56 Z"
        fill={shieldFill}
      />

      {/* ═══════════════════════════════════════════════════════════════
          INTERLOCKED S + T MONOGRAM
          All white rectangles below sit on the navy shield.

          T crossbar  : x=26–74, y=26–33  (spans full shield width)
          T stem      : x=46–54, y=26–70  (centered vertical)
          S upper-R   : x=63–71, y=26–49  (right wall of S's upper chamber)
          S center bar: x=26–74, y=43–50  (S crossing — shared S middle)
          S lower-L   : x=26–34, y=43–66  (left wall of S's lower chamber)
          S bottom bar: x=26–74, y=60–67  (S base — shared S bottom)

          Two blue voids read the S:
            Upper void (upper-right): x=54–63, y=33–43   ← S opens right at top
            Lower void (lower-left) : x=34–46, y=50–60   ← S opens left at bottom
      ════════════════════════════════════════════════════════════════ */}

      {/* T crossbar — full width top bar */}
      <rect x="26" y="26" width="48" height="7" rx="1.5" fill={monoFill} />

      {/* T stem — centered vertical pillar */}
      <rect x="46" y="26" width="8" height="44" rx="1.5" fill={monoFill} />

      {/* S upper-right connector — right wall of the S's upper chamber */}
      <rect x="63" y="26" width="8" height="24" rx="1.5" fill={monoFill} />

      {/* S center bar — the horizontal cross-beam of the S (full width) */}
      <rect x="26" y="43" width="48" height="7" rx="1.5" fill={monoFill} />

      {/* S lower-left connector — left wall of the S's lower chamber */}
      <rect x="26" y="43" width="8" height="24" rx="1.5" fill={monoFill} />

      {/* S bottom bar — base of the S (full width, mirrors the top crossbar) */}
      <rect x="26" y="60" width="48" height="7" rx="1.5" fill={monoFill} />
    </svg>
  );
}
