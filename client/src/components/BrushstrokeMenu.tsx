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
          <div className="flex flex-col gap-2 w-6 h-5 justify-center">
            {/* Top brushstroke */}
            <svg viewBox="0 0 24 4" className="w-full h-1.5 drop-shadow-sm">
              <path
                d="M 2 2 Q 8 1, 12 2 Q 16 3, 22 2"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                className="text-foreground"
              />
            </svg>
            {/* Middle brushstroke */}
            <svg viewBox="0 0 24 4" className="w-full h-1.5 drop-shadow-sm">
              <path
                d="M 1 2 Q 7 3, 12 2 Q 17 1, 23 2"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                className="text-foreground"
              />
            </svg>
            {/* Bottom brushstroke */}
            <svg viewBox="0 0 24 4" className="w-full h-1.5 drop-shadow-sm">
              <path
                d="M 3 2 Q 9 1.2, 12 2 Q 15 2.8, 21 2"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
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
        >
          <div className="flex flex-col items-center justify-center h-full relative">
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

            {/* Language Toggle */}
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-menu-slide" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4" />
                <span>{t.language}:</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {
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
                  onClick={() => {
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

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground opacity-30">
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
