import './globals.css';

// ─────────────────────────────────────────────────────────────────────────────
// metadataBase — the root URL of your deployed site.
// Every relative image path in the metadata block (e.g. "/og-image.jpg")
// is resolved against this base, so WhatsApp/Google can form the absolute URL
// they need to fetch the image.
//
// ⚠️  BEFORE DEPLOYING: replace 'https://stana.ng' with your actual domain.
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = 'https://stana.ng';

// ─────────────────────────────────────────────────────────────────────────────
// OG image strategy
//
// CURRENT:  Pointing at a high-quality Unsplash interior photo so link previews
//           work immediately while you prepare your own branded image.
//
// WHEN READY:
//   1. Create a 1200 × 630 px JPG of a hero shot or finished interior.
//   2. Save it as  public/og-image.jpg  in this project.
//   3. Change OG_IMAGE_URL below to  '/og-image.jpg'
//      (Next.js will resolve it to https://stana.ng/og-image.jpg automatically)
// ─────────────────────────────────────────────────────────────────────────────
const OG_IMAGE_URL =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=630&fit=crop&q=85';

export const metadata = {
  // metadataBase turns every relative "/path" in openGraph/twitter into an
  // absolute URL. Without it, Next.js cannot resolve "/og-image.jpg".
  metadataBase: new URL(SITE_URL),

  // ── Page <title> and meta description ──────────────────────────────────────
  // These are used by Google, browser tabs, and as fallback text when no
  // explicit og:title / twitter:title is set.
  title: 'Stana Interior — Luxury Design & Renovation, Abuja & Lagos',
  description:
    'Award-winning interior design, structural renovation, and bespoke furniture across Abuja and Lagos. Explore our portfolio and begin your consultation.',
  keywords:
    'interior design Abuja, luxury interior Lagos, structural renovation Nigeria, bespoke furniture Nigeria, Maitama interior design, Ikoyi interior design, full home remodeling Nigeria',

  // ── Open Graph ──────────────────────────────────────────────────────────────
  // The og:* tags are read by WhatsApp, Facebook, LinkedIn, iMessage, Slack,
  // and most messaging / social apps when someone pastes your URL.
  //
  //  og:title       → bold headline in the preview card
  //  og:description → supporting text beneath the headline
  //  og:type        → 'website' is correct for a homepage / landing page
  //  og:url         → canonical URL of this page (prevents duplicate previews)
  //  og:site_name   → brand name displayed in some apps (LinkedIn, Slack)
  //  og:locale      → tells crawlers the content language/region
  //  og:image       → the 1200×630 image shown in the card thumbnail
  openGraph: {
    title: 'Stana Interior — Luxury Design & Renovation, Abuja & Lagos',
    description:
      'Award-winning interior design, structural renovation, and bespoke furniture across Abuja and Lagos. Explore our portfolio and begin your consultation.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Stana Interior',
    locale: 'en_NG',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Stana Interior — Award-winning luxury interior design in Abuja & Lagos',
      },
    ],
  },

  // ── Twitter / X Card ────────────────────────────────────────────────────────
  // Twitter (now X) uses its own twitter:* meta tags even though it also reads
  // og:* as a fallback. Setting both ensures maximum compatibility.
  //
  //  twitter:card   → 'summary_large_image' shows the big banner-style card.
  //                    Use 'summary' for a small square thumbnail instead.
  //  twitter:title / twitter:description → displayed in the tweet card
  //  twitter:images → same 1200×630 image
  twitter: {
    card: 'summary_large_image',
    title: 'Stana Interior — Luxury Design & Renovation, Abuja & Lagos',
    description:
      'Award-winning interior design, structural renovation, and bespoke furniture across Abuja and Lagos.',
    images: [OG_IMAGE_URL],
  },

  // ── Robots ──────────────────────────────────────────────────────────────────
  // Tells search engine crawlers they are allowed to index the page and follow links.
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect for Google Fonts — eliminates render-blocking font delay */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-[#F8F7F4] text-[#1C1C1C] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
