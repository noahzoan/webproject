import { Link } from "wouter";
import { ArrowLeft, Users, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { BrushstrokeMenu } from "@/components/BrushstrokeMenu";
import { ButterflyLoader } from "@/components/ButterflyLoader";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <ButterflyLoader isLoading={isNavigating} />
      <BrushstrokeMenu isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} language={language} onLanguageChange={setLanguage} />

      <header className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/5 to-background"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 5 Q45 30 30 55 Q15 30 30 5' fill='none' stroke='%23D4AF37' stroke-opacity='0.15' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-6 animate-fade-in">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground">
              About Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Connecting hearts with heritage through immersive digital experiences
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

      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="space-y-8 mb-20">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground text-center">
            Our Story
          </h2>
          <div className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground">
            <p className="leading-relaxed">
              Discover Heritage was born from a deep appreciation for the timeless beauty and wisdom 
              embedded in traditional Asian landscapes. We believe that the stories of ancient gardens, 
              temples, and natural wonders deserve to be experienced in new and engaging ways.
            </p>
            <p className="leading-relaxed">
              Our team combines expertise in digital design, cultural preservation, and storytelling 
              to create immersive experiences that transport you to another time and place. Through 
              interactive exploration, we hope to inspire a new generation to appreciate and protect 
              our shared cultural heritage.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground">Authenticity</h3>
                <p className="text-muted-foreground">
                  We honor traditional knowledge and cultural practices in everything we create.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/30 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-xl text-foreground">Innovation</h3>
                <p className="text-muted-foreground">
                  We use cutting-edge technology to bring ancient wisdom to life in new ways.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground">Connection</h3>
                <p className="text-muted-foreground">
                  We build bridges between cultures, generations, and the digital and physical worlds.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground">
            Begin Your Journey
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to explore the hidden stories within our interactive landscape? 
            Start your discovery today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" onClick={() => setIsNavigating(true)}>
              <Button data-testid="button-explore">
                Explore the Landscape
              </Button>
            </Link>
            <Link href="/contact" onClick={() => setIsNavigating(true)}>
              <Button variant="outline" data-testid="button-contact">
                Get in Touch
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
