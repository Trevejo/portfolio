# Trevejo — Portfolio

Personal portfolio built with Astro 5, TypeScript, SCSS, and animejs.

## Stack

- [Astro 5](https://astro.build) — static site + view transitions
- TypeScript (strict)
- SCSS (Sass modern compiler)
- animejs v3 — keyframe animations
- @fontsource/karla + @fontsource/roboto-mono — self-hosted fonts
- Astro Content Collections — blog
- Astro built-in Shiki — syntax highlighting (dual theme)

## Quick start

```bash
bun install
bun run dev      # http://localhost:4321
bun run build
bun run preview
bun run check    # tsc + astro check
```

## Structure

```
src/
├── components/   # Astro components (ButtonCube, WorkModal, etc.)
├── content/      # Content collections (blog/*.md)
├── content.config.ts
├── constants/    # ROUTES, durations, modal config
├── data/         # Static JSON (work projects, socials, tool icons)
├── layouts/      # BaseLayout + Desktop/Mobile split
├── lib/          # Helpers (year ranges, etc.)
├── pages/        # Routes (index, work, blog, about, 404)
├── scripts/      # Client <script> islands
├── styles/       # SCSS tokens, typo, reset, mixins, global
└── types/        # Type declarations
```

## Customization

- **Content**: edit `src/data/work.json` (projects) and `src/data/socials.json` (footer links).
- **Blog**: add Markdown files to `src/content/blog/` with frontmatter (title, date, description, draft).
- **About**: edit `src/pages/about.astro` — search for `<!-- TODO: replace -->`.
- **Theme colors**: edit CSS custom properties in `src/styles/global.scss` (`:root[data-theme="light"]` / `:root[data-theme="dark"]`).
- **Profile info**: search for "Murilo Trevejo" in `src/pages/index.astro`, `about.astro`, etc.
- **Routes / nav order**: edit `src/constants/routes.ts` (`ROUTES`).

## Deployment

Site is configured with `base: "/portfolio"` for GitHub Pages at `trevejo.github.io/portfolio`.

```bash
bun run build
# push dist/ to gh-pages branch, or set up GitHub Actions
```

For Vercel/Netlify: remove `base` from `astro.config.mjs` and the `import.meta.env.BASE_URL` paths will resolve to root.

## Accessibility

- Skip-to-content link visible on focus
- Focus visible outlines on all interactive elements
- `prefers-reduced-motion` respected across animations
- Modal: focus trap, ESC to close, focus restoration
- Single `<main id="main-content">` per page (auto-focused on view-transition navigation)

## View transitions

`<ClientRouter />` is mounted in `BaseLayout.astro`. Cross-page navigations cross-fade at 200ms. Per-page scripts hook into the `astro:page-load` lifecycle event to re-bind DOM listeners on the new page.
