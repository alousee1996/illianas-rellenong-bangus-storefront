# Illiana's Rellenong Bangus — E-commerce Storefront

A beautiful, production-ready e-commerce storefront for Illiana's Rellenong Bangus, a Filipino family recipe since 1962. Built with Next.js 16, Drizzle ORM, and PostgreSQL.

![Stack](https://img.shields.io/badge/Next.js-16-black) ![Stack](https://img.shields.io/badge/Drizzle-ORM-blue) ![Stack](https://img.shields.io/badge/PostgreSQL-15+-blue) ![Stack](https://img.shields.io/badge/Tailwind-4-cyan)

## Features

- **Striking home page** with hero, featured collections, bestsellers, and brand story
- **Product grid** with filters (category, price range, tags) and sorting (featured, price, rating, newest)
- **Rich product detail pages** with image galleries, reviews, rating breakdown, and related products
- **Slide-out cart** with localStorage persistence and free-shipping progress bar
- **Streamlined checkout** with shipping form, payment method selection, and order confirmation
- **Persistent cart state** via React Context + localStorage
- **Fully responsive** — mobile, tablet, and desktop
- **Premium product imagery** and elegant typography (Playfair Display + Inter)
- **Seeded with 6 products and 21 realistic reviews**

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| ORM | Drizzle ORM |
| Database | PostgreSQL |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| Fonts | Playfair Display, Inter, Cormorant Garamond (Google Fonts) |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/illianas-rellenong-bangus.git
cd illianas-rellenong-bangus

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your PostgreSQL connection string
```

### Database Setup

```bash
# Push schema to create tables
npx drizzle-kit push

# Seed with demo products and reviews
DATABASE_URL=your_db_url npx tsx scripts/seed.ts
```

### Run the App

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

The app runs at `http://localhost:3000`.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout (fonts, cart provider)
│   ├── globals.css        # Tailwind theme & custom styles
│   ├── shop/page.tsx      # Shop page with filters/sorting
│   ├── product/[slug]/    # Product detail page
│   ├── checkout/page.tsx  # Checkout flow
│   └── api/               # API routes (health, reviews, orders)
├── components/            # React components
│   ├── Header.tsx         # Navigation + search + cart button
│   ├── CartDrawer.tsx     # Slide-out cart
│   ├── ProductCard.tsx    # Product card with quick-add
│   ├── ShopFilters.tsx    # Filter sidebar + sort dropdown
│   ├── ReviewsSection.tsx # Reviews + add-review form
│   └── ...
├── db/                    # Database layer
│   ├── index.ts           # Drizzle client
│   ├── schema.ts          # Table definitions
│   └── seed.ts            # Seed data
└── lib/                   # Utilities
    ├── cart-context.tsx   # Cart state (Context + localStorage)
    └── utils.ts           # cn, formatPrice, etc.
```

## Database Schema

- **products** — name, slug, description, price, image, gallery, category, tags, stock, spice level, rating
- **reviews** — linked to products, with author, rating, title, body, verified status
- **orders** — order number, customer info, items (JSONB), totals, payment method, status

## Cart State

The cart uses React Context with localStorage persistence:
- Items survive page refreshes
- Cart drawer slides out from the right
- Free shipping threshold: ₱1,500 (Metro Manila)
- Checkout creates an order record in the database

## Demo Products

| Product | Price | Category |
|---------|-------|----------|
| Classic Rellenong Bangus | ₱695 | Whole Fish |
| Spicy Rellenong Bangus | ₱745 | Whole Fish |
| Rellenong Bangus con Queso | ₱795 | Whole Fish |
| Rellenong Bangus sa Hipon | ₱895 | Whole Fish |
| Rellenong Bangus Lumpia | ₱495 | Lumpia & Snacks |
| The Illiana Gift Set | ₱2,495 | Gift Sets |

## License

MIT — feel free to fork and adapt for your own store.
