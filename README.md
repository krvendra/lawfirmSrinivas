# Srinivas Kaja — Law Firm Homepage Demo

Single-page React and Vite homepage for the proposed Srinivas Kaja legal professionals website.

## Run locally

Install dependencies, then run the Worker and built homepage together:

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`. A consent popup appears on the homepage. Each
time a visitor checks the disclosure and continues, the homepage footer's
aggregate preview count increases. The homepage stays covered until the visitor
submits consent; closing the page without submitting records nothing. The
private status endpoint is at
`http://localhost:5173/preview-link/status/local-status-check`. Local
development uses a local KV namespace and cannot provide Cloudflare's
approximate location metadata. Create a root `.dev.vars` file for the
local-only status token (it is git-ignored):

```dotenv
STATUS_TOKEN=local-status-check
```

Create a production build separately with `npm run build`.

## Cloudflare Workers deployment

The React build and Worker routes deploy together as one Cloudflare Worker.
The repository settings should use `npm run build` as the build command and
`npx wrangler deploy` as the deploy command, with `/` as the root directory.
Add a KV namespace binding named `PREVIEW_LOG` and a secret named
`STATUS_TOKEN` in the Worker settings. The homepage consent popup submits to
the same-origin Worker; the aggregate count appears in the homepage footer and
the private timestamp/location record is available at
`/preview-link/status/<STATUS_TOKEN>`. No separate preview URL is needed.
GitHub Pages deployment is disabled.

## Edit content and images

- Edit homepage text, profile data, practice-area placeholders, court details, image references, and footer copy in `src/content/siteContent.js`.
- Place approved images in `public/images/` and reference them from the content file using `/images/filename.webp`.
- Replace placeholder profile photos and missing qualifications before publication.

The contact form is a presentation demo. It does not submit or store enquiries.
