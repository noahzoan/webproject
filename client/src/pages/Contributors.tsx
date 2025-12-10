import { Link } from "wouter";
import { ArrowLeft, Users, BookOpen, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ContributorTile } from "@/components/ContributorTile";
import { Footer } from "@/components/Footer";
import { getStaticContributors } from "@/lib/staticContent";

const translations = {
  en: {
    backToExplore: "Back to Explore",
    title: "Contributors",
    subtitle: "Meet the scholars, artists, practitioners, and community members who contribute to the ecological civilization movement.",
    teamTitle: "Project Team",
    teamDesc: "The core team behind this educational initiative",
    scholarsTitle: "Contributing Scholars",
    scholarsDesc: "Academics and researchers whose work informs our content",
    partnersTitle: "Community Partners",
    partnersDesc: "Organizations advancing ecological civilization",
  },
  zh: {
    backToExplore: "返回探索",
    title: "贡献者",
    subtitle: "认识为生态文明运动做出贡献的学者、艺术家、实践者和社区成员。",
    teamTitle: "项目团队",
    teamDesc: "这一教育倡议背后的核心团队",
    scholarsTitle: "学术贡献者",
    scholarsDesc: "其研究为我们内容提供参考的学者和研究人员",
    partnersTitle: "社区合作伙伴",
    partnersDesc: "推进生态文明的组织机构",
  },
};

const categoryIcons = {
  team: Users,
  scholar: BookOpen,
  partner: Building2,
};

export default function Contributors() {
  const { language } = useLanguage();
  const t = translations[language];

  const contributors = getStaticContributors();

  const teamMembers = contributors.filter(c => c.category === 'team');
  const scholars = contributors.filter(c => c.category === 'scholar');
  const partners = contributors.filter(c => c.category === 'partner');

  const sections = [
    { key: 'team', title: t.teamTitle, desc: t.teamDesc, members: teamMembers, Icon: categoryIcons.team },
    { key: 'scholar', title: t.scholarsTitle, desc: t.scholarsDesc, members: scholars, Icon: categoryIcons.scholar },
    { key: 'partner', title: t.partnersTitle, desc: t.partnersDesc, members: partners, Icon: categoryIcons.partner },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-amber-500/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-emerald-600/3 rounded-full blur-3xl" />
      </div>

      <header className="relative border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <a 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              data-testid="link-back-explore"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">{t.backToExplore}</span>
            </a>
          </Link>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-12 md:py-16">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 via-amber-500/20 to-emerald-600/20 flex items-center justify-center">
            <Users className="w-8 h-8 text-primary" />
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4" data-testid="text-page-title">
            {t.title}
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {sections.map((section, sectionIndex) => (
            <motion.section
              key={section.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.15 }}
              data-testid={`section-${section.key}`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <section.Icon className="w-6 h-6 text-foreground/60" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                    {section.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{section.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.members.map((contributor, index) => (
                  <motion.div
                    key={contributor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <ContributorTile contributor={contributor} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
