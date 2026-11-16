# Srinivas Kaja — Law Firm Homepage Demo

Single-page React and Vite homepage for the proposed Srinivas Kaja legal professionals website.

## Run locally

Install dependencies, then run the same-origin site and preview tracker together:

```bash
npm install
npm run pages:dev
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

## Cloudflare Pages deployment

This application is configured for Cloudflare Pages: the React build and the
`functions/` API share one project and origin. After signing in to Cloudflare,
connect the repository in Pages, use `npm run build` as the build command and
`dist` as the build output directory. Add a KV namespace binding named
`PREVIEW_LOG`, and set `STATUS_TOKEN` as a Pages secret. The homepage consent
popup submits to the same-origin Pages Function; the aggregate count appears
in the homepage footer and the private timestamp/location record is available
at `/preview-link/status/<STATUS_TOKEN>`. No separate preview URL is needed.
No GitHub Pages deployment is configured.

## Edit content and images

- Edit homepage text, profile data, practice-area placeholders, court details, image references, and footer copy in `src/content/siteContent.js`.
- Place approved images in `public/images/` and reference them from the content file using `/images/filename.webp`.
- Replace placeholder profile photos and missing qualifications before publication.

The contact form is a presentation demo. It does not submit or store enquiries.
