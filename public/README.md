# IZZA — Fashion E-Commerce Platform

IZZA is a full-stack e-commerce application built with **Next.js (App Router)**, **TypeScript/React**, **Prisma ORM**, **PostgreSQL**, and **TailwindCSS**. The project demonstrates how to combine server components for data fetching with client components for interactivity in a scalable architecture.

## Features
- Dynamic navigation with dropdown menus powered by Prisma and PostgreSQL
- Responsive hero section with optimized images
- Category and subcategory tiles rendered server-side with hover interactions
- Global styling with custom fonts and brand theme

## In Progress
- Stripe checkout and order tracking
- AI-based sentiment analysis for product reviews
- Machine learning product recommendations
- Admin dashboards for inventory and sales analytics

## Tech Stack
- Frontend: Next.js (App Router), TypeScript, React, TailwindCSS  
- Backend: Prisma ORM, PostgreSQL  
- Other: Heroicons, Next Image optimization

## Quickstart
```bash
git clone https://github.com/<your-username>/izza-ecommerce.git
cd izza-ecommerce
npm install

# Database setup
npx prisma generate
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables
Create a `.env` file (or copy from `.env.example`) with the following:
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/izza
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```
