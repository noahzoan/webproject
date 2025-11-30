import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, Share2, Bookmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { BrushstrokeMenu } from "@/components/BrushstrokeMenu";
import { useState, useEffect } from "react";
import { ButterflyLoader } from "@/components/ButterflyLoader";
import { useLanguage } from "@/contexts/LanguageContext";
import type { DiscoveryContent } from "@shared/schema";

const translations = {
  en: {
    discover: "Discover",
    continueExploring: "Continue Exploring",
    backToLandscape: "Back to Landscape",
    notFound: "Discovery Not Found",
    notFoundDesc: "The path you seek has faded into the mist.",
    returnHome: "Return Home",
    loading: "Loading discovery...",
    relatedTopics: {
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
    },
    subtitles: {
      conservation: "Preserving Nature's Legacy",
      heritage: "Temples of Time",
      culture: "Gardens of the Soul",
      community: "Bridges of Connection",
      exploration: "Peaks of Enlightenment",
    },
    highlights: {
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
    },
    titles: {
      conservation: "Conservation",
      heritage: "Heritage",
      culture: "Culture",
      community: "Community",
      exploration: "Exploration",
    },
    fullDescriptions: {
      conservation: "Water and environmental conservation have been central to Asian philosophy for thousands of years. From sacred lotus ponds to carefully maintained streams, every water feature tells a story of respect for nature.",
      heritage: "Ancient temples and pavilions stand as testaments to architectural genius and spiritual devotion. Each structure embodies centuries of accumulated wisdom, artistic excellence, and cultural values that continue to inspire awe.",
      culture: "The art of the traditional garden represents the pinnacle of cultural achievement—a perfect fusion of philosophy, art, and horticulture that creates spaces for contemplation and connection with nature.",
      community: "Bridges in Asian landscapes serve as powerful symbols of connection—linking not just physical spaces, but also past and present, humanity and nature, the earthly and the divine.",
      exploration: "Mountains have always held a special place in Asian spirituality and art. Representing the axis between earth and heaven, these majestic peaks inspire journeys both physical and spiritual.",
    },
    sections: {
      conservation: [
        { title: "The Sacred Waters", content: "In traditional Asian culture, water represents purity, renewal, and the flow of life energy (chi). Ponds and streams in classical gardens were not merely decorative—they served as living ecosystems that supported fish, plants, and the overall harmony of the landscape. The practice of maintaining these water features has been passed down through generations, creating a rich tradition of environmental stewardship." },
        { title: "Sustainable Practices", content: "Traditional water management systems in Asia were remarkably sophisticated. Rice paddy terraces, for example, represent centuries of sustainable agriculture that works with nature rather than against it. These systems recycle water, prevent erosion, and create habitats for countless species while feeding communities." },
        { title: "Modern Conservation Efforts", content: "Today, these ancient principles inspire modern conservation initiatives around the world. From wetland restoration projects to urban green spaces that incorporate traditional design elements, the wisdom of the past continues to guide efforts to protect our environment for future generations." },
      ],
      heritage: [
        { title: "Architectural Wisdom", content: "Traditional Asian architecture follows principles of harmony with nature, using materials like wood, stone, and tile that age gracefully and blend with their surroundings. The curved rooflines of pagodas and temples are not merely decorative—they were designed to handle heavy rain and snow while symbolizing the connection between earth and heaven." },
        { title: "Sacred Spaces", content: "Temples serve as more than places of worship; they are centers of community, learning, and cultural preservation. The layout of temple complexes follows careful geomantic principles, orienting structures to harmonize with the natural flow of energy in the landscape." },
        { title: "Preservation Challenges", content: "Maintaining these historic structures requires specialized knowledge and traditional craftsmanship that is increasingly rare. Restoration efforts worldwide are working to train new generations of artisans in ancient techniques while adapting to modern challenges like climate change and urbanization." },
      ],
      culture: [
        { title: "Philosophy in Bloom", content: "Every element in a traditional Asian garden carries symbolic meaning. Cherry blossoms represent the transient beauty of life, pine trees symbolize longevity and resilience, and bamboo embodies flexibility and strength. Walking through such a garden is meant to be a meditative journey through these philosophical concepts." },
        { title: "The Art of Arrangement", content: "Unlike Western formal gardens with their geometric precision, traditional Asian gardens follow principles of asymmetry and natural flow. Rocks are placed to suggest mountains, raked gravel evokes water, and carefully pruned trees create scenes that change with the seasons." },
        { title: "Living Traditions", content: "Garden arts like bonsai, ikebana (flower arrangement), and the tea ceremony continue to flourish today. These practices teach patience, attention to detail, and a deep appreciation for the subtle beauty found in nature's imperfections." },
      ],
      community: [
        { title: "Crossing Over", content: "Traditional bridges were often placed at carefully chosen locations where they would frame the most beautiful views or mark transitions between different areas of a garden or temple complex. Crossing a bridge was understood as a moment of transformation, a brief journey that changed one's perspective." },
        { title: "Gathering Places", content: "Many traditional bridges include covered sections or pavilions where travelers can rest, enjoy the scenery, or meet with friends. These spaces fostered community connection and served as important social gathering points throughout history." },
        { title: "Engineering Marvels", content: "From simple stone slabs to elaborate arched structures, traditional bridges showcase remarkable engineering skills developed over centuries. Many ancient bridges remain standing today, their construction techniques still studied and admired by modern engineers." },
      ],
      exploration: [
        { title: "Sacred Summits", content: "Throughout Asia, certain mountains are venerated as sacred sites where heaven and earth meet. Pilgrims have climbed these peaks for millennia, seeking spiritual transformation, wisdom, and connection with the divine. The journey itself—with its challenges and rewards—is considered as important as reaching the summit." },
        { title: "Artistic Inspiration", content: "Mountain landscapes have inspired countless works of art, from classical ink paintings to poetry and music. Artists sought to capture not just the physical appearance of mountains but their essential spirit—the sense of timelessness, majesty, and transcendence they evoke." },
        { title: "Ecological Treasures", content: "Mountain ecosystems harbor remarkable biodiversity, with species found nowhere else on Earth. Many traditional communities living in mountain regions developed sustainable practices that protected these ecosystems while meeting their needs—wisdom that remains relevant today." },
      ],
    },
  },
  zh: {
    discover: "探索",
    continueExploring: "继续探索",
    backToLandscape: "返回山水画",
    notFound: "未找到内容",
    notFoundDesc: "您寻找的路径已消失在迷雾中。",
    returnHome: "返回首页",
    loading: "加载中...",
    relatedTopics: {
      conservation: [
        { title: "文化遗产", slug: "heritage" },
        { title: "文化艺术", slug: "culture" },
      ],
      heritage: [
        { title: "生态保护", slug: "conservation" },
        { title: "文化艺术", slug: "culture" },
      ],
      culture: [
        { title: "文化遗产", slug: "heritage" },
        { title: "社区联结", slug: "community" },
      ],
      community: [
        { title: "文化艺术", slug: "culture" },
        { title: "探索发现", slug: "exploration" },
      ],
      exploration: [
        { title: "生态保护", slug: "conservation" },
        { title: "社区联结", slug: "community" },
      ],
    },
    subtitles: {
      conservation: "守护自然遗产",
      heritage: "时光中的殿堂",
      culture: "心灵的园林",
      community: "连接的桥梁",
      exploration: "悟道之巅",
    },
    highlights: {
      conservation: {
        0: "古老的智慧告诉我们，当我们呵护水源，我们就是在呵护所有生命。"
      },
      heritage: {
        0: "每一根梁柱，每一片瓦砾，都承载着无数工匠的精神。"
      },
      culture: {
        0: "园林是用植物和石头写成的诗篇。"
      },
      community: {
        0: "桥不仅仅是一条路——它是连接两个世界的门槛。"
      },
      exploration: {
        0: "山不动，却教会我们关于旅程的一切。"
      },
    },
    titles: {
      conservation: "生态保护",
      heritage: "文化遗产",
      culture: "文化艺术",
      community: "社区联结",
      exploration: "探索发现",
    },
    fullDescriptions: {
      conservation: "数千年来，水资源和环境保护一直是亚洲哲学的核心。从神圣的莲花池到精心维护的溪流，每一处水景都讲述着对自然的尊重。",
      heritage: "古老的寺庙和亭阁是建筑天才和精神奉献的见证。每一座建筑都凝聚了几个世纪积累的智慧、艺术卓越和文化价值，至今仍令人叹为观止。",
      culture: "传统园林的艺术代表着文化成就的巅峰——哲学、艺术和园艺的完美融合，创造出供人沉思和与自然连接的空间。",
      community: "亚洲景观中的桥梁是连接的有力象征——不仅连接物理空间，还连接过去与现在、人类与自然、尘世与神圣。",
      exploration: "山脉在亚洲灵性和艺术中一直占有特殊地位。作为天地之间的轴心，这些雄伟的山峰激发着身体和精神的双重旅程。",
    },
    sections: {
      conservation: [
        { title: "神圣之水", content: "在传统亚洲文化中，水代表着纯净、更新和生命能量（气）的流动。古典园林中的池塘和溪流不仅仅是装饰——它们是支持鱼类、植物和整体景观和谐的活生态系统。维护这些水景的做法代代相传，形成了丰富的环境管理传统。" },
        { title: "可持续实践", content: "亚洲传统的水管理系统非常精密。例如，水稻梯田代表着几个世纪以来与自然和谐共处而非对抗的可持续农业。这些系统循环利用水资源，防止侵蚀，为无数物种创造栖息地，同时养活社区。" },
        { title: "现代保护努力", content: "今天，这些古老的原则激励着世界各地的现代保护行动。从湿地恢复项目到融入传统设计元素的城市绿地，过去的智慧继续指导着为子孙后代保护环境的努力。" },
      ],
      heritage: [
        { title: "建筑智慧", content: "传统亚洲建筑遵循与自然和谐的原则，使用木材、石头和瓦片等材料，这些材料随着时间的推移优雅地老化并与周围环境融为一体。宝塔和寺庙的曲线屋顶不仅仅是装饰性的——它们被设计用来处理大雨和积雪，同时象征着天地之间的联系。" },
        { title: "神圣空间", content: "寺庙不仅仅是礼拜场所；它们是社区、学习和文化保护的中心。寺庙建筑群的布局遵循谨慎的风水原则，使建筑与景观中能量的自然流动相协调。" },
        { title: "保护挑战", content: "维护这些历史建筑需要越来越稀少的专业知识和传统工艺。世界各地的修复工作正在努力培训新一代工匠学习古老技术，同时适应气候变化和城市化等现代挑战。" },
      ],
      culture: [
        { title: "花中哲学", content: "传统亚洲园林中的每一个元素都承载着象征意义。樱花代表生命转瞬即逝的美丽，松树象征长寿和坚韧，竹子体现灵活和力量。漫步于这样的园林中，意味着通过这些哲学概念进行一次冥想之旅。" },
        { title: "布置的艺术", content: "与西方几何精确的正式园林不同，传统亚洲园林遵循不对称和自然流动的原则。岩石被放置以暗示山脉，耙过的砾石唤起水的意象，精心修剪的树木创造出随季节变化的场景。" },
        { title: "活着的传统", content: "盆景、花道（插花艺术）和茶道等园林艺术至今仍在蓬勃发展。这些实践教导耐心、注重细节，以及对自然不完美中发现的微妙之美的深刻欣赏。" },
      ],
      community: [
        { title: "跨越之旅", content: "传统桥梁通常被放置在精心选择的位置，在那里它们可以框定最美丽的景色或标记园林或寺庙建筑群不同区域之间的过渡。过桥被理解为一个转变的时刻，一段改变视角的短暂旅程。" },
        { title: "聚集之地", content: "许多传统桥梁包括有盖部分或亭子，旅人可以在那里休息、欣赏风景或与朋友相聚。这些空间促进了社区联系，在整个历史上一直是重要的社交聚会点。" },
        { title: "工程奇迹", content: "从简单的石板到精心设计的拱形结构，传统桥梁展示了几个世纪发展起来的非凡工程技术。许多古桥至今仍屹立不倒，其建造技术仍被现代工程师研究和钦佩。" },
      ],
      exploration: [
        { title: "神圣之巅", content: "在整个亚洲，某些山脉被尊为天地相接的神圣之地。几千年来，朝圣者攀登这些山峰，寻求精神转化、智慧和与神圣的联系。旅程本身——及其挑战和回报——被认为与到达顶峰同样重要。" },
        { title: "艺术灵感", content: "山水景观激发了无数艺术作品，从古典水墨画到诗歌和音乐。艺术家们不仅试图捕捉山脉的物理外观，还试图捕捉其本质精神——它们所唤起的永恒感、雄伟感和超越感。" },
        { title: "生态宝库", content: "山地生态系统蕴藏着非凡的生物多样性，拥有地球上其他地方找不到的物种。许多生活在山区的传统社区发展了可持续的做法，在满足自身需求的同时保护这些生态系统——这种智慧在今天仍然具有现实意义。" },
      ],
    },
  },
};

export default function DiscoverDetail() {
  const [, params] = useRoute("/discover/:slug");
  const slug = params?.slug || "";
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const { language, setLanguage } = useLanguage();
  
  const t = translations[language];

  const { data: discovery, isLoading, error } = useQuery<DiscoveryContent>({
    queryKey: ['/api/discoveries', slug],
    enabled: !!slug,
  });

  useEffect(() => {
    setShowLoader(true);
  }, [slug]);

  const relatedTopics = t.relatedTopics[slug as keyof typeof t.relatedTopics] || [];
  const subtitle = t.subtitles[slug as keyof typeof t.subtitles] || "";
  const highlights = t.highlights[slug as keyof typeof t.highlights] || {};
  const title = t.titles[slug as keyof typeof t.titles] || discovery?.title || "";
  const fullDescription = t.fullDescriptions[slug as keyof typeof t.fullDescriptions] || discovery?.fullDescription || "";
  const sections = t.sections[slug as keyof typeof t.sections] || discovery?.sections || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground font-serif">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error || !discovery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-2xl text-foreground">{t.notFound}</h1>
          <p className="text-muted-foreground">{t.notFoundDesc}</p>
          <Link href="/" onClick={() => setShowLoader(true)}>
            <Button variant="outline" data-testid="button-back-home">
              {t.returnHome}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ButterflyLoader isLoading={showLoader} onComplete={() => setShowLoader(false)} />
      <BrushstrokeMenu isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} language={language} onLanguageChange={setLanguage} />

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
              {t.discover}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground">
              {title}
            </h1>
            <p className="font-serif text-xl md:text-2xl text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        
        <Link href="/" onClick={() => setShowLoader(true)} className="absolute top-6 right-6 z-20">
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
          {fullDescription}
        </p>

        <div className="space-y-16">
          {sections.map((section, index) => (
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
            {t.continueExploring}
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
                  <p className="font-medium text-primary">{t.backToLandscape}</p>
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
