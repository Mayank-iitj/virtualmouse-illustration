'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { Hand, MousePointer, Pointer, Zap, Accessibility, Monitor } from 'lucide-react';

const features = [
  {
    icon: Hand,
    title: 'Hand Tracking',
    description: '21-point hand landmark detection with sub-pixel precision using MediaPipe neural networks.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: MousePointer,
    title: 'Cursor Control',
    description: 'Smooth, responsive cursor movement mapped from hand position to full screen coordinates.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Pointer,
    title: 'Click & Scroll Gestures',
    description: 'Pinch to click, vertical finger drag to scroll — natural, intuitive gesture mappings.',
    gradient: 'from-cyan-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Real-Time Performance',
    description: '30+ FPS processing with <33ms end-to-end latency. No GPU required — runs on CPU.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Accessibility,
    title: 'Accessibility Friendly',
    description: 'Enables computer control for users with motor disabilities or limited hand mobility.',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    icon: Monitor,
    title: 'Cross-Platform Ready',
    description: 'Works on Windows, macOS, and Linux. Requires only Python and a standard webcam.',
    gradient: 'from-indigo-500 to-violet-500',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function FeaturesSection() {
  return (
    <SectionWrapper id="features">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Capabilities"
          title="Powerful Features"
          description="Every feature is designed for precision, performance, and real-world usability."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="gradient-border group"
            >
              <div className="p-6 rounded-2xl bg-surface h-full">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${feature.gradient} p-0.5 mb-5`}>
                  <div className="w-full h-full rounded-[10px] bg-surface flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-foreground" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
