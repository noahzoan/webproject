import { Link } from "wouter";
import { X, Home, Info, Mail, Globe, TreePine, Building2, Zap, Heart, BookOpen, Paintbrush, Waypoints, Mountain, Library, Video, Users } from "lucide-react";

interface BrushstrokeMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  language: "en" | "zh";
  onLanguageChange: (lang: "en" | "zh") => void;
}

const translations = {
  en: {
    home: "Home",
    about: "About Us",
    contact: "Contact",
    language: "Language",
    english: "English",
    chinese: "中文",
    discover: "Discover",
    pages: "Pages",
    categories: {
      restoration: "Ecological Restoration",
      heritage: "Cultural Heritage",
      technology: "Green Technology",
      health: "Environmental Health",
      tradition: "Traditional Wisdom",
      culture: "Arts & Culture",
      community: "Community",
      exploration: "Exploration",
      resources: "Resources",
      multimedia: "Multimedia",
      contributors: "Contributors",
    },
  },
  zh: {
    home: "首页",
    about: "关于我们",
    contact: "联系我们",
    language: "语言",
    english: "English",
    chinese: "中文",
    discover: "探索",
    pages: "页面",
    categories: {
      restoration: "生态修复",
      heritage: "文化遗产",
      technology: "绿色科技",
      health: "环境健康",
      tradition: "传统智慧",
      culture: "文化艺术",
      community: "社区联结",
      exploration: "探索发现",
      resources: "资源中心",
      multimedia: "多媒体",
      contributors: "贡献者",
    },
  },
};

const categoryIcons = {
  restoration: TreePine,
  heritage: Building2,
  technology: Zap,
  health: Heart,
  tradition: BookOpen,
  culture: Paintbrush,
  community: Waypoints,
  exploration: Mountain,
  resources: Library,
  multimedia: Video,
  contributors: Users,
};

export function BrushstrokeMenu({ isOpen, onToggle, language = "en", onLanguageChange }: BrushstrokeMenuProps) {
  const t = translations[language];
  
  const discoveryItems = Object.entries(t.categories).map(([slug, label]) => ({
    href: slug === 'contributors' ? '/contributors' : `/discover/${slug}`,
    label,
    icon: categoryIcons[slug as keyof typeof categoryIcons],
    slug,
  }));

  const pageItems = [
    { href: "/", label: t.home, icon: Home, slug: "home" },
    { href: "/about", label: t.about, icon: Info, slug: "about" },
    { href: "/contact", label: t.contact, icon: Mail, slug: "contact" },
  ];

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-6 left-6 p-3 rounded-md bg-background/90 backdrop-blur-md border border-border/50 shadow-xl hover-elevate active-elevate-2 transition-all duration-200" 
        style={{ zIndex: 9999 }}
        data-testid="button-menu-toggle"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <svg 
            viewBox="0 0 24 24" 
            className="w-6 h-6 text-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Rolled scroll body - horizontal tube */}
            <rect x="3" y="8" width="18" height="8" rx="4" ry="4" />
            
            {/* Left spiral curl showing rolled paper */}
            <path d="M3 12 c0-2.5 1.5-4 3-4 c1.5 0 2.5 1 2.5 2 s-0.8 1.5-1.5 1.5" />
            
            {/* Right spiral curl showing rolled paper */}
            <path d="M21 12 c0-2.5 -1.5-4 -3-4 c-1.5 0 -2.5 1 -2.5 2 s0.8 1.5 1.5 1.5" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/95 backdrop-blur-lg animate-fade-in overflow-y-auto"
          style={{ zIndex: 9998 }}
          data-testid="menu-overlay"
          onClick={onToggle}
        >
          <div className="flex flex-col items-center py-20 px-4 min-h-full" onClick={(e) => e.stopPropagation()}>
            <div className="w-full max-w-lg">
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 text-center animate-menu-slide">
                {t.discover}
              </h3>
              <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {discoveryItems.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    onClick={onToggle}
                    className="group flex items-center gap-3 px-4 py-3 rounded-lg bg-card/50 border border-border/30 text-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 animate-menu-slide"
                    style={{ animationDelay: `${index * 0.03}s` }}
                    data-testid={`link-menu-${item.slug}`}
                  >
                    <item.icon className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="w-24 h-px bg-border/50 mx-auto mb-8" />

              <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 text-center animate-menu-slide" style={{ animationDelay: '0.35s' }}>
                {t.pages}
              </h3>
              <nav className="flex flex-col items-center gap-3 mb-10">
                {pageItems.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={item.href}
                    onClick={onToggle}
                    className="group flex items-center gap-3 px-6 py-3 rounded-lg bg-card/50 border border-border/30 text-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 animate-menu-slide w-full max-w-xs"
                    style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                    data-testid={`link-menu-${item.slug}`}
                  >
                    <item.icon className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="w-24 h-px bg-border/50 mx-auto mb-8" />

              <div className="flex flex-col items-center gap-4 animate-menu-slide" style={{ animationDelay: '0.55s' }}>
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

              <div className="mt-12 flex flex-col items-center gap-2 text-muted-foreground opacity-30">
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
        </div>
      )}
    </>
  );
}
