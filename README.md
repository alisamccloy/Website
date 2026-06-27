# Website
My personal website
#Film portfolio

A minimalist, high-end portfolio site for an editorial photographer / film-maker
based in Canterbury, UK. Built to the supplied brief: dark palette, sage accent,
Barlow + Inter typography, a 12-column grid, and a signature **nav-hover
background crossfade** — hovering each menu item fades in a photograph for that
section.

Plain **HTML / CSS / vanilla JS** — no build step, no frameworks, no jQuery — so
it runs anywhere and deploys to GitHub Pages as-is.

## Pages

| Page | File | What's on it |
|------|------|--------------|
| Home | `index.html` | Full-viewport hero, headline + CTA, transparent nav that fades to `#0D0D0D` on scroll |
| About | `about.html` | Two-column portrait + bio, horizontal skill strip |
| Portfolio | `portfolio.html` | Filter (All / Photography / Film), masonry grid, click-to-open lightbox + film modal |
| Contact | `contact.html` | Minimal form, email link, social icons, location note |

## Preview locally

It's static, so just open `index.html` in a browser. For relative paths and the
contact form to behave exactly as in production, serve it instead:

```bash
# Python (built in on most systems)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
.
├── index.html
├── about.html
├── portfolio.html
├── contact.html
├── css/
│   └── styles.css        # all styles; design tokens live in :root at the top
├── js/
│   └── main.js           # nav, crossfade, portfolio filter, lightbox
├── assets/
│   └── images/           # placeholder SVGs — replace with real photos
├── .gitignore
└── README.md
```

## Make it yours

1. **Name & details** — the name is **Alisa McCloy**. Find-and-replace
   it across the four `.html` files, and update the email
   (`hello@jordanavery.example`) and the social links on `contact.html`.
2. **Photographs** — drop your real images into `assets/images/` and update the
   `src` / `style="background-image:..."` references. The files currently there
   are moody SVG placeholders marked "PLACEHOLDER" so the site looks complete out
   of the box. Key images to replace:
   - `bg-home.svg`, `bg-about.svg`, `bg-portfolio.svg`, `bg-contact.svg` — the
     four nav-hover backgrounds (one moody film still, candid portrait, lighting
     setup, atmospheric cityscape).
   - `portrait.svg` — the About portrait (black-and-white works best).
   - `photo-01..06`, `film-01..03` — the portfolio grid.
3. **Film embeds** — each film item in `portfolio.html` has an empty
   `data-embed=""`. Paste a Vimeo/YouTube *embed* URL there
   (e.g. `https://player.vimeo.com/video/XXXXXXXX`) and it opens in an embedded
   player; leave it empty and it falls back to the still image.
4. **Colours** — every colour is a CSS variable in `:root` at the top of
   `css/styles.css`. To revert the accent to gold, set
   `--accent:#C8A96E; --accent-dim:#9b8350;` (editorial red is `#BF4D3B`).
5. **Contact form** — it's a demo (no backend). To receive messages, point the
   form at a service like [Formspree](https://formspree.io): add
   `action="https://formspree.io/f/your-id" method="POST"` to the `<form>` and
   remove the demo submit handler at the bottom of `contact.html`.

## Accessibility & performance

- WCAG AA contrast on the dark palette, descriptive `alt` text, a skip link, and
  visible keyboard focus.
- The nav-hover crossfade also fires on keyboard focus, and is disabled on
  touch / no-hover devices (static images instead).
- `prefers-reduced-motion` is respected; images are lazy-loaded.

## Deploy to GitHub Pages

1. Create a repo on GitHub (e.g. `film-portfolio`).
2. From this folder:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: film portfolio site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/film-portfolio.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment**, set **Source** to
   *Deploy from a branch*, branch **main**, folder **/ (root)**, then save.
4. Your site goes live at `https://alisamccloy.github.io/film-portfolio/`.

## Licence

Code is free to reuse. The photography and film work are the property of their
creator — replace the placeholder imagery with your own before publishing.
