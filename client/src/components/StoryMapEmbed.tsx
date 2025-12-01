import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Map, ExternalLink, Maximize2, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface StoryMapEmbedProps {
  url: string;
  title?: string;
  hideHeader?: boolean;
  hideCover?: boolean;
  autoplay?: boolean;
  height?: number;
}

const translations = {
  en: {
    loading: "Loading StoryMap...",
    viewFullscreen: "View Fullscreen",
    openInNewTab: "Open in New Tab",
    closeFullscreen: "Close",
    interactiveMap: "Interactive StoryMap",
  },
  zh: {
    loading: "正在加载故事地图...",
    viewFullscreen: "全屏查看",
    openInNewTab: "在新标签页中打开",
    closeFullscreen: "关闭",
    interactiveMap: "互动故事地图",
  }
};

export function StoryMapEmbed({
  url,
  title,
  hideHeader = true,
  hideCover = false,
  autoplay = false,
  height = 600,
}: StoryMapEmbedProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const buildEmbedUrl = useCallback((baseUrl: string) => {
    const params = new URLSearchParams();
    params.append('embed', '');
    
    if (hideHeader) {
      params.append('header', 'hidden');
    }
    if (hideCover) {
      params.append('cover', 'hidden');
    }
    if (autoplay) {
      params.append('autoplay', '');
    }
    
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${params.toString()}`;
  }, [hideHeader, hideCover, autoplay]);

  const embedUrl = buildEmbedUrl(url);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleIframeError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    document.body.style.overflow = '';
  }, []);

  const openInNewTab = useCallback(() => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [url]);

  if (hasError) {
    return (
      <div className="w-full rounded-xl border border-border/50 bg-card/50 p-8 text-center">
        <Map className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground mb-4">Unable to load StoryMap</p>
        <Button variant="outline" onClick={openInNewTab} data-testid="button-storymap-open-new">
          <ExternalLink className="w-4 h-4 mr-2" />
          {t.openInNewTab}
        </Button>
      </div>
    );
  }

  return (
    <>
      <motion.div 
        className="w-full relative rounded-xl overflow-hidden border border-border/50 shadow-lg bg-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/5 via-transparent to-amber-500/5 border-b border-border/30">
          <div className="flex items-center gap-2">
            <Map className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {title || t.interactiveMap}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={openFullscreen}
              className="h-8 px-3 text-xs"
              data-testid="button-storymap-fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5 mr-1.5" />
              {t.viewFullscreen}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={openInNewTab}
              className="h-8 px-3 text-xs"
              data-testid="button-storymap-new-tab"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              {t.openInNewTab}
            </Button>
          </div>
        </div>
        
        <div className="relative" style={{ height: `${height}px` }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-card">
              <div className="text-center">
                <Loader2 className="w-8 h-8 mx-auto mb-3 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">{t.loading}</p>
              </div>
            </div>
          )}
          
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            allowFullScreen
            title={title || t.interactiveMap}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            loading="lazy"
            data-testid="iframe-storymap"
          />
        </div>
        
        <div className="h-1 bg-gradient-to-r from-amber-500 via-primary to-emerald-600" />
      </motion.div>

      {isFullscreen && (
        <motion.div 
          className="fixed inset-0 z-50 bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-card border-b border-border z-10">
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">
                {title || t.interactiveMap}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={openInNewTab}
                data-testid="button-storymap-fullscreen-new-tab"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {t.openInNewTab}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={closeFullscreen}
                data-testid="button-storymap-close-fullscreen"
              >
                <X className="w-4 h-4 mr-2" />
                {t.closeFullscreen}
              </Button>
            </div>
          </div>
          
          <iframe
            src={embedUrl}
            className="w-full h-full pt-14 border-0"
            allowFullScreen
            title={title || t.interactiveMap}
            data-testid="iframe-storymap-fullscreen"
          />
        </motion.div>
      )}
    </>
  );
}
