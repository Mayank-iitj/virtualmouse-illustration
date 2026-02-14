'use client';

import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { Github, Linkedin, ExternalLink, Instagram, Twitter, Globe } from 'lucide-react';
import Stepper, { Step } from './Stepper';

export default function CreatorSection() {
  return (
    <SectionWrapper id="creator">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 text-xs font-medium tracking-widest uppercase rounded-full border border-primary/30 text-primary-light mb-6"
          >
            Creator
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Meet the Builder
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 md:p-10 rounded-3xl glass-light overflow-hidden"
          >
            {/* Spotlight effect */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-75 h-75 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              {/* Avatar */}
              <div className="w-20 h-20 mb-6 rounded-full bg-linear-to-br from-primary to-accent p-0.5">
                <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
                  <span className="text-2xl font-bold gradient-text">MS</span>
                </div>
              </div>

              <span className="text-xs font-medium tracking-widest uppercase text-muted mb-3 block">Created By</span>
              <h3 className="text-3xl font-bold mb-1">Mayank Sharma</h3>
              <p className="text-primary-light font-medium mb-4">AI / ML Engineer</p>
              <p className="text-muted text-sm leading-relaxed mb-8">
                Focused on Computer Vision, Human–AI Interaction, and building intelligent systems
                that bridge the gap between humans and machines.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/Mayank-iitj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-primary/40 text-sm font-medium transition-all duration-300 hover:glow-primary group"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                  <ExternalLink className="w-3 h-3 text-muted group-hover:text-foreground transition-colors" />
                </a>
                <a
                  href="https://linkedin.com/in/mayankiitj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-blue-500/40 text-sm font-medium transition-all duration-300 group"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                  <ExternalLink className="w-3 h-3 text-muted group-hover:text-foreground transition-colors" />
                </a>
                <a
                  href="https://instagram.com/mayyanks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-pink-500/40 text-sm font-medium transition-all duration-300 group"
                >
                  <Instagram className="w-4 h-4" />
                  @mayyanks
                </a>
                <a
                  href="https://x.com/mayyankks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-foreground/40 text-sm font-medium transition-all duration-300 group"
                >
                  <Twitter className="w-4 h-4" />
                  @mayyankks
                </a>
                <a
                  href="https://mayyanks.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-emerald-500/40 text-sm font-medium transition-all duration-300 group"
                >
                  <Globe className="w-4 h-4" />
                  mayyanks.app
                </a>
                <a
                  href="https://mayankiitj.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-amber-500/40 text-sm font-medium transition-all duration-300 group"
                >
                  <Globe className="w-4 h-4" />
                  mayankiitj.in
                </a>
              </div>
            </div>
          </motion.div>

          {/* Stepper - Get to Know Me */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Stepper
              initialStep={1}
              backButtonText="Previous"
              nextButtonText="Next"
            >
              <Step>
                <h2 className="text-lg font-bold mb-2 gradient-text">About This Project</h2>
                <p className="text-sm text-muted leading-relaxed">
                  Virtual Mouse is an AI-powered Human–Computer Interaction system that uses real-time
                  computer vision to let you control your computer with just hand gestures. No hardware needed.
                </p>
              </Step>
              <Step>
                <h2 className="text-lg font-bold mb-2 gradient-text">The Tech Stack</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'NumPy'].map((t) => (
                    <span key={t} className="px-3 py-1 text-xs font-mono rounded-lg border border-border text-muted bg-surface/50">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted leading-relaxed mt-3">
                  Built with production-grade Python libraries for real-time performance and cross-platform compatibility.
                </p>
              </Step>
              <Step>
                <h2 className="text-lg font-bold mb-2 gradient-text">Connect With Me</h2>
                <div className="space-y-2 mt-3 text-sm">
                  <p className="text-muted flex items-center gap-2">
                    <Github className="w-4 h-4 text-foreground" />
                    <a href="https://github.com/Mayank-iitj" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                      github.com/Mayank-iitj
                    </a>
                  </p>
                  <p className="text-muted flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-foreground" />
                    <a href="https://linkedin.com/in/mayankiitj" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                      linkedin.com/in/mayankiitj
                    </a>
                  </p>
                  <p className="text-muted flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-foreground" />
                    <a href="https://instagram.com/mayyanks" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                      @mayyanks
                    </a>
                  </p>
                  <p className="text-muted flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-foreground" />
                    <a href="https://x.com/mayyankks" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                      @mayyankks
                    </a>
                  </p>
                  <p className="text-muted flex items-center gap-2">
                    <Globe className="w-4 h-4 text-foreground" />
                    <a href="https://mayyanks.app" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                      mayyanks.app
                    </a>
                  </p>
                  <p className="text-muted flex items-center gap-2">
                    <Globe className="w-4 h-4 text-foreground" />
                    <a href="https://mayankiitj.in" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                      mayankiitj.in
                    </a>
                  </p>
                </div>
              </Step>
              <Step>
                <h2 className="text-lg font-bold mb-2 gradient-text">Let&apos;s Build Together</h2>
                <p className="text-sm text-muted leading-relaxed">
                  Open to collaborations, research opportunities, and conversations about the future of
                  Human–Computer Interaction and AI. Star the repo and reach out!
                </p>
              </Step>
            </Stepper>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
