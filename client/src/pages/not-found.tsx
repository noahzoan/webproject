import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='M20 80 Q50 30 80 80' fill='none' stroke='%23C8102E' stroke-opacity='0.1' stroke-width='2'/%3E%3Cpath d='M30 70 Q55 25 75 70' fill='none' stroke='%23D4AF37' stroke-opacity='0.1' stroke-width='1.5'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      
      <div className="relative text-center space-y-8 max-w-md animate-fade-in">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
            <MapPin className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">
            Lost in the Mist
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The path you seek has faded into the mountain fog. 
            Perhaps the journey leads elsewhere.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button className="gap-2" data-testid="button-go-home">
              <Home className="w-4 h-4" />
              Return to Landscape
            </Button>
          </Link>
        </div>

        <div className="pt-8">
          <svg viewBox="0 0 200 60" className="w-48 h-16 mx-auto opacity-20">
            <path
              d="M10 50 Q50 20, 100 35 T190 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground"
            />
            <path
              d="M20 55 Q60 30, 110 45 T195 35"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-foreground"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
