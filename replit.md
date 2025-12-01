# Interactive Asian Landscape Discovery Website

## Overview

An immersive web application that presents traditional Asian landscapes as an interactive discovery experience. Users explore a full-screen landscape painting where hidden hotspots reveal thematic content about conservation, heritage, culture, and community. The design emphasizes storytelling through visual interaction, inspired by interactive digital experiences like latecheckout.studio, combined with traditional Asian aesthetic principles of harmony, negative space, and layered discovery.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for component-based UI
- Wouter for client-side routing
- TanStack Query for server state management
- Vite as the build tool and development server

**UI Framework:**
- Shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Custom color system based on traditional Asian palette (neutral tones, crimson primary, gold accents)
- Typography: Noto Serif TC for headings, Noto Sans for UI elements, Ma Shan Zheng for decorative display text

**Component Architecture:**
- **Page Components**: Home (interactive landscape), DiscoverDetail (content pages), Contributors (contributor profiles), About, Contact, NotFound
- **Interactive Components**: InteractiveHotspot (clickable areas on landscape), DiscoveryBubble (animated reveal UI), BrushstrokeMenu (navigation with hand-painted aesthetic), ShowAllToggle (visibility control), FlipTile (3D flip cards for section content), ContributorTile (flip-over contributor photo cards)
- **Tertiary Content Components**: StoryMapEmbed (responsive ArcGIS StoryMap iframe embeds with fullscreen support)
- **Utility Components**: ButterflyLoader (transition animation), Footer (site-wide footer with links), SidebarNav (section navigation with scroll-tracking)

**State Management:**
- React hooks (useState, useCallback, useEffect) for local component state
- TanStack Query for API data fetching and caching
- Form state managed via react-hook-form with Zod validation

**Responsive Design:**
- Mobile-first approach with breakpoint at 768px
- Custom hook (useIsMobile) for responsive behavior
- Touch-optimized interactions for mobile devices

### Backend Architecture

**Server Framework:**
- Express.js as the HTTP server
- Node.js with TypeScript (ESM modules)
- HTTP server created with Node's built-in `http` module

**API Design:**
- RESTful endpoints under `/api` prefix
- Routes:
  - `GET /api/discoveries` - Fetch all discovery content
  - `GET /api/discoveries/:slug` - Fetch single discovery by slug
  - `POST /api/contact` - Submit contact form messages

**Data Layer:**
- In-memory storage implementation (IStorage interface)
- Discovery content hardcoded in storage.ts for initial implementation
- Schema definitions use Drizzle ORM types but data currently stored in-memory
- Designed for future PostgreSQL integration

**Request Processing:**
- JSON body parsing with raw body preservation for webhook validation
- URL-encoded form data support
- Custom logging middleware tracking request duration and status
- Static file serving for production builds

**Development vs Production:**
- Development: Vite middleware integration with HMR
- Production: Serves static files from dist/public directory
- Build process bundles server code with ESBuild

### Data Storage Solutions

**Current Implementation:**
- Mock storage layer implementing IStorage interface
- Discovery content defined as typed arrays in server/storage.ts
- Contact messages stored in-memory (ephemeral)

**Content Organization (shared/content/):**
- Discovery content organized by category and language in JSON files
- UI translations in shared/content/ui/en.json and zh.json
- Contributor profiles in shared/content/contributors/
- README with editing guidelines and migration documentation

**Schema Design (Drizzle ORM):**
- `users` table: id, username, password (authentication ready but not implemented)
- `discovery_elements` table: id, slug, title, icon, descriptions, position coordinates
- `contact_messages` table: id, name, email, message

**Data Validation:**
- Zod schemas generated from Drizzle tables via drizzle-zod
- Server-side validation on POST requests
- Client-side form validation using react-hook-form + Zod resolver

**Future Database:**
- PostgreSQL configured via Drizzle with connection pooling via @neondatabase/serverless
- Migration system ready (drizzle-kit configured)
- Environment variable DATABASE_URL expected for production

### Authentication and Authorization

**Current State:**
- User schema defined but authentication not implemented
- Session infrastructure prepared (connect-pg-simple for session store)
- No authentication required for current features

**Prepared Infrastructure:**
- User table with username/password fields
- UUID-based user IDs
- Ready for passport.js integration (dependencies installed)

### External Dependencies

**Third-party Services:**
- Neon Database (PostgreSQL hosting) - configured but not actively used
- Google Fonts API - Noto Serif TC, Noto Sans, Ma Shan Zheng fonts

**UI Libraries:**
- Radix UI - Accessible component primitives (accordion, dialog, dropdown, navigation, toast, etc.)
- Lucide React - Icon library
- cmdk - Command menu component
- embla-carousel-react - Carousel functionality
- react-day-picker - Calendar/date selection

**Utilities:**
- class-variance-authority - Variant-based component styling
- clsx + tailwind-merge - Conditional class name utilities
- date-fns - Date manipulation
- nanoid - Unique ID generation
- zod - Runtime type validation

**Development Tools:**
- @replit/vite-plugin-runtime-error-modal - Error overlay
- @replit/vite-plugin-cartographer - Code navigation
- @replit/vite-plugin-dev-banner - Development banner

**Build Tools:**
- Vite - Frontend bundling and dev server
- ESBuild - Server-side bundling for production
- TypeScript - Type checking and compilation
- PostCSS + Autoprefixer - CSS processing