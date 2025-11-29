import { useState } from "react";
import { Link } from "wouter";
import { X, Home, Info, Mail, MapPin, Heart } from "lucide-react";

interface BrushstrokeMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function BrushstrokeMenu({ isOpen, onToggle }: BrushstrokeMenuProps) {
  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/discover/conservation", label: "Conservation", icon: Heart },
    { href: "/discover/heritage", label: "Heritage", icon: MapPin },
    { href: "/about", label: "About Us", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
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
          <div className="flex flex-col gap-1.5 w-6">
            <svg viewBox="0 0 24 3" className="w-full h-1">
              <path
                d="M0 1.5 Q4 0.5, 12 1.5 T24 1.5"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                className="text-foreground"
              />
            </svg>
            <svg viewBox="0 0 24 3" className="w-full h-1">
              <path
                d="M0 1.5 Q6 2.5, 12 1.5 T24 1.5"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                className="text-foreground"
              />
            </svg>
            <svg viewBox="0 0 24 3" className="w-full h-1">
              <path
                d="M0 1.5 Q3 0.8, 12 1.5 T24 1.5"
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
          <div className="flex flex-col items-center justify-center h-full">
            <nav className="flex flex-col items-center gap-6">
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
            
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
              <svg viewBox="0 0 60 30" className="w-16 h-8 opacity-40">
                <path
                  d="M5 15 Q15 5, 30 15 T55 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-sm">Discover Heritage</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
