'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import FlowingMenu from './FlowingMenu';
import { Accessibility, Monitor, Glasses, GraduationCap, FlaskConical } from 'lucide-react';

const useCaseCards = [
  {
    icon: Accessibility,
    title: 'Accessibility Users',
    description: 'Empowers individuals with motor disabilities to control computers through simple hand gestures instead of traditional input devices.',
    color: 'from-green-500/20 to-emerald-500/5',
    borderColor: 'border-green-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: Monitor,
    title: 'Touchless Kiosks',
    description: 'Public information terminals, hospital check-ins, and retail displays — hands-free interaction for hygiene and efficiency.',
    color: 'from-blue-500/20 to-cyan-500/5',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Glasses,
    title: 'AR/VR Interfaces',
    description: 'Foundation technology for spatial computing — hand gesture control in augmented and virtual reality environments.',
    color: 'from-purple-500/20 to-violet-500/5',
    borderColor: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: GraduationCap,
    title: 'Smart Classrooms',
    description: 'Teachers control presentations and interactive boards through gestures — no need to return to the computer.',
    color: 'from-yellow-500/20 to-orange-500/5',
    borderColor: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    icon: FlaskConical,
    title: 'AI Labs & Research',
    description: 'Ideal for HCI research, computer vision demos, and gesture recognition experiments in academic settings.',
    color: 'from-cyan-500/20 to-blue-500/5',
    borderColor: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
];

const flowingMenuItems = [
  { link: '#', text: 'Accessibility', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop' },
  { link: '#', text: 'Touchless Kiosks', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop' },
  { link: '#', text: 'AR / VR', image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&h=400&fit=crop' },
  { link: '#', text: 'Smart Classrooms', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop' },
  { link: '#', text: 'AI Labs', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop' },
];

export default function UseCasesSection() {
  return (
    <SectionWrapper id="use-cases">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Impact"
          title="Real-World Use Cases"
          description="From accessibility to AR/VR — Virtual Mouse technology has applications across industries."
        />

        {/* Flowing Menu Interactive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-2xl overflow-hidden border border-border"
          style={{ height: 'clamp(280px, 50vh, 420px)', position: 'relative' }}
        >
          <FlowingMenu
            items={flowingMenuItems}
            speed={15}
            textColor="#ededed"
            bgColor="#0a0a0a"
            marqueeBgColor="#6366f1"
            marqueeTextColor="#ffffff"
            borderColor="#222222"
          />
        </motion.div>

        {/* Detail Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCaseCards.map((useCase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`p-6 rounded-2xl bg-linear-to-br ${useCase.color} border ${useCase.borderColor} backdrop-blur-sm group hover:scale-102 transition-transform duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl bg-surface/80 flex items-center justify-center mb-4 ${useCase.borderColor} border`}>
                <useCase.icon className={`w-5 h-5 ${useCase.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
