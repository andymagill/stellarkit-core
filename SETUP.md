# stellarkit-core — npm Package Setup

## Overview

This guide walks you through publishing **your own fork of `@stellarkit/core`** to npm under your organization. You'll set up:

1. Your npm organization (e.g., `@your-org`, in this example `@stellarkit`)
2. OIDC trusted publishing for secure, token-free deployments via GitHub Actions
3. Automated versioning and publishing via Changesets
4. Your first release and future updates

**Note:** This is a forked version of `@stellarkit/core`. If you're installing the official package, use `pnpm add @stellarkit/core` from the public npm registry instead.

## Prerequisites

- npm account (free tier)
- npm organization matching the package scope (`stellarkit` for `@stellarkit/core`)
- GitHub repository with push access
- Local: Node.js, pnpm, and git

---

## Step 1: Create npm Account and Organization

### Create an npm Account

1. Visit https://www.npmjs.com/signup
2. Create account and verify email
3. Note your npm username

### Create an npm Organization

1. Go to https://www.npmjs.com/org/create
2. Organization name: `stellarkit` (must match the scope in `@stellarkit/core`)
3. Choose "Free" tier
4. Add yourself as owner and verify ownership

---

## Step 2: Bootstrap the Package with `setup-npm-trusted-publish`

npm requires a package to exist on the registry before you can configure OIDC trusted publishing. `setup-npm-trusted-publish` generates and publishes a clearly-labeled placeholder package that reserves your namespace and enables OIDC configuration.

### Why This Step?

Unlike PyPI, npm doesn't allow OIDC configuration for packages that don't yet exist. This tool solves that by:
- Creating a minimal placeholder package
- Publishing it with a clear README stating it's for OIDC setup only
- Providing a direct link to configure OIDC on npm

### Run the Tool

```bash
# Make sure you're logged into npm locally
npm login

# Bootstrap the package
npx setup-npm-trusted-publish @stellarkit/core
```

The tool will:
1. Create and publish a placeholder package
2. Output a direct URL to configure OIDC:
   ```
   🔗 View your package at:
   https://www.npmjs.com/package/@stellarkit/core

   Next steps:
   1. Go to https://www.npmjs.com/package/@stellarkit/core/access
   2. Configure OIDC trusted publishing
   3. Set up your CI/CD workflow to publish with OIDC
   ```

Keep this URL — you'll use it in Step 3.

---

## Step 3: Configure OIDC Trusted Publishing

GitHub Actions will sign OIDC tokens for your repository. npm needs to trust those tokens. This step creates that trust relationship.

### Create OIDC Provider Configuration

1. Visit the URL from Step 2: `https://www.npmjs.com/package/@stellarkit/core/access`
2. Click **Publishing** tab
3. Under **"Trusted Publishing"**, click **"Add a provider configuration"**
4. Select provider: **GitHub Actions**
5. Configure the subject condition:
   - `repo:andymagill/stellarkit-core:ref:refs/heads/main`
   - This limits publishing to your `main` branch only
6. Click **Create**

**Alternative subject conditions** (if publishing from multiple branches):
- `repo:andymagill/stellarkit-core:*` — Allow publishing from any branch
- `repo:andymagill/stellarkit-core:environment:release` — Require an environment named "release"

### Verify Workflow Configuration

Your GitHub Actions workflows are pre-configured with OIDC support:

- **`publish.yml`** has `permissions: { id-token: write }` — generates OIDC tokens
- **`setup-node@v4`** with `registry-url: https://registry.npmjs.org/` — activates npm OIDC
- **No `NPM_TOKEN` secret is stored** — GitHub Actions uses OIDC automatically

---

## Step 4: Publish the First Release

The placeholder from Step 2 reserves the namespace. Now publish the real `@stellarkit/core@0.1.0` to replace it.

### Option A: Create a Changeset and Trigger CI (Recommended for Future Releases)

```bash
cd stellarkit-core

# Generate a changeset describing the initial release
pnpm changeset

# Follow prompts:
# - Select affected packages: @stellarkit/core
# - Select bump type: major (or patch if starting below v1.0.0)
# - Write summary: "Initial release with BaseLayout, SEO, and form utilities"

# Commit and push
git add .changeset
git commit -m "chore(changeset): initial release of @stellarkit/core"
git push origin main
```

The `changesets.yml` workflow will:
1. Detect the changeset file
2. Create a version bump PR automatically
3. After merging, trigger `publish.yml` to publish via OIDC

### Option B: Manual Bootstrap (One-Time)

If you prefer to bootstrap locally (before setting up changesets):

```bash
cd stellarkit-core
npm login  # or ensure you're logged in
npm whoami  # verify authentication
npm publish --access public
```

After this first publish, **always use changesets** for future releases (Option A).

---

## Ongoing Release Workflow

Once configured, releases are fully automated:

```
1. Developer creates PR with code changes
   ↓
2. PR merged to main → test.yml runs (lint, types, build)
   ↓
3. Developer creates changeset: pnpm changeset
   ↓
4. Commit .changeset/*.md file
   ↓
5. changesets.yml detects changeset → creates version bump PR
   ↓
6. Merge version bump PR
   ↓
7. publish.yml runs:
   - Generates OIDC token from GitHub Actions
   - Authenticates with npm using OIDC
   - Publishes new version
   ↓
8. npm registry updated; CI complete
```

**Key benefits:**
- No `NPM_TOKEN` stored anywhere
- Each publish request independently authenticated
- Version bumping (major/minor/patch) automated
- Audit trail in GitHub and npm

---

## Troubleshooting

### "401 Unauthorized" During Publishing

**Causes and fixes:**

| Issue | Fix |
|-------|-----|
| OIDC provider not configured | Verify npm org settings → Publishing → Trusted Publishing has GitHub listed |
| Subject condition mismatch | Check condition matches your repo/branch: `repo:andymagill/stellarkit-core:ref:refs/heads/main` |
| Workflow missing token permission | Ensure `publish.yml` has `permissions: { id-token: write }` |
| Package doesn't exist yet | Run `setup-npm-trusted-publish @stellarkit/core` first |

### "Package Not Found" or Namespace Error

- Verify npm organization exists: https://www.npmjs.com/org/stellarkit
- Verify organization matches package scope: `@stellarkit/core` → org name is `stellarkit`
- Run `npm whoami` locally to confirm authentication

### Workflow Debugging

Check GitHub Actions logs:
1. Go to https://github.com/andymagill/stellarkit-core/actions
2. Click the failed workflow run
3. Expand **"Publish to npm"** or **"changesets"** step
4. Look for OIDC token generation details

**Verify locally (optional):**
```bash
# Dry run: create but don't publish
npm publish --access public --dry-run

# Check npm tokens and OIDC configs
npm token list
```

---

## Useful Resources

- **[setup-npm-trusted-publish](https://github.com/azu/setup-npm-trusted-publish)** — Bootstrap tool for OIDC setup
- **[npm OIDC Documentation](https://docs.npmjs.com/creating-and-viewing-access-tokens#oidc-provider)** — npm's guide to trusted publishing
- **[GitHub OIDC Token Docs](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)** — GitHub Actions OIDC details
- **[Changesets Documentation](https://github.com/changesets/changesets)** — Version management and changelogs
- **[npm Semantic Versioning](https://docs.npmjs.com/about/semantic-versioning)** — Major/minor/patch guidelines

---

## Summary

| Step | What | Why |
|------|------|-----|
| 1 | Create npm org | Reserve namespace and manage access |
| 2 | Bootstrap with `setup-npm-trusted-publish` | Reserve package name and enable OIDC config |
| 3 | Configure OIDC provider in npm | Trust GitHub Actions to sign publish requests |
| 4 | Publish first release (manual or changeset) | Get package on registry |
| 5+ | Use changesets for all future releases | Automated versioning and publishing via CI |

After Step 3, no npm tokens are needed in GitHub. OIDC handles authentication automatically.
