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
    slug: "restoration",
    title: "Ecological Restoration",
    icon: "tree",
    shortDescription: "Reforestation and ecosystem recovery",
    fullDescription: "Ecological restoration represents hope in action—the deliberate recovery of ecosystems that have been degraded or destroyed. Through reforestation and habitat renewal, communities are healing the land.",
    positionX: 15,
    positionY: 45,
    sections: [
      {
        title: "Reforestation Efforts",
        content: "China has undertaken some of the world's largest reforestation projects, planting billions of trees to combat desertification and restore degraded landscapes. These efforts demonstrate that ecological recovery is possible when communities work together with purpose and dedication."
      },
      {
        title: "Traditional Wisdom Meets Modern Science",
        content: "Ecological restoration draws on both ancient understanding of natural systems and modern scientific methods. Traditional practices of working with nature rather than against it inform contemporary approaches to ecosystem recovery."
      },
      {
        title: "Community Involvement",
        content: "Successful restoration projects engage local communities as stewards of the land. When people participate in planting and caring for restored ecosystems, they develop lasting connections to the natural world."
      }
    ]
  },
  {
    id: "2",
    slug: "heritage",
    title: "Cultural Heritage",
    icon: "building",
    shortDescription: "Ancient temples and sacred architecture",
    fullDescription: "Ancient temples and pavilions stand as testaments to architectural genius and spiritual devotion. Each structure embodies centuries of accumulated wisdom, artistic excellence, and cultural values that continue to inspire awe.",
    positionX: 42,
    positionY: 28,
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
    slug: "technology",
    title: "Green Technology",
    icon: "zap",
    shortDescription: "Solar, wind, and sustainable innovation",
    fullDescription: "Technology in ecological civilization is not opposed to nature but works in harmony with it. Solar panels on traditional rooftops, wind turbines across landscapes, and electric vehicles represent the fusion of innovation and sustainability.",
    positionX: 75,
    positionY: 35,
    sections: [
      {
        title: "Renewable Energy Integration",
        content: "Imagine a pagoda with solar panels gracefully integrated into its ancient design, or wind turbines turning alongside terraced rice paddies. Ecological civilization embraces technology that generates clean energy while respecting the aesthetic harmony of the landscape."
      },
      {
        title: "Sustainable Transportation",
        content: "Electric vehicle charging stations appearing alongside traditional inns represent the meeting of past and future. Clean transportation reduces pollution while maintaining the connections between communities that have existed for centuries."
      },
      {
        title: "Innovation with Tradition",
        content: "The most successful green technologies often draw on traditional principles of efficiency, durability, and harmony with nature. Modern innovation at its best extends rather than replaces ancestral wisdom."
      }
    ]
  },
  {
    id: "4",
    slug: "health",
    title: "Environmental Health",
    icon: "heart",
    shortDescription: "Human wellbeing and ecological balance",
    fullDescription: "Environmental health recognizes the profound connection between ecological wellbeing and human flourishing. Clean air, pure water, and thriving ecosystems are foundations for healthy communities.",
    positionX: 28,
    positionY: 65,
    sections: [
      {
        title: "Holistic Wellbeing",
        content: "Traditional Asian medicine has long understood that human health cannot be separated from environmental health. The same principles that govern the flow of energy in the body apply to the larger landscape."
      },
      {
        title: "Clean Air and Water",
        content: "Efforts to reduce pollution and protect water sources directly improve public health. Communities that prioritize ecological civilization experience better health outcomes across generations."
      },
      {
        title: "Nature and Mental Health",
        content: "Access to natural spaces and green environments supports mental and emotional wellbeing. Gardens, parks, and natural landscapes are not luxuries but necessities for human flourishing."
      }
    ]
  },
  {
    id: "5",
    slug: "tradition",
    title: "Traditional Wisdom",
    icon: "book",
    shortDescription: "Ancestral knowledge and practices",
    fullDescription: "Traditional wisdom represents the accumulated insights of countless generations who lived in close relationship with the natural world. These teachings offer guidance for creating sustainable societies.",
    positionX: 55,
    positionY: 50,
    sections: [
      {
        title: "Ancestral Teachings",
        content: "Libraries filled with bamboo scrolls and ancient texts preserve wisdom about living in harmony with nature. These teachings emphasize balance, reciprocity, and respect for all living things."
      },
      {
        title: "Living Practices",
        content: "Traditional festivals, agricultural practices, and daily rituals maintain connections to the natural cycles of the earth. These practices embed ecological awareness into the fabric of community life."
      },
      {
        title: "Intergenerational Dialogue",
        content: "Ecological civilization requires conversations across generations—elders sharing traditional knowledge while youth contribute new perspectives and energy to the work of restoration."
      }
    ]
  },
  {
    id: "6",
    slug: "culture",
    title: "Arts & Culture",
    icon: "paintbrush",
    shortDescription: "Gardens and artistic traditions",
    fullDescription: "The art of the traditional garden represents the pinnacle of cultural achievement—a perfect fusion of philosophy, art, and horticulture that creates spaces for contemplation and connection with nature.",
    positionX: 62,
    positionY: 75,
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
    id: "7",
    slug: "community",
    title: "Community",
    icon: "bridge",
    shortDescription: "Bridges connecting people and places",
    fullDescription: "Bridges in Asian landscapes serve as powerful symbols of connection—linking not just physical spaces, but also past and present, humanity and nature, the earthly and the divine.",
    positionX: 38,
    positionY: 80,
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
    id: "8",
    slug: "exploration",
    title: "Exploration",
    icon: "mountain",
    shortDescription: "Majestic peaks and spiritual journeys",
    fullDescription: "Mountains have always held a special place in Asian spirituality and art. Representing the axis between earth and heaven, these majestic peaks inspire journeys both physical and spiritual.",
    positionX: 88,
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
