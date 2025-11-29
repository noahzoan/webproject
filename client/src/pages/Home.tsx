import { useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrushstrokeMenu } from "@/components/BrushstrokeMenu";
import { ShowAllToggle } from "@/components/ShowAllToggle";
import { InteractiveHotspot } from "@/components/InteractiveHotspot";
import { Footer } from "@/components/Footer";
import { ButterflyLoader } from "@/components/ButterflyLoader";
import { useIsMobile } from "@/hooks/use-mobile";
import { Droplets, Building2, Flower2, Waypoints, Mountain, Loader2 } from "lucide-react";
import type { DiscoveryContent } from "@shared/schema";
import landscapeImage from "@assets/generated_images/traditional_asian_landscape_painting.png";

const iconComponents: Record<string, typeof Droplets> = {
  droplets: Droplets,
  building: Building2,
  flower: Flower2,
  bridge: Waypoints,
  mountain: Mountain,
};

const translations = {
  en: {
    title: "Ecological Civilization",
    subtitle: "Discover the Stories Within",
    description: "Each element in this traditional landscape holds centuries of wisdom and cultural significance. Hover or tap on the glowing areas to uncover hidden stories about conservation, heritage, culture, and the timeless connection between humanity and nature.",
    dragToExplore: "Drag to explore",
    scrollToExplore: "Scroll to explore",
  },
  zh: {
    title: "生态文明",
    subtitle: "发现内在的故事",
    description: "传统风景中的每一个元素都蕴含着几个世纪的智慧和文化意义。悬停或点击发光区域以发现有关保护、遗产、文化以及人类与自然之间永恒联系的隐藏故事。",
    dragToExplore: "拖动以探索",
    scrollToExplore: "滚动以探索",
  },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [language, setLanguage] = useState<"en" | "zh">("en");
  const isMobile = useIsMobile();
  
  const t = translations[language];
  
  const { data: discoveries = [], isLoading } = useQuery<DiscoveryContent[]>({
    queryKey: ['/api/discoveries'],
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastMoveTime = useRef(Date.now());
  const lastMovePos = useRef({ x: 0, y: 0 });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
    lastMovePos.current = { x: touch.clientX, y: touch.clientY };
    lastMoveTime.current = Date.now();
    setVelocity({ x: 0, y: 0 });
  }, [isMobile]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !isMobile || !containerRef.current) return;
    
    const touch = e.touches[0];
    const now = Date.now();
    const dt = now - lastMoveTime.current;
    
    if (dt > 0) {
      setVelocity({
        x: (touch.clientX - lastMovePos.current.x) / dt,
        y: (touch.clientY - lastMovePos.current.y) / dt,
      });
    }
    
    lastMovePos.current = { x: touch.clientX, y: touch.clientY };
    lastMoveTime.current = now;
    
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    
    const newX = Math.max(
      Math.min(scrollPosition.x + deltaX, 0),
      -(containerRef.current.scrollWidth - window.innerWidth)
    );
    const newY = Math.max(
      Math.min(scrollPosition.y + deltaY, 0),
      -(containerRef.current.scrollHeight - window.innerHeight)
    );
    
    containerRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setScrollPosition({ x: newX, y: newY });
  }, [isDragging, isMobile, dragStart, scrollPosition]);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile) return;
    setIsDragging(false);
    
    if (Math.abs(velocity.x) > 0.5 || Math.abs(velocity.y) > 0.5) {
      const momentum = () => {
        if (!containerRef.current) return;
        
        const friction = 0.95;
        velocity.x *= friction;
        velocity.y *= friction;
        
        const newX = Math.max(
          Math.min(scrollPosition.x + velocity.x * 16, 0),
          -(containerRef.current.scrollWidth - window.innerWidth)
        );
        const newY = Math.max(
          Math.min(scrollPosition.y + velocity.y * 16, 0),
          -(containerRef.current.scrollHeight - window.innerHeight)
        );
        
        containerRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
        setScrollPosition({ x: newX, y: newY });
        
        if (Math.abs(velocity.x) > 0.01 || Math.abs(velocity.y) > 0.01) {
          requestAnimationFrame(momentum);
        }
      };
      requestAnimationFrame(momentum);
    }
  }, [isMobile, velocity, scrollPosition]);

  const handleNavigation = useCallback(() => {
    setIsNavigating(true);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground font-serif">Loading landscape...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <ButterflyLoader isLoading={isNavigating} />
      
      <BrushstrokeMenu 
        isOpen={menuOpen} 
        onToggle={() => setMenuOpen(!menuOpen)}
        language={language}
        onLanguageChange={setLanguage}
      />
      <ShowAllToggle showAll={showAll} onToggle={() => setShowAll(!showAll)} />

      <div
        ref={containerRef}
        className={`
          relative w-full
          ${isMobile ? 'touch-none' : 'overflow-y-auto overflow-x-hidden'}
        `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: isMobile && isDragging ? 'grabbing' : isMobile ? 'grab' : 'default',
        }}
      >
        <section 
          className="relative w-full min-h-[200vh] md:min-h-[150vh]"
          data-testid="landscape-section"
        >
          <div 
            className="sticky top-0 w-full h-screen overflow-hidden"
            style={{
              backgroundImage: `url(${landscapeImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
            
            {/* Title overlay */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center z-20">
              <h1 className="font-display text-5xl md:text-7xl text-white drop-shadow-lg" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
                {t.title}
              </h1>
            </div>
            
            <div className="absolute inset-0">
              {discoveries.map((discovery) => (
                <InteractiveHotspot
                  key={discovery.id}
                  discovery={discovery}
                  showAll={showAll}
                  onNavigate={handleNavigation}
                />
              ))}
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
              <p className="text-sm font-medium text-white/80 drop-shadow-lg">
                {isMobile ? t.dragToExplore : t.scrollToExplore}
              </p>
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 text-white/80 drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 -mt-32 pointer-events-none">
            <div className="h-32 bg-gradient-to-b from-transparent to-background" />
          </div>
        </section>

        <section className="relative bg-background py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              {t.subtitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
              {discoveries.map((discovery) => {
                const IconComponent = iconComponents[discovery.icon] || Droplets;
                return (
                  <a
                    key={discovery.id}
                    href={`/discover/${discovery.slug}`}
                    className="group p-4 rounded-lg bg-card border border-card-border hover-elevate active-elevate-2 transition-all duration-300"
                    data-testid={`card-${discovery.slug}`}
                  >
                    <div className="w-8 h-8 mb-2 text-primary group-hover:scale-110 transition-transform">
                      <IconComponent className="w-full h-full" />
                    </div>
                    <h3 className="font-medium text-sm text-foreground">{discovery.title}</h3>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
