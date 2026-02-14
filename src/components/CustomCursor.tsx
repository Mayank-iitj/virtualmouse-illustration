'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default to true to avoid flash

  useEffect(() => {
    // Detect touch device after mount to avoid SSR mismatch
    const isTouch = window.matchMedia('(pointer: coarse)').matches
      || 'ontouchstart' in window
      || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Use MutationObserver to track dynamically added interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePos.x - 10,
          y: mousePos.y - 10,
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="custom-cursor-dot"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.3 }}
      />
    </>
  );
}
