# AI ShopAssist Project Plan

This document tracks the progress of building the AI ShopAssist Ecommerce website.

## Phase 1: Initial Setup & Backend

-   [x] Create project directory structure (`ai-shopassist`, `api`, `client`). (Implicitly done by creating files within)
-   [x] Create `plan.md`.
-   [x] Prepare product data:
    -   [x] Edit `mock-data.json` (change `imagePrompt` to `imageUrl`).
    -   [x] Move `mock-data.json` to `ai-shopassist/api/data/products.json`.
    -   [x] Move `images/` folder to `ai-shopassist/api/public/images/`.
-   [x] Initialize Node.js project in `api` directory (`pnpm init`).
-   [x] Install backend dependencies (`express`, `cors`, `nodemon`).
-   [x] Create basic Express server (`api/server.js`).
-   [x] Configure static file serving for images in `api/server.js`.
-   [x] Implement `GET /api/products` endpoint.
-   [x] Implement `GET /api/products/:id` endpoint.
-   [x] Enable CORS middleware.
-   [x] Add `dev` script to `api/package.json`.

## Phase 2: Frontend Client

-   [x] Initialize React project in `client` directory (`pnpm create vite@latest . --template react`). (User confirmed)
-   [x] Install frontend dependencies (`tailwindcss`, `@tailwindcss/vite`, `react-router-dom`, `axios`). (User confirmed)
-   [x] Configure Tailwind CSS using Vite plugin (including `tailwind.config.js`).
-   [x] Create basic React component structure (`App`, `Header`, pages, components).
-   [x] Implement routing using `react-router-dom`.
-   [x] Implement `ProductListPage` (fetch and display products).
-   [x] Implement `ProductCard` component.
-   [x] Implement `ProductDetailPage` (fetch and display single product).
-   [ ] Implement basic Cart functionality (state management).
-   [x] Implement `CartPage` (placeholder).
-   [x] Style components with Tailwind CSS (basic styling applied).
-   [x] Add `dev` script to `client/package.json` (already exists).

## Phase 3: Integration & Testing

-   [ ] Test API endpoints.
-   [ ] Test Frontend components and data fetching.
-   [ ] Test Cart functionality.
-   [ ] Run both servers concurrently.

## Phase 4: AI Assistant Integration (Future)

-   [ ] Plan AI assistant features.
-   [ ] Implement AI integration.
