# @stellarkit/core

The infrastructure layer for StellarKit marketing sites. Provides an Astro Integration, base layout components, SEO utilities, form handling, and analytics injection — so individual site repos never have to re-implement these concerns.

---

## What It Provides

| Export | Type | Purpose |
| :--- | :--- | :--- |
| `stellarKitCore()` | Astro Integration | Registers the integration, validates `PUBLIC_GTM_ID`, injects GTM script into every page `<head>` |
| `BaseLayout.astro` | Layout component | Full HTML shell (`<!DOCTYPE html>`, `<head>`, `<body>`) with `<SEO />` wired in and named slots |
| `SEO.astro` | Component | Renders `<meta>`, Open Graph, and Twitter card tags from props |
| `FormWrapper.astro` | Component | `<form>` that POSTs JSON to a `webhookUrl` prop; exposes success/error state via client script |
| `defineSeo()` | TS utility | Validates and returns a typed `SeoProps` object; guards required fields at build time |
| `submitForm()` | TS utility | Async function that POSTs JSON to a URL and returns `{ ok, error }` |

---

## Requirements

- Node ≥ 18.17.1
- Astro ^5.0.0 (peer dependency)

---

## Installation

### From npm (published releases)

```bash
npm install @stellarkit/core
```

### Local development (file path)

In `stellarkit-site/package.json`:

```json
"dependencies": {
  "@stellarkit/core": "file:../stellarkit-core"
}
```

Then run `npm install` in `stellarkit-site`.

---

## Integration Setup

In `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import stellarKitCore from '@stellarkit/core';

export default defineConfig({
  integrations: [stellarKitCore()],
});
```

---

## Component Usage

### BaseLayout

```astro
---
import BaseLayout from '@stellarkit/core/components/BaseLayout.astro';
import { defineSeo } from '@stellarkit/core/utils/seo';

const seo = defineSeo({
  title: 'My Site',
  description: 'Product validation site.',
  canonical: 'https://example.com',
});
---

<BaseLayout seo={seo}>
  <slot name="head" slot="head" />
  <!-- page content -->
</BaseLayout>
```

### SEO (standalone)

```astro
---
import SEO from '@stellarkit/core/components/SEO.astro';
---
<SEO title="Page Title" description="..." canonical="https://..." />
```

### FormWrapper

```astro
---
import FormWrapper from '@stellarkit/core/components/FormWrapper.astro';
---
<FormWrapper webhookUrl={import.meta.env.FORM_WEBHOOK_URL}>
  <input name="email" type="email" required />
  <button type="submit">Subscribe</button>
</FormWrapper>
```

---

## Utility Usage

### defineSeo()

```ts
import { defineSeo } from '@stellarkit/core/utils/seo';

const seo = defineSeo({
  title: 'Page Title',        // required
  description: 'Short desc.', // required
  canonical: 'https://...',   // required
  og: {
    image: 'https://.../og.png',
    type: 'website',
  },
});
```

### submitForm()

```ts
import { submitForm } from '@stellarkit/core/utils/forms';

const result = await submitForm('https://hooks.example.com/...', {
  email: 'user@example.com',
});

if (!result.ok) console.error(result.error);
```

---

## Environment Variables

| Variable | Required | Description |
| :--- | :--- | :--- |
| `PUBLIC_GTM_ID` | Recommended | Google Tag Manager container ID (e.g. `GTM-XXXX`). Core warns at build time if missing. |

Set in `stellarkit-site/.env`:

```env
PUBLIC_GTM_ID=GTM-XXXX
```

---

## Versioning

Follows semantic versioning:

- **MAJOR** — breaking changes to `BaseLayout` props, `SEO` schema, or integration API
- **MINOR** — new non-breaking utilities or components
- **PATCH** — bug fixes

Sites should pin or range versions and upgrade intentionally.

---

## Contributing / Local Build

```bash
cd stellarkit-core
npm install
npm run build        # emits dist/index.js + dist/index.d.ts via tsup
```

To test changes against a local site, the `file:` path dependency in `stellarkit-site` will automatically pick up the latest build after `npm install` is re-run in `stellarkit-site`.
