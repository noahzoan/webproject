import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    discovering: "Discovering..."
  },
  zh: {
    discovering: "探索中……"
  }
};

interface ButterflyLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

function InkWashButterfly({ 
  delay = 0, 
  size = 1, 
  startX = 0, 
  startY = 0,
  rotation = 0,
  variant = 1
}: { 
  delay?: number; 
  size?: number; 
  startX?: number; 
  startY?: number;
  rotation?: number;
  variant?: number;
}) {
  const baseSize = 120 * size;
  
  return (
    <div
      className="absolute"
      style={{
        left: `calc(50% + ${startX}px)`,
        top: `calc(50% + ${startY}px)`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        animation: `ink-flutter ${2.8 - delay}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s forwards`,
        opacity: 0,
      }}
    >
      <svg
        width={baseSize}
        height={baseSize * 0.8}
        viewBox="0 0 120 96"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id={`ink-wash-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
          </filter>
          <linearGradient id={`wing-fade-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#4a4a4a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6a6a6a" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`wing-fade-light-${variant}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#5a5a5a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8a8a8a" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Left wings group */}
        <g style={{ 
          transformOrigin: '60px 48px', 
          animation: `ink-wing-flap ${0.8 + variant * 0.1}s ease-in-out infinite` 
        }}>
          {/* Upper left wing - watercolor wash effect */}
          <path
            d="M 60 48 
               C 45 35, 25 20, 12 15
               C 8 25, 15 40, 28 50
               C 40 55, 52 52, 60 48"
            fill={`url(#wing-fade-${variant})`}
            filter={`url(#ink-wash-${variant})`}
          />
          {/* Wing wash overlay for watercolor effect */}
          <path
            d="M 55 45 
               C 42 35, 28 25, 18 22
               C 22 32, 30 42, 42 48"
            fill="#4a4a4a"
            opacity="0.3"
          />
          {/* Delicate vein lines */}
          <path
            d="M 58 46 C 45 38, 32 28, 22 22"
            stroke="#1a1a1a"
            strokeWidth="0.5"
            fill="none"
            opacity="0.4"
          />
          
          {/* Lower left wing */}
          <path
            d="M 60 48 
               C 48 58, 30 72, 20 82
               C 28 78, 42 68, 52 58
               C 56 54, 59 50, 60 48"
            fill={`url(#wing-fade-light-${variant})`}
            filter={`url(#ink-wash-${variant})`}
          />
        </g>

        {/* Right wings group */}
        <g style={{ 
          transformOrigin: '60px 48px', 
          animation: `ink-wing-flap ${0.8 + variant * 0.1}s ease-in-out infinite`,
          animationDelay: '0.05s'
        }}>
          {/* Upper right wing */}
          <path
            d="M 60 48 
               C 75 35, 95 20, 108 15
               C 112 25, 105 40, 92 50
               C 80 55, 68 52, 60 48"
            fill={`url(#wing-fade-${variant})`}
            filter={`url(#ink-wash-${variant})`}
          />
          {/* Wing wash overlay */}
          <path
            d="M 65 45 
               C 78 35, 92 25, 102 22
               C 98 32, 90 42, 78 48"
            fill="#4a4a4a"
            opacity="0.3"
          />
          {/* Vein line */}
          <path
            d="M 62 46 C 75 38, 88 28, 98 22"
            stroke="#1a1a1a"
            strokeWidth="0.5"
            fill="none"
            opacity="0.4"
          />
          
          {/* Lower right wing */}
          <path
            d="M 60 48 
               C 72 58, 90 72, 100 82
               C 92 78, 78 68, 68 58
               C 64 54, 61 50, 60 48"
            fill={`url(#wing-fade-light-${variant})`}
            filter={`url(#ink-wash-${variant})`}
          />
        </g>

        {/* Body - ink brush stroke */}
        <g style={{ animation: 'ink-body-bob 0.8s ease-in-out infinite' }}>
          {/* Abdomen - tapered brush stroke */}
          <ellipse
            cx="60"
            cy="52"
            rx="4"
            ry="18"
            fill="#1a1a1a"
            opacity="0.9"
          />
          
          {/* Head */}
          <circle 
            cx="60" 
            cy="32" 
            r="5" 
            fill="#1a1a1a"
            opacity="0.95"
          />

          {/* Antennae - delicate ink strokes */}
          <path
            d="M 57 30 Q 50 20, 45 12"
            stroke="#1a1a1a"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
          <circle cx="45" cy="11" r="1.5" fill="#1a1a1a" opacity="0.7" />
          
          <path
            d="M 63 30 Q 70 20, 75 12"
            stroke="#1a1a1a"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
          <circle cx="75" cy="11" r="1.5" fill="#1a1a1a" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

export function ButterflyLoader({ isLoading, onComplete }: ButterflyLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

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
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center"
      data-testid="butterfly-loader"
    >
      <style>{`
        @keyframes ink-wing-flap {
          0%, 100% { 
            transform: scaleX(1) rotateY(0deg); 
          }
          50% { 
            transform: scaleX(0.4) rotateY(12deg); 
          }
        }
        @keyframes ink-flutter {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(20px) rotate(var(--rotation, 0deg));
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0) rotate(var(--rotation, 0deg));
          }
          70% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(-30px) translateX(-20px) rotate(var(--rotation, 0deg));
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(-120px) translateX(-60px) rotate(var(--rotation, 0deg));
          }
        }
        @keyframes ink-body-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes fade-out-text {
          0%, 60% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
      
      {/* Single ink wash butterfly */}
      <InkWashButterfly 
        delay={0} 
        size={1.3} 
        startX={0} 
        startY={0}
        rotation={0}
        variant={1}
      />

      <p 
        className="absolute bottom-1/4 font-serif text-xl text-muted-foreground tracking-wider"
        style={{ animation: 'fade-out-text 2.8s ease-out forwards' }}
      >
        {t.discovering}
      </p>
    </div>
  );
}
