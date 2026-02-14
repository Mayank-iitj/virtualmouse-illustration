'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import {
  MousePointer2, Accessibility, ShieldCheck, Wifi,
  Hand, Navigation, Cpu, Camera
} from 'lucide-react';

const problems = [
  { icon: MousePointer2, text: 'Physical mouse dependency', color: 'text-red-400' },
  { icon: Accessibility, text: 'Accessibility limitations', color: 'text-red-400' },
  { icon: ShieldCheck, text: 'Hygiene concerns in shared spaces', color: 'text-red-400' },
  { icon: Wifi, text: 'Touchless interaction demand rising', color: 'text-red-400' },
];

const solutions = [
  { icon: Hand, text: 'Touch-free gesture control', color: 'text-accent' },
  { icon: Navigation, text: 'AI-powered cursor navigation', color: 'text-accent' },
  { icon: Cpu, text: 'Real-time AI inference', color: 'text-accent' },
  { icon: Camera, text: 'Works with any standard webcam', color: 'text-accent' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const itemVariantsRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function WhySection() {
  return (
    <SectionWrapper id="why">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="The Problem"
          title="Why Virtual Mouse?"
          description="Traditional input devices are becoming obsolete. The future of human-computer interaction is gesture-based."
        />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Problems */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-red-400/80 mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-red-400/40" />
              Challenges
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-4"
            >
              {problems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10 group hover:border-red-500/20 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-red-500/10">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-foreground/80 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-accent/80 mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-accent/40" />
              Our Solution
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-4"
            >
              {solutions.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariantsRight}
                  className="flex items-center gap-4 p-4 rounded-xl bg-accent/5 border border-accent/10 group hover:border-accent/20 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-accent/10">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-foreground/80 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
