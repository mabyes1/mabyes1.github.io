# Ken Huang Resume

Personal resume and portfolio site for **Ken Huang / 黃鵬展**.

The production site is designed to be a small, boring, durable static website: no frontend framework runtime, no database, no CMS, and no backend service. A Node.js build script renders bilingual resume pages, project archives, project detail pages, SEO metadata, sitemap/robots files, and dedicated print-resume sources from structured data.

## Content model

The source of truth lives under `src/data/`:

- `resume.mjs` — profile, professional experience, education, languages, professional stack, recent hands-on stack
- `projects.mjs` — featured and archived projects, status, case-study sections, evidence, links, technologies

The website and PDF resume sources are generated from those files. Do not maintain separate resume copy inside page templates.

## Commands

```powershell
npm run build
npm run check
npm run dev
```

`npm run build` writes the deployable static site to `dist/`.

`npm run check` verifies the required bilingual routes, project pages, metadata files, and resume sources exist.

`npm run dev` starts a tiny local static server at `http://127.0.0.1:4321`.

## Browser QA and PDF generation

Windows QA uses the installed Chrome/Edge browser through the Chrome DevTools Protocol. No Playwright or browser package is required:

```powershell
npm run qa
```

The command rebuilds the site, prepares self-contained QA pages, launches an isolated headless browser, captures desktop/mobile/project/resume screenshots, and prints the Chinese and English resume PDFs into `public/`.

QA screenshots are temporary and ignored by Git. PDF files are generated artifacts and should be regenerated whenever resume content materially changes.

## Adding or updating a project

Edit `src/data/projects.mjs`.

Each project has a `slug`, bilingual summary/case-study content, status labels, technologies, links, and optional image/evidence fields. Setting `featured: true` places the project on the homepage. Every project automatically appears in `/projects` and receives a detail route in both languages.

## Updating the resume

Edit `src/data/resume.mjs`, then run:

```powershell
npm run build
npm run check
```

When the content is ready for release, regenerate the PDF resumes with `npm run qa`.

## Deployment

The repository is intended for GitHub Pages. `.github/workflows/pages.yml` builds and deploys `dist/` on pushes to `main`.

Production hostname: `kenhuang.pp.ua`

DNS remains managed in Cloudflare. The hostname can point to the GitHub Pages site via CNAME while the old `kennyxizi.pp.ua` hostname remains available for a later permanent redirect.

## Design constraints

- Default light theme with dark mode support
- Graphite text + low-saturation dark green accent
- Professional resume first, portfolio second
- No skill percentages, terminal theatrics, neon gradients, particle effects, or decorative device mockups
- Real product screenshots and sanitized engineering evidence are preferred over illustration
- Responsive, semantic HTML, keyboard focus visibility, and reduced-motion support

## AI-assisted engineering disclosure

The site intentionally describes Ken's current workflow accurately: product definition, constraints, system boundaries, engineering trade-offs, real-device validation, root-cause reasoning, and final quality remain human responsibilities; AI tools contribute heavily to implementation, exploration, refactoring, and debugging assistance.

