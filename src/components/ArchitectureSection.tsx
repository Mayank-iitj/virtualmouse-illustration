'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { Github, FolderTree, FileCode2, ExternalLink } from 'lucide-react';
import StarBorder from './StarBorder';

const folderStructure = `virtual-mouse/
├── main.py              # Entry point
├── hand_tracker.py      # MediaPipe hand detection
├── gesture_classifier.py # Gesture recognition logic
├── mouse_controller.py  # OS mouse control
├── performance.py       # FPS & optimization utils
├── config.py            # Tuning parameters
├── utils/
│   ├── smoothing.py     # Kalman filter & interpolation
│   └── coordinates.py   # Coordinate normalization
├── requirements.txt
└── README.md`;

const architectureDiagram = `┌─────────────────────────────────────────────────────────┐
│                     Virtual Mouse                        │
├──────────┬──────────┬──────────┬──────────┬──────────────┤
│ Webcam   │  Hand    │ Gesture  │ Coord    │    OS        │
│ Capture  │ Detector │ Engine   │ Mapper   │  Control     │
│          │          │          │          │              │
│ OpenCV   │MediaPipe │ Custom   │ NumPy    │ PyAutoGUI    │
│ VideoIO  │ Hands   │ Logic    │Interp    │ Mouse API    │
├──────────┴──────────┴──────────┴──────────┴──────────────┤
│              Performance Optimizer                        │
│     (Frame Skip · ROI Crop · Kalman Filter)              │
└─────────────────────────────────────────────────────────┘`;

const pseudoCode = `class VirtualMouse:
    def __init__(self):
        self.camera = cv2.VideoCapture(0)
        self.detector = HandDetector(confidence=0.7)
        self.classifier = GestureClassifier()
        self.controller = MouseController()
        self.optimizer = PerformanceOptimizer()
    
    def run(self):
        while True:
            frame = self.camera.read()
            
            # Detect hand landmarks
            landmarks = self.detector.find_hands(frame)
            
            if landmarks:
                # Classify gesture from landmarks
                gesture = self.classifier.classify(landmarks)
                
                # Map hand coordinates to screen
                screen_pos = self.optimizer.smooth(
                    self.map_coordinates(landmarks[8])
                )
                
                # Execute mouse action
                self.controller.execute(gesture, screen_pos)
            
            # Adaptive performance tuning
            self.optimizer.adjust(self.fps)`;

export default function ArchitectureSection() {
  return (
    <SectionWrapper id="architecture">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Code"
          title="Code & Architecture"
          description="Clean architecture designed for extensibility, performance, and maintainability."
        />

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FileCode2 className="w-4 h-4 text-primary-light" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-primary-light">System Architecture</h3>
            </div>
            <div className="code-block p-5 overflow-x-auto">
              <pre className="text-xs leading-relaxed text-muted">
                <code>{architectureDiagram}</code>
              </pre>
            </div>
          </motion.div>

          {/* Folder Structure */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FolderTree className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">Project Structure</h3>
            </div>
            <div className="code-block p-5 overflow-x-auto">
              <pre className="text-xs leading-relaxed text-muted">
                <code>{folderStructure}</code>
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Pseudo-code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileCode2 className="w-4 h-4 text-accent2" />
            <h3 className="text-sm font-semibold uppercase tracking-widest text-accent2">Core Logic (Pseudocode)</h3>
          </div>
          <div className="code-block p-5 overflow-x-auto">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-muted ml-2 font-mono">virtual_mouse.py</span>
            </div>
            <pre className="text-xs leading-relaxed">
              <code>{pseudoCode}</code>
            </pre>
          </div>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <StarBorder
            as="a"
            href="https://github.com/Mayank-iitj"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            color="#22d3ee"
            speed="6s"
            thickness={2}
          >
            <span className="flex items-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base">
              <Github className="w-5 h-5 text-primary-light shrink-0" />
              <span className="hidden sm:inline">Explore the Full Source Code on GitHub</span>
              <span className="sm:hidden">View Source on GitHub</span>
              <ExternalLink className="w-4 h-4 text-muted group-hover:text-foreground transition-colors shrink-0" />
            </span>
          </StarBorder>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
