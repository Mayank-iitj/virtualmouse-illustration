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

      <main className="relative" role="main">
        <LightPillarHero />

        <div className="section-divider" aria-hidden="true" />
        <WhySection />

        <div className="section-divider" aria-hidden="true" />
        <HowItWorksSection />

        <div className="section-divider" aria-hidden="true" />
        <DeepDiveSection />

        <div className="section-divider" aria-hidden="true" />
        <DemoSection />

        <div className="section-divider" aria-hidden="true" />
        <FeaturesSection />

        <div className="section-divider" aria-hidden="true" />
        <UseCasesSection />

        <div className="section-divider" aria-hidden="true" />
        <ArchitectureSection />

        <div className="section-divider" aria-hidden="true" />
        <VisionSection />

        <div className="section-divider" aria-hidden="true" />
        <CreatorSection />
      </main>

      <Footer />

      {/* SEO: Hidden content for crawlers (visible when JS is disabled) */}
      <noscript>
        <div style={{ padding: '2rem', color: '#ededed', background: '#050505' }}>
          <h1>Virtual Mouse — AI-Powered Hand Gesture Control</h1>
          <p>
            Control your computer using hand gestures with real-time computer vision.
            An open-source AI project by Mayank Sharma using MediaPipe, OpenCV, and Python.
          </p>
          <h2>Features</h2>
          <ul>
            <li>21-point hand landmark detection</li>
            <li>Real-time cursor control via hand gestures</li>
            <li>Click, scroll, and drag gestures</li>
            <li>30+ FPS performance on CPU</li>
            <li>No additional hardware required — just a webcam</li>
            <li>Cross-platform: Windows, macOS, Linux</li>
          </ul>
          <p>
            <a href="https://github.com/Mayank-iitj/virtualmouse">View on GitHub</a> |
            <a href="https://mayyanks.app">Author Website</a>
          </p>
        </div>
      </noscript>
    </>
  );
}
