# stellarkit-core — Implementation Tasks

## Phase 1: Package Scaffold ✅ COMPLETED

**Deliverables:**
- `@stellarkit/core@0.1.0` — Astro Integration with GTM injection
- Components: `SEO.astro`, `BaseLayout.astro`, `FormWrapper.astro`
- Utilities: `defineSeo()`, `submitForm()`
- Build: `pnpm build` produces `dist/index.js` and `dist/index.d.ts`
- Types: `npx tsc --noEmit` passes with zero errors

---

## Phase 2: Reference Site Implementation ✅ MOSTLY COMPLETE

**See:** [stellarkit-site TASKS.md](../stellarkit-site/TASKS.md)

**Status:** All scaffolding, components, and integrations complete. Pending Lighthouse verification.

---

## Phase 3: CI/CD Automation & Publishing ⏳ NOT STARTED

### 3.1 GitHub Actions: Core Package Validation

- [ ] Create `.github/workflows/test-and-publish.yml`
  - On push to main: Run `pnpm install`, `pnpm lint`, `pnpm build`
  - Invalid builds fail and block merge
  - On PR: Lint and build checks only (no publish)

### 3.2 Versioning with Changesets

- [ ] Install `changesets` as dev dependency: `pnpm add -D @changesets/cli`
- [ ] Initialize changesets: `pnpm changeset init`
- [ ] Create `.github/workflows/changesets.yml`
  - On PR: Automatically comment with version bump recommendations
  - On merge: Automatically create version bump PR based on changesets

### 3.3 NPM Publishing

- [ ] Create `.github/workflows/publish.yml`
  - Triggered by changeset version bumps
  - Builds and publishes to npm
  - Creates GitHub release
  - Can run locally: `pnpm changeset publish`

### 3.4 Access Control

- [ ] Configure npm token in GitHub Actions secrets
- [ ] Verify only main branch can trigger publish workflow

---

## Phase 4: Documentation & Developer Experience ⏳ NOT STARTED

### 4.1 Developer Onboarding

- [ ] Create `CONTRIBUTING.md` — How to contribute to @stellarkit/core
  - Setup instructions
  - Branch naming conventions
  - Pull request process
  - Code style guidelines

### 4.2 API Documentation

- [ ] Document `defineSeo()` — Parameters, return types, examples
- [ ] Document `submitForm()` — Parameters, webhook format, error handling
- [ ] Document `BaseLayout.astro` — Props interface, slots, usage
- [ ] Document `SEO.astro` — Props interface, OpenGraph/Twitter card format
- [ ] Document `FormWrapper.astro` — Props interface, form validation

### 4.3 Migration Guide

- [ ] Create `MIGRATION.md` — Guide for upgrading between core versions
  - Breaking changes by version
  - Migration steps for each major version
  - Deprecation warnings and timeline

### 4.4 Examples

- [ ] Add `/examples` folder with sample site implementations
  - Minimal marketing site
  - Multi-page documentation site
  - Custom form integration examples

### 4.5 Maintenance Plan

- [ ] Define security update policy
- [ ] Define support window (e.g., maintain last 2 minor versions)
- [ ] Create issue templates (bug report, feature request)

## Phase 2: Site Implementation (stellarkit-site)
