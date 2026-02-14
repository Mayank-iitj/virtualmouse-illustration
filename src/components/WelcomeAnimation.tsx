'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mouse } from 'lucide-react';

/* ─── Particle config ─── */
const PARTICLE_COUNT_DESKTOP = 50;
const PARTICLE_COUNT_MOBILE = 20;

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const COLORS = [
  'rgba(99, 102, 241, 0.6)',   // primary
  'rgba(34, 211, 238, 0.5)',   // accent
  'rgba(167, 139, 250, 0.5)',  // accent2
  'rgba(129, 140, 248, 0.4)',  // primary-light
];

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 1.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

/* ─── Grid line config ─── */
const GRID_LINES_DESKTOP = 12;
const GRID_LINES_MOBILE = 6;

/* ─── Hand landmark paths (21 MediaPipe landmarks, simplified) ─── */
const HAND_LANDMARKS = [
  // palm
  { x: 50, y: 82 },
  // thumb
  { x: 38, y: 72 }, { x: 30, y: 62 }, { x: 24, y: 52 }, { x: 20, y: 42 },
  // index
  { x: 40, y: 48 }, { x: 38, y: 34 }, { x: 37, y: 24 }, { x: 36, y: 16 },
  // middle
  { x: 50, y: 44 }, { x: 50, y: 30 }, { x: 50, y: 20 }, { x: 50, y: 12 },
  // ring
  { x: 58, y: 48 }, { x: 60, y: 34 }, { x: 61, y: 26 }, { x: 62, y: 18 },
  // pinky
  { x: 66, y: 54 }, { x: 70, y: 44 }, { x: 73, y: 36 }, { x: 76, y: 28 },
];

const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 10], [10, 11], [11, 12],
  [0, 13], [13, 14], [14, 15], [15, 16],
  [0, 17], [17, 18], [18, 19], [19, 20],
  [5, 9], [9, 13], [13, 17],
];

/* ─── Component ─── */
export default function WelcomeAnimation() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState(0); // 0 → particles, 1 → logo, 2 → hand, 3 → text, 4 → exit
  const [isMobile, setIsMobile] = useState(false);
  const particles = useRef<Particle[]>([]);
  const gridLines = useRef(GRID_LINES_DESKTOP);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Detect mobile on mount
  useEffect(() => {
    const mobile = window.innerWidth < 768
      || window.matchMedia('(pointer: coarse)').matches;
    setIsMobile(mobile);
    particles.current = makeParticles(mobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP);
    gridLines.current = mobile ? GRID_LINES_MOBILE : GRID_LINES_DESKTOP;
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeouts.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    // Timeline
    schedule(() => setPhase(1), 400);   // logo icon fades in
    schedule(() => setPhase(2), 1200);  // hand landmarks draw
    schedule(() => setPhase(3), 2200);  // text reveals
    schedule(() => setPhase(4), 3600);  // curtain exit begins
    schedule(() => setShow(false), 4500); // unmount

    return () => timeouts.current.forEach(clearTimeout);
  }, [schedule]);

  // Lock body scroll during animation
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-100000 flex items-center justify-center"
          style={{ background: '#050505' }}
        >
          {/* ── Background grid ── */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: gridLines.current }).map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px"
                style={{ left: `${((i + 1) / (gridLines.current + 1)) * 100}%`, background: 'rgba(99,102,241,0.04)' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.2, delay: i * 0.05, ease: 'easeOut' }}
              />
            ))}
            {Array.from({ length: gridLines.current }).map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px"
                style={{ top: `${((i + 1) / (gridLines.current + 1)) * 100}%`, background: 'rgba(99,102,241,0.04)' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: i * 0.05, ease: 'easeOut' }}
              />
            ))}
          </div>

          {/* ── Floating particles ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.current.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.6, 0],
                  scale: [0, 1.2, 1, 0],
                  y: [0, -60, -120],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* ── Radial glow behind center ── */}
          <motion.div
            className="absolute w-[min(600px,90vw)] h-[min(600px,90vw)] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(34,211,238,0.06) 40%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.5 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* ── Center content ── */}
          <div className="relative flex flex-col items-center z-10 px-6">
            {/* Logo icon */}
            <motion.div
              className="relative mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{
                opacity: phase >= 1 ? 1 : 0,
                scale: phase >= 1 ? 1 : 0,
                rotate: phase >= 1 ? 0 : -180,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              {/* Spinning ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full border border-accent/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />

              {/* Icon container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                <Mouse className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-primary/40"
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-accent/30"
                animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
              />
            </motion.div>

            {/* Hand landmark wireframe */}
            <motion.div
              className="relative w-32 h-32 sm:w-48 sm:h-48 mb-6 sm:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                {/* Connections */}
                {HAND_CONNECTIONS.map(([a, b], i) => (
                  <motion.line
                    key={`line-${i}`}
                    x1={HAND_LANDMARKS[a].x}
                    y1={HAND_LANDMARKS[a].y}
                    x2={HAND_LANDMARKS[b].x}
                    y2={HAND_LANDMARKS[b].y}
                    stroke="url(#hand-gradient)"
                    strokeWidth="0.6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: phase >= 2 ? 1 : 0,
                      opacity: phase >= 2 ? 0.7 : 0,
                    }}
                    transition={{ duration: 0.5, delay: i * 0.03, ease: 'easeOut' }}
                  />
                ))}
                {/* Landmark dots */}
                {HAND_LANDMARKS.map((lm, i) => (
                  <motion.circle
                    key={`dot-${i}`}
                    cx={lm.x}
                    cy={lm.y}
                    r="1.4"
                    fill={i === 8 ? '#22d3ee' : '#6366f1'}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: phase >= 2 ? 1 : 0,
                      scale: phase >= 2 ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
                  />
                ))}
                {/* Index fingertip glow */}
                <motion.circle
                  cx={HAND_LANDMARKS[8].x}
                  cy={HAND_LANDMARKS[8].y}
                  r="4"
                  fill="rgba(34,211,238,0.3)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: phase >= 2 ? [0, 0.8, 0] : 0,
                    scale: phase >= 2 ? [1, 1.8, 1] : 1,
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <defs>
                  <linearGradient id="hand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Title reveal */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: phase >= 3 ? 1 : 0,
                y: phase >= 3 ? 0 : 30,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-2 sm:mb-3">
                Virtual<span className="gradient-text">Mouse</span>
              </h1>
              <motion.p
                className="text-xs sm:text-sm md:text-base text-muted tracking-wide px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 3 ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Control your computer with hand gestures
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="mt-8 sm:mt-10 w-36 sm:w-48 h-0.5 rounded-full overflow-hidden bg-border/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 3 ? 1 : 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #6366f1, #22d3ee, #a78bfa)' }}
                initial={{ width: '0%' }}
                animate={{ width: phase >= 3 ? '100%' : '0%' }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.35 }}
              />
            </motion.div>
          </div>

          {/* ── Exit curtain (two halves slide away) ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            initial={false}
          >
            {/* Top half */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2"
              style={{ background: '#050505' }}
              initial={{ y: 0 }}
              animate={{ y: phase >= 4 ? '-100%' : 0 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
            />
            {/* Bottom half */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/2"
              style={{ background: '#050505' }}
              initial={{ y: 0 }}
              animate={{ y: phase >= 4 ? '100%' : 0 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
            />
          </motion.div>

          {/* Full-screen fade out */}
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{ background: '#050505' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 4 ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
