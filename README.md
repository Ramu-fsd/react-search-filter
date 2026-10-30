# React Search & Filter

A responsive product catalog built with **React, TypeScript, and Vite**. Users can search by product name or description, filter by category, and set a maximum price.

## Features

- Live search as the user types
- Case-insensitive matching against product names and descriptions
- Category filter
- Maximum-price range filter
- Combined filters (search + category + price)
- Result count and helpful empty state
- Clear/reset filters action
- Responsive layout for desktop, tablet, and mobile
- Accessible labels, visible keyboard focus, and status announcements
- Typed product model and derived filtering with `useMemo`

## Tech stack

- React 19
- TypeScript
- Vite
- CSS (responsive layout and design tokens)

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Run TypeScript project checks and create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

Before committing, run:

```bash
npm run lint
npm run build
```

## Project structure

```text
react-search-filter/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── App.css
    └── components/
        └── SearchFilter.tsx
```

### Component responsibilities

- `App.tsx`: page-level composition only; it does not contain filtering logic.
- `components/SearchFilter.tsx`: owns search/filter state, sample product data, filtering logic, and result rendering.
- `index.css`: global browser reset and base styles.
- `App.css`: page, filter panel, product cards, responsive styling.

## How filtering works

The component stores three independent state values:

- `searchTerm`: text entered by the user
- `selectedCategory`: selected category (`All` by default)
- `maxPrice`: maximum allowed product price

`useMemo` derives the visible products from the original product list. Each product must satisfy all active conditions:

```ts
return matchesSearch && matchesCategory && matchesPrice;
```

The original product array is not mutated. `useMemo` avoids recalculating the filtered array on unrelated renders when its dependencies have not changed.

## Customize the sample data

Edit the `products` array in `src/components/SearchFilter.tsx`. Each product has an `id`, `name`, `category`, `price`, `description`, and `icon`.

For a real application, replace this local sample data with data fetched from a backend API. For large datasets, consider server-side search, filtering, pagination, debouncing, and request cancellation.

## Quality and accessibility notes

- Inputs have associated labels.
- The result count uses `aria-live="polite"`.
- The empty state uses `role="status"`.
- Keyboard focus is visible.
- Reduced-motion preferences are respected.
- Category values are represented by a TypeScript union type.

## Current limitations

- Data is hard-coded in the frontend.
- Search is immediate and client-side; there is no debounce.
- There is no backend, pagination, sorting, or product detail page.
- Price values are sample INR amounts.

## Suggested next enhancements

1. Add sorting by price and product name.
2. Add a debounced search input.
3. Fetch products from a Spring Boot REST API.
4. Add server-side pagination and filters.
5. Add unit tests for the filtering function.

## Git workflow

```bash
git init
git add .
git commit -m "Create React search and filter app"
git branch -M main
git remote add origin https://github.com/<your-username>/react-search-filter.git
git push -u origin main
```

If the GitHub repository already exists and contains an initial README, pull/reconcile that commit before pushing.

## License

Add a license file if you intend to distribute or reuse this project publicly.
