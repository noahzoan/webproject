# Ecological Civilization - Interactive Asian Landscape Discovery

## Overview

This is an **interactive educational website** that presents the concept of Ecological Civilization through a traditional Asian landscape painting. Users discover hidden stories about conservation, heritage, culture, and sustainability by exploring interactive hotspots on the landscape.

The application features:
- **Interactive homepage** with clickable/hoverable hotspots on a traditional Asian landscape painting
- **Discovery detail pages** with rich content sections, including embedded ArcGIS StoryMaps
- **Bilingual support** (English and Chinese)
- **Contributors page** showcasing project team, scholars, and partner organizations
- **Contact form** for user engagement
- **Static content architecture** - all discovery and contributor content is loaded from JSON files

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript and Vite for development/building

**Styling System**:
- Tailwind CSS for utility-first styling
- shadcn/ui component library with Radix UI primitives
- Custom design system inspired by traditional Asian aesthetics
- CSS custom properties for theming (light mode with traditional Asian color palette)
- Typography: Noto Serif TC for headings, Noto Sans for body text, Ma Shan Zheng for decorative elements

**Routing**: Wouter (lightweight client-side routing)

**State Management**:
- React Context for language selection (English/Chinese)
- TanStack Query (React Query) for server state management
- Local component state with React hooks

**Key Design Patterns**:
- Component-based architecture with reusable UI primitives
- Static content loading from JSON files (no database queries for content)
- Separation of concerns: content files, UI components, and business logic
- Accessibility-first approach with ARIA labels and keyboard navigation

**Animation**: Framer Motion for page transitions and interactive elements

### Backend Architecture

**Framework**: Express.js with TypeScript

**Server Structure**:
- RESTful API endpoints for discoveries, contributors, and contact messages
- Content loader system that reads from JSON files at startup
- In-memory storage implementation (`MemStorage` class)
- Session management ready (connect-pg-simple for PostgreSQL sessions)

**Build Process**:
- esbuild for server bundling (bundles selected dependencies for faster cold starts)
- Vite for client bundling
- Single-page application (SPA) with client-side routing
- GitHub Pages deployment support with 404.html redirect handling

**API Endpoints**:
- `GET /api/discoveries` - List all discovery categories
- `GET /api/discoveries/:slug` - Get specific discovery by slug
- `GET /api/contributors` - Get all contributors organized by category
- `POST /api/contact` - Submit contact form (validated with Zod schemas)

### Content Management System

**Architecture Decision**: Static JSON-based content instead of database CMS

**Rationale**:
- Simplifies deployment and reduces infrastructure requirements
- Content is editorial/educational and changes infrequently
- Enables version control for content (Git-based workflow)
- Faster load times - content loaded once at server startup
- Easy migration path to database CMS if needed

**Content Structure**:
- `shared/content/discoveries/` - 11 discovery categories with full bilingual content
- `shared/content/contributors/` - Team, scholars, and partners organized by role
- `shared/content/ui/` - Interface translations for navigation and labels

**Content Loading Flow**:
1. Server reads JSON files on startup via `contentLoader.ts`
2. Content cached in memory via `storage.ts` abstraction layer
3. Client requests content via API endpoints
4. Static content also imported directly in client for faster initial render

### Data Storage Solutions

**Current Implementation**: In-memory storage (`MemStorage` class)

**Database Schema Defined** (Drizzle ORM with PostgreSQL dialect):
- `users` table - User authentication (username, password)
- `discovery_elements` table - Discovery hotspot metadata
- `contact_messages` table - Contact form submissions

**Migration Path**: 
- Drizzle schema defined in `shared/schema.ts`
- Database configuration in `drizzle.config.ts`
- Storage interface (`IStorage`) abstracts database implementation
- Can switch from `MemStorage` to database implementation without changing API

**Design Decision**: Start with static content and in-memory storage, add database only when needed for:
- User authentication/sessions
- Dynamic content management
- Contact form persistence
- Analytics/tracking

### Authentication & Authorization

**Current State**: Authentication schema defined but not implemented

**Prepared Infrastructure**:
- User table schema with username/password fields
- Session management packages installed (express-session, passport, passport-local)
- JWT support available
- bcrypt ready for password hashing

**Implementation Strategy**: Authentication will be added when admin CMS features are needed

## External Dependencies

### Third-Party Services

**ArcGIS StoryMaps**: 
- Embedded interactive maps in discovery detail pages (specifically "Exploration" category)
- Custom `StoryMapEmbed` component handles embedding with configurable parameters
- Supports fullscreen mode and external link fallback

**Google Fonts**:
- Noto Serif TC (serif font for Asian typography)
- Noto Sans (clean sans-serif for body text)
- Ma Shan Zheng (decorative/display font)

### Key NPM Packages

**UI & Styling**:
- `@radix-ui/*` - Unstyled accessible component primitives (20+ components)
- `tailwindcss` - Utility-first CSS framework
- `framer-motion` - Animation library
- `lucide-react` - Icon library

**Data & Forms**:
- `@tanstack/react-query` - Server state management
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `@hookform/resolvers` - Zod integration with react-hook-form

**Backend**:
- `express` - Web server framework
- `drizzle-orm` - TypeScript ORM
- `@neondatabase/serverless` - PostgreSQL driver for serverless environments
- `drizzle-zod` - Generate Zod schemas from Drizzle schemas

**Development**:
- `vite` - Build tool and dev server
- `tsx` - TypeScript execution
- `esbuild` - Fast JavaScript bundler

### Database Provider

**Configured For**: Neon (serverless PostgreSQL)
- Connection via `@neondatabase/serverless` driver
- DATABASE_URL environment variable required
- Drizzle ORM configured for PostgreSQL dialect
- Migrations output to `./migrations` directory

**Note**: Database is configured but not currently required - application runs with in-memory storage