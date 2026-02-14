'use client';

import { Github, ExternalLink, Mouse, Globe } from 'lucide-react';

const techStack = ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js'];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center">
                <Mouse className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                Virtual<span className="gradient-text">Mouse</span>
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              AI-powered gesture control system using real-time computer vision.
              Built with innovation, precision, and the future of HCI in mind.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-muted mb-4">Links</h4>
            <div className="space-y-2.5">
              <a href="https://github.com/Mayank-iitj" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors">
                <Github className="w-4 h-4" /> Source Code <ExternalLink className="w-3 h-3" />
              </a>
              <a href="#how-it-works" className="block text-sm text-muted hover:text-foreground transition-colors">Documentation</a>
              <a href="#demo" className="block text-sm text-muted hover:text-foreground transition-colors">Interactive Demo</a>
              <a href="#deep-dive" className="block text-sm text-muted hover:text-foreground transition-colors">Technical Deep Dive</a>
              <a href="https://mayyanks.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors">
                <Globe className="w-4 h-4" /> mayyanks.app <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://mayankiitj.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors">
                <Globe className="w-4 h-4" /> mayankiitj.in <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-muted mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs font-mono rounded-lg border border-border/50 text-muted/70 bg-surface/50">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted/60">
          <p>© {new Date().getFullYear()} Virtual Mouse by Mayank Sharma. MIT License.</p>
          <p className="flex items-center gap-1.5">
            Built with <span className="gradient-text font-semibold">AI & Vision</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
