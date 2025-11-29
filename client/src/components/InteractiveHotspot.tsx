import { useState, useCallback } from "react";
import { DiscoveryBubble } from "./DiscoveryBubble";
import type { DiscoveryContent } from "@shared/schema";

interface InteractiveHotspotProps {
  discovery: DiscoveryContent;
  showAll: boolean;
  onNavigate?: () => void;
}

export function InteractiveHotspot({ discovery, showAll, onNavigate }: InteractiveHotspotProps) {
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
          ${isVisible ? 'opacity-0' : 'opacity-40 hover:opacity-70'}
          ${!showAll && !isClicked ? 'animate-hotspot-pulse' : ''}
        `}
        style={{
          background: 'radial-gradient(circle, rgba(200,16,46,0.3) 0%, rgba(200,16,46,0) 70%)',
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
          title={discovery.title}
          slug={discovery.slug}
          icon={discovery.icon}
          isVisible={isVisible}
          onClick={onNavigate}
        />
      </div>
    </div>
  );
}
