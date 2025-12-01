import { 
  type User, 
  type InsertUser,
  type DiscoveryContent,
  type InsertContactMessage,
  type ContactMessage,
  type Contributor
} from "@shared/schema";
import { randomUUID } from "crypto";
import { getDiscoveryData, getContributorData } from "./contentLoader";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDiscoveries(): Promise<DiscoveryContent[]>;
  getDiscoveryBySlug(slug: string): Promise<DiscoveryContent | undefined>;
  
  getContributors(): Promise<Contributor[]>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

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
    return getDiscoveryData();
  }

  async getDiscoveryBySlug(slug: string): Promise<DiscoveryContent | undefined> {
    const discoveries = getDiscoveryData();
    return discoveries.find(d => d.slug === slug);
  }

  async getContributors(): Promise<Contributor[]> {
    return getContributorData();
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
