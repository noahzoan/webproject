import { useEffect, useState } from "react";

interface ButterflyLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function ButterflyLoader({ isLoading, onComplete }: ButterflyLoaderProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onComplete?.();
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  if (!isAnimating) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center"
      data-testid="butterfly-loader"
    >
      <style>{`
        @keyframes flutter-wings {
          0%, 100% { transform: scaleX(1) }
          50% { transform: scaleX(0.2) }
        }
        @keyframes ink-float-away {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-100px, -150px) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
      
      <div style={{ animation: 'ink-float-away 1.4s ease-in forwards' }}>
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="drop-shadow-lg"
        >
          {/* Left Wings - Ink Brush Style */}
          <g style={{ transformOrigin: '60px 60px', animation: 'flutter-wings 0.4s ease-in-out infinite' }}>
            {/* Upper left wing */}
            <path
              d="M 60 60 Q 30 40, 25 25 Q 20 35, 28 50 Q 35 60, 60 60"
              fill="hsl(20 10% 20%)"
              opacity="0.85"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Lower left wing */}
            <path
              d="M 60 60 Q 35 75, 28 95 Q 22 85, 30 70 Q 40 62, 60 60"
              fill="hsl(20 10% 25%)"
              opacity="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Right Wings - Ink Brush Style */}
          <g style={{ transformOrigin: '60px 60px', animation: 'flutter-wings 0.4s ease-in-out infinite', animationDelay: '0.1s' }}>
            {/* Upper right wing */}
            <path
              d="M 60 60 Q 90 40, 95 25 Q 100 35, 92 50 Q 85 60, 60 60"
              fill="hsl(20 10% 20%)"
              opacity="0.85"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Lower right wing */}
            <path
              d="M 60 60 Q 85 75, 92 95 Q 98 85, 90 70 Q 80 62, 60 60"
              fill="hsl(20 10% 25%)"
              opacity="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Body - Ink Brush Strokes */}
          <ellipse
            cx="60"
            cy="60"
            rx="6"
            ry="24"
            fill="hsl(20 10% 15%)"
            opacity="0.9"
          />

          {/* Head */}
          <circle cx="60" cy="40" r="7" fill="hsl(20 10% 12%)" opacity="0.95" />

          {/* Antennae - Ink brush style */}
          <path
            d="M 56 35 Q 52 28, 50 18"
            stroke="hsl(20 10% 15%)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 64 35 Q 68 28, 70 18"
            stroke="hsl(20 10% 15%)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Wing Details - Fine ink strokes */}
          <path
            d="M 35 45 Q 30 50, 28 60"
            stroke="hsl(20 10% 22%)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
            strokeLinecap="round"
          />
          <path
            d="M 85 45 Q 90 50, 92 60"
            stroke="hsl(20 10% 22%)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="absolute bottom-1/4 font-serif text-lg text-muted-foreground animate-fade-in">
        Discovering...
      </p>
    </div>
  );
}
