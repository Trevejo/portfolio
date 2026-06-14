# Trevejo — Portfolio

Astro 5 + SCSS portfolio scaffold.

## Stack
- Astro 5 (TypeScript strict)
- Sass (modern compiler API)
- animejs v3
- @fontsource/karla + @fontsource/roboto-mono

## Scripts
```bash
bun install
bun run dev      # http://localhost:4321
bun run build    # ./dist
bun run preview
bun run check    # astro check (tsc)
```

## Structure
- `src/pages/` — routes
- `src/layouts/` — BaseLayout + Desktop/Mobile split
- `src/components/` — Astro components
- `src/styles/` — tokens, themes, typo, reset, mixins
- `src/scripts/` — client `<script>` islands (animejs etc)
- `src/data/` — static JSON
- `src/content/` — content collections (blog)
