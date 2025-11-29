import { Link } from "wouter";
import { 
  Droplets, 
  Building2, 
  Flower2, 
  Waypoints, 
  Mountain,
  Leaf,
  Paintbrush
} from "lucide-react";

interface DiscoveryBubbleProps {
  title: string;
  slug: string;
  icon: string;
  isVisible: boolean;
  onClick?: () => void;
}

const iconMap: Record<string, typeof Droplets> = {
  droplets: Droplets,
  building: Building2,
  flower: Flower2,
  bridge: Waypoints,
  mountain: Mountain,
  leaf: Leaf,
  paintbrush: Paintbrush,
};

export function DiscoveryBubble({ title, slug, icon, isVisible, onClick }: DiscoveryBubbleProps) {
  const IconComponent = iconMap[icon] || Leaf;

  if (!isVisible) return null;

  return (
    <Link
      href={`/discover/${slug}`}
      onClick={onClick}
      className="group animate-bubble-reveal"
      data-testid={`bubble-${slug}`}
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/70 dark:bg-card/80 backdrop-blur-md border border-white/50 dark:border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/90 dark:hover:bg-card/95">
        <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <IconComponent className="w-5 h-5" />
        </div>
        <span className="font-sans font-medium text-foreground whitespace-nowrap">
          {title}
        </span>
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
    </Link>
  );
}
