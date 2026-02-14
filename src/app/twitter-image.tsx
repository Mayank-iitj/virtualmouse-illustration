import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Virtual Mouse — AI-Powered Hand Gesture Control';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #050505 0%, #111111 50%, #0a0a2e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glow circle */}
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Hand icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
            marginBottom: '24px',
            fontSize: '40px',
          }}
        >
          🖱️
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #22d3ee 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            lineHeight: 1.1,
            padding: '0 60px',
          }}
        >
          Virtual Mouse
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#a3a3a3',
            marginTop: '16px',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.4,
          }}
        >
          AI-Powered Hand Gesture Control
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '32px',
          }}
        >
          {['MediaPipe', 'OpenCV', 'Python', 'Real-Time AI'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#a78bfa',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Author bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            fontSize: '16px',
          }}
        >
          <span>by</span>
          <span style={{ color: '#a78bfa', fontWeight: 600 }}>Mayank Sharma</span>
          <span>•</span>
          <span>Open Source</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
