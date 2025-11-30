import { useState } from "react";
import { Link } from "wouter";
import { X, Home, Info, Mail, MapPin, Heart, Globe } from "lucide-react";

interface BrushstrokeMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  language: "en" | "zh";
  onLanguageChange: (lang: "en" | "zh") => void;
}

const translations = {
  en: {
    home: "Home",
    conservation: "Conservation",
    heritage: "Heritage",
    about: "About Us",
    contact: "Contact",
    language: "Language",
    english: "English",
    chinese: "中文",
  },
  zh: {
    home: "首页",
    conservation: "保护",
    heritage: "遗产",
    about: "关于我们",
    contact: "联系",
    language: "语言",
    english: "English",
    chinese: "中文",
  },
};

export function BrushstrokeMenu({ isOpen, onToggle, language = "en", onLanguageChange }: BrushstrokeMenuProps) {
  const t = translations[language];
  
  const menuItems = [
    { href: "/", label: t.home, icon: Home },
    { href: "/discover/conservation", label: t.conservation, icon: Heart },
    { href: "/discover/heritage", label: t.heritage, icon: MapPin },
    { href: "/about", label: t.about, icon: Info },
    { href: "/contact", label: t.contact, icon: Mail },
  ];

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-6 left-6 p-3 rounded-md bg-background/90 backdrop-blur-md border border-border/50 shadow-xl hover-elevate active-elevate-2 transition-all duration-200" style={{ zIndex: 9999 }}
        data-testid="button-menu-toggle"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <div className="flex flex-col -space-y-1 w-9 justify-center">
            {/* Ink brushstroke lines with tapered/faded ends */}
            <svg viewBox="0 0 100 28" className="w-full h-4">
              <defs>
                <linearGradient id="brushFade1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                  <stop offset="15%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="85%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              <path
                d="M 2 14 Q 25 6, 50 14 Q 75 22, 98 14"
                stroke="url(#brushFade1)"
                strokeWidth="16"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <svg viewBox="0 0 100 28" className="w-full h-4">
              <defs>
                <linearGradient id="brushFade2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
                  <stop offset="12%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="88%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M 2 14 Q 30 22, 50 14 Q 70 6, 98 14"
                stroke="url(#brushFade2)"
                strokeWidth="18"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <svg viewBox="0 0 100 28" className="w-full h-4">
              <defs>
                <linearGradient id="brushFade3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                  <stop offset="18%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="82%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path
                d="M 2 14 Q 20 7, 50 14 Q 80 21, 98 14"
                stroke="url(#brushFade3)"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/95 backdrop-blur-lg animate-fade-in"
          style={{ zIndex: 9998 }}
          data-testid="menu-overlay"
          onClick={onToggle}
        >
          <div className="flex flex-col items-center justify-center h-full relative w-full" onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col items-center gap-8 mb-12">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onToggle}
                  className="group flex items-center gap-4 text-2xl md:text-3xl font-serif text-foreground hover:text-primary transition-colors duration-300 animate-menu-slide"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`link-menu-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <item.icon className="w-6 h-6 md:w-8 md:h-8 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              ))}
            </nav>

            {/* Language Toggle - centered below menu */}
            <div className="absolute bottom-24 w-full flex flex-col items-center gap-4 animate-menu-slide" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4" />
                <span>{t.language}:</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLanguageChange("en");
                    onToggle();
                  }}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    language === "en"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-card-border text-foreground hover-elevate"
                  }`}
                  data-testid="button-lang-en"
                >
                  {t.english}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLanguageChange("zh");
                    onToggle();
                  }}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    language === "zh"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-card-border text-foreground hover-elevate"
                  }`}
                  data-testid="button-lang-zh"
                >
                  {t.chinese}
                </button>
              </div>
            </div>

            <div className="absolute bottom-12 w-full flex flex-col items-center gap-2 text-muted-foreground opacity-30">
              <svg viewBox="0 0 60 30" className="w-16 h-8">
                <path
                  d="M5 15 Q15 5, 30 15 T55 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
