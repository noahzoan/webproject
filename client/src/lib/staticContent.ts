import type { DiscoveryContent, DiscoverySection } from "@shared/schema";

import restorationEn from "../../../shared/content/discoveries/en/restoration.json";
import heritageEn from "../../../shared/content/discoveries/en/heritage.json";
import technologyEn from "../../../shared/content/discoveries/en/technology.json";
import healthEn from "../../../shared/content/discoveries/en/health.json";
import traditionEn from "../../../shared/content/discoveries/en/tradition.json";
import cultureEn from "../../../shared/content/discoveries/en/culture.json";
import communityEn from "../../../shared/content/discoveries/en/community.json";
import explorationEn from "../../../shared/content/discoveries/en/exploration.json";
import resourcesEn from "../../../shared/content/discoveries/en/resources.json";
import multimediaEn from "../../../shared/content/discoveries/en/multimedia.json";
import contributorsEn from "../../../shared/content/discoveries/en/contributors.json";

import restorationZh from "../../../shared/content/discoveries/zh/restoration.json";
import heritageZh from "../../../shared/content/discoveries/zh/heritage.json";
import technologyZh from "../../../shared/content/discoveries/zh/technology.json";
import healthZh from "../../../shared/content/discoveries/zh/health.json";
import traditionZh from "../../../shared/content/discoveries/zh/tradition.json";
import cultureZh from "../../../shared/content/discoveries/zh/culture.json";
import communityZh from "../../../shared/content/discoveries/zh/community.json";
import explorationZh from "../../../shared/content/discoveries/zh/exploration.json";
import resourcesZh from "../../../shared/content/discoveries/zh/resources.json";
import multimediaZh from "../../../shared/content/discoveries/zh/multimedia.json";
import contributorsZh from "../../../shared/content/discoveries/zh/contributors.json";

interface DiscoveryJSON {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  positionX: number;
  positionY: number;
  highlight: string;
  shortDescription: string;
  fullDescription: string;
  heroImage?: string;
  sections: DiscoverySection[];
}

const discoveriesEnRaw: DiscoveryJSON[] = [
  restorationEn,
  heritageEn,
  technologyEn,
  healthEn,
  traditionEn,
  cultureEn,
  communityEn,
  explorationEn,
  resourcesEn,
  multimediaEn,
  contributorsEn,
];

const discoveriesZhRaw: DiscoveryJSON[] = [
  restorationZh,
  heritageZh,
  technologyZh,
  healthZh,
  traditionZh,
  cultureZh,
  communityZh,
  explorationZh,
  resourcesZh,
  multimediaZh,
  contributorsZh,
];

function transformToDiscoveryContent(items: DiscoveryJSON[]): DiscoveryContent[] {
  return items.map((content, index) => ({
    id: String(index + 1),
    slug: content.slug,
    title: content.title,
    icon: content.icon,
    shortDescription: content.shortDescription,
    fullDescription: content.fullDescription,
    heroImage: content.heroImage,
    positionX: content.positionX,
    positionY: content.positionY,
    sections: content.sections,
  }));
}

const discoveriesEn = transformToDiscoveryContent(discoveriesEnRaw);
const discoveriesZh = transformToDiscoveryContent(discoveriesZhRaw);

export function getStaticDiscoveries(language: 'en' | 'zh' = 'en'): DiscoveryContent[] {
  return language === 'zh' ? discoveriesZh : discoveriesEn;
}

export function getStaticDiscoveryBySlug(slug: string, language: 'en' | 'zh' = 'en'): DiscoveryContent | undefined {
  const discoveries = getStaticDiscoveries(language);
  return discoveries.find(d => d.slug === slug);
}

export { discoveriesEn, discoveriesZh };
