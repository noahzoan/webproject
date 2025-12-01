import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Section {
  title: string;
  content: string;
}

interface SidebarNavProps {
  currentSlug: string;
  currentTitle: string;
  sections: Section[];
  onSectionClick: (index: number) => void;
  activeSection: number;
}

const translations = {
  en: {
    sections: "Sections",
    collapse: "Collapse",
  },
  zh: {
    sections: "章节",
    collapse: "收起",
  },
};

export function SidebarNav({ 
  currentSlug, 
  currentTitle, 
  sections, 
  onSectionClick, 
  activeSection 
}: SidebarNavProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.aside 
        className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-30"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-background via-background to-card/50 border-r border-border/30">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern id="ink-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="1" fill="currentColor" className="text-primary" opacity="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ink-pattern)" />
            </svg>
          </div>

          <div className="relative flex-1 p-6 pt-20 overflow-y-auto">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{t.sections}</p>
              <h2 className="font-serif text-lg text-foreground leading-tight">{currentTitle}</h2>
              <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent" />
            </div>

            <nav className="space-y-1">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => onSectionClick(index)}
                  className={`
                    w-full text-left px-3 py-2.5 rounded-lg text-sm
                    transition-all duration-200 group
                    ${activeSection === index 
                      ? 'bg-primary/10 text-foreground font-medium border-l-2 border-primary' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                  data-testid={`sidebar-section-${index}`}
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight className={`w-3 h-3 transition-transform ${activeSection === index ? 'text-primary' : ''}`} />
                    <span className="line-clamp-1">{section.title}</span>
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
        </div>
      </motion.aside>

      <div className="lg:hidden fixed bottom-4 left-4 z-40">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-16 left-0 w-64 bg-card/95 backdrop-blur-lg border border-border/50 rounded-lg shadow-xl overflow-hidden"
            >
              <div className="p-4 border-b border-border/30">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{t.sections}</p>
              </div>
              <nav className="p-2 max-h-64 overflow-y-auto">
                {sections.map((section, index) => (
                  <button
                    key={index}
                    onClick={() => { onSectionClick(index); setIsExpanded(false); }}
                    className={`
                      w-full text-left px-3 py-2 rounded text-sm
                      ${activeSection === index 
                        ? 'bg-primary/10 text-foreground font-medium' 
                        : 'text-muted-foreground hover:bg-muted'
                      }
                    `}
                    data-testid={`mobile-sidebar-section-${index}`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="outline"
          size="sm"
          className="bg-card/90 backdrop-blur-lg shadow-lg gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
          data-testid="mobile-sidebar-toggle"
        >
          {isExpanded ? (
            <>
              <X className="w-4 h-4" />
              {t.collapse}
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              {t.sections}
            </>
          )}
        </Button>
      </div>
    </>
  );
}
