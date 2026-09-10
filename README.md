# Nuviq AI Studio — Website

A production-ready marketing site for **Nuviq AI Studio**, built with Next.js 14 (App
Router), TypeScript, Tailwind CSS, and Framer Motion. Dark mode by default, fully
responsive, with a full page set: Home, About, Services, Our Work, Blogs (+ individual
post pages), and Contact (with a working form → API route).

## Tech stack

| Layer       | Choice                                                        |
| ----------- | --------------------------------------------------------------- |
| Framework   | Next.js 14 (App Router) + TypeScript                             |
| Styling     | Tailwind CSS, custom brand color tokens, `class` dark mode        |
| Animation   | Framer Motion (scroll reveals, page/menu transitions, hero)     |
| Icons       | lucide-react                                                     |
| Theming     | next-themes (dark by default, toggle in navbar)                  |
| Forms       | Nodemailer (SMTP) + Zod validation, via an API route              |
| Fonts       | Geist Sans (display) + Inter (body) + Geist Mono (data labels)  |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** all images under `public/images/` are procedurally generated
> placeholder artwork (gradients + abstract network graphics in the brand
> palette) so the site looks complete out of the box. Swap them for real
> photography/screenshots whenever you're ready — see "Replacing placeholder
> media" below.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need:

```bash
cp .env.example .env.local
```

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` — used by
  `app/api/contact/route.ts` to send contact-form submissions via
  Nodemailer. Works with any SMTP provider (SendGrid, Postmark, Resend,
  Gmail app passwords, etc).
- `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` — where submissions are sent
  from/to.
- `NEXT_PUBLIC_SITE_URL` — used for metadata, Open Graph tags, and the
  sitemap. Set this to your real production domain before deploying.

**Without SMTP configured**, the contact form still works end-to-end in
development — submissions are validated and logged to the server console
instead of emailed, so you can test the UI without setting anything up.

## Project structure

```
app/
  layout.tsx            Root layout: fonts, theme provider, navbar/footer
  page.tsx               Home
  about/page.tsx
  services/page.tsx
  our-work/page.tsx
  blogs/page.tsx
  blogs/[slug]/page.tsx  Individual blog post (generateStaticParams + metadata)
  contact/page.tsx
  api/contact/route.ts   Contact form handler (validation + email)
  sitemap.ts             Dynamic sitemap.xml
  robots.ts              Dynamic robots.txt
  loading.tsx / error.tsx / not-found.tsx

components/
  layout/                Navbar, Footer
  sections/               Page-specific sections (hero, work list, services grid, ...)
  ui/                     Reusable primitives (Button, Badge, Card, Modal, ...)
  theme-provider.tsx / theme-toggle.tsx

hooks/                   useScrollPosition, useRevealInView
lib/                      constants.ts (all site content), utils.ts (cn, formatDate)
types/                    Shared TypeScript interfaces
public/images/            Generated placeholder artwork
public/videos/            Drop your hero video here (see README inside)
```

Absolute imports use the `@/` alias (e.g. `@/components/ui/button`), configured
in `tsconfig.json`.

## Replacing placeholder media

- **Hero video:** add `public/videos/hero.mp4` and `hero.webm` — see
  `public/videos/README.md` for encoding recommendations. The hero falls
  back to a poster image gracefully until you do.
- **Project/blog/team images:** everything under `public/images/` is
  referenced from `lib/constants.ts`. Replace the files in place (keeping
  the same filenames) or update the paths in `constants.ts` to point at
  new assets.
- **Copy:** all page content (services, projects, blog posts, team, nav
  links, contact details) lives in `lib/constants.ts` — it's the single
  place to edit site-wide text.

## Editing content

Almost everything on the site is data-driven from `lib/constants.ts`:
services, featured/all projects, blog posts (including full post body
copy), team members, company values, the timeline on the About page, nav
links, footer links, and social links. Add or remove an entry there and
the relevant pages/grids update automatically — no need to touch page
components for routine content changes.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (animations are disabled site-wide).
- Visible focus states on all interactive elements.
- Images use `next/image` with explicit `sizes` for responsive loading;
  the hero image is served eagerly as the LCP element.
- Skip-to-content link at the top of every page.

## Deployment (Vercel)

1. Push this project to a Git repository.
2. Import it into [Vercel](https://vercel.com/new).
3. Add the environment variables from `.env.example` in the Vercel
   project settings.
4. Deploy — no additional configuration is required; `next.config.mjs`
   is deployment-ready as-is.

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # lint with next/core-web-vitals rules
```
