// page.jsx — Stana Interior single-page landing (Next.js 14 App Router)
// All section components are client components (Framer Motion + interactivity)
import Navbar           from '@/components/Navbar';
import Hero             from '@/components/Hero';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import DesignJourney    from '@/components/DesignJourney';
import ProjectsRegistry from '@/components/ProjectsRegistry';
import IntakeWizard     from '@/components/IntakeWizard';
import Footer           from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-[#F8F7F4] overflow-x-hidden">
      <Navbar />
      <Hero />
      <BeforeAfterSlider />
      <DesignJourney />
      <ProjectsRegistry />
      <IntakeWizard />
      <Footer />
    </main>
  );
}
