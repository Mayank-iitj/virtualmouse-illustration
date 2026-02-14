'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { Power, MousePointer, HandMetal } from 'lucide-react';

const HAND_LANDMARKS = [
  // Wrist
  { id: 0, name: 'Wrist' },
  // Thumb
  { id: 1, name: 'Thumb CMC' }, { id: 2, name: 'Thumb MCP' },
  { id: 3, name: 'Thumb IP' }, { id: 4, name: 'Thumb Tip' },
  // Index
  { id: 5, name: 'Index MCP' }, { id: 6, name: 'Index PIP' },
  { id: 7, name: 'Index DIP' }, { id: 8, name: 'Index Tip' },
  // Middle
  { id: 9, name: 'Middle MCP' }, { id: 10, name: 'Middle PIP' },
  { id: 11, name: 'Middle DIP' }, { id: 12, name: 'Middle Tip' },
  // Ring
  { id: 13, name: 'Ring MCP' }, { id: 14, name: 'Ring PIP' },
  { id: 15, name: 'Ring DIP' }, { id: 16, name: 'Ring Tip' },
  // Pinky
  { id: 17, name: 'Pinky MCP' }, { id: 18, name: 'Pinky PIP' },
  { id: 19, name: 'Pinky DIP' }, { id: 20, name: 'Pinky Tip' },
];

const CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4], // thumb
  [0,5],[5,6],[6,7],[7,8], // index
  [0,9],[9,10],[10,11],[11,12], // middle
  [0,13],[13,14],[14,15],[15,16], // ring
  [0,17],[17,18],[18,19],[19,20], // pinky
  [5,9],[9,13],[13,17], // palm
];

function getHandLandmarkPositions(mouseX: number, mouseY: number, width: number, height: number) {
  const cx = (mouseX / width) * 0.6 + 0.2;
  const cy = (mouseY / height) * 0.5 + 0.3;
  const scale = 0.15;

  const base: [number, number][] = [
    [0, 0.5],       // 0 wrist
    [-0.15, 0.35],  // 1 thumb cmc
    [-0.25, 0.2],   // 2 thumb mcp
    [-0.32, 0.08],  // 3 thumb ip
    [-0.36, -0.05], // 4 thumb tip
    [-0.08, -0.05], // 5 index mcp
    [-0.1, -0.2],   // 6 index pip
    [-0.1, -0.32],  // 7 index dip
    [-0.1, -0.42],  // 8 index tip
    [0, -0.05],     // 9 middle mcp
    [0, -0.22],     // 10 middle pip
    [0, -0.35],     // 11 middle dip
    [0, -0.47],     // 12 middle tip
    [0.08, -0.03],  // 13 ring mcp
    [0.09, -0.18],  // 14 ring pip
    [0.09, -0.3],   // 15 ring dip
    [0.09, -0.4],   // 16 ring tip
    [0.15, 0.02],   // 17 pinky mcp
    [0.17, -0.1],   // 18 pinky pip
    [0.18, -0.2],   // 19 pinky dip
    [0.18, -0.28],  // 20 pinky tip
  ];

  return base.map(([bx, by]) => ({
    x: (cx + bx * scale) * width,
    y: (cy + by * scale) * height,
  }));
}

export default function DemoSection() {
  const [enabled, setEnabled] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 300, y: 250 });
  const smoothPos = useRef({ x: 300, y: 250 });
  const [gesture, setGesture] = useState('MOVE');
  const [clickCount, setClickCount] = useState(0);
  const animRef = useRef<number>(0);
  const fpsRef = useRef(0);
  const frameCount = useRef(0);
  const lastFpsTime = useRef(Date.now());

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!containerRef.current || !e.touches[0]) return;
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  }, []);

  const handleClick = useCallback(() => {
    if (enabled) {
      setGesture('CLICK');
      setClickCount(c => c + 1);
      setTimeout(() => setGesture('MOVE'), 300);
    }
  }, [enabled]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('click', handleClick);
    container.addEventListener('touchend', handleClick, { passive: true });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('touchend', handleClick);
    };
  }, [handleMouseMove, handleTouchMove, handleClick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Responsive canvas sizing
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = Math.min(rect.width * 0.56, 500) * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${Math.min(rect.width * 0.56, 500)}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // Smooth cursor movement
      smoothPos.current.x += (mousePos.current.x - smoothPos.current.x) * 0.12;
      smoothPos.current.y += (mousePos.current.y - smoothPos.current.y) * 0.12;

      // FPS counter
      frameCount.current++;
      const now = Date.now();
      if (now - lastFpsTime.current >= 1000) {
        fpsRef.current = frameCount.current;
        frameCount.current = 0;
        lastFpsTime.current = now;
      }

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Draw grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (enabled) {
        const landmarks = getHandLandmarkPositions(smoothPos.current.x, smoothPos.current.y, w, h);

        // Draw connections
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
        ctx.lineWidth = 1.5;
        for (const [a, b] of CONNECTIONS) {
          ctx.beginPath();
          ctx.moveTo(landmarks[a].x, landmarks[a].y);
          ctx.lineTo(landmarks[b].x, landmarks[b].y);
          ctx.stroke();
        }

        // Draw landmarks
        landmarks.forEach((lm, i) => {
          const isTip = [4, 8, 12, 16, 20].includes(i);
          const radius = isTip ? 5 : 3;
          
          ctx.beginPath();
          ctx.arc(lm.x, lm.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = isTip ? '#22d3ee' : 'rgba(99, 102, 241, 0.8)';
          ctx.fill();

          if (isTip) {
            ctx.beginPath();
            ctx.arc(lm.x, lm.y, radius + 4, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        // Cursor indicator
        const cursorX = smoothPos.current.x;
        const cursorY = smoothPos.current.y;

        ctx.beginPath();
        ctx.arc(cursorX, cursorY, gesture === 'CLICK' ? 12 : 8, 0, Math.PI * 2);
        ctx.fillStyle = gesture === 'CLICK' ? 'rgba(34, 211, 238, 0.4)' : 'rgba(99, 102, 241, 0.3)';
        ctx.fill();
        ctx.strokeStyle = gesture === 'CLICK' ? '#22d3ee' : '#6366f1';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Crosshair
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cursorX, 0);
        ctx.lineTo(cursorX, h);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, cursorY);
        ctx.lineTo(w, cursorY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Coordinate label
        ctx.font = '11px monospace';
        ctx.fillStyle = 'rgba(136, 136, 136, 0.8)';
        ctx.fillText(`(${Math.round(cursorX)}, ${Math.round(cursorY)})`, cursorX + 15, cursorY - 10);
      }

      // HUD overlay
      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(136, 136, 136, 0.6)';
      ctx.fillText(`FPS: ${fpsRef.current}`, 12, 24);
      ctx.fillText(`Gesture: ${gesture}`, 12, 40);
      ctx.fillText(`Clicks: ${clickCount}`, 12, 56);
      ctx.fillText(`Status: ${enabled ? 'TRACKING' : 'PAUSED'}`, 12, 72);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [enabled, gesture, clickCount]);

  return (
    <SectionWrapper id="demo">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Try It"
          title="Interactive Demo Simulation"
          description="Move your mouse (or finger on mobile) over the canvas to simulate hand tracking. Click or tap to simulate gesture clicks."
        />

        <div className="relative">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setEnabled(!enabled)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  enabled
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'bg-surface border border-border text-muted'
                }`}
              >
                <Power className="w-4 h-4" />
                {enabled ? 'Tracking ON' : 'Tracking OFF'}
              </button>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <MousePointer className="w-3 h-3" /> <span className="hidden sm:inline">Move to track</span><span className="sm:hidden">Move / Touch</span>
              </span>
              <span className="flex items-center gap-1.5">
                <HandMetal className="w-3 h-3" /> <span className="hidden sm:inline">Click to simulate</span><span className="sm:hidden">Tap</span>
              </span>
            </div>
          </div>

          {/* Canvas */}
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden border border-border bg-[#080808] cursor-none"
          >
            <canvas
              ref={canvasRef}
              className="w-full touch-none"
            />
            
            {/* Status badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
              <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              <span className="text-muted">{enabled ? 'Live' : 'Paused'}</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary" /> Landmark
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent" /> Fingertip
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm border border-primary/30" /> Tracking Grid
            </span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
