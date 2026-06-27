# Alisa McCloy Portfolio

A static personal portfolio site for editorial photography and film work. It uses plain HTML, CSS, and vanilla JavaScript, so there is no build step and it can be deployed directly with GitHub Pages.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| About | `about.html` |
| Portfolio | `portfolio.html` |
| Contact | `contact.html` |

## Project Structure

```text
.
├── index.html
├── about.html
├── portfolio.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── images/
└── .nojekyll
```

## Preview Locally

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push these files to the `main` branch of the GitHub repo.
2. In GitHub, open **Settings -> Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Select branch **main** and folder **/ (root)**.
5. Save.

The site should publish at:

```text
https://alisamccloy.github.io/Website/
```

## Customise Before Publishing

- Replace the placeholder SVGs in `assets/images/` with your own photography and film stills.
- Update the email address in `contact.html`.
- Replace the social links in `contact.html` with real Instagram, Vimeo, and LinkedIn URLs.
- Add Vimeo or YouTube embed URLs to the film items in `portfolio.html` if you want the lightbox to play videos.
