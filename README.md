# Zaid Nayeb — Portfolio

React + Vite portfolio with GSAP (ScrollTrigger, Flip) animations and Lenis smooth scrolling.
Dark theme by default, with a light theme toggle in the header.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into /dist
```

## Where to edit

| What | File |
| --- | --- |
| Name, role, email, social links | `src/data/site.js` |
| Projects (titles, links, categories, featured) | `src/data/projects.js` |
| Services | `src/data/services.js` |
| Approach steps | `src/data/approach.js` |
| Skills + stats | `src/data/skills.js` |
| Journey timeline | `src/data/journey.js` |
| FAQ | `src/data/faqs.js` |
| Colours for dark / light themes | `src/styles/base.css` (top of file) |

Project screenshots live in `public/projects/<slug>.jpg` (and `<slug>-full.jpg` for tall captures).
Your portrait is `public/images/profile.png`.

## Structure

- `src/pages/` — one file per page (Home, Services, Projects, About, Contact, NotFound)
- `src/components/layout/` — header, menu, intro gate, page transition, footer…
- `src/components/home/`, `about/`, `projects/`, `contact/` — page-specific sections
- `src/components/sections/` — sections shared across pages
- `src/components/ui/` — reusable animated building blocks (BlurReveal, LineReveal, Marquee…)
- `src/components/icons/` — SVG icons

Every component lives in its own `.jsx` file.

## Deploy

Works on Vercel (`vercel.json`) and Netlify (`public/_redirects`) with client-side routing.
The contact form is styled only — it doesn't send anything yet.
