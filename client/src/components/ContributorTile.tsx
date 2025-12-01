import { useState, useCallback } from "react";
import type * as React from "react";
import { motion } from "framer-motion";
import { RotateCcw, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Contributor } from "@shared/schema";

interface ContributorTileProps {
  contributor: Contributor;
}

const translations = {
  en: {
    clickToLearn: "Tap to learn their story",
    flipBack: "Back",
    separator: " — ",
    connectionTitle: "Connection to Eco-Civ",
  },
  zh: {
    clickToLearn: "点击了解更多",
    flipBack: "返回",
    separator: "——",
    connectionTitle: "与生态文明的联系",
  },
};

export function ContributorTile({ contributor }: ContributorTileProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const name = language === 'zh' ? contributor.nameChinese : contributor.name;
  const role = language === 'zh' ? contributor.roleChinese : contributor.role;
  const connection = language === 'zh' ? contributor.connectionChinese : contributor.connection;

  const categoryColors = {
    team: { 
      gradient: "from-primary/15 via-primary/5 to-transparent", 
      accent: "bg-primary/20",
      border: "border-primary/30",
      ring: "ring-primary/30"
    },
    scholar: { 
      gradient: "from-emerald-600/15 via-emerald-600/5 to-transparent", 
      accent: "bg-emerald-600/20",
      border: "border-emerald-600/30",
      ring: "ring-emerald-600/30"
    },
    partner: { 
      gradient: "from-amber-500/15 via-amber-500/5 to-transparent", 
      accent: "bg-amber-500/20",
      border: "border-amber-500/30",
      ring: "ring-amber-500/30"
    },
  };

  const color = categoryColors[contributor.category];

  const handleFlip = useCallback(() => {
    setIsFlipped(true);
  }, []);

  const handleFlipBack = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isFlipped) {
        setIsFlipped(true);
      }
    } else if (e.key === 'Escape' && isFlipped) {
      setIsFlipped(false);
    }
  }, [isFlipped]);

  return (
    <div 
      className="perspective-1000 cursor-pointer group"
      style={{ perspective: "1000px" }}
      onClick={!isFlipped ? handleFlip : undefined}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isFlipped}
      aria-label={isFlipped ? `${name}${t.separator}${t.flipBack}` : `${name}${t.separator}${t.clickToLearn}`}
      data-testid={`contributor-tile-${contributor.id}`}
    >
      <motion.div
        className="relative w-full min-h-[300px] md:min-h-[340px]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div 
          className={`
            absolute inset-0 backface-hidden rounded-xl overflow-hidden
            bg-card border border-border/50 shadow-sm
            group-hover:shadow-lg group-hover:${color.border}
            transition-all duration-300
          `}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient}`} />
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-amber-500 to-emerald-600 opacity-60" />
          
          <div className="absolute -bottom-8 -right-8 w-24 h-24 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground" />
              <path d="M50 10 Q80 40 50 90 Q20 40 50 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
            </svg>
          </div>

          <div className="relative p-6 md:p-8 h-full flex flex-col items-center text-center">
            <div className={`w-24 h-24 md:w-28 md:h-28 rounded-full ${color.accent} flex items-center justify-center mb-4 ring-2 ${color.ring} ring-offset-2 ring-offset-card`}>
              {contributor.avatar ? (
                <img 
                  src={contributor.avatar} 
                  alt={name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 md:w-12 md:h-12 text-foreground/40" />
              )}
            </div>
            
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1 leading-tight">
              {name}
            </h3>
            
            <p className={`text-sm font-medium ${color.accent.replace('bg-', 'text-').replace('/20', '')} mb-4`}>
              {role}
            </p>
            
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
              {connection.substring(0, 80)}{language === 'zh' ? '……' : '...'}
            </p>

            <div className="mt-4 pt-4 border-t border-border/30 w-full">
              <span className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                {t.clickToLearn}
              </span>
            </div>
          </div>
        </div>

        <div 
          className={`
            absolute inset-0 backface-hidden rounded-xl overflow-hidden
            bg-card border ${color.border} shadow-lg
            ${!isFlipped ? 'pointer-events-none' : ''}
          `}
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            visibility: isFlipped ? 'visible' : 'hidden'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} pointer-events-none`} />
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-primary to-emerald-600 pointer-events-none" />

          <div className="relative p-6 md:p-8 h-full flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${color.accent} flex items-center justify-center`}>
                  <User className="w-5 h-5 text-foreground/60" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground leading-tight">
                    {name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </div>
              <button 
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors text-xs text-muted-foreground hover:text-foreground"
                onClick={handleFlipBack}
                aria-label={t.flipBack}
                data-testid={`contributor-tile-back-${contributor.id}`}
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                <span>{t.flipBack}</span>
              </button>
            </div>
            
            <div className="mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {t.connectionTitle}
              </span>
            </div>
            
            <p className="text-foreground/90 leading-relaxed text-sm md:text-base flex-1">
              {connection}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
