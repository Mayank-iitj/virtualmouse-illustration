'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Mouse } from 'lucide-react';

const navLinks = [
  { label: 'Why', href: '#why' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'AI Deep Dive', href: '#deep-dive' },
  { label: 'Demo', href: '#demo' },
  { label: 'Features', href: '#features' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Vision', href: '#vision' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 ${
          scrolled ? 'glass py-3' : 'py-5 bg-transparent'
        }`}
        style={{ paddingTop: `max(env(safe-area-inset-top), ${scrolled ? '0.75rem' : '1.25rem'})` }}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center">
              <Mouse className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Virtual<span className="gradient-text">Mouse</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://github.com/Mayank-iitj"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:glow-primary"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-99 pt-20 glass overflow-y-auto"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="flex flex-col items-center gap-2 p-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-3 text-lg text-muted hover:text-foreground transition-colors rounded-xl hover:bg-white/5"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="https://github.com/Mayank-iitj"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium"
                onClick={() => setMobileOpen(false)}
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
