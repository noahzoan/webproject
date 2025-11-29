import { 
  type User, 
  type InsertUser,
  type DiscoveryContent,
  type InsertContactMessage,
  type ContactMessage 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDiscoveries(): Promise<DiscoveryContent[]>;
  getDiscoveryBySlug(slug: string): Promise<DiscoveryContent | undefined>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

const discoveryData: DiscoveryContent[] = [
  {
    id: "1",
    slug: "conservation",
    title: "Conservation",
    icon: "droplets",
    shortDescription: "Protecting our natural heritage for future generations",
    fullDescription: "Water and environmental conservation have been central to Asian philosophy for thousands of years. From sacred lotus ponds to carefully maintained streams, every water feature tells a story of respect for nature.",
    positionX: 25,
    positionY: 65,
    sections: [
      {
        title: "The Sacred Waters",
        content: "In traditional Asian culture, water represents purity, renewal, and the flow of life energy (chi). Ponds and streams in classical gardens were not merely decorative—they served as living ecosystems that supported fish, plants, and the overall harmony of the landscape. The practice of maintaining these water features has been passed down through generations, creating a rich tradition of environmental stewardship."
      },
      {
        title: "Sustainable Practices",
        content: "Traditional water management systems in Asia were remarkably sophisticated. Rice paddy terraces, for example, represent centuries of sustainable agriculture that works with nature rather than against it. These systems recycle water, prevent erosion, and create habitats for countless species while feeding communities."
      },
      {
        title: "Modern Conservation Efforts",
        content: "Today, these ancient principles inspire modern conservation initiatives around the world. From wetland restoration projects to urban green spaces that incorporate traditional design elements, the wisdom of the past continues to guide efforts to protect our environment for future generations."
      }
    ]
  },
  {
    id: "2",
    slug: "heritage",
    title: "Heritage",
    icon: "building",
    shortDescription: "Ancient temples and sacred architecture",
    fullDescription: "Ancient temples and pavilions stand as testaments to architectural genius and spiritual devotion. Each structure embodies centuries of accumulated wisdom, artistic excellence, and cultural values that continue to inspire awe.",
    positionX: 55,
    positionY: 35,
    sections: [
      {
        title: "Architectural Wisdom",
        content: "Traditional Asian architecture follows principles of harmony with nature, using materials like wood, stone, and tile that age gracefully and blend with their surroundings. The curved rooflines of pagodas and temples are not merely decorative—they were designed to handle heavy rain and snow while symbolizing the connection between earth and heaven."
      },
      {
        title: "Sacred Spaces",
        content: "Temples serve as more than places of worship; they are centers of community, learning, and cultural preservation. The layout of temple complexes follows careful geomantic principles, orienting structures to harmonize with the natural flow of energy in the landscape."
      },
      {
        title: "Preservation Challenges",
        content: "Maintaining these historic structures requires specialized knowledge and traditional craftsmanship that is increasingly rare. Restoration efforts worldwide are working to train new generations of artisans in ancient techniques while adapting to modern challenges like climate change and urbanization."
      }
    ]
  },
  {
    id: "3",
    slug: "culture",
    title: "Culture",
    icon: "flower",
    shortDescription: "Gardens and artistic traditions",
    fullDescription: "The art of the traditional garden represents the pinnacle of cultural achievement—a perfect fusion of philosophy, art, and horticulture that creates spaces for contemplation and connection with nature.",
    positionX: 75,
    positionY: 55,
    sections: [
      {
        title: "Philosophy in Bloom",
        content: "Every element in a traditional Asian garden carries symbolic meaning. Cherry blossoms represent the transient beauty of life, pine trees symbolize longevity and resilience, and bamboo embodies flexibility and strength. Walking through such a garden is meant to be a meditative journey through these philosophical concepts."
      },
      {
        title: "The Art of Arrangement",
        content: "Unlike Western formal gardens with their geometric precision, traditional Asian gardens follow principles of asymmetry and natural flow. Rocks are placed to suggest mountains, raked gravel evokes water, and carefully pruned trees create scenes that change with the seasons."
      },
      {
        title: "Living Traditions",
        content: "Garden arts like bonsai, ikebana (flower arrangement), and the tea ceremony continue to flourish today. These practices teach patience, attention to detail, and a deep appreciation for the subtle beauty found in nature's imperfections."
      }
    ]
  },
  {
    id: "4",
    slug: "community",
    title: "Community",
    icon: "bridge",
    shortDescription: "Bridges connecting people and places",
    fullDescription: "Bridges in Asian landscapes serve as powerful symbols of connection—linking not just physical spaces, but also past and present, humanity and nature, the earthly and the divine.",
    positionX: 40,
    positionY: 75,
    sections: [
      {
        title: "Crossing Over",
        content: "Traditional bridges were often placed at carefully chosen locations where they would frame the most beautiful views or mark transitions between different areas of a garden or temple complex. Crossing a bridge was understood as a moment of transformation, a brief journey that changed one's perspective."
      },
      {
        title: "Gathering Places",
        content: "Many traditional bridges include covered sections or pavilions where travelers can rest, enjoy the scenery, or meet with friends. These spaces fostered community connection and served as important social gathering points throughout history."
      },
      {
        title: "Engineering Marvels",
        content: "From simple stone slabs to elaborate arched structures, traditional bridges showcase remarkable engineering skills developed over centuries. Many ancient bridges remain standing today, their construction techniques still studied and admired by modern engineers."
      }
    ]
  },
  {
    id: "5",
    slug: "exploration",
    title: "Exploration",
    icon: "mountain",
    shortDescription: "Majestic peaks and spiritual journeys",
    fullDescription: "Mountains have always held a special place in Asian spirituality and art. Representing the axis between earth and heaven, these majestic peaks inspire journeys both physical and spiritual.",
    positionX: 80,
    positionY: 25,
    sections: [
      {
        title: "Sacred Summits",
        content: "Throughout Asia, certain mountains are venerated as sacred sites where heaven and earth meet. Pilgrims have climbed these peaks for millennia, seeking spiritual transformation, wisdom, and connection with the divine. The journey itself—with its challenges and rewards—is considered as important as reaching the summit."
      },
      {
        title: "Artistic Inspiration",
        content: "Mountain landscapes have inspired countless works of art, from classical ink paintings to poetry and music. Artists sought to capture not just the physical appearance of mountains but their essential spirit—the sense of timelessness, majesty, and transcendence they evoke."
      },
      {
        title: "Ecological Treasures",
        content: "Mountain ecosystems harbor remarkable biodiversity, with species found nowhere else on Earth. Many traditional communities living in mountain regions developed sustainable practices that protected these ecosystems while meeting their needs—wisdom that remains relevant today."
      }
    ]
  }
];

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDiscoveries(): Promise<DiscoveryContent[]> {
    return discoveryData;
  }

  async getDiscoveryBySlug(slug: string): Promise<DiscoveryContent | undefined> {
    return discoveryData.find(d => d.slug === slug);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
