# TPT Marketing — Seller Landing Page & Admin Panel

A modern, full-stack web application for a Teachers Pay Teachers (TPT) seller: a public landing page that showcases educational resources, plus a password-protected admin panel for managing products, site content, an FAQ section, and legal pages.

## Features

- **Landing page** with hero section, About, product showcase, FAQ (accordion), and Contact sections.
- **Products catalog** (`/products`) with live search by name, category & format filters, and price sorting.
- **Product detail pages** (`/products/[id]`) with image galleries.
- **Admin panel** (`/admin`) — password protected:
  - Manage products (create / edit / delete, image uploads).
  - Edit site settings (branding, about text, seller info, contact details).
  - Manage the FAQ section (add / edit / reorder / remove questions).
  - Manage legal pages.
- **Skeleton loaders**, **back-to-top** button, and fully responsive, mobile-friendly design.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB via Mongoose
- **Auth:** iron-session (cookie-based admin session)
- **Media uploads:** Cloudinary

## Getting Started

### 1. Prerequisites

- Node.js 18+ 
- A MongoDB database (e.g. MongoDB Atlas)
- A Cloudinary account (for image uploads)

### 2. Install dependencies

```bash
yarn install
```

### 3. Configure environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

See `.env.example` for the full list of required variables (MongoDB URI, admin password, session secret, Cloudinary credentials).

### 4. Seed the database (optional)

The app auto-seeds default site settings and FAQs on first run when no settings exist. No manual step is normally required.

### 5. Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.
The admin panel is available at [http://localhost:3000/admin](http://localhost:3000/admin).

### 6. Build for production

```bash
yarn build
yarn start
```

## Project Structure

```
nextjs_space/
├── app/
│   ├── _components/        # Shared UI components (hero, header, footer, FAQ, cards, etc.)
│   ├── admin/              # Admin panel routes & components
│   ├── api/                # API route handlers (products, auth, settings, upload)
│   ├── legal/[slug]/       # Legal pages
│   ├── products/           # Products catalog & detail pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── lib/                    # DB connection, models, session, seed data, utils
├── public/                 # Static assets (images, favicon)
├── prisma/                 # Prisma schema (optional tooling)
├── next.config.js
├── tailwind.config.ts
├── package.json
└── .env.example
```

## Admin Access

Navigate to `/admin` and log in with the password set in the `ADMIN_PASSWORD` environment variable.

## License

Proprietary. All rights reserved.