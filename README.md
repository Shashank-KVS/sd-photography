# SD Photography Website

Production-ready photography portfolio built with `React + Vite + TypeScript + Tailwind`.

## What Was Added

- Contact form now submits real leads to Google Sheets (via Apps Script webhook).
- Homepage booking form also submits to the same lead pipeline.
- GitHub Pages deployment workflow added at `.github/workflows/deploy-github-pages.yml`.
- GitHub Pages SPA fallback included (`404.html` copied from `index.html` in deploy flow).
- Router updated to respect Vite base path for repository-hosted URLs.

## Local Development

1. Install dependencies:
```bash
pnpm install
```
2. Set env:
```bash
cp .env.example .env
```
3. Add your Apps Script URL in `.env`:
```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```
4. Start dev server:
```bash
pnpm dev
```

## Google Sheets Integration (Contact Leads)

1. Create a Google Sheet with headers in row 1:
`submittedAt | source | name | email | shootType | preferredDate | message | pageUrl | userAgent`
2. Open **Extensions → Apps Script**.
3. Paste this script:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = JSON.parse(e.postData.contents || "{}");

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.source || "",
    data.name || "",
    data.email || "",
    data.shootType || "",
    data.date || "",
    data.message || "",
    data.pageUrl || "",
    data.userAgent || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy as Web App:
- `Execute as`: `Me`
- `Who has access`: `Anyone`
5. Copy the deployment URL and set `VITE_GOOGLE_APPS_SCRIPT_URL` in `.env` and in GitHub repository secret with the same name.

## Deploy To GitHub Pages

1. Push this project to a GitHub repo.
2. In GitHub repo settings:
- `Settings → Pages → Source`: `GitHub Actions`
3. Add repository secret:
- `Settings → Secrets and variables → Actions → New repository secret`
- Name: `VITE_GOOGLE_APPS_SCRIPT_URL`
- Value: your Apps Script Web App URL
4. Push to `main`. The action deploys automatically.
5. Your live URL will be:
`https://<your-github-username>.github.io/<repo-name>/`

## How To Edit Content Quickly

- Main homepage content: `client/src/pages/Home.tsx`
- Contact page content: `client/src/pages/Contact.tsx`
- About page: `client/src/pages/About.tsx`
- Services page: `client/src/pages/Services.tsx`
- Portfolio page: `client/src/pages/Portfolio.tsx`
- Shared styles: `client/src/index.css`

### Change text
Edit literal strings in the page files above, then run `pnpm dev` to preview.

### Change images
- Current hero/section images are remote URLs in page files.
- Replace URL values in constants like `HERO_IMG`, `PORTFOLIO_IMAGES`.
- For local images, place files under `client/public/` and reference like `/your-image.jpg`.

## Production Checklist

- Add your real business email/Instagram/location.
- Replace stock photos with your portfolio images.
- Verify mobile layout on major pages.
- Submit a test contact lead and confirm row appears in Google Sheet.
- Add domain (optional) in GitHub Pages settings.
