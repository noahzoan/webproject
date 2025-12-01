# Content Files

This folder contains all editable content for the Ecological Civilization website.
Content is organized for easy editing and future CMS migration.

## Current Status

All 11 discovery categories are available with full bilingual support:
- **Landscape Hotspots (8)**: restoration, heritage, technology, health, tradition, culture, community, exploration
- **Support Categories (3)**: resources, multimedia, contributors

## File Structure

```
content/
├── discoveries/          # Main discovery category content (11 categories)
│   ├── en/              # English content (11 files)
│   │   ├── restoration.json    ← Ecological Restoration
│   │   ├── heritage.json       ← Cultural Heritage
│   │   ├── technology.json     ← Green Technology
│   │   ├── health.json         ← Environmental Health
│   │   ├── tradition.json      ← Traditional Wisdom
│   │   ├── culture.json        ← Arts & Culture
│   │   ├── community.json      ← Community
│   │   ├── exploration.json    ← Exploration (includes StoryMaps)
│   │   ├── resources.json      ← Resources
│   │   ├── multimedia.json     ← Multimedia
│   │   └── contributors.json   ← Contributors
│   └── zh/              # Chinese content (11 matching files)
│       └── [same structure]
├── contributors/         # Contributor profiles (organized by role)
│   ├── team.json        ← Project team members
│   ├── scholars.json    ← Academic contributors
│   └── partners.json    ← Community partner organizations
├── ui/                   # UI text and labels
│   ├── en.json          ← English interface text
│   └── zh.json          ← Chinese interface text
└── README.md            # This file
```

## Editing Guidelines

### Discovery Content (discoveries/)
Each category has its own JSON file with:
- `title`: Main title displayed in the page header
- `subtitle`: Poetic tagline below the title
- `icon`: Icon name from Lucide icons
- `highlight`: Featured quote for the hero section
- `fullDescription`: Main introductory paragraph (max 50 words)
- `sections`: Array of content sections, each with:
  - `title`: Section heading
  - `content`: Section text (max 100 words per section)
  - `storyMap`: (optional) ArcGIS StoryMap embed configuration

### Content Guidelines
- Keep language accessible and engaging
- Maximum 250 words total per discovery page
- Use present tense for descriptions
- Include both English and Chinese versions
- Chinese translations should use Chinese full-width punctuation

### StoryMap Configuration
When adding a StoryMap to a section:
```json
{
  "storyMap": {
    "url": "https://storymaps.arcgis.com/stories/[story-id]",
    "title": "Story Title",
    "hideHeader": true,
    "hideCover": false,
    "height": 600
  }
}
```

### Hotspot Positioning
For categories displayed on the landscape homepage:
- `positionX`: Horizontal position (0-100, left to right)
- `positionY`: Vertical position (0-100, top to bottom)
- Set both to -1 for categories not shown on homepage

## How It Works

The content files are loaded by `server/contentLoader.ts` at runtime:
- Discovery content is loaded from `shared/content/discoveries/en/` 
- Contributor profiles are loaded from `shared/content/contributors/`
- Content is cached after first load for performance

The frontend still has its own translations in `DiscoverDetail.tsx` for bilingual support (the API returns English content, and the frontend has matching Chinese translations).

## Future Migration

These content files are designed for easy migration to:
- Headless CMS (Contentful, Sanity, Strapi)
- Database (PostgreSQL with JSON columns)
- Markdown files for static site generators

Simply parse the JSON structure and map to your target system.
