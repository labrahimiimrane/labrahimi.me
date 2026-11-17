# labrahimi.me

Personal portfolio of **Labrahimi Imrane**, a full-stack web developer based in Casablanca, Morocco.
It presents his work, experience and skills, and includes a contact form that sends messages by email.

Live site: <https://imranelabrahimi.me>

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) with React 18 and TypeScript
- [Tailwind CSS 3](https://tailwindcss.com/) plus a small set of design tokens in `app/globals.css`
- [Geist](https://vercel.com/font) font, [lucide-react](https://lucide.dev/) icons
- [Nodemailer](https://nodemailer.com/) (Gmail) for the contact form
- Deployed on [Vercel](https://vercel.com/)

## Getting started

Requirements: Node.js 18.17 or later, and npm (the project uses `package-lock.json`).

```bash
npm install
npm run dev        # http://localhost:3000
```

### Environment variables

Create a `.env.local` file in the project root (it is git-ignored):

```bash
# Gmail account that sends and receives contact form messages.
# GMAIL_PASS must be a Google App Password, not the account password.
GMAIL_USER=you@gmail.com
GMAIL_PASS=your-app-password

# Optional: production URL used for canonical links, sitemap and social previews.
# Defaults to https://imranelabrahimi.me
NEXT_PUBLIC_SITE_URL=https://imranelabrahimi.me
```

Without the Gmail variables the site still works, but the contact form returns a "temporarily unavailable" message.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build (fails on type or lint errors) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |

## Project structure

```
app/
  layout.tsx            Root layout: font, site-wide metadata, skip link, navigation
  page.tsx              Home: hero, contact details, featured projects
  about/page.tsx        Bio, skills, experience, education
  projects/page.tsx     All projects with type filters
  contact/page.tsx      Contact details and form
  api/contact/route.tsx POST endpoint that validates the form and sends the email
  favicon.ico           Favicon for browsers that request /favicon.ico (16/32/48 px)
  icon.png              Favicon (192×192)
  apple-icon.png        Apple touch icon (180×180)
  opengraph-image.tsx   Social share card, generated at build time
  twitter-image.tsx     Same card for X/Twitter
  sitemap.ts            /sitemap.xml
  robots.ts             /robots.txt
  globals.css           Design tokens (CSS variables) and shared component styles
components/
  navigation.tsx        Floating bottom "dock" navigation
  projects-filter.tsx   Project type filter and project cards (client component)
  contact-form.tsx      Contact form with honeypot spam protection (client component)
  social-links.tsx      GitHub / LinkedIn / X icon links
  icons/x-icon.tsx      X (Twitter) logo
lib/
  data.ts               All portfolio content and its TypeScript types
  project-types.ts      Badge styles and labels for each project type
  site.ts               Site URL and shared page-metadata helper
public/
  avatar.jpeg           Profile photo
  imrane-labrahimi-cv.pdf
  placeholder.svg       Fallback for projects without an image
  projects/             Project screenshots (360×240 PNG)
```

## Editing content

All content lives in [`lib/data.ts`](lib/data.ts); pages read it directly, so no other file needs to change.

- **Personal info, bio, resume path:** `personalInfo`
- **Experience / education:** `experience`, `education`
- **Skills:** `skills` (category labels are in `app/about/page.tsx`)
- **Contact details and social profiles:** `contactInfo`, `socialLinks`

### Adding a project

1. Add a 360×240 screenshot to `public/projects/` (lowercase file name).
2. Add an entry to `projects` in `lib/data.ts`:

   ```ts
   {
     id: 54,                       // unique
     title: "Project name",
     description: "One or two sentences.",
     image: "/projects/my-project.png", // leading slash; "" shows the placeholder
     category: "Legal Services",
     year: "2026",
     type: "agency",               // "agency" | "freelance" | "sideprojects" | "vibecoding"
     technologies: ["WordPress", "PHP"],
     featured: false,              // true also shows it on the home page
     live: "https://example.com",  // "" hides the link
     github: "",                   // "" hides the link
   },
   ```

Projects are sorted by year automatically.

## Design system

- Dark theme only. Colors are CSS variables in `app/globals.css` (`--text-primary`, `--text-muted`, `--text-subtle`, `--border-color`, …), exposed to Tailwind as `text-primary`, `text-muted`, `text-subtle` and `border-border`.
- Shared classes: `.dot-grid` (page background), `.minimal-card` (glass card), `.dock` / `.dock-item` (navigation).
- Keyboard focus uses a visible outline (`:focus-visible`), and animations are disabled for users who prefer reduced motion.
