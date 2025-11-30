import { Link } from "wouter";
import { ArrowLeft, Users, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { BrushstrokeMenu } from "@/components/BrushstrokeMenu";
import { ButterflyLoader } from "@/components/ButterflyLoader";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    title: "About Us",
    subtitle: "Connecting hearts with heritage through immersive digital experiences",
    ourStory: "Our Story",
    storyP1: "Discover Heritage was born from a deep appreciation for the timeless beauty and wisdom embedded in traditional Asian landscapes. We believe that the stories of ancient gardens, temples, and natural wonders deserve to be experienced in new and engaging ways.",
    storyP2: "Our team combines expertise in digital design, cultural preservation, and storytelling to create immersive experiences that transport you to another time and place. Through interactive exploration, we hope to inspire a new generation to appreciate and protect our shared cultural heritage.",
    ourValues: "Our Values",
    authenticity: "Authenticity",
    authenticityDesc: "We honor traditional knowledge and cultural practices in everything we create.",
    innovation: "Innovation",
    innovationDesc: "We use cutting-edge technology to bring ancient wisdom to life in new ways.",
    connection: "Connection",
    connectionDesc: "We build bridges between cultures, generations, and the digital and physical worlds.",
    beginJourney: "Begin Your Journey",
    beginJourneyDesc: "Ready to explore the hidden stories within our interactive landscape? Start your discovery today.",
    exploreLandscape: "Explore the Landscape",
    getInTouch: "Get in Touch",
  },
  zh: {
    title: "关于我们",
    subtitle: "通过沉浸式数字体验，连接心灵与文化遗产",
    ourStory: "我们的故事",
    storyP1: "「探索遗产」源于对传统亚洲山水画中永恒之美和智慧的深深欣赏。我们相信，古老园林、寺庙和自然奇观的故事值得以新颖而引人入胜的方式来体验。",
    storyP2: "我们的团队结合了数字设计、文化保护和故事讲述方面的专业知识，创造出能够带您穿越时空的沉浸式体验。通过互动探索，我们希望激励新一代欣赏和保护我们共同的文化遗产。",
    ourValues: "我们的价值观",
    authenticity: "真实性",
    authenticityDesc: "我们在创作的一切中尊重传统知识和文化实践。",
    innovation: "创新",
    innovationDesc: "我们运用尖端技术，以全新方式呈现古老智慧。",
    connection: "连接",
    connectionDesc: "我们在文化、代际以及数字与物理世界之间架起桥梁。",
    beginJourney: "开始您的旅程",
    beginJourneyDesc: "准备好探索互动山水画中隐藏的故事了吗？今天就开始您的发现之旅。",
    exploreLandscape: "探索山水画",
    getInTouch: "联系我们",
  },
};

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-background">
      <ButterflyLoader isLoading={showLoader} onComplete={() => setShowLoader(false)} />
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
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t.subtitle}
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
            {t.ourStory}
          </h2>
          <div className="prose prose-lg dark:prose-invert mx-auto text-muted-foreground">
            <p className="leading-relaxed">
              {t.storyP1}
            </p>
            <p className="leading-relaxed">
              {t.storyP2}
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-12">
            {t.ourValues}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground">{t.authenticity}</h3>
                <p className="text-muted-foreground">
                  {t.authenticityDesc}
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/30 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-xl text-foreground">{t.innovation}</h3>
                <p className="text-muted-foreground">
                  {t.innovationDesc}
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground">{t.connection}</h3>
                <p className="text-muted-foreground">
                  {t.connectionDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground">
            {t.beginJourney}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.beginJourneyDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" onClick={() => setShowLoader(true)}>
              <Button data-testid="button-explore">
                {t.exploreLandscape}
              </Button>
            </Link>
            <Link href="/contact" onClick={() => setShowLoader(true)}>
              <Button variant="outline" data-testid="button-contact">
                {t.getInTouch}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
