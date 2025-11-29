import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/discoveries", async (_req, res) => {
    try {
      const discoveries = await storage.getDiscoveries();
      res.json(discoveries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch discoveries" });
    }
  });

  app.get("/api/discoveries/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const discovery = await storage.getDiscoveryBySlug(slug);
      
      if (!discovery) {
        return res.status(404).json({ error: "Discovery not found" });
      }
      
      res.json(discovery);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch discovery" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ 
        success: true, 
        message: "Message sent successfully",
        id: message.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  return httpServer;
}
