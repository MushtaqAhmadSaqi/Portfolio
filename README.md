# Mushtaq Ahmad — "The Lab Notebook" Portfolio (React + Vite)

A hand-crafted personal engineering portfolio and public learning journal built with **React + Vite** and **Plain CSS Custom Properties**. Designed around **"The Lab Notebook"** aesthetic: warm archival field paper (`#F7F4EB`) by day, carbon blueprint slate (`#121417`) at night, editorial **Fraunces** serif headings, **IBM Plex Sans** body copy, and **IBM Plex Mono** metadata stamps.

---

## 1. Folder Structure

```text
mushtaq-ahmad-portfolio/
├── index.html                        # Preloaded Google Fonts, SEO/OG tags, JSON-LD schema
├── package.json                      # Minimal dependencies (React 18 + Vite)
├── vite.config.js                    # Clean build configuration with relative base support
├── vercel.json                       # SPA URL rewrites for /projects/[slug]
├── public/
│   ├── favicon.svg                   # Custom Lab Notebook SVG icon
│   ├── Mushtaq_Ahmad_Resume.pdf      # Downloadable Résumé PDF
│   ├── robots.txt                    # Search crawler directives
│   ├── sitemap.xml                   # Sitemap for Home + Case Study pages
│   └── 404.html                      # GitHub Pages SPA redirect helper
└── src/
    ├── main.jsx                      # React root entry point
    ├── App.jsx                       # Theme manager, router (Home / Case Studies / 404), console easter egg
    ├── data/
    │   └── content.js                # ★ SINGLE SOURCE OF TRUTH: edit all text, projects & links here
    ├── styles/
    │   ├── tokens.css                # CSS Custom Properties (Light/Dark palettes, fluid type scale)
    │   └── notebook.css              # Asymmetric margin ledger, paper-lift hover, reduced-motion rules
    └── components/
        ├── Navbar.jsx                # Sticky index bar + tactile Day Paper / Night Carbon toggle
        ├── Hero.jsx                  # Asymmetric 7:5 split hero + pinned Current Sprint index card
        ├── SelectedWork.jsx          # Full-width featured Project 01 + staggered 2-col ledger
        ├── LabLog.jsx                # Filterable "Learning in Public" chronological timeline
        ├── Toolbox.jsx               # Honest 3-tier skill specification table (zero percentage bars)
        ├── About.jsx                 # First-person story (Skardu → Islamabad) + personal margin cards
        ├── Contact.jsx               # Sign-off sheet with 1-click Copy Email + Formspree-ready form
        ├── CaseStudyView.jsx         # 68ch editorial case study reader with sticky Table of Contents
        ├── NotFound404.jsx           # Custom "This page was torn out of the notebook" 404 view
        ├── Footer.jsx                # Live Asia/Karachi (PKT) clock + metadata
        └── HandDrawnSvg.jsx          # Self-drawing SVG vermilion underlines, circles, and torn paper edge
```

---

## 2. How to Run Locally

Make sure you have [Node.js](https://nodejs.org/) (v18 or newer) installed:

```bash
# 1. Unzip the folder and navigate into it
cd mushtaq-ahmad-portfolio

# 2. Install dependencies
npm install

# 3. Start the local Vite development server
npm run dev
```

Open the local URL printed in your terminal (usually `http://localhost:5173`).

To test a production build locally:

```bash
npm run build
npm run preview
```

---

## 3. How to Edit Your Content (`src/data/content.js`)

You never need to dig through JSX components to update your portfolio. Open **`src/data/content.js`**:

1. **Update your status or links:** Edit `siteContent.meta` or `siteContent.hero.currentStatus`.
2. **Add or edit a project & case study:** Add an object to `siteContent.projects`. Set `featured: true` on the project you want displayed full-width at the top of Selected Work.
3. **Add a new Lab Log note:** Prepend a new dated object (`id`, `date`, `category`, `title`, `summary`, `tags`, `metric`) to `siteContent.labLog`.
4. **Add your real portrait photo:** Drop your photo into `public/photo.jpg` and replace the `<svg>` placeholder inside `src/components/About.jsx` with `<img src="/photo.jpg" alt="Mushtaq Ahmad" loading="lazy" />`.
5. **Connect Formspree (optional):** Replace `formspreeEndpoint` in `src/data/content.js` with your real Formspree endpoint URL.

---

## 4. How to Deploy (Vercel, Netlify, or GitHub Pages)

### Option A: Vercel (Recommended — 60 seconds)
1. Push this repository to your GitHub (`https://github.com/MushtaqAhmadSaqi`).
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Vercel automatically detects **Vite** (`npm run build`, output directory `dist`) and applies `vercel.json`. Click **Deploy**.

### Option B: Netlify
1. Push to GitHub and import the repo into [app.netlify.com](https://app.netlify.com/).
2. Set **Build command** to `npm run build` and **Publish directory** to `dist`.

### Option C: GitHub Pages
1. Run `npm run build` locally (or via a GitHub Actions workflow).
2. Publish the `dist/` folder to your `gh-pages` branch (or configure GitHub Pages -> Source: GitHub Actions). Because `vite.config.js` uses `base: './'` and `public/404.html` is included, assets and routes resolve cleanly.
