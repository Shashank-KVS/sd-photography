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
    throw new Error("Missing VITE_GOOGLE_APPS_SCRIPT_URL");
  }

  const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      pageUrl: typeof window !== "undefined" ? window.location.href : "unknown",
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit lead: ${response.status}`);
  }

  return response;
}
