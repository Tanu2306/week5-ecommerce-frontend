# Kiln & Co. — Advanced E-commerce Frontend

A modern e-commerce frontend built with React 18, Redux Toolkit, React Router and Tailwind CSS. It has a filterable product catalog, a persistent shopping cart, a simulated login with protected routes, search with autocomplete, a validated checkout, a wishlist, product comparison, and performance work (code splitting, lazy images, service worker).

## Project overview

**Goal:** demonstrate component-based architecture, state management, advanced CSS (Grid/Flexbox), modern JavaScript (ES6+), and web performance practices in one working app.

**Features**

- Product catalog with filtering (category, price, rating, text) and sorting (popularity, price, name)
- Product detail page with image gallery, stock status and reviews (you can post a review)
- Shopping cart with real-time totals, quantity limits (capped at stock), free-shipping threshold, and `localStorage` persistence
- Simulated authentication (any valid email + password of 6+ characters) with a protected `/checkout` route that returns you to checkout after sign in
- Search with autocomplete (debounced, keyboard navigable with arrow keys, Enter and Escape)
- Checkout with field-level validation (Luhn card check, expiry date, phone, postal code) and an order confirmation
- Wishlist and product comparison (up to 3 products), both persisted
- Responsive layout, keyboard focus styles, ARIA labels, reduced-motion support

## Setup instructions

Requires Node.js 18 or newer.

```bash
git clone https://github.com/<your-username>/week5-ecommerce-frontend.git
cd week5-ecommerce-frontend
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build in dist/
npm run preview    # serve the production build (service worker is active here)
npm test           # run unit tests (Vitest)
```

Test card for checkout: `4242 4242 4242 4242`, any future expiry, any 3-digit CVV. No payment is taken.

## Code structure

```
week5-ecommerce-frontend/
├── public/
│   └── sw.js                    service worker (offline support)
├── src/
│   ├── components/
│   │   ├── Header/              Header, SearchBar (autocomplete)
│   │   ├── ProductCard/         ProductCard, ProductGrid (+ skeleton)
│   │   ├── Cart/                CartItem, CartSummary
│   │   ├── Checkout/            CheckoutForm (validation)
│   │   └── common/              Button, Modal, Rating, LazyImage, Spinner,
│   │                            QuantityControl, ProtectedRoute, Footer, ScrollToTop
│   ├── pages/                   Home, ProductList, ProductDetail, CartPage,
│   │                            CheckoutPage, LoginPage, WishlistPage, ComparePage, NotFound
│   ├── store/                   cartSlice, productSlice, userSlice, prefsSlice, index
│   ├── services/                api.js (mock API), products.data.js
│   ├── utils/                   totals, validators, productFilters, storage, format, useDebounce
│   ├── test/                    store.test.js
│   ├── App.jsx                  routes + lazy loading
│   ├── index.jsx                entry point
│   └── index.css                Tailwind layers + component classes
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Technical details

**State management (Redux Toolkit)**

| Slice | Holds | Notes |
|---|---|---|
| `cart` | line items | Quantity clamped to stock; quantity below 1 removes the item; persisted |
| `products` | catalog, load status, filters | `loadProducts` is an async thunk (`idle → loading → ready/error`) |
| `user` | simulated session | `login` thunk validates credentials; persisted |
| `prefs` | wishlist ids, compare ids | Compare capped at 3; persisted |

A `store.subscribe` listener in `store/index.js` saves only the slices that changed to `localStorage`.

**Algorithms and data handling**

- `applyFilters` filters first, then sorts a copy of the array (no mutation), memoized with `useMemo`.
- `calcTotals` computes subtotal, shipping (free at $150+), 8% tax and total, rounded to cents. Used by both the cart and checkout so the numbers always match.
- Card validation uses the Luhn checksum; expiry is valid until the end of the printed month.
- Autocomplete input is debounced (150 ms) so filtering does not run on every keystroke.

**Performance**

- Route-level code splitting with `React.lazy` + `Suspense`
- Vendor chunk splitting for React and Redux (`vite.config.js`)
- Native image lazy loading with explicit width/height (prevents layout shift) and a fallback if an image fails
- `React.memo` on `ProductCard`
- Skeleton loaders while products load
- Service worker: network-first for pages, cache-first for assets (production build only)

**API layer:** `services/api.js` is a mock with simulated latency. Replace the function bodies with `fetch`/Axios calls to connect a real backend; components do not need to change.

**Product images** come from picsum.photos. If you are offline or the host is blocked, a placeholder icon is shown instead.

## Component architecture and data flow

```
index.jsx
└── Provider (Redux store) → BrowserRouter
    └── App
        ├── Header
        │   ├── SearchBar ──reads── products.items
        │   └── badges ─────reads── cart, prefs, user
        ├── Routes (lazy)
        │   ├── Home ─────────── ProductGrid → ProductCard
        │   ├── ProductList ──── filters ⇄ productSlice → ProductGrid → ProductCard
        │   ├── ProductDetail ── LazyImage, Rating, QuantityControl → cartSlice
        │   ├── CartPage ─────── CartItem[], CartSummary ⇄ cartSlice
        │   ├── ProtectedRoute ─ (no user → /login)
        │   │   └── CheckoutPage ── CheckoutForm, CartSummary → api.placeOrder → clearCart
        │   ├── LoginPage ────── userSlice.login
        │   ├── WishlistPage / ComparePage ── prefsSlice
        │   └── NotFound
        └── Footer
```

Data flow: UI event → `dispatch(action)` → reducer updates the slice → subscribers re-render → store listener writes changed slices to `localStorage`.

## Testing evidence

`npm test` runs 15 unit tests (Vitest) covering:

- Cart: add item, merge duplicates and cap at stock, remove at quantity 0, remove and clear
- Totals: shipping + tax under the threshold, free shipping at $150+, empty cart
- Filters: category + price sort, text query, minimum rating
- Preferences: compare limit of 3, wishlist toggle
- Validators: Luhn card check, expiry (valid, expired, bad month), email, phone, CVV, required fields

```
 ✓ src/test/store.test.js (15 tests)
 Test Files  1 passed (1)
      Tests  15 passed (15)
```

**Manual checklist:** filter + sort the catalog; add and remove cart items and refresh the page (cart persists); open `/checkout` while signed out (redirects to login, then returns); submit the checkout form empty (inline errors), then with the test card (order confirmation); search autocomplete with the keyboard; add and remove compare items (max 3).

## Screenshots

Add your own captures to a `screenshots/` folder and link them here:

- `screenshots/home.png`
- `screenshots/catalog-filters.png`
- `screenshots/product-detail.png`
- `screenshots/cart.png`
- `screenshots/checkout-validation.png`
- `screenshots/compare.png`
