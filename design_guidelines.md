# Design Guidelines: Interactive Asian Landscape Discovery Website

## Design Approach
**Reference-Based**: Inspired by latecheckout.studio's interactive storytelling approach, combined with traditional Asian aesthetic principles emphasizing harmony, negative space, and layered discovery.

## Core Visual Identity

### Typography
- **Primary Headings**: Asian-inspired serif font (e.g., "Noto Serif TC" or similar) at 48-64px for section titles
- **Discovery Bubbles**: Clean sans-serif (e.g., "Noto Sans") at 16-18px, medium weight
- **Body Text**: Readable sans-serif at 16px for secondary pages
- **Menu Items**: 20px medium weight

### Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, and 16 for consistent rhythm
- Hotspot bubbles: p-4 with rounded-full
- Content sections on secondary pages: py-16 on desktop, py-8 mobile
- Navigation elements: p-6 for menu, p-4 for toggle button

## Interactive Homepage Components

### Background Layer
Full-screen traditional Asian landscape painting featuring:
- Misty mountains in background
- Traditional pagodas and temples mid-ground
- Water elements (pond, stream) in foreground
- Cherry blossoms or willow trees
- Stone bridges and pathways

### Interactive Hotspots (5-7 elements)
Invisible clickable/hoverable areas positioned over:
- Pond → "Conservation" bubble
- Temple → "Heritage" bubble
- Garden → "Culture" bubble
- Bridge → "Community" bubble
- Mountain → "Exploration" bubble

**Bubble Design**:
- Circular pill shapes with backdrop blur
- Soft shadow for depth
- Subtle scale animation on reveal (0.95 to 1.0)
- Icons paired with text labels

### Navigation Elements

**Upper Left - Hamburger Menu**:
- Three horizontal brushstroke SVG lines (hand-painted aesthetic)
- Spacing: gap-2 between strokes
- Expands to full-screen overlay with menu items

**Upper Right - Toggle Button**:
- Circular button with eye/visibility icon
- Text: "Show All" / "Hide All"
- backdrop-blur-md background

### Scroll Behavior
**Desktop**: Vertical scroll with subtle parallax (background moves slower than foreground)
**Mobile**: Touch drag-and-pan with momentum, bounded to landscape edges

### Footer Section
Traditional webpage footer after scrollable landscape:
- Three columns: About Us, Contact, Links
- Social media icons
- Copyright notice
- Background: Subtle gradient fade from landscape

## Secondary Pages

### Page Structure
- Hero section with topic title and hero image related to theme
- 3-4 content sections with text and supporting imagery
- Related links section
- Back to home navigation

### Butterfly Loading Animation
- Animated butterfly SVG (simple wing flap animation)
- Enters from bottom-right, flies diagonally up-left
- Duration: 800ms
- Exits completely before new page renders

## Color Palette (Asian Traditional)
- Background: Soft cream/parchment (#F5F1E8)
- Accent Red: Traditional Chinese red (#C8102E)
- Gold highlights: (#D4AF37)
- Text: Deep charcoal (#2C2C2C)
- Bubbles: White with 40% opacity backdrop blur

## Images
**Homepage**: Single full-screen traditional Asian landscape painting (can be sourced from stock or commissioned art) showing layered landscape with multiple discoverable elements.

**Secondary Pages**: Each topic page includes 2-3 contextual images (e.g., Conservation page shows wildlife/nature imagery within Asian setting).

## Component Library
- Circular discovery bubbles with blur backdrop
- Brushstroke navigation lines
- Animated butterfly SVG loader
- Full-screen menu overlay
- Content card containers for secondary pages
- Footer navigation blocks

## Interactions & Animations
- Discovery bubbles: Fade in + scale (300ms ease)
- Butterfly: Custom keyframe wing-flap + translate path
- Menu: Slide-in overlay (400ms ease-out)
- Hotspot hover: Gentle pulsing glow effect (if desktop)
- Mobile pan: Smooth momentum with boundary constraints

## Accessibility
- All interactive hotspots have clear focus states
- Keyboard navigation for menu and discovery elements
- Alt text for all decorative and functional images
- High contrast for text readability against background