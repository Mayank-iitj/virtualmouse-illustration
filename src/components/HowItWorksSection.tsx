'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { Camera, Scan, Fingerprint, Move, Monitor } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    number: '01',
    title: 'Webcam Input',
    description: 'Captures real-time video frames from any standard webcam at 30+ FPS.',
    code: `cap = cv2.VideoCapture(0)
ret, frame = cap.read()
frame = cv2.flip(frame, 1)`,
    metric: '30 FPS',
    metricLabel: 'Capture Rate',
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Scan,
    number: '02',
    title: 'Hand Landmark Detection',
    description: 'MediaPipe Hands detects 21 3D landmarks on each hand with sub-pixel accuracy.',
    code: `mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    max_num_hands=1,
    min_detection_confidence=0.7
)
results = hands.process(rgb_frame)`,
    metric: '21',
    metricLabel: 'Landmarks',
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: Fingerprint,
    number: '03',
    title: 'Gesture Classification',
    description: 'Interprets landmark positions to classify gestures: point, pinch, scroll, and more.',
    code: `index_tip = landmarks[8]
thumb_tip = landmarks[4]
distance = calculate_distance(
    index_tip, thumb_tip
)
if distance < PINCH_THRESHOLD:
    gesture = "CLICK"`,
    metric: '<5ms',
    metricLabel: 'Classification',
    color: 'from-cyan-500/20 to-cyan-500/5',
    borderColor: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Move,
    number: '04',
    title: 'Coordinate Mapping',
    description: 'Normalizes hand coordinates to screen space with smoothing interpolation.',
    code: `screen_x = np.interp(
    index_x, (0, cam_w), (0, scr_w)
)
screen_y = np.interp(
    index_y, (0, cam_h), (0, scr_h)
)
# Apply smoothing
smooth_x = prev_x + (screen_x - prev_x) * SMOOTH`,
    metric: '1:1',
    metricLabel: 'Mapping Ratio',
    color: 'from-green-500/20 to-green-500/5',
    borderColor: 'border-green-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: Monitor,
    number: '05',
    title: 'OS Mouse Control',
    description: 'Sends mouse events directly to the operating system for seamless integration.',
    code: `import pyautogui
pyautogui.moveTo(screen_x, screen_y)
if gesture == "CLICK":
    pyautogui.click()
elif gesture == "SCROLL":
    pyautogui.scroll(delta_y)`,
    metric: '<1ms',
    metricLabel: 'OS Latency',
    color: 'from-indigo-500/20 to-indigo-500/5',
    borderColor: 'border-indigo-500/20',
    iconColor: 'text-indigo-400',
  },
];

export default function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Pipeline"
          title="How It Works"
          description="From webcam feed to mouse control — a real-time AI pipeline processing every frame."
        />

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-9.75 top-0 bottom-0 w-px bg-linear-to-b from-blue-500/30 via-purple-500/30 to-indigo-500/30" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-linear-to-r ${step.color} border ${step.borderColor} backdrop-blur-sm group hover:border-opacity-40 transition-all duration-500`}
              >
                {/* Step number + icon */}
                <div className="flex md:flex-col items-center gap-3 md:gap-2 shrink-0">
                  <div className="relative z-10 w-12.5 h-12.5 rounded-xl bg-surface border border-border flex items-center justify-center">
                    <step.icon className={`w-5 h-5 ${step.iconColor}`} />
                  </div>
                  <span className="text-xs font-mono text-muted">{step.number}</span>
                </div>

                {/* Description */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">{step.description}</p>

                  {/* Code snippet */}
                  <div className="code-block p-4 overflow-x-auto">
                    <pre className="text-xs leading-relaxed">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>

                {/* Metric */}
                <div className="shrink-0 flex md:flex-col items-center md:items-end justify-center gap-1 md:gap-0">
                  <span className="text-2xl md:text-3xl font-bold gradient-text">{step.metric}</span>
                  <span className="text-xs text-muted">{step.metricLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
