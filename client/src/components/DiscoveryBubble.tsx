import { Link } from "wouter";
import { 
  Droplets, 
  Building2, 
  Flower2, 
  Waypoints, 
  Mountain,
  Leaf,
  Paintbrush,
  TreePine,
  Heart,
  Zap,
  BookOpen,
  Users,
  Video,
  Compass
} from "lucide-react";

interface DiscoveryBubbleProps {
  title: string;
  slug: string;
  icon: string;
  isVisible: boolean;
  onClick?: () => void;
  subtitle?: string;
}

const iconMap: Record<string, typeof Droplets> = {
  droplets: Droplets,
  building: Building2,
  flower: Flower2,
  bridge: Waypoints,
  mountain: Mountain,
  leaf: Leaf,
  paintbrush: Paintbrush,
  tree: TreePine,
  heart: Heart,
  zap: Zap,
  book: BookOpen,
  users: Users,
  video: Video,
  compass: Compass,
};

export function DiscoveryBubble({ title, slug, icon, isVisible, onClick, subtitle }: DiscoveryBubbleProps) {
  const IconComponent = iconMap[icon] || Leaf;

  if (!isVisible) return null;

  return (
    <Link
      href={`/discover/${slug}`}
      onClick={onClick}
      className="group block"
      data-testid={`bubble-${slug}`}
    >
      <div className="relative animate-scroll-unfurl">
        <div 
          className="
            relative flex items-center gap-3 px-6 py-4
            bg-gradient-to-br from-amber-50/95 via-orange-50/90 to-amber-100/85
            dark:from-amber-900/90 dark:via-orange-900/85 dark:to-amber-950/80
            backdrop-blur-md rounded-sm
            border border-amber-200/60 dark:border-amber-700/50
            shadow-lg
            transition-all duration-300
            hover:shadow-xl hover:scale-[1.02]
            group-hover:border-primary/40
          "
          style={{
            boxShadow: `
              0 4px 20px rgba(0,0,0,0.08),
              0 0 0 1px rgba(180,16,46,0.05),
              inset 0 1px 0 rgba(255,255,255,0.5)
            `,
          }}
        >
          <div 
            className="
              absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8
              bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800
              dark:from-amber-500 dark:via-amber-600 dark:to-amber-700
              rounded-full shadow-md
            "
            style={{
              boxShadow: '2px 0 4px rgba(0,0,0,0.15)',
            }}
          />
          
          <div 
            className="
              absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-8
              bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800
              dark:from-amber-500 dark:via-amber-600 dark:to-amber-700
              rounded-full shadow-md
            "
            style={{
              boxShadow: '-2px 0 4px rgba(0,0,0,0.15)',
            }}
          />

          <div 
            className="
              p-2.5 rounded-full 
              bg-primary/10 text-primary 
              group-hover:bg-primary group-hover:text-primary-foreground 
              transition-all duration-300
              shadow-sm
            "
          >
            <IconComponent className="w-5 h-5" />
          </div>
          
          <div className="flex flex-col">
            <span 
              className="
                font-serif font-medium text-foreground whitespace-nowrap
                tracking-wide
              "
            >
              {title}
            </span>
            {subtitle && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {subtitle}
              </span>
            )}
          </div>
          
          <div className="ml-2 flex items-center">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <svg
          className="absolute -bottom-1 left-4 right-4 h-2 opacity-20"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <ellipse cx="50" cy="5" rx="48" ry="4" fill="currentColor" />
        </svg>
      </div>
    </Link>
  );
}
