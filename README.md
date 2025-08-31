# Ohio Carpal Tunnel Center – Website

This repository contains the source code for the Ohio Carpal Tunnel Center website. It is built as a static site using Hugo with a custom theme and managed content via Netlify CMS.

## Tech Stack
- Hugo (Static Site Generator)
  - Site config: `config.yml`
  - Content: `content/` (Markdown with front matter)
  - Theme: `themes/carpal-tunnel/` (SCSS, JS, layouts, partials, and data)
- Netlify CMS (Headless CMS UI)
  - Admin UI: `/admin` (from `static/admin/index.html`)
  - CMS config: `static/admin/config.yml`
  - Uses Netlify Identity + Git Gateway for authentication (configured by your Netlify site)
- SCSS/JS assets inside the theme
  - SCSS: `themes/carpal-tunnel/assets/scss`
  - JS: `themes/carpal-tunnel/assets/js`
- JavaScript libraries
  - tiny-slider
  - vanilla-masker
- Node.js used for dependency management (no build scripts defined here)

## Prerequisites
- Hugo installed locally
  - Recommended: Hugo Extended version (to compile SCSS in themes)
  - Install instructions: https://gohugo.io/installation/
- Node.js and npm (to manage JS dependencies if you plan to work with theme JS/CSS)

## Getting Started (Local Development)
1. Clone the repository
2. Install Node dependencies (optional; only needed if you change JS/CSS or use vendor packages):
   - `npm install`
3. Run the Hugo development server:
   - `hugo server -D`
   - This serves the site at http://localhost:1313/ and watches for changes

Notes:
- The theme is located at `themes/carpal-tunnel`. If you modify SCSS/JS there, Hugo Extended compiles assets automatically.
- Generated output is in `public/` when you build.

## Building for Production
- Build the static site:
  - `hugo`
- The fully built site will be generated into the `public/` directory.

## Deploying
- This project is set up to work well with Netlify:
  - CMS and Identity widget are already included.
  - Typical Netlify build command: `hugo`
  - Publish directory: `public`
  - Netlify is configured via `netlify.toml` to install Hugo automatically (HUGO_VERSION pinned). No additional setup in the UI is required.
- If using Netlify CMS with Git Gateway, ensure Netlify Identity is enabled and users are invited from your Netlify dashboard.

## Editing Content in the CMS
You can use the visual editor provided by Netlify CMS.

- Access the CMS at: `/admin` (e.g., http://localhost:1313/admin during local dev or https://your-domain/admin in production)
- Authentication: Netlify Identity popup handled by the widget on the page. You must be an authorized user for the connected Netlify site.
- Media uploads:
  - Media files are saved to `themes/carpal-tunnel/static/assets/images/`
  - They are served from `/assets/images/`

Collections available in the CMS (as configured in `static/admin/config.yml`):
- General (site-wide settings written to `config.yml`)
- Contact (writes to `themes/carpal-tunnel/data/contact.yml`)
- Homepage
  - Page settings (`content/_index.md`)
  - Slideshow (`themes/carpal-tunnel/data/slideshow.yml`)
  - Our process (`themes/carpal-tunnel/data/our_process.yml`)
  - Testimonials (`themes/carpal-tunnel/data/testimonials.yml`)
- Team
  - Page settings (`content/our-team/_index.md`)
  - Members (`themes/carpal-tunnel/data/team.yml`)
- FAQ
  - Page settings (`content/faq/_index.md`)
  - Questions (`themes/carpal-tunnel/data/faq.yml`)
- About
  - Page settings (`content/about/_index.md`)
  - Info (`themes/carpal-tunnel/data/about.yml`)

Editing flow:
1. Log into `/admin` with Netlify Identity
2. Choose the relevant collection (e.g., Homepage → Slideshow)
3. Make edits in the forms, upload images as needed
4. Save and publish — changes are committed to the repo on the `master` branch (per CMS config)

## Editing Content via Files (Alternative)
- Pages: Markdown files under `content/`, e.g.:
  - `content/_index.md` (home)
  - `content/about/_index.md`
  - `content/faq/_index.md`
  - `content/our-team/_index.md`
- Structured data used by templates: YAML files under `themes/carpal-tunnel/data/`, e.g.:
  - `about.yml`, `slideshow.yml`, `our_process.yml`, `team.yml`, `testimonials.yml`, `faq.yml`, `contact.yml`
- Front matter/fields correspond closely to the fields defined in `static/admin/config.yml`.

## Theme and Assets
- Layouts and partials: `themes/carpal-tunnel/layouts/`
- Styles (SCSS): `themes/carpal-tunnel/assets/scss/`
- Scripts: `themes/carpal-tunnel/assets/js/`
- Static assets (favicons, fonts, images): `themes/carpal-tunnel/static/assets/`

If you customize SCSS/JS:
- Ensure you’re using Hugo Extended so SCSS is compiled.
- For third‑party JS libraries, they are listed in `package.json`. Run `npm install` if you add or update packages.

## Configuration
- Site configuration: `config.yml`
  - Title, baseURL, menus, and site params (logo, description, GA code, etc.)
- CMS configuration: `static/admin/config.yml`
  - Backend: `git-gateway` on branch `master`
  - Media folders and all collection field definitions

## Troubleshooting
- CMS login doesn’t appear: Ensure Netlify Identity is enabled on the deployed site and you are invited as a user.
- Styles not updating: Make sure you have Hugo Extended installed; restart `hugo server` after installing/upgrading.
- Images not appearing: Confirm uploads go to `themes/carpal-tunnel/static/assets/images/` and references use `/assets/images/...`.

## License / Credits
- Author: modstud.io
- Licensed under ISC (see `package.json`).
