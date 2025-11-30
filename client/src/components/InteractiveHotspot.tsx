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
  },
  zh: {
    conservation: "生态保护",
    heritage: "文化遗产",
    culture: "文化艺术",
    community: "社区联结",
    exploration: "探索发现",
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
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    setIsClicked(prev => !prev);
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
          w-12 h-12 md:w-16 md:h-16 rounded-full cursor-pointer transition-all duration-300
          ${isVisible ? 'opacity-0' : 'opacity-70 hover:opacity-90'}
          ${!showAll && !isClicked ? 'animate-hotspot-pulse' : ''}
        `}
        style={{
          background: 'radial-gradient(circle, rgba(180,16,46,0.5) 0%, rgba(180,16,46,0.2) 50%, rgba(180,16,46,0) 70%)',
        }}
      />
      
      <div
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          transition-all duration-300
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
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
