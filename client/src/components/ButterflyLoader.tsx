import { useEffect, useState } from "react";

interface ButterflyLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function ButterflyLoader({ isLoading, onComplete }: ButterflyLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading && !isVisible) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex items-center justify-center"
      data-testid="butterfly-loader"
    >
      <style>{`
        @keyframes ink-wing-flap {
          0%, 100% { 
            transform: scaleX(1) rotateY(0deg); 
          }
          50% { 
            transform: scaleX(0.3) rotateY(15deg); 
          }
        }
        @keyframes ink-float-away {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          60% {
            transform: translate(-60px, -80px) scale(0.9) rotate(-8deg);
            opacity: 1;
          }
          100% {
            transform: translate(-180px, -250px) scale(0.4) rotate(-25deg);
            opacity: 0;
          }
        }
        @keyframes ink-body-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes fade-out-text {
          0%, 70% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
      
      <div 
        className="relative"
        style={{ animation: 'ink-float-away 2.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards' }}
      >
        <svg
          width="180"
          height="160"
          viewBox="0 0 180 160"
          className="drop-shadow-lg"
        >
          {/* Traditional ink wash background effect */}
          <defs>
            <filter id="ink-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
            </filter>
            <filter id="ink-texture" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>

          {/* Left Wing - ink brush stroke style */}
          <g 
            style={{ 
              transformOrigin: '90px 80px', 
              animation: 'ink-wing-flap 1.2s ease-in-out infinite' 
            }}
          >
            {/* Upper left wing - broad ink wash */}
            <path
              d="M 90 80 
                 C 70 60, 45 35, 30 25
                 C 25 35, 28 55, 40 70
                 C 50 78, 70 82, 90 80"
              fill="currentColor"
              className="text-foreground/85"
              filter="url(#ink-texture)"
            />
            {/* Wing vein - delicate brush stroke */}
            <path
              d="M 88 78 C 65 60, 50 45, 38 35"
              stroke="currentColor"
              className="text-foreground/30"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Lower left wing */}
            <path
              d="M 90 80 
                 C 65 90, 40 105, 32 125
                 C 42 115, 55 100, 70 90
                 C 80 85, 88 82, 90 80"
              fill="currentColor"
              className="text-foreground/75"
              filter="url(#ink-texture)"
            />
          </g>

          {/* Right Wing - ink brush stroke style */}
          <g 
            style={{ 
              transformOrigin: '90px 80px', 
              animation: 'ink-wing-flap 1.2s ease-in-out infinite',
              animationDelay: '0.1s'
            }}
          >
            {/* Upper right wing - broad ink wash */}
            <path
              d="M 90 80 
                 C 110 60, 135 35, 150 25
                 C 155 35, 152 55, 140 70
                 C 130 78, 110 82, 90 80"
              fill="currentColor"
              className="text-foreground/85"
              filter="url(#ink-texture)"
            />
            {/* Wing vein */}
            <path
              d="M 92 78 C 115 60, 130 45, 142 35"
              stroke="currentColor"
              className="text-foreground/30"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Lower right wing */}
            <path
              d="M 90 80 
                 C 115 90, 140 105, 148 125
                 C 138 115, 125 100, 110 90
                 C 100 85, 92 82, 90 80"
              fill="currentColor"
              className="text-foreground/75"
              filter="url(#ink-texture)"
            />
          </g>

          {/* Body - calligraphic brush stroke */}
          <g style={{ animation: 'ink-body-bob 1.2s ease-in-out infinite' }}>
            {/* Thorax/abdomen - single brush stroke feel */}
            <ellipse
              cx="90"
              cy="82"
              rx="6"
              ry="28"
              fill="currentColor"
              className="text-foreground/95"
            />
            
            {/* Head - ink dot */}
            <circle 
              cx="90" 
              cy="52" 
              r="7" 
              fill="currentColor" 
              className="text-foreground"
            />

            {/* Antennae - delicate ink strokes curving outward */}
            <path
              d="M 86 48 Q 78 35, 72 22 Q 70 18, 68 15"
              stroke="currentColor"
              className="text-foreground/80"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="68" cy="14" r="2" fill="currentColor" className="text-foreground/70" />
            
            <path
              d="M 94 48 Q 102 35, 108 22 Q 110 18, 112 15"
              stroke="currentColor"
              className="text-foreground/80"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="112" cy="14" r="2" fill="currentColor" className="text-foreground/70" />
          </g>
        </svg>
      </div>

      <p 
        className="absolute bottom-1/4 font-serif text-xl text-muted-foreground tracking-wider"
        style={{ animation: 'fade-out-text 2.8s ease-out forwards' }}
      >
        Discovering...
      </p>
    </div>
  );
}
