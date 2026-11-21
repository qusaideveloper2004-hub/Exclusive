# Exclusive E-Commerce

## Live Demo

- [Open the live demo](https://exclusive-olive.vercel.app/)

- [English](https://exclusive-olive.vercel.app/en) | [Arabic](https://exclusive-olive.vercel.app/ar)

This project is a multi-language e-commerce mini website built with Next.js and TypeScript. It includes Arabic and English support, responsive design, product pages, cart, wishlist, checkout, account management, and local demo interactions.

The goal was to build a complete frontend experience close to the provided design, while keeping the code organized and maintainable.

## Project overview

This app is based on a modern Next.js App Router structure.

Main features:
- English and Arabic version in the same project
- RTL and LTR support
- product listing and category pages
- product details page
- shopping cart
- wishlist
- checkout flow with validation
- login and signup screens
- account page
- about and contact pages
- SEO and metadata setup
- local state persistence using Zustand

## Main pages

The project includes these main screens:
- Home
- About
- Contact
- Login
- Signup
- Account
- Cart
- Wishlist
- Category page
- Product details
- Checkout
- Not found page

## Stack used

- Next.js 15
- TypeScript
- React
- next-intl
- Zustand
- React Hook Form
- Zod
- FakeStoreAPI
- Tailwind CSS

## Project organization

The code was divided into clear folders so the project stays easy to read and maintain.

- src/app
  - main app routes
  - localized pages under src/app/[locale]
- src/components
  - reusable UI components
  - product-related sections
  - checkout, layout, home, shared UI sections
- src/hooks
  - custom logic hooks for product state and behavior
- src/store
  - cart store
  - wishlist store
  - auth store
- src/services
  - API calls to FakeStoreAPI
- src/lib
  - validation schemas
  - SEO helpers
- src/messages
  - Arabic and English translation content
- public/images
  - local images and design assets

## How I structured the code

I separated the project into page-level logic and reusable component-level UI.

For example:
- page file handles data and route-level setup
- client component handles the page interaction
- product sections were split into smaller parts like gallery, info, options, actions, delivery info, related products

This makes the code easier to understand and reduces the complexity of one big page.

The same idea was used for other large screens, especially checkout and account pages.

## Data flow

The app uses FakeStoreAPI for products and login demo data.

- Product data is requested from the service layer
- Pages load data and pass it to client components
- Zustand keeps cart, wishlist, and auth state in browser storage
- Forms validate user input with React Hook Form + Zod

## State management

I used Zustand for local data persistence.

Features handled by stores:
- cart items
- additions and removals from cart
- quantity updates
- wishlist items
- login/auth demo session
- coupon logic for checkout

This keeps the app lightweight without needing a backend.

## Localization

The app supports Arabic and English using next-intl.

Important points:
- route structure is locale-based
- translation messages are stored in src/messages
- layout and page directions are adjusted depending on locale
- Arabic pages use RTL direction

## Validation and forms

The checkout and account flows use validation rules.

Examples:
- required fields
- email validation
- phone validation
- password confirmation checks
- coupon validation for demo checkout

This makes the forms more stable and reduces invalid input.

## SEO and metadata

The project includes SEO setup such as:
- page metadata
- Open Graph tags
- Twitter metadata
- sitemap
- robots.txt
- JSON-LD for product and breadcrumb data

This was done to make the project closer to production-ready frontend work.

### SEO checklist

- [x] Localized page titles and descriptions using the Next.js Metadata API
- [x] Canonical URLs and English/Arabic language alternates for indexable localized routes
- [x] Open Graph and Twitter metadata
- [x] Product JSON-LD with an Offer, plus BreadcrumbList structured data
- [x] Localized sitemap entries for public pages, categories, and products
- [x] `robots.txt` with the sitemap URL
- [x] Lighthouse SEO score of 92 for the English/Arabic desktop and mobile screenshots

Cart, login, account, and wishlist pages are marked `noindex`; they are intentionally omitted from the public sitemap.

## Architecture decisions

### Next.js App Router

The App Router was used instead of the Pages Router because route groups and nested layouts fit the localized pages, shared navigation, and route-level metadata. Server components handle page and metadata setup, while client components are used only for interactive state such as sliders, forms, stores, and user actions.

This keeps the initial HTML useful for search engines and avoids sending the whole page through the client boundary.

### Zustand instead of Redux

Zustand was chosen for cart, wishlist, and demo authentication state because the application has small, separate stores and does not need Redux actions, reducers, middleware, or a large provider setup.

Each store has a focused responsibility:

- cart store manages items, quantities, totals, and checkout coupon state
- wishlist store manages favorite products
- auth store manages the demo login session and account updates

Zustand is sufficient here because state changes are local and predictable. Redux would add more setup for a benefit the project does not currently need.

### Persistence and hydration

Zustand persist middleware stores cart, wishlist, and authentication data in `localStorage`. This lets demo data survive page refreshes without a database or backend.

Hydration mismatch is avoided by not reading persisted values during server rendering. Components that depend on browser state use mounted-state checks before rendering counts or user-dependent values. A store is also not used to generate server metadata.

The tradeoff is that persisted browser state can belong to a previous session or contain outdated demo data. Validation and safe fallbacks should be added before this design is used with real account data.

### Server and client data boundaries

Product API calls are collected in `productService.ts` so the same data rules can be reused by pages and sitemap generation. FakeStoreAPI is a public demo dependency, so request failures are converted into visible retry or fallback states.

Home product sections are streamed independently from the hero section. This prevents an unavailable API response from delaying the initial hero and navigation HTML.

The tradeoff is that successful product rendering depends on the external API. Caching and a short timeout reduce the risk, but a production storefront would normally use a stable database or a server-side API proxy.

### Localization

The project uses `next-intl` for locale routes, navigation, and translated interface text. The English and Arabic layouts share components, while the document direction changes to LTR or RTL.

Product data from FakeStoreAPI is English-only. The surrounding interface is localized, but product titles and descriptions are not translated. A production implementation would add localized product fields or a translation layer.

### Forms and validation

React Hook Form minimizes re-renders and controls form state. Zod schemas define the data and password rules used by checkout and account forms.

Validation is kept in the client because this is a frontend-only demo. In a real application, the same rules would also need to run on the server or API boundary so that client validation cannot be bypassed.

### SEO

The app uses Next.js metadata for titles, descriptions, canonical URLs, language alternates, Open Graph, and Twitter cards. Product pages generate JSON-LD for products and breadcrumbs, while public and private routes are separated with sitemap and `noindex` rules.

The Sitemap and robots configuration are generated from project constants so localized public routes use the same canonical domain.

### Responsive UI and sliders

Cards and sections use Tailwind breakpoints to change from one column to two or four columns. Home sliders use native horizontal overflow and snap behavior, allowing touch scrolling on mobile and arrow controls on larger screens.

The scrollbar is hidden for the slider containers, but keyboard and arrow controls remain available. A native, CSS-based slider approach avoids pulling in a heavy carousel library for a simple one-row interface.

### Images and performance

The hero image uses `next/image` with priority loading and responsive `sizes`. The configuration enables AVIF and WebP output with longer image caching.

The tradeoff is that changing every image at once would have limited additional benefit. The first-view assets need priority loading and correct dimensions, while later product images can load progressively.

## Lighthouse evidence

The latest deployed English mobile audit measured 94 Performance, 100 Accessibility, 100 Best Practices, and 92 SEO.

This replaces the earlier English mobile baseline, which scored 88 or 84 in repeat runs. The current screenshot is stored at [docs/lighthouse/final-en-mobile-lighthouse.png](docs/lighthouse/final-en-mobile-lighthouse.png).

The SEO audit identified the site domain as the remaining cleanup area. The production URL fallback is now set to `https://exclusive-olive.vercel.app`, so canonical URLs and sitemap entries do not fall back to `localhost:3000`.

The full baseline table remains useful for comparison:

| Locale | Device | Performance | Accessibility | Best Practices | SEO | Status |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| English | Desktop | 100 | 99 | 100 | 92 | Baseline |
| English | Mobile | 88 (84 repeat) | 99 | 100 | 92 | Baseline |
| Arabic | Desktop | 100 | 99 | 100 | 92 | Baseline |
| Arabic | Mobile | 90 | 100 | 96 | 92 | Baseline |

## Lighthouse report process

Run the English mobile audit after deployment:

```bash
npx lighthouse "https://your-deployed-domain/en" --preset=perf --form-factor=mobile --screenEmulation.mobile=true --output=html --output-path=docs/lighthouse/post-change-en-mobile.html
```

Run the desktop and Arabic variants by changing the URL and the Lighthouse viewport or preset. Keep the screenshots and generated reports in `docs/lighthouse` only after confirming they were produced from the deployed current build.

## How to run the project

Requirements:
- Node.js 20 or higher
- npm

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Open the website in the browser:

- English: http://localhost:3000/en
- Arabic: http://localhost:3000/ar

## Useful checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Demo limitations

The project is a frontend demonstration, not a production e-commerce backend.

- login and signup are demo interactions
- account changes are stored in browser state
- checkout does not process real payments
- contact form submissions are not delivered by email
- products come from FakeStoreAPI





