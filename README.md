# Exclusive E-Commerce

A multi-language (English + Arabic) e-commerce mini site built with Next.js App Router and TypeScript.

## Live Demo

- [Open the live demo](https://exclusive-olive.vercel.app/)
- [English](https://exclusive-olive.vercel.app/en) | [Arabic](https://exclusive-olive.vercel.app/ar)

## Overview

The goal was to build a complete frontend experience close to the provided design, with an organized and maintainable codebase.

**Features**

- English and Arabic with full RTL/LTR support
- Home, category (with sorting), and product details pages
- Cart, wishlist, and a validated checkout flow
- Login, signup, and account pages
- About and contact pages, plus a localized 404 page
- Localized SEO: metadata, Open Graph/Twitter, hreflang, JSON-LD, sitemap, robots.txt
- Cart, wishlist, and session persistence with Zustand

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS (RTL via logical properties)
- next-intl
- Zustand
- React Hook Form + Zod
- FakeStoreAPI

## Build Approach

I planned the build order before writing pages, so each piece is built once and reused instead of being patched later:

1. **i18n first:** English/Arabic routing and translation files, so every component was written with translated strings and RTL/LTR in mind.
2. **State before UI:** the cart and wishlist stores were built before `ProductCard`, so the card had working wishlist and add-to-cart actions from its first version.
3. **Components from small to large:** `ui/` controls, then shared sections, then domain components (home, products, checkout).
4. **Pages by user journey:** starting from the Hero section, every link defined the next page to build, following a customer from Home to login, category, product, cart, checkout, and order confirmation. At each step I asked: *where does the user go next, and what do they need to see or confirm?*

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # localized routes (about, account, cart, category/[slug], checkout, contact, login, product/[id], signup, wishlist)
│   ├── robots.ts          # robots.txt
│   ├── sitemap.ts         # localized sitemap
│   └── not-found.tsx
├── components/
│   ├── ui/                # reusable controls: Button, Input, Rating, SliderArrows
│   ├── shared/            # shared sections (e.g. service features)
│   ├── layout/            # header, footer, language switcher
│   ├── home/              # home page sections
│   ├── products/          # product card, grid, details/
│   └── checkout/          # checkout steps and summary
├── hooks/                 # custom hooks (UI logic separated from markup)
├── store/                 # Zustand stores: cart, wishlist, auth
├── services/              # FakeStoreAPI requests and mapping
├── lib/
│   ├── schemas/           # Zod validation schemas
│   └── seo/               # metadata and JSON-LD helpers
├── i18n/                  # next-intl routing and request config
├── messages/              # en.json / ar.json
└── types/                 # shared TypeScript type
```

## Architecture and Implementation Decisions

### 1. Localization and layout

The route tree is locale-based under `src/app/[locale]`. `src/i18n/routing.ts` defines the supported locales and localized navigation, `src/i18n/request.ts` loads the messages, and `src/messages/en.json` and `ar.json` hold the UI strings. The locale layout sets `lang` and `dir` (RTL for Arabic, LTR for English). `src/middleware.ts` handles locale detection and redirects; its matcher excludes framework internals and static files while letting unprefixed routes be redirected to a locale.

The surrounding UI is localized. FakeStoreAPI product titles, descriptions, and category names use local Arabic translations when available; untranslated product data falls back to English.

### 2. State management

Cart, wishlist, and demo authentication use separate Zustand stores: `useCartStore.ts`, `useWishlistStore.ts`, and `useAuthStore.ts`. Zustand fits these small client-side state domains without Redux's action/reducer setup. The tradeoff is that stores are browser-local and do not sync across users or devices.

Stores persist to `localStorage`, so a refresh does not clear the cart or wishlist. Persisted values are unavailable during server rendering, so UI that depends on them waits for mounting before showing user-specific counts or state, avoiding hydration mismatches.

### 3. Component organization

UI is grouped by responsibility:

- `components/ui`: reusable controls (`Button`, `Input`, `Rating`, `SliderArrows`)
- `components/shared`: shared page sections
- `components/home`, `components/products`, `components/checkout`: domain-specific components
- `app/[locale]`: route pages and layouts that compose the components above

This keeps reusable controls separate from product and page behavior without adding abstraction layers the project doesn't need.

### 4. Data, server rendering, and client interaction

`src/services/productService.ts` centralizes FakeStoreAPI requests and product mapping. Product requests run on the server, are cached for one hour, and retry once after a failure. If FakeStoreAPI is still unavailable, `src/data/products.snapshot.json` supplies the product and category data so the storefront does not render empty.

The home route and data request are Server Components. Interactive sections remain Client Components where their sliders and product actions require browser behavior. This avoids a single client wrapper for the home page, but the effect on deployed Lighthouse scores must be measured rather than assumed.

### 5. Forms, validation, and SEO

React Hook Form handles form state, while Zod schemas in `src/lib/schemas` define validation rules, keeping validation separate from presentation. Validation messages are localized. Since there is no application backend, a production system would still need server-side validation.

SEO helpers in `src/lib/seo` are used with the Next.js Metadata API. `sitemap.ts` and `robots.ts` define crawl behavior, and product/category routes use JSON-LD helpers from `src/lib/seo/structuredData.ts`.

### 6. Loading, errors, and not found

- `src/app/[locale]/error.tsx`: localized route error boundary with a retry action.
- `src/app/[locale]/loading.tsx`: general localized loading fallback. Product and checkout routes have their own page-specific `loading.tsx` skeletons.
- `ProductDetailsSkeleton` and `ProductDetailsError` (in `components/products/details`) handle product loading and failed requests.
- Home, category, product-detail, wishlist recommendations, and sitemap product data are fetched by Server Components or server utilities. The home page keeps `HomeErrorState` for unexpected failures after snapshot recovery; category retry refreshes the route.
- The home page renders `<HeroSection />` followed directly by `<HomeProductSections />`; it does not wrap its product sections in `Suspense` or show a home-page loading skeleton.
- Product and category routes are pre-rendered from the snapshot product IDs and supported categories, then revalidated hourly. The sitemap is also revalidated hourly.
- `src/app/not-found.tsx`: localized 404 page with a link back to the current locale.

### 7. Responsive behavior and images

Tailwind breakpoints adapt grids and sections to the viewport. Home sliders use native horizontal scrolling with snap points and arrow controls.

The hero image in `HeroSection.tsx` uses `next/image` with priority loading and responsive `sizes`. `next.config.ts` enables AVIF/WebP output and caching. Only first-view assets get high priority so later images don't compete with the hero.

### Refactors after review

- Product and category requests use a shared server-only fetch helper with a five-second timeout, one retry, one-hour revalidation, and a bundled API snapshot as the outage fallback.
- Category pages, product details, and wishlist recommendations receive product data from the server instead of calling FakeStoreAPI from the browser.
- Inline locale checks (`locale === "ar"`) for loading and retry text were replaced with `next-intl` messages.
- The middleware matcher was widened so unprefixed routes are handled by next-intl.

### Tradeoffs

- Zustand + `localStorage` avoids a backend for demo state, but persisted data is limited to the current browser.
- FakeStoreAPI data is English-only, so product titles and descriptions are translated through a local overlay (`src/i18n/productTranslations.ts`) keyed by product id, while category names use `src/lib/seo/categoryTranslations.ts`. Products or fields without a local translation fall back to their English data. FakeStoreAPI availability is outside the app's control. Requests run on the server with one retry and one-hour caching; if the API remains unavailable, `src/data/products.snapshot.json` keeps the demo catalog available but can become stale. A production store would use a first-party API and database.
- Server-fetching products reduces browser-side API requests and renders product sections with the page. Lighthouse should be rerun against the deployed version to measure the actual impact.

## SEO

- [x] Localized page titles and descriptions using the Next.js Metadata API
- [x] Canonical URLs and English/Arabic language alternates for indexable routes
- [x] Open Graph and Twitter metadata
- [x] Product JSON-LD with an Offer, plus BreadcrumbList structured data
- [x] Localized sitemap entries for public pages, categories, and products
- [x] `robots.txt` with the sitemap URL
- [x] `<html lang>` and `dir` set per locale



- [x] Run Lighthouse SEO audits against the current deployed build.




Cart, login, account, and wishlist pages are marked `noindex` and intentionally omitted from the sitemap.

## Note on Commit History

I overlooked the "clear commit history" requirement early on, so the early history contains larger commits than it should. From this point forward the repository uses small, focused commits following Conventional Commits (`feat:`, `fix:`, `docs:`, ...). I preferred to be transparent about this rather than rewrite history.

## Lighthouse Evidence

These are Google PageSpeed Insights lab reports for the deployed storefront, captured on 2026-11-21 and 2026-11-22. The Arabic mobile scores are medians from three runs; the other rows are single-run results and are not directly comparable as repeated samples. Each evidence link opens the original report, and the JSON files contain the captured scores and lab metrics. Arabic mobile SEO remained 100 across all three runs. CLS was 0 on mobile, but the earlier desktop result was 0.325, so desktop layout stability still needs a fresh measurement.

| Locale | Device | Performance | Accessibility | Best Practices | SEO | Evidence |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| English | Desktop | 84 | 96 | 100 | 100 | [PageSpeed report](https://pagespeed.web.dev/analysis/https-exclusive-olive-vercel-app-en/cexkch7jd2?form_factor=desktop) · [JSON](docs/lighthouse/pagespeed-en-desktop.json) |
| English | Mobile | 99 | 96 | 100 | 100 | [PageSpeed report](https://pagespeed.web.dev/analysis/https-exclusive-olive-vercel-app-en/5au1vj34ct?form_factor=mobile) · [JSON](docs/lighthouse/pagespeed-en-mobile.json) · [Screenshot](docs/lighthouse/en-mobile.png) |
| Arabic | Desktop | 84 | 100 | 100 | 100 | [PageSpeed report](https://pagespeed.web.dev/analysis/https-exclusive-olive-vercel-app-ar/tm0vp6fupe?form_factor=desktop) · [JSON](docs/lighthouse/pagespeed-ar-desktop.json) |
| Arabic | Mobile | 99 (99–99) | 100 (100–100) | 100 (100–100) | 100 (100–100) | [Run 1](https://pagespeed.web.dev/analysis/https-exclusive-olive-vercel-app-ar/d0xvo5ww6n?form_factor=mobile) · [Run 2](https://pagespeed.web.dev/analysis/https-exclusive-olive-vercel-app-ar/fjlw48qt1v?form_factor=mobile) · [Run 3](https://pagespeed.web.dev/analysis/https-exclusive-olive-vercel-app-ar/iy5o9djupj?form_factor=mobile) · [JSON](docs/lighthouse/pagespeed-ar-mobile.json) |

## How to Run

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

- English: http://localhost:3000/en
- Arabic: http://localhost:3000/ar

Checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Demo Limitations

This is a frontend demonstration, not a production e-commerce backend.

- <!-- VERIFY: if login calls FakeStoreAPI POST /auth/login, say so: "Login uses FakeStoreAPI /auth/login and stores the returned token; signup is UI-only because the API does not persist users." -->
- Account changes are stored in browser state
- Checkout does not process real payments
- Contact form submissions are not delivered by email
- Products come from FakeStoreAPI
