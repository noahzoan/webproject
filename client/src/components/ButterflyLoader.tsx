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
        @keyframes ink-butterfly-flap {
          0%, 100% { transform: scaleX(1) rotateZ(0deg); }
          25% { transform: scaleX(0.5) rotateZ(-8deg); }
          50% { transform: scaleX(1) rotateZ(0deg); }
          75% { transform: scaleX(0.5) rotateZ(8deg); }
        }
        @keyframes ink-butterfly-away {
          0% {
            transform: translate(0, 0) scale(1) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-140px, -220px) scale(0.3) rotateZ(-45deg);
            opacity: 0;
          }
        }
      `}</style>
      
      <div style={{ animation: 'ink-butterfly-away 1.6s cubic-bezier(0.4, 0, 0.6, 1) forwards' }}>
        <svg
          width="160"
          height="140"
          viewBox="0 0 160 140"
          className="drop-shadow-2xl"
        >
          {/* Left Upper Wing */}
          <g style={{ transformOrigin: '80px 70px', animation: 'ink-butterfly-flap 0.5s ease-in-out infinite' }}>
            <path
              d="M 80 70 Q 50 40, 40 20 Q 35 45, 50 65 Z"
              fill="hsl(20 8% 18%)"
              opacity="0.92"
              filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.3))"
            />
            <path
              d="M 55 50 Q 48 38, 45 25"
              stroke="hsl(20 8% 20%)"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
          </g>

          {/* Right Upper Wing */}
          <g style={{ transformOrigin: '80px 70px', animation: 'ink-butterfly-flap 0.5s ease-in-out infinite', animationDelay: '0.12s' }}>
            <path
              d="M 80 70 Q 110 40, 120 20 Q 125 45, 110 65 Z"
              fill="hsl(20 8% 18%)"
              opacity="0.92"
              filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.3))"
            />
            <path
              d="M 105 50 Q 112 38, 115 25"
              stroke="hsl(20 8% 20%)"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
          </g>

          {/* Left Lower Wing */}
          <g style={{ transformOrigin: '80px 70px', animation: 'ink-butterfly-flap 0.5s ease-in-out infinite', animationDelay: '0.08s' }}>
            <path
              d="M 80 70 Q 48 85, 38 110 Q 45 88, 60 78 Z"
              fill="hsl(20 8% 20%)"
              opacity="0.88"
              filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.3))"
            />
            <path
              d="M 50 90 Q 42 105, 40 120"
              stroke="hsl(20 8% 18%)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
          </g>

          {/* Right Lower Wing */}
          <g style={{ transformOrigin: '80px 70px', animation: 'ink-butterfly-flap 0.5s ease-in-out infinite', animationDelay: '0.2s' }}>
            <path
              d="M 80 70 Q 112 85, 122 110 Q 115 88, 100 78 Z"
              fill="hsl(20 8% 20%)"
              opacity="0.88"
              filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.3))"
            />
            <path
              d="M 110 90 Q 118 105, 120 120"
              stroke="hsl(20 8% 18%)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
          </g>

          {/* Body - thick ink stroke */}
          <ellipse
            cx="80"
            cy="70"
            rx="5"
            ry="32"
            fill="hsl(20 8% 12%)"
            opacity="0.96"
            filter="drop-shadow(2px 2px 3px rgba(0,0,0,0.4))"
          />

          {/* Head */}
          <circle 
            cx="80" 
            cy="44" 
            r="8" 
            fill="hsl(20 8% 10%)" 
            opacity="0.98"
            filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.4))"
          />

          {/* Antennae - delicate ink strokes */}
          <path
            d="M 76 38 Q 72 28, 70 12"
            stroke="hsl(20 8% 14%)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
            filter="drop-shadow(0.5px 0.5px 1px rgba(0,0,0,0.2))"
          />
          <path
            d="M 84 38 Q 88 28, 90 12"
            stroke="hsl(20 8% 14%)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
            filter="drop-shadow(0.5px 0.5px 1px rgba(0,0,0,0.2))"
          />
        </svg>
      </div>

      <p className="absolute bottom-1/4 font-serif text-lg text-muted-foreground animate-fade-in">
        Discovering...
      </p>
    </div>
  );
}
