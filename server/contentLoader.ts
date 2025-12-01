import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { DiscoveryContent, Contributor, DiscoverySection } from "@shared/schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONTENT_DIR = join(__dirname, '..', 'shared', 'content');

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

interface ContributorMember {
  id: string;
  name: { en: string; zh: string };
  role: { en: string; zh: string };
  connection: { en: string; zh: string };
  imageUrl: string | null;
}

interface ContributorJSON {
  category: string;
  en: { title: string; description: string };
  zh: { title: string; description: string };
  members: ContributorMember[];
}

function loadDiscoveryContent(): DiscoveryContent[] {
  const discoveriesDir = join(CONTENT_DIR, 'discoveries', 'en');
  
  try {
    const files = readdirSync(discoveriesDir).filter(f => f.endsWith('.json'));
    
    const discoveries: DiscoveryContent[] = files.map((file, index) => {
      const filePath = join(discoveriesDir, file);
      const content: DiscoveryJSON = JSON.parse(readFileSync(filePath, 'utf-8'));
      
      return {
        id: String(index + 1),
        slug: content.slug,
        title: content.title,
        icon: content.icon,
        shortDescription: content.shortDescription,
        fullDescription: content.fullDescription,
        heroImage: content.heroImage,
        positionX: content.positionX,
        positionY: content.positionY,
        sections: content.sections
      };
    });
    
    return discoveries.sort((a, b) => {
      const order = ['restoration', 'heritage', 'technology', 'health', 'tradition', 'culture', 'community', 'exploration', 'resources', 'multimedia', 'contributors'];
      return order.indexOf(a.slug) - order.indexOf(b.slug);
    });
  } catch (error) {
    console.error('Error loading discovery content from JSON files:', error);
    return [];
  }
}

function loadContributors(): Contributor[] {
  const contributorsDir = join(CONTENT_DIR, 'contributors');
  
  try {
    const files = readdirSync(contributorsDir).filter(f => f.endsWith('.json'));
    
    const allContributors: Contributor[] = [];
    let idCounter = 1;
    
    for (const file of files) {
      const filePath = join(contributorsDir, file);
      const content: ContributorJSON = JSON.parse(readFileSync(filePath, 'utf-8'));
      
      const validCategories = ['team', 'scholar', 'partner'] as const;
      const category = validCategories.includes(content.category as any) 
        ? (content.category as 'team' | 'scholar' | 'partner')
        : 'team';
      
      for (const member of content.members) {
        allContributors.push({
          id: String(idCounter++),
          name: member.name.en,
          nameChinese: member.name.zh,
          role: member.role.en,
          roleChinese: member.role.zh,
          category,
          connection: member.connection.en,
          connectionChinese: member.connection.zh,
          avatar: member.imageUrl || undefined
        });
      }
    }
    
    return allContributors;
  } catch (error) {
    console.error('Error loading contributor content from JSON files:', error);
    return [];
  }
}

let discoveryCache: DiscoveryContent[] | null = null;
let contributorCache: Contributor[] | null = null;

export function getDiscoveryData(): DiscoveryContent[] {
  if (!discoveryCache) {
    discoveryCache = loadDiscoveryContent();
  }
  return discoveryCache;
}

export function getContributorData(): Contributor[] {
  if (!contributorCache) {
    contributorCache = loadContributors();
  }
  return contributorCache;
}

export function reloadContent(): void {
  discoveryCache = null;
  contributorCache = null;
}
