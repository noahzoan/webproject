import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { useLocation } from "wouter";
import { ChevronDown, Home, Info, Mail, TreePine, Building2, Zap, Heart, BookOpen, Paintbrush, Waypoints, Mountain, Globe, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const translations = {
  en: {
    discover: "Discover",
    pages: "Pages",
    home: "Home",
    about: "About Us",
    contact: "Contact",
    language: "Language",
    currentPage: "Current page",
    categories: {
      restoration: "Ecological Restoration",
      heritage: "Cultural Heritage",
      technology: "Green Technology",
      health: "Environmental Health",
      tradition: "Traditional Wisdom",
      culture: "Arts & Culture",
      community: "Community",
      exploration: "Exploration",
    },
  },
  zh: {
    discover: "探索",
    pages: "页面",
    home: "首页",
    about: "关于我们",
    contact: "联系",
    language: "语言",
    currentPage: "当前页面",
    categories: {
      restoration: "生态修复",
      heritage: "文化遗产",
      technology: "绿色科技",
      health: "环境健康",
      tradition: "传统智慧",
      culture: "文化艺术",
      community: "社区联结",
      exploration: "探索发现",
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
};

interface NavLinkProps extends ComponentPropsWithoutRef<"a"> {
  href: string;
  isActive?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, isActive, children, className, onClick, ...props }, ref) => {
    const [, setLocation] = useLocation();
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setLocation(href);
      onClick?.(e);
    };
    
    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={className}
        aria-current={isActive ? "page" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }
);
NavLink.displayName = "NavLink";

export function AccessibleNav() {
  const { language, setLanguage } = useLanguage();
  const [location] = useLocation();
  const t = translations[language];

  const discoveryItems = Object.entries(t.categories).map(([slug, label]) => ({
    href: `/discover/${slug}`,
    label,
    icon: categoryIcons[slug as keyof typeof categoryIcons],
    slug,
  }));

  const pageItems = [
    { href: "/", label: t.home, icon: Home, slug: "home" },
    { href: "/about", label: t.about, icon: Info, slug: "about-us" },
    { href: "/contact", label: t.contact, icon: Mail, slug: "contact" },
  ];

  return (
    <nav 
      className="fixed top-4 right-20 z-40 flex items-center gap-2 px-2 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border/50 shadow-lg"
      role="navigation"
      aria-label="Main navigation"
      data-testid="accessible-nav"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 text-sm font-medium"
            data-testid="dropdown-discover"
            aria-haspopup="menu"
          >
            {t.discover}
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-56 max-h-80 overflow-y-auto"
          data-testid="dropdown-discover-content"
        >
          <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            {t.discover}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {discoveryItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <DropdownMenuItem 
                key={item.slug} 
                asChild
                className={isActive ? 'bg-primary/10 text-primary' : ''}
              >
                <NavLink
                  href={item.href}
                  isActive={isActive}
                  className="flex items-center gap-3 cursor-pointer w-full"
                  data-testid={`nav-link-${item.slug}`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                </NavLink>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-px h-5 bg-border/50" aria-hidden="true" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 text-sm font-medium"
            data-testid="dropdown-pages"
            aria-haspopup="menu"
          >
            {t.pages}
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" data-testid="dropdown-pages-content">
          {pageItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <DropdownMenuItem 
                key={item.href} 
                asChild
                className={isActive ? 'bg-primary/10 text-primary' : ''}
              >
                <NavLink
                  href={item.href}
                  isActive={isActive}
                  className="flex items-center gap-3 cursor-pointer w-full"
                  data-testid={`nav-link-${item.slug}`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                </NavLink>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-px h-5 bg-border/50" aria-hidden="true" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="w-8 h-8"
            aria-label={`${t.language}: ${language === 'en' ? 'English' : '中文'}`}
            data-testid="dropdown-language"
            aria-haspopup="menu"
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" data-testid="dropdown-language-content">
          <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            {t.language}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={language} onValueChange={(val) => setLanguage(val as "en" | "zh")}>
            <DropdownMenuRadioItem 
              value="en"
              className="cursor-pointer"
              data-testid="nav-lang-en"
            >
              English
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem 
              value="zh"
              className="cursor-pointer"
              data-testid="nav-lang-zh"
            >
              中文
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
