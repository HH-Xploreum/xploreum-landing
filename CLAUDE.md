# Xploreum Landing

Next.js 15 + Tailwind v4 landing page. Deployed to Vercel → https://project-v4c46.vercel.app

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
- `public/logo.svg` — Brand mark (32x32 icon rendered next to "XPLOREUM" wordmark)

## Theme tokens

Defined in `src/app/globals.css` under `@theme`:
- `bone`, `bone-soft`, `bone-deep` — warm off-white palette
- `forest`, `forest-soft`, `forest-deep` — primary dark green
- `moss`, `line` — accents
- `--font-sans` — Urbanist (loaded via `next/font/google` in `layout.tsx`)
