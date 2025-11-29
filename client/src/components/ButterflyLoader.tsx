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
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  if (!isAnimating) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center pointer-events-none"
      data-testid="butterfly-loader"
    >
      <style>{`
        @keyframes butterfly-flutter {
          0%, 100% { transform: scaleX(1) skewY(0deg); opacity: 1; }
          25% { transform: scaleX(0.3) skewY(-2deg); opacity: 0.9; }
          50% { transform: scaleX(1) skewY(0deg); opacity: 1; }
          75% { transform: scaleX(0.3) skewY(2deg); opacity: 0.9; }
        }
        @keyframes ink-ascend-away {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
            filter: blur(0px);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translate(-80px, -250px) scale(0.4) rotate(-25deg);
            opacity: 0;
            filter: blur(2px);
          }
        }
      `}</style>
      
      <div style={{ animation: 'ink-ascend-away 1.6s cubic-bezier(0.4, 0, 0.6, 1) forwards' }}>
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          className="drop-shadow-2xl"
        >
          {/* Left Wings - Large solid ink shapes */}
          <g style={{ transformOrigin: '70px 70px', animation: 'butterfly-flutter 0.5s ease-in-out infinite' }}>
            {/* Upper left wing - solid filled ink shape */}
            <path
              d="M 70 70 Q 35 50, 28 28 Q 25 38, 32 55 Q 42 68, 70 70"
              fill="hsl(20 8% 18%)"
              opacity="0.95"
              style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}
            />
            {/* Lower left wing - solid filled ink shape */}
            <path
              d="M 70 70 Q 40 88, 32 110 Q 28 98, 38 78 Q 48 72, 70 70"
              fill="hsl(20 10% 22%)"
              opacity="0.92"
              style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}
            />
          </g>

          {/* Right Wings - Large solid ink shapes */}
          <g style={{ transformOrigin: '70px 70px', animation: 'butterfly-flutter 0.5s ease-in-out infinite', animationDelay: '0.12s' }}>
            {/* Upper right wing - solid filled ink shape */}
            <path
              d="M 70 70 Q 105 50, 112 28 Q 115 38, 108 55 Q 98 68, 70 70"
              fill="hsl(20 8% 18%)"
              opacity="0.95"
              style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}
            />
            {/* Lower right wing - solid filled ink shape */}
            <path
              d="M 70 70 Q 100 88, 108 110 Q 112 98, 102 78 Q 92 72, 70 70"
              fill="hsl(20 10% 22%)"
              opacity="0.92"
              style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}
            />
          </g>

          {/* Body - Thick solid ink brush stroke */}
          <ellipse
            cx="70"
            cy="70"
            rx="8"
            ry="28"
            fill="hsl(20 8% 12%)"
            opacity="0.98"
            style={{ filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.4))' }}
          />

          {/* Head - Solid circle */}
          <circle 
            cx="70" 
            cy="48" 
            r="9" 
            fill="hsl(20 8% 10%)" 
            opacity="0.99"
            style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.4))' }}
          />

          {/* Left Antenna */}
          <path
            d="M 65 42 Q 60 32, 58 18 Q 57 16, 60 15 Q 62 17, 63 20 Q 64 28, 66 38"
            fill="hsl(20 8% 14%)"
            opacity="0.85"
            style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))' }}
          />
          
          {/* Right Antenna */}
          <path
            d="M 75 42 Q 80 32, 82 18 Q 83 16, 80 15 Q 78 17, 77 20 Q 76 28, 74 38"
            fill="hsl(20 8% 14%)"
            opacity="0.85"
            style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))' }}
          />

          {/* Wing Details - Fine ink strokes for texture */}
          <path
            d="M 42 60 Q 38 68, 36 78"
            stroke="hsl(20 8% 20%)"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
            strokeLinecap="round"
          />
          <path
            d="M 98 60 Q 102 68, 104 78"
            stroke="hsl(20 8% 20%)"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
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
