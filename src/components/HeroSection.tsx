'use client';

import { motion } from 'framer-motion';
import { Github, Play, ChevronDown } from 'lucide-react';
import LightPillar from './LightPillar';
import StarBorder from './StarBorder';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Light Pillar Background */}
      <div className="absolute inset-0 z-0">
        <LightPillar
          topColor="#6366f1"
          bottomColor="#22d3ee"
          intensity={0.8}
          rotationSpeed={0.2}
          glowAmount={0.002}
          pillarWidth={3}
          pillarHeight={0.4}
          noiseIntensity={0.4}
          pillarRotation={15}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40 z-1" />

      {/* Radial gradient overlay for readability */}
      <div className="absolute inset-0 bg-linear-to-b from-background/30 via-transparent to-background z-2" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 sm:pt-0">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase glass border border-primary/20 text-primary-light">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            AI-Powered Human–Computer Interaction
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          Control Your Computer
          <br />
          <span className="gradient-text">With Just Your Hands</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 md:mt-8 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          AI‑powered Virtual Mouse using real‑time computer vision and gesture recognition.
          No hardware needed — just your webcam.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <StarBorder
            as="a"
            href="https://github.com/Mayank-iitj"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            color="#6366f1"
            speed="5s"
            thickness={2}
          >
            <span className="flex items-center gap-2.5 font-semibold text-sm">
              <Github className="w-4.5 h-4.5" />
              View GitHub
              <span className="ml-1 opacity-60 group-hover:opacity-100 transition-opacity">→</span>
            </span>
          </StarBorder>

          <a
            href="#demo"
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl border border-border bg-surface/50 backdrop-blur-sm text-foreground font-semibold text-sm transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:scale-102 active:scale-98"
          >
            <Play className="w-4 h-4 text-accent" />
            Watch Demo
          </a>

          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-6 py-3.5 text-sm text-muted hover:text-foreground transition-colors duration-300"
          >
            Read How It Works
            <ChevronDown className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {['Python', 'OpenCV', 'MediaPipe', 'Real-Time CV'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-mono text-muted/70 rounded-lg border border-border/50 bg-surface/30"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
        style={{ bottom: 'max(2rem, env(safe-area-inset-bottom))' }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted/50 tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 text-muted/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
