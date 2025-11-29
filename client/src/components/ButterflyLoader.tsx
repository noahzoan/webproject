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
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  if (!isAnimating) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center"
      data-testid="butterfly-loader"
    >
      <div className="animate-butterfly-fly">
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          className="drop-shadow-lg"
        >
          <g className="animate-wing-flap origin-center">
            <path
              d="M50 50 C30 30, 10 35, 15 55 C20 75, 45 75, 50 50"
              fill="hsl(355 80% 40%)"
              opacity="0.9"
            />
            <path
              d="M50 50 C35 25, 20 10, 25 40 C30 55, 48 55, 50 50"
              fill="hsl(43 55% 52%)"
              opacity="0.85"
            />
          </g>
          <g className="animate-wing-flap origin-center" style={{ animationDelay: "0.05s" }}>
            <path
              d="M50 50 C70 30, 90 35, 85 55 C80 75, 55 75, 50 50"
              fill="hsl(355 80% 40%)"
              opacity="0.9"
            />
            <path
              d="M50 50 C65 25, 80 10, 75 40 C70 55, 52 55, 50 50"
              fill="hsl(43 55% 52%)"
              opacity="0.85"
            />
          </g>
          <ellipse
            cx="50"
            cy="50"
            rx="4"
            ry="18"
            fill="hsl(20 10% 15%)"
          />
          <circle cx="50" cy="35" r="5" fill="hsl(20 10% 15%)" />
          <path
            d="M47 32 Q45 25 43 20"
            stroke="hsl(20 10% 15%)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M53 32 Q55 25 57 20"
            stroke="hsl(20 10% 15%)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
      <p className="absolute bottom-1/4 font-serif text-lg text-muted-foreground animate-fade-in">
        Discovering...
      </p>
    </div>
  );
}
