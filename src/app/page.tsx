'use client';

import dynamic from 'next/dynamic';

// Skeleton loader for sections during hydration
const SectionSkeleton = () => (
  <div className="w-full min-h-[40vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

// Client-only components (use browser APIs: canvas, WebGL, window)
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const WelcomeAnimation = dynamic(() => import('@/components/WelcomeAnimation'), { ssr: false });
const DemoSection = dynamic(() => import('@/components/DemoSection'), { ssr: false, loading: SectionSkeleton });
const LightPillarHero = dynamic(() => import('@/components/HeroSection'), { ssr: false, loading: SectionSkeleton });

// SSR-safe components (Framer Motion handles hydration)
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const WhySection = dynamic(() => import('@/components/WhySection'), { loading: SectionSkeleton });
const HowItWorksSection = dynamic(() => import('@/components/HowItWorksSection'), { loading: SectionSkeleton });
const DeepDiveSection = dynamic(() => import('@/components/DeepDiveSection'), { loading: SectionSkeleton });
const FeaturesSection = dynamic(() => import('@/components/FeaturesSection'), { loading: SectionSkeleton });
const UseCasesSection = dynamic(() => import('@/components/UseCasesSection'), { ssr: false, loading: SectionSkeleton });
const ArchitectureSection = dynamic(() => import('@/components/ArchitectureSection'), { loading: SectionSkeleton });
const VisionSection = dynamic(() => import('@/components/VisionSection'), { loading: SectionSkeleton });
const CreatorSection = dynamic(() => import('@/components/CreatorSection'), { loading: SectionSkeleton });
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <>
      <WelcomeAnimation />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        <LightPillarHero />

        <div className="section-divider" />
        <WhySection />

        <div className="section-divider" />
        <HowItWorksSection />

        <div className="section-divider" />
        <DeepDiveSection />

        <div className="section-divider" />
        <DemoSection />

        <div className="section-divider" />
        <FeaturesSection />

        <div className="section-divider" />
        <UseCasesSection />

        <div className="section-divider" />
        <ArchitectureSection />

        <div className="section-divider" />
        <VisionSection />

        <div className="section-divider" />
        <CreatorSection />
      </main>

      <Footer />
    </>
  );
}
