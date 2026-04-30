# Xploreum Landing

Next.js 15 + Tailwind v4 landing page. Deployed to Vercel → https://xploreum.io

## Workflow

**Commit directly to `main`.** The project is pre-launch and uses Vercel's automatic deploys from `main` as the preview/production environment. Skip feature branches and PRs for routine changes — just commit + push to `main` and Vercel will rebuild in ~60s.

Use a feature branch + PR only when:
- The change is risky/experimental and needs review or a throwaway preview URL
- The user explicitly asks for a PR

## Local dev

```
npm install
npm run dev     # http://localhost:3000
npm run build   # verify production build
```

## Structure

- `src/app/` — Next.js app router (layout, page, globals.css with Tailwind v4 `@theme`)
- `src/components/` — Nav, menu overlay, footer, and `sections/*` for hero/how-it-works/xperts/about
- `src/components/ui/` — Shared primitives (`wordmark`, `button`, `phone-mock`)
- `src/lib/links.ts` — Single source of truth for outbound/anchor URLs
- `public/logo.png` — Brand mark (combined icon + "XPLOREUM" wordmark, rendered at 48px height)

## Theme tokens

Defined in `src/app/globals.css` under `@theme`:
- `bone`, `bone-soft`, `bone-deep` — warm off-white palette
- `forest`, `forest-soft`, `forest-deep` — primary dark green
- `moss`, `line` — accents
- `--font-sans` — Urbanist (loaded via `next/font/google` in `layout.tsx`)
- `--font-serif` — Cormorant italic (editorial accent, loaded alongside Urbanist)

Brand secondary (warm): **`#a05a16`** — deep amber used for editorial accent lines.

## Advisory team (skill lenses)

When working on this website, think through changes using these specialist perspectives. Invoke the relevant lens(es) before proposing or implementing. For copy work: Brand Strategist + Copywriter. For visual/UI work: Creative Director + UI Designer + Art Director. For structure/flow: UX Designer + CRO. For tech/performance: Front-End Dev + Tech Lead + Performance Engineer + SEO. For launch readiness: QA + Analytics.

1. **Brand Strategist** — Owns what the brand *means*. Positioning, audience psychology, competitive analysis, messaging hierarchy, storytelling.
2. **Copywriter** — Turns strategy into words. Clear/persuasive copy, short headlines, emotional lines, CTA microcopy, tone of voice. Rule: make readers *feel* "this is exactly what I need," don't over-explain.
3. **Creative Director** — Protects the big vision. Taste, art direction, visual judgment, consistency across sections, emotional design. Asks "does this feel like 1,000 hours of thinking are behind it?"
4. **UX Designer** — Designs structure and journey. Information architecture, what's above the fold, where the CTA lives, reducing confusion, wireframing.
5. **UI Designer** — Designs the actual look. Typography, spacing, colors, grids, components, hierarchy, mobile-first. Sweats small things: spacing, alignment, font weight, rhythm.
6. **Art Director** — Defines image/visual language. Photography vs. 3D vs. topographic vs. UI shots; moodboards; atmosphere; consistency of visual assets. Prevents "random Canva / stock-photo" look.
7. **Motion Designer** — Scroll animations, hover/page transitions, waypoint reveals, micro-interactions. Rule: motion should feel alive and intentional, never distracting.
8. **Front-End / Creative Developer** — Builds polished interactive experiences. Next.js, Tailwind, Framer Motion / GSAP, responsive, pixel-perfect, accessibility.
9. **Technical Lead** — System architecture. Hosting, APIs, auth, analytics wiring, security, scalability. Owns connections to `app.xploreum.io`, Xplorer/Thrillmaster sign-in, AI chat, waitlist/booking.
10. **SEO Specialist** — Titles, meta, schema, site structure, Core Web Vitals, keywords. Foundation must be clean even pre-launch.
11. **Conversion Rate Optimization** — Funnel analysis, CTA clarity, hesitation points, proof, A/B tests. Guards the business outcome, not just the look.
12. **Performance Engineer** — Speed. Image optimization, lazy loading, bundle size, CDN, animation perf. Slow = unprofessional.
13. **QA Tester** — Cross-browser/device, broken links, forms, sign-in buttons, animations, a11y. Final gatekeeper.
14. **Analytics / Growth** — GA, PostHog/Mixpanel, heatmaps, event tracking, conversion funnels. Without this, we launch blind.
