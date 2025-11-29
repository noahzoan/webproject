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
        className="fixed top-6 left-6 z-50 p-3 rounded-md bg-background/60 backdrop-blur-md border border-border/50 hover-elevate active-elevate-2 transition-all duration-200"
        data-testid="button-menu-toggle"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <div className="flex flex-col gap-1.5 w-8 justify-center">
            {/* Top thick brushstroke */}
            <svg viewBox="0 0 100 20" className="w-full h-2.5">
              <path
                d="M 5 10 Q 20 2, 50 10 Q 80 18, 95 10"
                stroke="currentColor"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
              />
            </svg>
            {/* Middle thick brushstroke */}
            <svg viewBox="0 0 100 20" className="w-full h-2.5">
              <path
                d="M 5 10 Q 30 16, 50 10 Q 70 4, 95 10"
                stroke="currentColor"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
              />
            </svg>
            {/* Bottom thick brushstroke */}
            <svg viewBox="0 0 100 20" className="w-full h-2.5">
              <path
                d="M 5 10 Q 15 3, 50 10 Q 85 17, 95 10"
                stroke="currentColor"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
              />
            </svg>
          </div>
        )}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg animate-fade-in"
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
