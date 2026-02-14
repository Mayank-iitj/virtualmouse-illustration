'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { Layers, Paintbrush, Brain, Glasses, Smartphone } from 'lucide-react';

const milestones = [
  {
    icon: Layers,
    phase: 'Phase 1',
    title: 'Multi-Hand Gestures',
    description: 'Support for simultaneous two-hand tracking, enabling more complex gesture vocabularies and bimanual interactions.',
    status: 'In Progress',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/20',
  },
  {
    icon: Paintbrush,
    phase: 'Phase 2',
    title: 'Gesture Customization',
    description: 'User-defined gesture mapping — assign any hand pose to any computer action through an intuitive configuration UI.',
    status: 'Planned',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/20',
  },
  {
    icon: Brain,
    phase: 'Phase 3',
    title: 'ML-Based Gesture Learning',
    description: 'Train the system to recognize new gestures on-the-fly using few-shot learning and user demonstrations.',
    status: 'Research',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
  },
  {
    icon: Glasses,
    phase: 'Phase 4',
    title: 'AR/VR Integration',
    description: 'Extend gesture control to spatial computing environments — mixed reality headsets and holographic interfaces.',
    status: 'Vision',
    color: 'text-green-400',
    borderColor: 'border-green-500/20',
  },
  {
    icon: Smartphone,
    phase: 'Phase 5',
    title: 'Mobile & Edge Devices',
    description: 'Optimize for mobile processors and edge AI chips — on-device inference for IoT and embedded systems.',
    status: 'Vision',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/20',
  },
];

export default function VisionSection() {
  return (
    <SectionWrapper id="vision">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Roadmap"
          title="Future Scope & Vision"
          description="What's next — the evolution of gesture-based computing."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-primary/40 via-accent/40 to-accent2/40 md:-translate-x-[0.5px]" />

          <div className="space-y-8">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative flex flex-col md:flex-row gap-6 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ml-14 md:ml-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${milestone.borderColor} border ${milestone.color} mb-2`}>
                    {milestone.status}
                  </span>
                  <h3 className="text-lg font-semibold mb-1">
                    <span className="text-muted text-sm mr-2">{milestone.phase}</span>
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{milestone.description}</p>
                </div>

                {/* Node */}
                <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-1">
                  <div className={`w-7 h-7 rounded-full bg-surface border-2 ${milestone.borderColor} flex items-center justify-center`}>
                    <milestone.icon className={`w-3.5 h-3.5 ${milestone.color}`} />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
