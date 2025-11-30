import { useState, useCallback } from "react";
import { DiscoveryBubble } from "./DiscoveryBubble";
import { useLanguage } from "@/contexts/LanguageContext";
import type { DiscoveryContent } from "@shared/schema";

const translations = {
  en: {
    conservation: "Conservation",
    heritage: "Heritage",
    culture: "Culture",
    community: "Community",
    exploration: "Exploration",
    restoration: "Restoration",
    health: "Health",
    technology: "Technology",
    tradition: "Tradition",
    resources: "Resources",
    multimedia: "Multimedia",
    contributors: "Contributors",
  },
  zh: {
    conservation: "生态保护",
    heritage: "文化遗产",
    culture: "文化艺术",
    community: "社区联结",
    exploration: "探索发现",
    restoration: "生态修复",
    health: "环境健康",
    technology: "绿色科技",
    tradition: "传统智慧",
    resources: "资源中心",
    multimedia: "多媒体",
    contributors: "贡献者",
  },
};

interface InteractiveHotspotProps {
  discovery: DiscoveryContent;
  showAll: boolean;
  onNavigate?: () => void;
}

export function InteractiveHotspot({ discovery, showAll, onNavigate }: InteractiveHotspotProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const translatedTitle = t[discovery.slug as keyof typeof t] || discovery.title;
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  
  const isVisible = showAll || isHovered || isClicked;

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!showAll) {
      setIsClicked(false);
    }
  }, [showAll]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClicked(prev => !prev);
    setRippleKey(prev => prev + 1);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    setIsClicked(prev => !prev);
    setRippleKey(prev => prev + 1);
  }, []);

  return (
    <div
      className="absolute group"
      style={{
        left: `${discovery.positionX}%`,
        top: `${discovery.positionY}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      data-testid={`hotspot-${discovery.slug}`}
    >
      <div
        className={`
          relative w-14 h-14 md:w-16 md:h-16 cursor-pointer
          transition-all duration-500
          ${isVisible ? 'opacity-0 scale-75' : 'opacity-100'}
        `}
      >
        <div
          className={`
            absolute inset-0 rounded-full
            ${!showAll && !isClicked ? 'animate-hotspot-pulse' : ''}
          `}
          style={{
            background: `radial-gradient(circle, 
              rgba(180,16,46,0.45) 0%, 
              rgba(180,16,46,0.25) 35%, 
              rgba(180,16,46,0.08) 60%, 
              rgba(180,16,46,0) 75%
            )`,
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            width: '100%',
            height: '100%',
          }}
        />
        
        <div
          key={rippleKey}
          className={`
            absolute inset-0 rounded-full
            ${!isVisible ? 'animate-hotspot-ripple' : 'opacity-0'}
          `}
          style={{
            background: `radial-gradient(circle, 
              rgba(180,16,46,0.3) 0%, 
              rgba(180,16,46,0.1) 50%, 
              rgba(180,16,46,0) 70%
            )`,
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
          }}
        />

        <div
          className={`
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-3 h-3 rounded-full
            bg-primary/80 shadow-lg
            transition-all duration-300
            ${isVisible ? 'scale-0' : 'scale-100'}
          `}
          style={{
            boxShadow: '0 0 12px rgba(180,16,46,0.5), 0 0 24px rgba(180,16,46,0.3)',
          }}
        />
      </div>
      
      <div
        className={`
          absolute top-1/2 left-1/2
          transition-opacity duration-200
          ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        style={{
          zIndex: 50,
        }}
      >
        <DiscoveryBubble
          title={translatedTitle}
          slug={discovery.slug}
          icon={discovery.icon}
          isVisible={isVisible}
          onClick={onNavigate}
        />
      </div>
    </div>
  );
}
