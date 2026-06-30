# AGENTS.md — Mariva Global

Ultra-premium corporate website for Mariva Global, a multinational investment and property development company. The site communicates quiet luxury, architectural ambition, and global scale.

## Architecture

```
src/
  routes/
    __root.tsx     — HTML shell (Google Fonts, meta tags, SEO)
    index.tsx      — Complete single-page website (all 14 sections)
  styles.css       — Global CSS: Tailwind v4 + custom animations + design tokens
public/
  favicon.ico
```

## Key Design Decisions

### Single-file page component
All 14 sections live in `src/routes/index.tsx` as named function components. Extract a section to its own file only when it grows beyond ~150 lines independently.

### CSS animation system
Scroll reveals use `useScrollReveal()` hook running a single `IntersectionObserver` watching all `.reveal`, `.reveal-left`, `.reveal-right` elements. Adding `in-view` class triggers CSS transitions. Delay classes `.reveal-d1` through `.reveal-d6` stagger children.

### Color palette
```
#0A0A0A  — Deep Black (dark sections, text)
#F8F6F2  — Warm White (light sections bg)
#C9A46A  — Rich Gold (accents, labels, hover borders)
#2B2B2B  — Charcoal (body text)
#6B6560  — Mid Grey (secondary text)
```

### Typography
- `.font-display` class → `Cormorant Garamond` (editorial headings, quotes)
- Body → `Inter` (labels, body copy, navigation)
- Display sizes use `clamp()` for fluid scaling between mobile and desktop

### Image strategy
Curated Unsplash photo IDs stored in the `IMG` constant at the top of `index.tsx`. All images have `loading="lazy"` except hero. Images use CSS `object-fit: cover` with aspect-ratio containers.

### Section alternation
Dark → Light alternating for visual rhythm:
Hero(dark) → About(light) → Divisions(dark) → Projects(light) → Hospitality(dark) → Stats(light) → Philosophy(dark) → Leadership(light) → Sustainability(dark) → GlobalPresence(light) → Testimonials(dark) → Contact(light) → Footer(dark)

### Navigation
Fixed header, transparent over hero, transitions to `rgba(10,10,10,0.97)` with backdrop-blur on scroll > 70px. Mobile: fullscreen overlay with large Cormorant Garamond menu items.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS |
| Language | TypeScript 5 |
| Fonts | Google Fonts (Cormorant Garamond, Inter) |
| Deployment | Netlify |

## Coding Conventions

- Inline styles for precise layout/design values; CSS classes for animations and hover states
- All interactive elements use event handlers with proper TypeScript types
- `useEffect` cleanup functions on all event listeners and observers
- No external animation libraries — CSS + IntersectionObserver + requestAnimationFrame only
- Images always have `alt` attributes for accessibility

## Development Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
```
