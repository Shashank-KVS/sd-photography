# Google Contact Automation (Sheets + Email)

Use this to store every contact submission in your Google Sheet and send an email alert to:
`photographyadss01@gmail.com`

## Important

- Do **not** use the Google Sheet URL as `VITE_GOOGLE_APPS_SCRIPT_URL`.
- You must deploy a Google **Apps Script Web App** and use its `/exec` URL.

## Your Sheet

- Sheet ID: `1K8gR4K19pXG-TnaEndWWU_M0w341C54sBJNsAo9U_P8`
- Alert Email: `photographyadss01@gmail.com`

## Apps Script Code

1. Go to [script.new](https://script.new)
2. Replace all code with:

```javascript
const SHEET_ID = "1K8gR4K19pXG-TnaEndWWU_M0w341C54sBJNsAo9U_P8";
const SHEET_NAME = "Sheet1"; // change if your tab is named differently
const OWNER_EMAIL = "photographyadss01@gmail.com";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      return json({ success: false, error: "Sheet tab not found" });
    }

    const data = e && e.parameter ? e.parameter : {};

    const submittedAt = data.submittedAt || new Date().toISOString();
    const source = data.source || "";
    const name = data.name || "";
    const email = data.email || "";
    const shootType = data.shootType || "";
    const preferredDate = data.date || "";
    const message = data.message || "";
    const pageUrl = data.pageUrl || "";
    const userAgent = data.userAgent || "";

    sheet.appendRow([
      submittedAt,
      source,
      name,
      email,
      shootType,
      preferredDate,
      message,
      pageUrl,
      userAgent,
    ]);

    const subject = `New Photography Lead: ${name || "Unknown"} (${shootType || "General"})`;
    const body =
      `You received a new website lead.\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Shoot Type: ${shootType}\n` +
      `Preferred Date: ${preferredDate}\n` +
      `Message: ${message}\n` +
      `Source: ${source}\n` +
      `Page URL: ${pageUrl}\n` +
      `Submitted At: ${submittedAt}\n`;

    MailApp.sendEmail(OWNER_EMAIL, subject, body);
    return json({ success: true });
  } catch (err) {
    return json({ success: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json({ success: true, status: "ok" });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Deploy Web App

1. Click `Deploy` -> `New deployment`
2. Type: `Web app`
3. `Execute as`: `Me`
4. `Who has access`: `Anyone`
5. Click `Deploy`
6. Copy the Web App URL ending in `/exec`

## Connect Website

Create/update `.env` in project root:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Then run:

```bash
export PATH="/tmp/node-v22.14.0-darwin-arm64/bin:$PATH"
cd /Users/shashankkv/Desktop/Projects/websites-photography/sd-photography
pnpm build
pnpm preview --host --port 4174
```

Test a submission from Contact page. You should get:
- a new row in Sheet
- an email alert at `photographyadss01@gmail.com`
