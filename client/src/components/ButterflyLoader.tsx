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
        @keyframes ink-butterfly-flutter {
          0%, 100% { transform: scaleX(1); }
          25% { transform: scaleX(0.4); }
          50% { transform: scaleX(1); }
          75% { transform: scaleX(0.4); }
        }
        @keyframes ink-butterfly-fly-away {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-120px, -200px) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
      
      <div style={{ animation: 'ink-butterfly-fly-away 1.6s cubic-bezier(0.4, 0, 0.6, 1) forwards' }}>
        <svg
          width="140"
          height="120"
          viewBox="0 0 140 120"
          className="drop-shadow-2xl"
        >
          {/* Left Upper Wing - elegant ink brush style */}
          <g style={{ transformOrigin: '70px 60px', animation: 'ink-butterfly-flutter 0.5s ease-in-out infinite' }}>
            <ellipse
              cx="45"
              cy="45"
              rx="24"
              ry="32"
              fill="hsl(20 8% 18%)"
              opacity="0.9"
              transform="rotate(-25 45 45)"
            />
            <path
              d="M 30 50 Q 25 40, 28 25 Q 35 32, 40 45"
              fill="hsl(20 8% 20%)"
              opacity="0.6"
            />
          </g>

          {/* Right Upper Wing - elegant ink brush style */}
          <g style={{ transformOrigin: '70px 60px', animation: 'ink-butterfly-flutter 0.5s ease-in-out infinite', animationDelay: '0.12s' }}>
            <ellipse
              cx="95"
              cy="45"
              rx="24"
              ry="32"
              fill="hsl(20 8% 18%)"
              opacity="0.9"
              transform="rotate(25 95 45)"
            />
            <path
              d="M 110 50 Q 115 40, 112 25 Q 105 32, 100 45"
              fill="hsl(20 8% 20%)"
              opacity="0.6"
            />
          </g>

          {/* Left Lower Wing - elegant ink brush style */}
          <g style={{ transformOrigin: '70px 60px', animation: 'ink-butterfly-flutter 0.5s ease-in-out infinite', animationDelay: '0.08s' }}>
            <ellipse
              cx="42"
              cy="78"
              rx="18"
              ry="26"
              fill="hsl(20 8% 20%)"
              opacity="0.85"
              transform="rotate(-20 42 78)"
            />
            <path
              d="M 32 85 Q 28 95, 32 105"
              stroke="hsl(20 8% 18%)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
          </g>

          {/* Right Lower Wing - elegant ink brush style */}
          <g style={{ transformOrigin: '70px 60px', animation: 'ink-butterfly-flutter 0.5s ease-in-out infinite', animationDelay: '0.2s' }}>
            <ellipse
              cx="98"
              cy="78"
              rx="18"
              ry="26"
              fill="hsl(20 8% 20%)"
              opacity="0.85"
              transform="rotate(20 98 78)"
            />
            <path
              d="M 108 85 Q 112 95, 108 105"
              stroke="hsl(20 8% 18%)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
          </g>

          {/* Body - elegant ink brush stroke */}
          <ellipse
            cx="70"
            cy="60"
            rx="6"
            ry="26"
            fill="hsl(20 8% 12%)"
            opacity="0.95"
          />

          {/* Head */}
          <circle cx="70" cy="38" r="8" fill="hsl(20 8% 10%)" opacity="0.98" />

          {/* Antennae - delicate brush strokes */}
          <path
            d="M 66 32 Q 62 22, 60 10"
            stroke="hsl(20 8% 14%)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 74 32 Q 78 22, 80 10"
            stroke="hsl(20 8% 14%)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </div>

      <p className="absolute bottom-1/4 font-serif text-lg text-muted-foreground animate-fade-in">
        Discovering...
      </p>
    </div>
  );
}
