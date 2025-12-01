import { useState, useCallback } from "react";
import type * as React from "react";
import { motion } from "framer-motion";
import { ChevronRight, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FlipTileProps {
  title: string;
  content: string;
  index: number;
  highlight?: string;
  slug: string;
  onInteraction?: () => void;
}

const translations = {
  en: {
    clickToExplore: "Click to explore",
    flipBack: "Flip back",
    separator: ": ",
  },
  zh: {
    clickToExplore: "点击探索",
    flipBack: "返回",
    separator: "：",
  },
};

export function FlipTile({ title, content, index, highlight, slug, onInteraction }: FlipTileProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const handleInteraction = useCallback(() => {
    onInteraction?.();
  }, [onInteraction]);

  const colors = [
    { gradient: "from-primary/10 via-primary/5 to-transparent", accent: "bg-primary/20" },
    { gradient: "from-amber-500/10 via-amber-500/5 to-transparent", accent: "bg-amber-500/20" },
    { gradient: "from-emerald-600/10 via-emerald-600/5 to-transparent", accent: "bg-emerald-600/20" },
  ];

  const color = colors[index % colors.length];

  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  }, [handleFlip]);

  return (
    <div 
      className="perspective-1000 cursor-pointer group"
      style={{ perspective: "1000px" }}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleInteraction}
      onFocus={handleInteraction}
      role="button"
      tabIndex={0}
      aria-expanded={isFlipped}
      aria-label={isFlipped ? `${title}${t.separator}${t.flipBack}` : `${title}${t.separator}${t.clickToExplore}`}
      data-testid={`flip-tile-${slug}-${index}`}
    >
      <motion.div
        className="relative w-full min-h-[280px] md:min-h-[320px]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div 
          className={`
            absolute inset-0 backface-hidden rounded-lg overflow-hidden
            bg-card border border-border/50 shadow-sm
            group-hover:shadow-lg group-hover:border-primary/30
            transition-all duration-300
          `}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient}`} />
          
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-amber-500 to-primary opacity-70" />
          
          <div className="absolute -top-10 -right-10 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M10 90 Q30 30 50 50 Q70 70 90 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              />
            </svg>
          </div>

          <div className="relative p-6 md:p-8 h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${color.accent} text-foreground/80`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3 leading-tight">
              {title}
            </h3>
            
            <p className="text-muted-foreground leading-relaxed line-clamp-3 flex-1">
              {content.substring(0, 120)}{language === 'zh' ? '……' : '...'}
            </p>

            <div className="mt-4 pt-4 border-t border-border/50">
              <span className="text-sm text-primary font-medium flex items-center gap-2">
                {t.clickToExplore}
                <span className="inline-block w-8 h-px bg-primary/50" />
              </span>
            </div>
          </div>
        </div>

        <div 
          className={`
            absolute inset-0 backface-hidden rounded-lg overflow-hidden
            bg-card border border-primary/30 shadow-lg
          `}
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-amber-500/5" />
          
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-primary to-amber-500" />

          <div className="relative p-6 md:p-8 h-full flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl text-foreground">
                {title}
              </h3>
              <button 
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
                onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                aria-label={t.flipBack}
                data-testid={`flip-tile-back-${slug}-${index}`}
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.flipBack}</span>
              </button>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base flex-1">
              {content}
            </p>

            {highlight && (
              <blockquote className="mt-4 pt-4 border-t border-border/50">
                <p className="font-serif text-sm italic text-primary/90">
                  "{highlight}"
                </p>
              </blockquote>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
