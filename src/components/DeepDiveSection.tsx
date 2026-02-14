'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { Brain, Settings, Zap, ChevronRight } from 'lucide-react';

const tabs = [
  {
    id: 'cv',
    label: 'Computer Vision',
    icon: Brain,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    content: {
      title: 'Computer Vision Pipeline',
      points: [
        { label: 'MediaPipe Hands', desc: 'Detects 21 3D landmarks per hand with real-time inference at 30+ FPS on CPU.' },
        { label: 'Real-Time Inference', desc: 'Sub-frame latency processing using optimized TFLite models running on-device.' },
        { label: 'Confidence Smoothing', desc: 'Exponential moving average filter to reduce jitter and false detections.' },
        { label: 'RGB Processing', desc: 'Converts BGR → RGB for MediaPipe, maintains color space consistency.' },
      ],
      metrics: [
        { label: 'Landmarks', value: '21', unit: 'per hand' },
        { label: 'Inference', value: '<8', unit: 'ms/frame' },
        { label: 'Accuracy', value: '97.2', unit: '%' },
      ],
      code: `# MediaPipe Hand Detection Pipeline
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.5
)

# Process frame
rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
results = hands.process(rgb)

if results.multi_hand_landmarks:
    for hand_landmarks in results.multi_hand_landmarks:
        # Extract 21 landmarks
        landmarks = []
        for lm in hand_landmarks.landmark:
            landmarks.append((lm.x, lm.y, lm.z))`,
    },
  },
  {
    id: 'gesture',
    label: 'Gesture Logic',
    icon: Settings,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    content: {
      title: 'Gesture Classification Engine',
      points: [
        { label: 'Pinch Detection', desc: 'Calculates Euclidean distance between index tip and thumb tip for click events.' },
        { label: 'Scroll Control', desc: 'Tracks vertical delta of middle finger to simulate scroll wheel behavior.' },
        { label: 'Cursor Smoothing', desc: 'Linear interpolation between current and previous positions reduces jitter.' },
        { label: 'State Machine', desc: 'Gesture states prevent rapid-fire events and ensure intentional actions.' },
      ],
      metrics: [
        { label: 'Gestures', value: '5+', unit: 'types' },
        { label: 'Precision', value: '<3', unit: 'px error' },
        { label: 'Latency', value: '<5', unit: 'ms' },
      ],
      code: `# Gesture Classification
def classify_gesture(landmarks):
    index_tip = landmarks[8]
    thumb_tip = landmarks[4]
    middle_tip = landmarks[12]
    
    # Pinch distance for click detection
    pinch_dist = euclidean_distance(
        index_tip, thumb_tip
    )
    
    if pinch_dist < PINCH_THRESHOLD:
        return Gesture.CLICK
    
    # Vertical delta for scroll
    if is_scroll_pose(landmarks):
        delta = middle_tip.y - prev_middle_y
        return Gesture.SCROLL, delta
    
    # Index finger pointing → cursor movement
    if is_pointing(landmarks):
        return Gesture.MOVE, (index_tip.x, index_tip.y)`,
    },
  },
  {
    id: 'perf',
    label: 'Performance',
    icon: Zap,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    content: {
      title: 'Performance Optimizations',
      points: [
        { label: 'Frame Skipping', desc: 'Adaptive frame skip based on CPU load — processes every Nth frame when needed.' },
        { label: 'ROI Cropping', desc: 'Crops region of interest around detected hand to reduce per-frame processing.' },
        { label: 'Noise Filtering', desc: 'Kalman filter implementation for smooth, predictable cursor trajectory.' },
        { label: 'Low-Latency Mapping', desc: 'Direct coordinate mapping without intermediate buffers for minimal delay.' },
      ],
      metrics: [
        { label: 'FPS', value: '30+', unit: 'stable' },
        { label: 'CPU', value: '<15', unit: '%' },
        { label: 'End-to-End', value: '<33', unit: 'ms' },
      ],
      code: `# Performance Optimizations
class PerformanceOptimizer:
    def __init__(self):
        self.frame_skip = 1
        self.kalman = KalmanFilter()
        self.roi = None
    
    def adaptive_skip(self, fps):
        """Adjust frame skip based on performance"""
        if fps < 25:
            self.frame_skip = min(self.frame_skip + 1, 3)
        elif fps > 28:
            self.frame_skip = max(self.frame_skip - 1, 1)
    
    def smooth_coordinates(self, x, y):
        """Kalman filter for jitter reduction"""
        predicted = self.kalman.predict()
        measured = np.array([x, y])
        corrected = self.kalman.correct(measured)
        return corrected[0], corrected[1]
    
    def crop_roi(self, frame, hand_center):
        """Crop region around hand for faster processing"""
        margin = 100
        x, y = hand_center
        return frame[y-margin:y+margin, x-margin:x+margin]`,
    },
  },
];

export default function DeepDiveSection() {
  const [activeTab, setActiveTab] = useState('cv');
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <SectionWrapper id="deep-dive">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Engineering"
          title="AI & Engineering Deep Dive"
          description="Under the hood — the computer vision, gesture logic, and performance engineering that makes it work."
        />

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? `${tab.bgColor} ${tab.color} border border-current/20`
                  : 'text-muted border border-border hover:border-border/80 hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Left: Points + Metrics */}
            <div>
              <h3 className="text-2xl font-bold mb-6">{active.content.title}</h3>

              <div className="space-y-4 mb-8">
                {active.content.points.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 group"
                  >
                    <ChevronRight className={`w-4 h-4 mt-1 shrink-0 ${active.color}`} />
                    <div>
                      <span className="font-semibold text-sm">{point.label}</span>
                      <p className="text-sm text-muted mt-0.5">{point.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {active.content.metrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center p-4 rounded-xl bg-surface border border-border"
                  >
                    <div className="text-xl sm:text-2xl font-bold gradient-text">{metric.value}</div>
                    <div className="text-[10px] sm:text-xs text-muted mt-1">{metric.unit}</div>
                    <div className="text-[10px] sm:text-xs text-muted/60 mt-0.5">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Code */}
            <div className="code-block p-5 overflow-x-auto max-h-125 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-muted ml-2 font-mono">{active.label.toLowerCase().replace(' ', '_')}.py</span>
              </div>
              <pre className="text-xs leading-relaxed">
                <code>{active.content.code}</code>
              </pre>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
