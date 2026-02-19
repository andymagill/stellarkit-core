# stellarkit-core — Implementation Tasks

## Phase 1: Package Scaffold

**Build this first** — The core package must be published before the site can properly install it.

### 1.1 Initialize package.json
  - `name`: `@stellarkit/core`
  - `version`: `0.1.0`
  - `type`: `module`
  - `peerDependencies`: `{ "astro": "^5.0.0" }`
  - `exports` map: `"."` → `./dist/index.js`, `"./components/*"` → `./src/components/*`, `"./utils/*"` → `./src/utils/*`
  - `scripts`: `build` via `tsup`, `dev` watch mode
- [ ] Add `tsconfig.json`
  - `target`: `ESNext`
  - `moduleResolution`: `bundler`
  - `strict`: `true`
- [ ] Add `tsup.config.ts`
  - Entry: `src/index.ts`
  - Format: `["esm"]`
  - `dts: true`
  - `clean: true`
- [ ] Install dev dependencies: `astro`, `tsup`, `typescript`

---

### 1.2 Integration Entry Point

- [ ] Create `src/index.ts` — Astro Integration
  - Export default `stellarKitCore()` function returning an `AstroIntegration`
  - Hook: `astro:config:setup`
  - Warn at build time if `PUBLIC_GTM_ID` is not set
  - Inject GTM `<script>` into every page `<head>` via `injectScript` or head injection API

---

### 1.3 Components

- [ ] Create `src/components/SEO.astro`
  - Props: `title` (required), `description` (required), `canonical` (required), `og.image`, `og.type`
  - Outputs: `<title>`, `<meta name="description">`, Open Graph tags, Twitter card tags
- [ ] Create `src/layouts/BaseLayout.astro`
  - Full HTML shell: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`
  - Renders `<SEO />` in `<head>` using passed `seo` prop
  - Named slot: `head` (for additional head content)
  - Default slot: page body content
  - No styles injected — sites own all CSS
- [ ] Create `src/components/FormWrapper.astro`
  - Props: `webhookUrl` (string, required)
  - Renders a `<form>` with a `<slot />` for fields
  - Client `<script>`: intercepts submit, POSTs JSON to `webhookUrl` via `submitForm()`
  - Exposes success/error state (e.g., via data attributes or event dispatch)

---

### 1.4 Utilities

- [ ] Create `src/utils/seo.ts`
  - Export `SeoProps` TypeScript interface (title, description, canonical, og?)
  - Export `defineSeo(props: SeoProps): SeoProps` — validates required fields, returns typed object
- [ ] Create `src/utils/forms.ts`
  - Export `submitForm(url: string, data: Record<string, unknown>): Promise<{ ok: boolean; error?: string }>`
  - POSTs JSON, handles network errors, returns typed result

---

### 1.5 Verification

- [ ] Run `npm run build` — emits `dist/index.js` and `dist/index.d.ts` with zero errors
- [ ] Run `npx tsc --noEmit` — no type errors
