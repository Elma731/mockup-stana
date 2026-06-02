import './globals.css';

export const metadata = {
  title: 'Stana Interior — Intentional Spaces, Structural Elegance | Abuja & Lagos',
  description:
    'Award-winning interior design and structural renovation firm serving Abuja and Lagos. Full-home remodeling, bespoke furniture fabrication, and luxury turnkey transformation across Nigeria\'s premier residential addresses.',
  keywords:
    'interior design Abuja, luxury interior Lagos, structural renovation Nigeria, bespoke furniture Nigeria, Maitama interior design, Ikoyi interior design, full home remodeling Nigeria',
  openGraph: {
    title: 'Stana Interior — Intentional Spaces, Structural Elegance',
    description: 'Award-winning interior design and structural renovation across Abuja & Lagos.',
    type: 'website',
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
