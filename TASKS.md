# stellarkit-core — Implementation Tasks

## Phase 1: Package Scaffold ✅ COMPLETED

**Deliverables:**
- `@stellar-kit/core@0.1.0` — Astro Integration with GTM injection
- Components: `SEO.astro`, `BaseLayout.astro`, `FormWrapper.astro`
- Utilities: `defineSeo()`, `submitForm()`
- Build: `pnpm build` produces `dist/index.js` and `dist/index.d.ts`
- Types: `npx tsc --noEmit` passes with zero errors

---

## Phase 2: Reference Site Implementation ✅ MOSTLY COMPLETE

**See:** [stellarkit-site TASKS.md](../stellarkit-site/TASKS.md)

**Status:** All scaffolding, components, and integrations complete. Pending Lighthouse verification.

---

## Phase 3: CI/CD Automation & Publishing ✅ MOSTLY COMPLETE

### 3.1 GitHub Actions: Core Package Validation ✅

- [x] Create `.github/workflows/test.yml`
  - Runs on push to main and PRs
  - Tests on Node 18 and 20
  - Validates: lint, types, and build
  - Invalid builds fail and block merge

### 3.2 Versioning with Changesets ✅

- [x] Install `changesets` as dev dependency: `pnpm add -D @changesets/cli`
- [x] Initialize changesets: `pnpm changeset init`
- [x] Update `.changeset/config.json` with `"access": "public"`
- [x] Document changeset workflow in PHASE_3_SETUP.md

### 3.3 GitHub Actions: Changesets Workflow ✅

- [x] Create `.github/workflows/changesets.yml`
  - On PR: Checks for changeset files
  - On merge to main: Automatically creates version bump PR
  - Validates versioning strategy

### 3.4 NPM Publishing ✅

- [x] Create `.github/workflows/publish.yml`
  - Triggered by changeset version bumps
  - Builds and publishes to npm
  - Requires NPM_TOKEN secret (manual setup)
- [x] Add `publish-packages` script to package.json

### 3.5 Access Control ⏳ MANUAL SETUP REQUIRED

- [ ] Configure NPM_TOKEN in GitHub Actions secrets
  - See: PHASE_3_SETUP.md for detailed instructions
- [ ] Verify only main branch can trigger publish workflow

---

## Phase 4: Documentation & Developer Experience ⏳ NOT STARTED

### 4.1 Developer Onboarding

- [ ] Create `CONTRIBUTING.md` — How to contribute to @stellar-kit/core
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
