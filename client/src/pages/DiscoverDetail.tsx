import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, Share2, Bookmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { BrushstrokeMenu } from "@/components/BrushstrokeMenu";
import { useState, useEffect } from "react";
import { ButterflyLoader } from "@/components/ButterflyLoader";
import type { DiscoveryContent } from "@shared/schema";

const relatedTopicsMap: Record<string, { title: string; slug: string }[]> = {
  conservation: [
    { title: "Heritage", slug: "heritage" },
    { title: "Culture", slug: "culture" },
  ],
  heritage: [
    { title: "Conservation", slug: "conservation" },
    { title: "Culture", slug: "culture" },
  ],
  culture: [
    { title: "Heritage", slug: "heritage" },
    { title: "Community", slug: "community" },
  ],
  community: [
    { title: "Culture", slug: "culture" },
    { title: "Exploration", slug: "exploration" },
  ],
  exploration: [
    { title: "Conservation", slug: "conservation" },
    { title: "Community", slug: "community" },
  ],
};

const subtitleMap: Record<string, string> = {
  conservation: "Preserving Nature's Legacy",
  heritage: "Temples of Time",
  culture: "Gardens of the Soul",
  community: "Bridges of Connection",
  exploration: "Peaks of Enlightenment",
};

const highlightMap: Record<string, Record<number, string>> = {
  conservation: {
    0: "Ancient wisdom teaches us that when we care for water, we care for all life."
  },
  heritage: {
    0: "Every beam and tile carries the spirit of countless artisans."
  },
  culture: {
    0: "The garden is a poem written in plants and stone."
  },
  community: {
    0: "A bridge is not just a path—it is a threshold between worlds."
  },
  exploration: {
    0: "The mountain does not move, yet teaches us everything about the journey."
  },
};

export default function DiscoverDetail() {
  const [, params] = useRoute("/discover/:slug");
  const slug = params?.slug || "";
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const { data: discovery, isLoading, error } = useQuery<DiscoveryContent>({
    queryKey: ['/api/discoveries', slug],
    enabled: !!slug,
  });

  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => setIsPageLoading(false), 1700);
    return () => clearTimeout(timer);
  }, [slug]);

  const relatedTopics = relatedTopicsMap[slug] || [];
  const subtitle = subtitleMap[slug] || "Discover More";
  const highlights = highlightMap[slug] || {};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground font-serif">Loading discovery...</p>
        </div>
      </div>
    );
  }

  if (error || !discovery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-2xl text-foreground">Discovery Not Found</h1>
          <p className="text-muted-foreground">The path you seek has faded into the mist.</p>
          <Link href="/">
            <Button variant="outline" data-testid="button-back-home">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ButterflyLoader isLoading={isPageLoading} />
      <BrushstrokeMenu isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />

      <header className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='M20 80 Q50 20 80 80' fill='none' stroke='%23C8102E' stroke-opacity='0.1' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-6 max-w-3xl animate-fade-in">
            <p className="text-primary font-medium tracking-wider uppercase text-sm">
              Discover
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground">
              {discovery.title}
            </h1>
            <p className="font-serif text-xl md:text-2xl text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        
        <Link href="/" className="absolute top-6 right-6 z-20">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-background/60 backdrop-blur-md border-border/50"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </header>

      <main className="relative max-w-4xl mx-auto px-6 py-12">
        <p 
          className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-16 text-center"
          data-testid="text-hero-description"
        >
          {discovery.fullDescription}
        </p>

        <div className="space-y-16">
          {discovery.sections?.map((section, index) => (
            <section 
              key={index} 
              className="space-y-6"
              data-testid={`section-${index}`}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-foreground flex items-center gap-4">
                <span className="w-12 h-px bg-primary/30" />
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {section.content}
              </p>
              {highlights[index] && (
                <blockquote className="border-l-4 border-primary pl-6 py-4 bg-card rounded-r-lg">
                  <p className="font-serif text-lg italic text-foreground">
                    "{highlights[index]}"
                  </p>
                </blockquote>
              )}
            </section>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t border-border">
          <Button variant="outline" size="icon" data-testid="button-like">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" data-testid="button-share">
            <Share2 className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" data-testid="button-bookmark">
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>

        <div className="mt-16">
          <h3 className="font-serif text-xl text-foreground mb-6 text-center">
            Continue Exploring
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {relatedTopics.map((topic) => (
              <Link key={topic.slug} href={`/discover/${topic.slug}`}>
                <Card className="hover-elevate active-elevate-2 transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <p className="font-medium text-foreground">{topic.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
            <Link href="/">
              <Card className="hover-elevate active-elevate-2 transition-all cursor-pointer border-primary/30">
                <CardContent className="p-6">
                  <p className="font-medium text-primary">Back to Landscape</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
