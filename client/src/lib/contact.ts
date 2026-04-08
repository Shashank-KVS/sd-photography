export type ContactLeadPayload = {
  name: string;
  email: string;
  shootType: string;
  date?: string;
  message?: string;
  source: "contact-page" | "home-page";
};

const GOOGLE_SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string | undefined;

export async function submitContactLead(payload: ContactLeadPayload) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    throw new Error("CONTACT_FORM_NOT_CONFIGURED");
  }

  const lead = {
    ...payload,
    submittedAt: new Date().toISOString(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
    pageUrl: typeof window !== "undefined" ? window.location.href : "unknown",
  };

  // Use a "simple request" body type for Google Apps Script web apps to avoid
  // browser preflight/CORS issues in local preview and static hosting.
  const params = new URLSearchParams();
  Object.entries(lead).forEach(([key, value]) => {
    params.set(key, value ?? "");
  });

  await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    body: params,
  });
}
