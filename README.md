# xploreum-landing

Landing page for [Xploreum](https://xploreum.io) — an AI-powered travel planning platform that pairs you with local expert guides ("Xperts") through a conversational AI agent named Xavier.

Built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**. Deployed automatically to Vercel on every push to `main`.

---

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| Next.js | 15.x | App Router, SSG, API routes |
| React | 19.x | UI rendering |
| Tailwind CSS | v4 | Utility-first styling via `@theme` in CSS |
| TypeScript | 5.x | Type safety |
| PostHog | 1.x | Analytics & event tracking |
| next-mdx-remote | 6.x | Legal docs rendered from MDX |
| gray-matter | 4.x | YAML frontmatter parsing for MDX |
| remark-gfm | 4.x | GitHub Flavored Markdown in MDX |

---

## Local Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # verify production build
npm run lint    # ESLint
```

**Environment variables** — copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx          # PostHog project key
WAITLIST_WEBHOOK_URL=https://...         # Optional: webhook for waitlist signups
```

---

## Project Structure

```
xploreum-landing/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout — fonts, metadata, PostHog provider
│   │   ├── page.tsx                # Home page (Nav → Hero → HowItWorks → Xperts → About → Footer)
│   │   ├── globals.css             # Tailwind v4 @theme tokens + all CSS animations
│   │   ├── api/waitlist/route.ts   # POST /api/waitlist — email signup handler
│   │   └── legal/                  # Legal document pages (SSG)
│   │       ├── page.tsx            # /legal index — lists all documents
│   │       ├── [slug]/page.tsx     # /legal/[slug] — individual MDX doc renderer
│   │       └── _components/        # LegalLayout (sidebar nav) + legal.css (prose styles)
│   │
│   ├── components/
│   │   ├── nav.tsx                 # Fixed header — logo, CTA, hamburger menu toggle
│   │   ├── menu-overlay.tsx        # Full-screen mobile/overlay menu
│   │   ├── footer.tsx              # Dark footer — socials, link grid, waitlist form
│   │   ├── providers/
│   │   │   └── posthog-provider.tsx  # PostHog init + pageview capture
│   │   ├── sections/
│   │   │   ├── hero.tsx            # Full-viewport hero — typewriter, phone mock, CTA
│   │   │   ├── how-it-works.tsx    # 4-step editorial flow with laptop mockups
│   │   │   ├── xperts.tsx          # 6 Xpert archetypes with image carousels
│   │   │   └── about.tsx           # Problem / Fix / Team narrative + contact CTA
│   │   └── ui/
│   │       ├── button.tsx          # Link button — variants: primary, ghost, link
│   │       ├── wordmark.tsx        # Logo image (dark/light tones)
│   │       ├── tracked-link.tsx    # Anchor with PostHog click tracking
│   │       ├── waitlist-form.tsx   # Email signup form with loading/success/error states
│   │       ├── phone-mock.tsx      # iPhone mockup with video or animated chat fallback
│   │       ├── laptop-mock.tsx     # Pre-composited laptop frame (Next/Image from CDN)
│   │       ├── magnetic-pill.tsx   # Mouse-tracking CTA button with magnet pull
│   │       ├── typewriter-phrases.tsx  # "Chat Plan · Pack Go" intro animation
│   │       └── typewriter-words.tsx    # Rotating word carousel with per-char spring
│   │
│   └── lib/
│       ├── links.ts                # Single source of truth for all outbound/anchor URLs
│       └── track.ts                # PostHog event helper — trackCta(name, location)
│
├── content/legal/                  # MDX legal documents (9 files)
│   ├── terms.mdx
│   ├── thrillmaster-terms.mdx
│   ├── privacy.mdx
│   ├── acceptable-use.mdx
│   ├── payment-terms.mdx
│   ├── content-licensing.mdx
│   ├── code-of-conduct.mdx
│   ├── safety-guidelines.mdx
│   └── cookies.mdx
│
├── public/
│   ├── logo.png                    # Brand mark — icon + "XPLOREUM" wordmark (rendered at 48px)
│   ├── Favicon green.png
│   └── Favicon white.png
│
├── next.config.ts                  # Image CDN, PostHog proxy rewrites, go.xploreum.io redirects
├── postcss.config.mjs              # @tailwindcss/postcss (Tailwind v4)
├── tsconfig.json                   # Strict TS, ES2022, @/* path alias → ./src/*
└── .env.example
```

---

## Page Sections

### Hero (`sections/hero.tsx`)
Full-viewport section with a background video, bone-wash overlay, and radial gradient veil. Left column has the TypewriterPhrases animation ("Chat Plan · Pack Go") followed by the tagline and a MagneticPill CTA linking to `app.xploreum.io/chat`. Right column shows a PhoneMock with a video or animated chat sequence.

### How It Works (`sections/how-it-works.tsx`)
Four editorial steps explaining the Xavier → Xpert flow:
1. **Conversation** — describe your trip to Xavier
2. **Brief** — Xavier builds a structured brief
3. **Build** — matched Xpert crafts your itinerary
4. **Xpedition** — you go, they're with you in-app

Each step alternates a LaptopMock image with descriptive copy.

### Xperts (`sections/xperts.tsx`)
Dark section (forest background) showcasing 6 Xpert archetypes — Stay, Activity, Sports & Adventure, Rental, Food & Drink, Transport. Each card has a 3-image carousel that rotates every 4.5 seconds (pauses on hover) with a Ken Burns zoom on the active image.

### About (`sections/about.tsx`)
Three-column editorial grid: **The Problem**, **The Fix**, and **The Team**. Introduces founders Armin (SF) and Hadis (Montréal) with a mailto CTA.

---

## Theme & Design Tokens

Defined in `src/app/globals.css` under `@theme` (Tailwind v4):

| Token | Value | Usage |
|-------|-------|-------|
| `bone` | `#FFFFFF` | Primary background |
| `bone-soft` | `#E0D8C2` | Soft section background |
| `bone-deep` | `#D4CAB0` | Deeper warm background |
| `forest` | `#0F2417` | Primary dark green (text, buttons) |
| `forest-soft` | `#3A5544` | Mid-tone green |
| `moss` | `#6B8570` | Sage accent |
| `line` | `#C9BFA4` | Taupe dividers |
| Editorial amber | `#a05a16` | Italic serif accents (inline, not a token) |

**Fonts** (loaded via `next/font/google`):
- `--font-sans`: **Urbanist** (weights 400–900) — body and UI
- `--font-serif`: **Cormorant** italic — editorial flourish

**Animations** defined in `globals.css`:
- `.rise` / `.rise-1` through `.rise-6` — staggered fade-in-up on load
- `.phone-float` — idle bob on the phone mockup
- `.caret` — typewriter cursor blink
- `.char-in` — per-character spring pop for the word carousel
- `.word-breathe` — gentle pulse while a word is held
- `.ken-burns` — slow image zoom on active Xpert card
- `.bubble-reveal` — animated chat bubble sequence
- `.grain-layer` — SVG film grain texture overlay
- `.magnetic` — smooth return animation for the magnetic pill

All animations respect `prefers-reduced-motion: reduce`.

---

## API Routes

### `POST /api/waitlist`

Accepts `{ email: string }` in the request body.

- Returns `200` if the email is valid (and optionally forwards to `WAITLIST_WEBHOOK_URL`)
- Returns `400` if the email fails validation
- Returns `502` if the webhook request fails

---

## Analytics

PostHog is initialized in `providers/posthog-provider.tsx` and proxied through `/ingest/*` (configured in `next.config.ts`) to avoid ad-blocker interference.

Events are fired via `trackCta(ctaName, location)` from `src/lib/track.ts`. Key tracked interactions:
- `chat_with_xavier` — hero and nav CTAs
- `for_guide` — Xperts section link
- `sign_in` — sign-in links
- `contact` — mailto footer link
- Navigation and menu item clicks

---

## URL Management

All outbound links and anchor targets live in `src/lib/links.ts`. Never hardcode URLs in components — import from this file.

Key entries:
- `links.chatWithX` → `https://app.xploreum.io/chat`
- `links.signIn` → sign-in page
- `links.forGuide` → `#xperts`
- `links.contact` → `mailto:hello@xploreum.io`
- `links.legal.*` → `/legal/<slug>` routes

---

## Legal Documents

Nine MDX files in `content/legal/` with YAML frontmatter (`title`, `slug`, `effective`, `updated`, `summary`). Rendered server-side via `next-mdx-remote` at `/legal` (index) and `/legal/[slug]` (detail). The sidebar navigation is generated from all document slugs.

---

## Deployment

Deployed to **Vercel** via automatic git integration.

- **Production**: https://xploreum.io
- Every push to `main` triggers a rebuild (~60s)

**Workflow**: commit directly to `main` for routine changes. Use a feature branch + PR only for risky/experimental work or when a throwaway preview URL is needed.

---

## Image CDN

Laptop mockup images are served from the Supabase storage bucket at `auth.xploreum.io`. The domain is whitelisted in `next.config.ts` under `images.remotePatterns` so Next.js `<Image>` optimization works.

---

## Redirects

`next.config.ts` handles legacy traffic from `go.xploreum.io`:
- `/platform/thrillmaster-terms` → `/legal/thrillmaster-terms`
- Other `/platform/*` paths → `/legal/*`
- All remaining `go.xploreum.io` paths → `https://xploreum.io/`
